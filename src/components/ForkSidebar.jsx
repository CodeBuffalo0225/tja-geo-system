import { useState } from "react";

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function completedCount(fork) {
  return Object.values(fork.status || {}).filter((s) => s === "done").length;
}

export default function ForkSidebar({
  forks,
  activeForkId,
  onClose,
  onSelect,
  onCreate,
  onRename,
  onDuplicate,
  onDelete,
  isMobile,
  running,
}) {
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const handleNew = () => {
    const name = window.prompt("Name for new fork:", `Fork ${forks.length + 1}`);
    if (!name) return;
    if (running) {
      alert("Cannot create a new fork while a run is in progress.");
      return;
    }
    onCreate(name.trim());
  };

  const handleSelect = (id) => {
    if (id === activeForkId) return;
    if (running) {
      alert("Cannot switch forks while a run is in progress.");
      return;
    }
    onSelect(id);
  };

  const handleDelete = (fork) => {
    if (running) {
      alert("Cannot delete a fork while a run is in progress.");
      return;
    }
    if (window.confirm(`Delete fork "${fork.name}"? This cannot be undone.`)) {
      onDelete(fork.id);
    }
  };

  const handleDuplicate = (fork) => {
    if (running) {
      alert("Cannot duplicate while a run is in progress.");
      return;
    }
    const name = window.prompt("Name for the duplicate:", `${fork.name} (copy)`);
    if (!name) return;
    onDuplicate(fork.id, name.trim());
  };

  const startRename = (fork) => {
    setRenamingId(fork.id);
    setRenameValue(fork.name);
  };

  const commitRename = (fork) => {
    const v = renameValue.trim();
    if (v && v !== fork.name) onRename(fork.id, v);
    setRenamingId(null);
  };

  const wrapStyle = isMobile
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: "70vh",
        background: "#0E0E0E",
        borderTop: "1px solid #222",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
      }
    : {
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 320,
        background: "#0E0E0E",
        borderRight: "1px solid #222",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
      };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 80,
        }}
      />
      <div style={wrapStyle}>
        <div
          style={{
            padding: "16px 18px",
            borderBottom: "1px solid #222",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              FORKS
            </div>
            <div style={{ fontSize: 14, color: "#E8E0D0", marginTop: 2 }}>
              {forks.length} saved
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #333",
              color: "#888",
              padding: "6px 12px",
              fontSize: 11,
              fontFamily: "monospace",
              cursor: "pointer",
              borderRadius: 3,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "12px 14px", borderBottom: "1px solid #222" }}>
          <button
            onClick={handleNew}
            style={{
              width: "100%",
              background: "#C8A97E",
              color: "#111",
              border: "none",
              padding: "10px 14px",
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            + NEW FORK
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {forks.map((fork) => {
            const isActive = fork.id === activeForkId;
            return (
              <div
                key={fork.id}
                style={{
                  borderBottom: "1px solid #1A1A1A",
                  padding: "12px 14px",
                  background: isActive ? "#1A1A1A" : "transparent",
                  borderLeft: isActive ? "3px solid #C8A97E" : "3px solid transparent",
                  cursor: "pointer",
                }}
                onClick={() => renamingId !== fork.id && handleSelect(fork.id)}
              >
                {renamingId === fork.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => commitRename(fork)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename(fork);
                      if (e.key === "Escape") setRenamingId(null);
                    }}
                    style={{
                      width: "100%",
                      background: "#111",
                      border: "1px solid #333",
                      color: "#E8E0D0",
                      padding: "6px 8px",
                      fontSize: 13,
                      fontFamily: "monospace",
                      borderRadius: 3,
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: 13,
                      color: isActive ? "#C8A97E" : "#E8E0D0",
                      marginBottom: 4,
                    }}
                  >
                    {fork.name}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: "#666",
                  }}
                >
                  {completedCount(fork)}/8 complete · {fmtDate(fork.lastModified)}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startRename(fork);
                    }}
                    style={iconBtn}
                    title="Rename"
                  >
                    ✎ rename
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicate(fork);
                    }}
                    style={iconBtn}
                    title="Duplicate"
                  >
                    ⧉ duplicate
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(fork);
                    }}
                    style={{ ...iconBtn, color: "#C87E7E", borderColor: "#3a2222" }}
                    title="Delete"
                  >
                    ✕ delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const iconBtn = {
  background: "transparent",
  border: "1px solid #333",
  color: "#888",
  padding: "4px 8px",
  fontSize: 10,
  fontFamily: "monospace",
  cursor: "pointer",
  borderRadius: 3,
};
