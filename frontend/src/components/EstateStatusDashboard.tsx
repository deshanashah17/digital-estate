import { useEffect, useState } from "react";
import { getAppState } from "../utils/algorand";

const APP_ID = Number((import.meta as any).env.VITE_APP_ID || "0");

export default function EstateStatusDashboard() {
  const [state, setState] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppState(APP_ID)
      .then(setState)
      .finally(() => setLoading(false));
  }, []);

  const confirmed = state["death_confirmed"] === 1;
  const deathTs = state["death_timestamp"]
    ? new Date(Number(state["death_timestamp"]) * 1000).toLocaleString("en-IN")
    : "—";

  return (
    <div style={{
      padding: "24px 28px",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      background: "linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)",
      maxWidth: "480px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "default"
    }}
    onMouseEnter={(el) => {
      el.currentTarget.style.transform = "translateY(-2px)";
      el.currentTarget.style.borderColor = "#8b5cf6";
      el.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.15)";
    }}
    onMouseLeave={(el) => {
      el.currentTarget.style.transform = "translateY(0)";
      el.currentTarget.style.borderColor = "#e2e8f0";
      el.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)";
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
        <div style={{
          width: "40px", height: "40px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Estate Status</h2>
          <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Live on-chain state</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "16px", height: "16px",
            borderRadius: "50%",
            border: "2px solid #e2e8f0",
            borderTopColor: "#10b981",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Loading on-chain state...</p>
        </div>
      ) : (
        <dl style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 14px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px solid #e2e8f0"
          }}>
            <dt style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>Death confirmed</dt>
            <dd style={{
              fontSize: "13px", fontWeight: 700,
              background: confirmed
                ? "linear-gradient(135deg, #ef4444, #fca5a5)"
                : "linear-gradient(135deg, #10b981, #6ee7b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {confirmed ? "Yes ⚠️" : "No ✓"}
            </dd>
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 14px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px solid #e2e8f0"
          }}>
            <dt style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>Confirmed at</dt>
            <dd style={{ fontSize: "12px", color: "#0f172a", fontWeight: 600, fontFamily: "'Courier New', monospace" }}>
              {deathTs}
            </dd>
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 14px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px solid #e2e8f0"
          }}>
            <dt style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>Grievance window</dt>
            <dd style={{ fontSize: "12px", color: "#0f172a", fontWeight: 600 }}>30 days</dd>
          </div>
        </dl>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
