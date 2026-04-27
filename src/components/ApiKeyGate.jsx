import { useState } from "react";

export default function ApiKeyGate({ onSave }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed) onSave(trimmed);
  };

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#111",
        minHeight: "100vh",
        color: "#E8E0D0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#888",
            letterSpacing: "0.15em",
            marginBottom: 8,
          }}
        >
          TJA AUTOCARE · LYNDHURST NJ
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: "normal",
            margin: 0,
            marginBottom: 10,
            color: "#E8E0D0",
          }}
        >
          TJA AutoCare GEO System
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginTop: 0, marginBottom: 24 }}>
          Enter your Anthropic API key to continue
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="sk-ant-..."
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 14,
            fontFamily: "monospace",
            background: "#1A1A1A",
            border: "1px solid #333",
            borderRadius: 4,
            color: "#E8E0D0",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: 14,
          }}
        />

        <button
          onClick={submit}
          style={{
            width: "100%",
            background: "#C8A97E",
            color: "#111",
            border: "none",
            padding: "12px 22px",
            fontSize: 13,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          ▶ SAVE & CONTINUE
        </button>

        <div
          style={{
            fontSize: 11,
            color: "#666",
            marginTop: 14,
            fontFamily: "monospace",
          }}
        >
          Stored locally in your browser only
        </div>
      </div>
    </div>
  );
}
