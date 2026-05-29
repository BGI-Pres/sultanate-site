import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d0d0d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        {/* Stylized "S" mark in gold */}
        <div
          style={{
            fontSize: "100px",
            fontWeight: 700,
            color: "#c9a84c",
            lineHeight: 1,
            fontStyle: "italic",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
