import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const contactFromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface ContactPayload {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    message: string;
}

function toCleanString(value: unknown, maxLength: number) {
    if (typeof value !== "string") return null;

    const cleaned = value.trim();
    if (!cleaned || cleaned.length > maxLength) return null;

    return cleaned;
}

function parseContactPayload(raw: unknown): ContactPayload | null {
    if (!raw || typeof raw !== "object") return null;

    const body = raw as Record<string, unknown>;

    const payload: ContactPayload = {
        name: toCleanString(body.name, 120) ?? "",
        email: toCleanString(body.email, 150) ?? "",
        company: toCleanString(body.company, 120) ?? "",
        projectType: toCleanString(body.projectType, 120) ?? "",
        budget: toCleanString(body.budget, 80) ?? "",
        message: toCleanString(body.message, 3000) ?? "",
    };

    const requiredValues = [
        payload.name,
        payload.email,
        payload.projectType,
        payload.budget,
        payload.message,
    ];

    const hasInvalidField = requiredValues.some((item) => item.length === 0);

    if (hasInvalidField) return null;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(payload.email)) return null;

    return payload;
}

function toPlainText(payload: ContactPayload) {
    return [
        "New project inquiry from Nawaz Studio portfolio",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company / Brand: ${payload.company || "Not provided"}`,
        `Project Type: ${payload.projectType}`,
        `Budget: ${payload.budget}`,
        "",
        "Message:",
        payload.message,
    ].join("\n");
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid request payload." },
            { status: 400 }
        );
    }

    const payload = parseContactPayload(body);

    if (!payload) {
        return NextResponse.json(
            { error: "Please provide valid contact details." },
            { status: 400 }
        );
    }

    if (!resend || !contactToEmail) {
        return NextResponse.json(
            {
                error:
                    "Email service is not configured yet. Please set RESEND_API_KEY and CONTACT_TO_EMAIL.",
            },
            { status: 503 }
        );
    }

    try {
        const { error } = await resend.emails.send({
            from: contactFromEmail,
            to: contactToEmail,
            replyTo: payload.email,
            subject: `New project inquiry from ${payload.name}`,
            text: toPlainText(payload),
        });

        if (error) {
            console.error("Resend delivery error", error);
            return NextResponse.json(
                { error: "Unable to send your inquiry right now." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Contact route error", error);
        return NextResponse.json(
            { error: "Unexpected server error while sending your inquiry." },
            { status: 500 }
        );
    }
}
