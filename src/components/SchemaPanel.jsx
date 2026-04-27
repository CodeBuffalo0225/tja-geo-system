import { useMemo, useState } from "react";
import JSZip from "jszip";
import { SCHEMAS } from "../data/schema-templates.js";

export default function SchemaPanel({ onClose, isMobile }) {
  const [active, setActive] = useState(SCHEMAS[0].key);
  const [copied, setCopied] = useState(false);

  const built = useMemo(
    () => Object.fromEntries(SCHEMAS.map((s) => [s.key, s.build()])),
    []
  );
  const current = SCHEMAS.find((s) => s.key === active);

  const copyCurrent = () => {
    navigator.clipboard.writeText(built[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    SCHEMAS.forEach((s) => zip.file(s.file, built[s.key]));
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tja-geo-schemas.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 100,
        display: "flex",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 30,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0E0E0E",
          border: "1px solid #222",
          borderRadius: isMobile ? 0 : 8,
          width: isMobile ? "100%" : "min(900px, 95vw)",
          height: isMobile ? "100%" : "min(700px, 90vh)",
          display: "flex",
          flexDirection: "column",
          color: "#E8E0D0",
          fontFamily: "'Georgia', serif",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#888",
                letterSpacing: "0.12em",
              }}
            >
              SCHEMA LIBRARY
            </div>
            <div style={{ fontSize: 16, marginTop: 2 }}>JSON-LD Templates</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={downloadAll} style={pillBtn}>
              ⬇ DOWNLOAD ALL (.ZIP)
            </button>
            <button onClick={onClose} style={pillBtnGhost}>
              ✕ CLOSE
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #222",
            overflowX: "auto",
          }}
        >
          {SCHEMAS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              style={{
                background: active === s.key ? "#1A1A1A" : "transparent",
                border: "none",
                borderBottom:
                  active === s.key ? "2px solid #C8A97E" : "2px solid transparent",
                color: active === s.key ? "#E8E0D0" : "#888",
                padding: "12px 16px",
                fontSize: 12,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
          <pre
            style={{
              margin: 0,
              background: "#111",
              border: "1px solid #222",
              borderRadius: 6,
              padding: 16,
              fontSize: 12,
              lineHeight: 1.6,
              color: "#D0C8B8",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {built[active]}
          </pre>
        </div>

        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>
            {current.file}
          </div>
          <button onClick={copyCurrent} style={pillBtn}>
            {copied ? "✓ COPIED" : "COPY SCHEMA"}
          </button>
        </div>
      </div>
    </div>
  );
}

const pillBtn = {
  background: "transparent",
  border: "1px solid #C8A97E",
  color: "#C8A97E",
  padding: "8px 14px",
  fontSize: 11,
  fontFamily: "monospace",
  letterSpacing: "0.06em",
  cursor: "pointer",
  borderRadius: 3,
};

const pillBtnGhost = {
  background: "transparent",
  border: "1px solid #333",
  color: "#888",
  padding: "8px 14px",
  fontSize: 11,
  fontFamily: "monospace",
  letterSpacing: "0.06em",
  cursor: "pointer",
  borderRadius: 3,
};
