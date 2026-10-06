import { ImageResponse } from "next/og";
export const alt = "Pedro Sodré — Sites e landing pages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          background: "#080A0B",
          color: "#F4F4EC",
          borderTop: "12px solid #FCEE09",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#FCEE09",
            fontSize: 28,
            letterSpacing: 4,
          }}
        >
          PEDRO SODRÉ / DESENVOLVIMENTO WEB
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span>Seu negócio merece</span>
          <span style={{ color: "#FCEE09" }}>um site à altura.</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#B5B9B8" }}>
          SITES · LANDING PAGES · REFORMULAÇÃO
        </div>
      </div>
    ),
    size,
  );
}
