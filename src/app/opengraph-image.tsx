import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sultanate of Amexem — Moorish American Governing Authority";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d0d0d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "64px",
        }}
      >
        {/* Gold top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#c9a84c",
          }}
        />
        {/* Gold bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#c9a84c",
          }}
        />

        {/* Decorative horizontal rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "#c9a84c" }} />
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c9a84c",
              fontWeight: 600,
            }}
          >
            Official Authority
          </div>
          <div style={{ width: "60px", height: "1px", background: "#c9a84c" }} />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Sultanate of Amexem
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          Moorish American Governing Authority
        </div>

        {/* Gold divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#c9a84c",
            }}
          />
          <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          sultanateofamexem.com
        </div>
      </div>
    ),
    { ...size }
  );
}
