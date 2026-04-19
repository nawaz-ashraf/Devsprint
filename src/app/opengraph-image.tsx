import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "58px 64px",
                    color: "#eef3ff",
                    background:
                        "radial-gradient(circle at 15% 20%, rgba(79,116,255,0.55), transparent 34%), radial-gradient(circle at 85% 10%, rgba(139,92,246,0.45), transparent 38%), radial-gradient(circle at 55% 100%, rgba(34,211,238,0.25), transparent 45%), linear-gradient(160deg, #050510 0%, #090a1f 100%)",
                    fontFamily: "Inter, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 24,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        opacity: 0.86,
                    }}
                >
                    Nawaz Studio
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div
                        style={{
                            maxWidth: 980,
                            fontSize: 66,
                            lineHeight: 1.05,
                            fontWeight: 700,
                        }}
                    >
                        I build modern apps and websites that solve real problems.
                    </div>
                    <div style={{ fontSize: 28, opacity: 0.9 }}>
                        Flutter apps • premium web experiences • conversion-first engineering
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 14,
                        fontSize: 20,
                        opacity: 0.85,
                    }}
                >
                    <span>Next.js</span>
                    <span>•</span>
                    <span>Three.js</span>
                    <span>•</span>
                    <span>Framer Motion</span>
                </div>
            </div>
        ),
        size
    );
}
