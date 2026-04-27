import { exportAllForks } from "../utils/forkManager.js";

const AGENT_NAMES = {
  1: "Website Auditor",
  2: "Local SEO Strategist",
  3: "GEO / AI Search Strategist",
  4: "Revenue Strategist",
  5: "Content Architect",
  6: "Conversion Copywriter",
  7: "Technical SEO Implementer",
  8: "QA + Final Editor",
};

function slug(name) {
  return (name || "fork")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function download(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportModal({ fork, onClose }) {
  const exportTxt = () => {
    const sep = "═══════════════════════════════";
    const parts = Object.keys(fork.outputs)
      .sort((a, b) => Number(a) - Number(b))
      .map(
        (id) =>
          `${sep}\nAGENT ${id} — ${(AGENT_NAMES[id] || "").toUpperCase()}\n${sep}\n\n${fork.outputs[id]}`
      );
    download(
      `tja-geo-${slug(fork.name)}-${todayStr()}.txt`,
      parts.join("\n\n")
    );
  };

  const exportMd = () => {
    const parts = Object.keys(fork.outputs)
      .sort((a, b) => Number(a) - Number(b))
      .map((id) => `## Agent ${id} — ${AGENT_NAMES[id] || ""}\n\n${fork.outputs[id]}`);
    const md = `# TJA AutoCare GEO Report — ${fork.name}\n\nGenerated ${todayStr()}\n\n---\n\n${parts.join("\n\n---\n\n")}\n`;
    download(`tja-geo-${slug(fork.name)}-${todayStr()}.md`, md, "text/markdown");
  };

  const exportAll = () => {
    download(
      `tja-geo-all-forks-${todayStr()}.json`,
      exportAllForks(),
      "application/json"
    );
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0E0E0E",
          border: "1px solid #222",
          borderRadius: 8,
          width: "min(440px, 100%)",
          padding: 22,
          color: "#E8E0D0",
          fontFamily: "'Georgia', serif",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#888",
            letterSpacing: "0.12em",
            marginBottom: 6,
          }}
        >
          EXPORT
        </div>
        <div style={{ fontSize: 18, marginBottom: 18 }}>{fork.name}</div>

        <button onClick={exportTxt} style={rowBtn}>
          <div style={rowTitle}>Plain text (.txt)</div>
          <div style={rowSub}>All agent outputs in this fork</div>
        </button>
        <button onClick={exportMd} style={rowBtn}>
          <div style={rowTitle}>Markdown (.md)</div>
          <div style={rowSub}>Formatted with headings per agent</div>
        </button>
        <button onClick={exportAll} style={rowBtn}>
          <div style={rowTitle}>All forks backup (.json)</div>
          <div style={rowSub}>Full backup of every fork in localStorage</div>
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: 6,
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            padding: "8px 14px",
            fontSize: 11,
            fontFamily: "monospace",
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

const rowBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  background: "#111",
  border: "1px solid #222",
  color: "#E8E0D0",
  padding: "12px 14px",
  fontFamily: "'Georgia', serif",
  cursor: "pointer",
  borderRadius: 4,
  marginBottom: 10,
};

const rowTitle = { fontSize: 14, marginBottom: 2 };
const rowSub = { fontSize: 11, color: "#888", fontFamily: "monospace" };
