import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "52px 62px",
                    color: "#eef3ff",
                    background:
                        "radial-gradient(circle at 20% 0%, rgba(34,211,238,0.38), transparent 34%), radial-gradient(circle at 90% 20%, rgba(139,92,246,0.34), transparent 38%), linear-gradient(165deg, #050510 0%, #0c0f2b 100%)",
                    fontFamily: "Inter, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 22,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        opacity: 0.8,
                    }}
                >
                    Nawaz Studio • Premium Digital Experiences
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <div style={{ fontSize: 62, maxWidth: 980, lineHeight: 1.08, fontWeight: 700 }}>
                        Modern Flutter apps and websites that solve real problems.
                    </div>
                    <div style={{ fontSize: 28, opacity: 0.88 }}>
                        Coding-first 3D storytelling that impresses and converts.
                    </div>
                </div>

                <div style={{ fontSize: 20, opacity: 0.8 }}>
                    Start Your Project →
                </div>
            </div>
        ),
        size
    );
}
