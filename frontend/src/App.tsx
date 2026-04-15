import { useState, useEffect } from "react";

const API = "http://localhost:8001";
const OWNER = "TN5PRWG2ZWPQRKMMF7WOVHRW4WESQHIU7M3OUAAVJ2CLQJRDMGJOHEF2NQ";

type Theme = "dark" | "light";

// Enhanced color system
const colors = {
  light: {
    bg: "#f8fafc",
    bgSecondary: "#f1f5f9",
    surface: "#ffffff",
    surfaceHover: "#f8fafc",
    text: "#0f172a",
    textLight: "#64748b",
    border: "#cbd5e1",
    borderLight: "#e2e8f0",
    success: "#059669",
    danger: "#dc2626",
    info: "#0284c7",
    warning: "#ea580c",
    accentPr: "#8b5cf6",
    accentSec: "#06b6d4",
  },
  dark: {
    bg: "#0f172a",
    bgSecondary: "#1e293b",
    surface: "#1e293b",
    surfaceHover: "#334155",
    text: "#f1f5f9",
    textLight: "#94a3b8",
    border: "#475569",
    borderLight: "#334155",
    success: "#10b981",
    danger: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
    accentPr: "#a78bfa",
    accentSec: "#22d3ee",
  },
};

const getColors = (theme: Theme) => colors[theme];

// Moved outside App to prevent re-creation on every render
const CreateWillForm = ({ c, setWillTime }: any) => {
  const [nominee, setNominee] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async () => {
    setLoading(true);
    try {
      await fetch(`${API}/create-will`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner_address: OWNER,
          nominee_address: nominee,
          amount_algo: parseFloat(amount),
        }),
      });
      
      // Capture the time when will was created
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      setWillTime(timeStr);
      
      setStatus("✓ Will created successfully - Will be executed after death confirmation + 30s grace period");
      setTimeout(() => setStatus(""), 5000);
    } catch {
      setStatus("✗ Error creating will");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Demo Info Banner */}
      <div style={{
        marginBottom: "16px",
        padding: "clamp(12px, 2vw, 16px)",
        background: c.info + "15",
        border: `1.5px solid ${c.info}`,
        borderRadius: "10px",
      }}>
        <div style={{ fontSize: "clamp(10px, 2.3vw, 11px)", color: c.text, lineHeight: "1.6" }}>
          <span style={{ fontWeight: "700", color: c.info }}>ℹ️ DEMO MODE:</span> Amount will be transferred to nominee after death confirmation + 30 second grace period (testnet ALGO)
        </div>
      </div>
      <input
        value={nominee}
        onChange={(e) => setNominee(e.target.value)}
        placeholder="Nominee wallet address"
        style={{
          width: "100%",
          padding: "clamp(12px, 2.5vw, 14px) clamp(12px, 3vw, 16px)",
          minHeight: "48px",
          border: `1.5px solid ${c.border}`,
          background: c.bgSecondary,
          color: c.text,
          borderRadius: "10px",
          fontSize: "clamp(13px, 3vw, 15px)",
          marginBottom: "16px",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = c.accentPr;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${c.accentPr}15`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = c.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ALGO)"
        step="0.1"
        style={{
          width: "100%",
          padding: "clamp(12px, 2.5vw, 14px) clamp(12px, 3vw, 16px)",
          minHeight: "48px",
          border: `1.5px solid ${c.border}`,
          background: c.bgSecondary,
          color: c.text,
          borderRadius: "10px",
          fontSize: "clamp(13px, 3vw, 15px)",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = c.accentPr;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${c.accentPr}15`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = c.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      <button
        onClick={submit}
        disabled={loading || !nominee || !amount}
        style={{
          width: "100%",
          padding: "clamp(12px, 2.5vw, 14px)",
          minHeight: "48px",
          background: loading || !nominee || !amount ? c.bgSecondary : `linear-gradient(135deg, ${c.accentPr}, ${c.accentSec})`,
          color: loading || !nominee || !amount ? c.textLight : "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "clamp(13px, 3vw, 15px)",
          fontWeight: "700",
          cursor: loading || !nominee || !amount ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => {
          if (!(loading || !nominee || !amount)) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${c.accentPr}30`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {loading ? "Creating..." : "Create Will"}
      </button>
      {status && (
        <div style={{
          marginTop: "12px",
          fontSize: "clamp(12px, 2.8vw, 14px)",
          color: status.includes("✓") ? c.success : c.danger,
          fontWeight: "600",
          padding: "clamp(8px, 2vw, 12px)",
          background: status.includes("✓") ? c.success + "15" : c.danger + "15",
          borderRadius: "8px",
          borderLeft: `3px solid ${status.includes("✓") ? c.success : c.danger}`,
        }}>
          {status}
        </div>
      )}
    </div>
  );
};

// Timeline Component - Shows event flow with real-time updates
const EventTimeline = ({ c, willCreated, deathTriggered, countdownRemaining, isExecuted, executionTx }: any) => {
  const getTimeString = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  };

  const TimelineEvent = ({ icon, title, desc, status, timestamp, isActive, txHash }: any) => (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px", position: "relative" }}>
      {/* Vertical line */}
      <div style={{
        width: "2px",
        background: isActive ? c.warning : status === "✓" ? c.success : c.borderLight,
        position: "absolute",
        left: "15px",
        top: "40px",
        bottom: "-20px",
        opacity: 0.6,
      }} />

      {/* Timeline dot */}
      <div style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: isActive ? c.warning : status === "✓" ? c.success : c.bgSecondary,
        border: `2px solid ${isActive ? c.warning : status === "✓" ? c.success : c.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "14px",
        boxShadow: isActive ? `0 0 12px ${c.warning}40` : "none",
      }}>
        {icon}
      </div>

      {/* Event card */}
      <div style={{
        flex: 1,
        background: isActive ? c.warning + "10" : status === "✓" ? c.success + "08" : c.bgSecondary,
        border: `1.5px solid ${isActive ? c.warning : status === "✓" ? c.success : c.border}`,
        borderRadius: "10px",
        padding: "clamp(12px, 2vw, 16px)",
        marginLeft: "8px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <div style={{ fontSize: "clamp(13px, 3vw, 14px)", fontWeight: "700", color: c.text }}>{title}</div>
          {timestamp && <div style={{ fontSize: "clamp(10px, 2.3vw, 11px)", color: c.textLight, fontWeight: "500" }}>{timestamp}</div>}
        </div>
        
        <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, lineHeight: "1.5", marginBottom: "8px" }}>
          {desc}
        </div>

        {status && (
          <div style={{
            fontSize: "clamp(10px, 2.3vw, 11px)",
            fontWeight: "600",
            color: isActive ? c.warning : status === "✓" ? c.success : c.info,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            {status === "✓" && "✓ Completed"} 
            {isActive && "⏰ In Progress"}
            {!status && !isActive && "○ Pending"}
          </div>
        )}

        {txHash && (
          <div style={{
            marginTop: "10px",
            padding: "8px 10px",
            background: c.success + "15",
            borderRadius: "6px",
            fontSize: "clamp(9px, 2vw, 10px)",
            fontFamily: "monospace",
            color: c.success,
            wordBreak: "break-all",
          }}>
            TX: {txHash}
          </div>
        )}
      </div>
    </div>
  );

  if (!willCreated && !deathTriggered) return null;

  return (
    <div style={{
      marginTop: "24px",
      padding: "clamp(16px, 3vw, 24px)",
      background: c.surface,
      border: `1.5px solid ${c.border}`,
      borderRadius: "16px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: "700", color: c.text, marginBottom: "4px" }}>
          📅 Estate Execution Timeline
        </div>
        <div style={{ fontSize: "clamp(10px, 2.3vw, 11px)", color: c.textLight }}>
          Real-time event log
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <TimelineEvent
          icon="✍️"
          title="Will Created"
          desc="Digital estate registered on-chain"
          status="✓"
          timestamp={willCreated}
        />

        {deathTriggered && (
          <>
            <TimelineEvent
              icon="🛡️"
              title="Death Triggered (DEMO)"
              desc="Death event detected - Sentinel activated"
              status="✓"
              timestamp={deathTriggered}
            />

            <TimelineEvent
              icon="⏳"
              title="Grace Period"
              desc={`Nominees have time to contest. Remaining: ${countdownRemaining}s`}
              status={countdownRemaining > 0 ? null : "✓"}
              isActive={countdownRemaining > 0}
              timestamp={countdownRemaining > 0 ? `${countdownRemaining}s left` : "Completed"}
            />

            <TimelineEvent
              icon={isExecuted ? "💰" : "⏳"}
              title="ALGO Transfer"
              desc={isExecuted ? "Nominee has received the estate transfer" : "Awaiting grace period completion..."}
              status={isExecuted ? "✓" : null}
              isActive={!isExecuted && countdownRemaining <= 0}
              txHash={executionTx}
            />
          </>
        )}
      </div>

      {/* DEMO Mode Badge */}
      <div style={{
        marginTop: "16px",
        padding: "8px 12px",
        background: c.info + "15",
        border: `1px solid ${c.info}40`,
        borderRadius: "6px",
        fontSize: "clamp(9px, 2vw, 10px)",
        color: c.info,
        fontWeight: "500",
      }}>
        🛠️ DEMO MODE: DigiLocker integration pending. Real death certificates will replace this simulation in production.
      </div>
    </div>
  );
};

// Moved outside App to prevent re-creation on every render
const ReportDeathForm = ({ c, willTime }: any) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [deathTriggeredTime, setDeathTriggeredTime] = useState("");
  const [executionTx, setExecutionTx] = useState("");
  const [isExecuted, setIsExecuted] = useState(false);

  const submit = async () => {
    setLoading(true);
    setCountdown(30);
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setDeathTriggeredTime(timeStr);
    
    try {
      const response = await fetch(`${API}/report-death`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner_address: OWNER }),
      });
      const data = await response.json();
      setStatus("✓ Death reported - Sentinel activated - ALGO transfer initiated!");
      
      // Simulate getting tx_id from response
      if (data.tx_id) {
        setExecutionTx(data.tx_id);
      }
    } catch {
      setStatus("✗ Error reporting death");
      setCountdown(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && deathTriggeredTime && !isExecuted) {
      // When countdown reaches 0, mark as executed
      setIsExecuted(true);
    }
  }, [countdown, deathTriggeredTime, isExecuted]);

  return (
    <>
      {/* Event Timeline */}
      <EventTimeline
        c={c}
        willCreated={willTime}
        deathTriggered={deathTriggeredTime}
        countdownRemaining={countdown}
        isExecuted={isExecuted}
        executionTx={executionTx}
      />

      <div style={{ marginTop: "24px" }}>
        {/* Critical Warning Banner */}
        <div style={{
          marginBottom: "16px",
          padding: "clamp(12px, 2vw, 16px)",
          background: c.danger + "15",
          border: `2px solid ${c.danger}`,
          borderRadius: "10px",
          borderLeft: `4px solid ${c.danger}`,
        }}>
          <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", fontWeight: "700", color: c.danger, marginBottom: "6px" }}>
            ⚠️ DEMO MODE WARNING
          </div>
          <div style={{ fontSize: "clamp(10px, 2.3vw, 11px)", color: c.text, lineHeight: "1.6" }}>
            <strong>⛔ Real ALGO coins will be transferred on Algorand network.</strong><br />
            This simulates death detection (DigiLocker integration coming soon). Use testnet ALGO for testing!
          </div>
        </div>

        <p style={{ fontSize: "clamp(12px, 2.8vw, 14px)", color: c.textLight, margin: "0 0 8px", fontWeight: "500" }}>
          ◈ Sentinel monitors this estate. For demo: <span style={{ color: c.info, fontWeight: "700" }}>30 sec countdown</span>
        </p>
        <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: c.textLight, margin: "0 0 20px", fontStyle: "italic", opacity: 0.8 }}>
          ⏱️ After countdown ends, estate transfer automatically executes: {countdown}s remaining
        </p>
        <button
          onClick={submit}
          disabled={loading || countdown > 0}
          style={{
            width: "100%",
            padding: "clamp(12px, 2.5vw, 14px)",
            minHeight: "48px",
            background: loading || countdown > 0 ? c.bgSecondary : `linear-gradient(135deg, ${c.danger}, ${c.warning})`,
            color: loading || countdown > 0 ? c.textLight : "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "clamp(13px, 3vw, 15px)",
            fontWeight: "700",
            cursor: loading || countdown > 0 ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            if (!(loading || countdown > 0)) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${c.danger}30`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {loading ? "Reporting..." : countdown > 0 ? `Countdown: ${countdown}s - Transfer Pending` : "🔴 Simulate Death Event (Demo)"}
        </button>
        {status && (
          <div style={{
            marginTop: "12px",
            fontSize: "clamp(12px, 2.8vw, 14px)",
            color: status.includes("✓") ? c.success : c.danger,
            fontWeight: "600",
            padding: "clamp(8px, 2vw, 12px)",
            background: status.includes("✓") ? c.success + "15" : c.danger + "15",
            borderRadius: "8px",
            borderLeft: `3px solid ${status.includes("✓") ? c.success : c.danger}`,
          }}>
            {status}
          </div>
        )}
      </div>
    </>
  );
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  const [state, setState] = useState<any>({});
  const [showCreateWill, setShowCreateWill] = useState(false);
  const [willTime, setWillTime] = useState("");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [firstTimeHints, setFirstTimeHints] = useState(true);
  const c = getColors(theme);

  useEffect(() => {
    // Only poll when form is NOT active - prevents re-renders while typing
    if (showCreateWill) return;
    
    const load = () => fetch(`${API}/status`).then(r => r.json()).then(setState).catch(() => {});
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [showCreateWill]);

  useEffect(() => {
    const hasSeenHints = localStorage.getItem("hasSeenHints");
    setFirstTimeHints(!hasSeenHints);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const dismissHints = () => {
    setFirstTimeHints(false);
    localStorage.setItem("hasSeenHints", "true");
  };

  // Helper Components
  const Card = ({ c, children, full }: any) => (
    <div style={{
      background: c.surface,
      border: `1.5px solid ${c.border}`,
      borderRadius: "16px",
      padding: "clamp(24px, 4vw, 32px)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      gridColumn: full ? "1 / -1" : undefined,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = c.accentPr;
      e.currentTarget.style.boxShadow = `0 8px 24px ${c.accentPr}20`;
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = c.border;
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      {children}
    </div>
  );

  const CardHeader = ({ icon, title, subtitle, subtle }: any) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    }}>
      <div style={{ fontSize: "clamp(24px, 6vw, 28px)", color: c.accentPr, fontWeight: "bold" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: "700", color: c.text, margin: 0, letterSpacing: "-0.3px" }}>
          {title}
        </div>
        {(subtitle || subtle) && <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, margin: "4px 0 0" }}>{subtitle || subtle}</div>}
      </div>
    </div>
  );

  const InteractiveComponent = ({ children }: any) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {children}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
            }}
          />
        ))}
      </div>
    );
  };

  const DropdownCard = ({ c, icon, title, description, items }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card c={c}>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 0",
            borderBottom: `2px solid ${c.accentPr}20`,
            transition: "all 0.3s ease",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <div style={{ fontSize: "28px", color: c.accentPr }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "clamp(15px, 3.5vw, 17px)", fontWeight: "700", color: c.text }}>{title}</div>
            <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight }}>{description}</div>
          </div>
          <div style={{ fontSize: "20px", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s", color: c.accentPr }}>▶</div>
        </div>
        {isExpanded && (
          <div style={{ marginTop: "12px", animation: "slideDown 0.3s ease-out" }}>
            {items.map((item: any, idx: number) => (
              <div key={idx} style={{
                padding: "14px 12px",
                borderLeft: `3px solid ${c.accentPr}40`,
                marginBottom: "12px",
                background: c.bgSecondary,
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.accentPr + "10";
                e.currentTarget.style.borderLeftColor = c.accentPr;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.bgSecondary;
                e.currentTarget.style.borderLeftColor = c.accentPr + "40";
              }}>
                <div style={{ fontSize: "clamp(12px, 3vw, 13px)", fontWeight: "600", color: c.text, marginBottom: "4px" }}>
                  {item.emoji} {item.title}
                </div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, lineHeight: "1.5" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };

  const StatItem = ({ label, value, theme }: any) => {
    const colors_local = getColors(theme || "light");
    return (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(12px, 2vw, 16px) 0",
        borderBottom: `1px solid ${colors_local.borderLight}`,
        gap: "16px",
        transition: "all 0.2s ease",
      }}>
        <span style={{ fontSize: "clamp(12px, 2.8vw, 14px)", color: colors_local.textLight, fontWeight: "500" }}>{label}</span>
        <span style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: "700", color: colors_local.text, textAlign: "right", minWidth: 0 }}>{value}</span>
      </div>
    );
  };

  const FlipCard = ({ c, icon, title, description, children }: any) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div
        style={{
          background: c.surface,
          border: `1.5px solid ${c.border}`,
          borderRadius: "16px",
          padding: "clamp(24px, 4vw, 32px)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          perspective: "1000px",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s",
            transformStyle: "preserve-3d" as any,
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden" as any,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "clamp(42px, 10vw, 56px)", marginBottom: "16px" }}>
              {icon}
            </div>
            <div style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "700", color: c.text, marginBottom: "8px" }}>
              {title}
            </div>
            <div style={{ fontSize: "clamp(12px, 2.8vw, 14px)", color: c.textLight, fontStyle: "italic" }}>
              {description}
            </div>
            <div style={{ fontSize: "clamp(10px, 2.5vw, 12px)", color: c.accentPr, marginTop: "16px", fontWeight: "600" }}>
              Click to expand →
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden" as any,
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "auto",
              padding: "clamp(16px, 3vw, 24px)",
            }}
          >
            <div style={{ fontSize: "clamp(10px, 2.5vw, 12px)", color: c.accentPr, fontWeight: "600", marginBottom: "12px" }}>
              ← Click to return
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: c.bg,
      color: c.text,
      minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      transition: "background-color 0.3s, color 0.3s",
    }}>
      <style>{`
        body { margin: 0; padding: 0; background: ${c.bg}; color: ${c.text}; }
        * { box-sizing: border-box; }
        button { all: unset; cursor: pointer; }
        input { font-family: inherit; }
        input::placeholder { opacity: 0.6; }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes flip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .ripple-container {
          position: relative;
          overflow: hidden;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
        
        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        
        .flip-back {
          transform: rotateY(180deg);
        }
        
        .hint-banner {
          animation: slideDown 0.4s ease-out;
        }
        
        @media (max-width: 640px) {
          body { font-size: 14px; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: c.surface,
        borderBottom: `1px solid ${c.border}`,
        padding: "clamp(16px, 3vw, 20px) clamp(16px, 4vw, 32px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: theme === "dark" ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 3vw, 16px)", minWidth: 0 }}>
          <div style={{
            width: "clamp(36px, 8vw, 44px)",
            height: "clamp(36px, 8vw, 44px)",
            background: `linear-gradient(135deg, ${c.accentPr} 0%, ${c.accentSec} 100%)`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "800",
            flexShrink: 0,
            boxShadow: `0 4px 12px ${c.accentPr}40`,
          }}>
            ∞
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "clamp(15px, 4vw, 18px)", fontWeight: "700", color: c.text, letterSpacing: "-0.3px" }}>Digital Estate</div>
            <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: c.textLight, marginTop: "2px" }}>Algorand Testament</div>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            width: "clamp(36px, 8vw, 44px)",
            height: "clamp(36px, 8vw, 44px)",
            borderRadius: "10px",
            background: c.bgSecondary,
            border: `1.5px solid ${c.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(16px, 4vw, 20px)",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = c.info;
            e.currentTarget.style.borderColor = c.info;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow = `0 4px 12px ${c.info}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = c.bgSecondary;
            e.currentTarget.style.borderColor = c.border;
            e.currentTarget.style.color = c.text;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {theme === "light" ? "◐" : "◑"}
        </button>
      </header>

      {/* First-time User Hint */}
      {firstTimeHints && (
        <div className="hint-banner" style={{
          background: c.info + "15",
          border: `1px solid ${c.info}40`,
          borderRadius: "12px",
          padding: "clamp(12px, 3vw, 16px)",
          margin: "clamp(12px, 3vw, 16px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}>
          <div>
            <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: c.info, marginBottom: "4px" }}>
              🎓 New to Digital Estates? Start here
            </div>
            <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight }}>
              1) Create a will with nominee details • 2) Our Sentinel agent monitors DigiLocker 24/7 • 3) After death is confirmed, assets auto-transfer • Click any card to learn more about each system.
            </div>
          </div>
          <button
            onClick={dismissHints}
            style={{
              background: c.info,
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 12px",
              fontSize: "clamp(11px, 2vw, 12px)",
              fontWeight: "600",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Got it ✓
          </button>
        </div>
      )}

      {/* Hero */}
      <section style={{
        padding: "clamp(48px, 10vw, 80px) clamp(16px, 4vw, 32px)",
        maxWidth: "1280px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 8vw, 56px)",
          fontWeight: "800",
          margin: "0 0 clamp(16px, 3vw, 24px)",
          color: c.accentPr,
          lineHeight: "1.1",
          letterSpacing: "-1px",
        }}>
          ⚡ Your Estate. Executed Automatically.
        </h1>
        <p style={{
          fontSize: "clamp(14px, 3vw, 18px)",
          color: c.textLight,
          margin: "0 0 clamp(32px, 6vw, 48px)",
          maxWidth: "700px",
          lineHeight: "1.7",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          Self-executing digital will on Algorand blockchain. No courts. No lawyers. No delays. When death is verified through DigiLocker, your assets are automatically transferred to nominees within minutes.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 25vw, 180px), 1fr))",
          gap: "clamp(12px, 3vw, 20px)",
          marginBottom: "0",
        }}>
          {[
            { label: "Settlement Speed", value: "~3.5s", symbol: "⚡", desc: "After contract execution" },
            { label: "Gas Cost", value: "0.001₳", symbol: "💰", desc: "Per transaction" },
            { label: "Grievance Period", value: "30 days", symbol: "⏳", desc: "Dispute resolution window" },
          ].map((item) => (
            <div key={item.label} style={{
              background: c.surface,
              border: `1.5px solid ${c.border}`,
              padding: "clamp(20px, 4vw, 28px)",
              borderRadius: "14px",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.accentPr;
              e.currentTarget.style.boxShadow = `0 8px 24px ${c.accentPr}20`;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = c.border;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              <div style={{ fontSize: "clamp(28px, 7vw, 36px)", marginBottom: "12px", fontWeight: "bold" }}>{item.symbol}</div>
              <div style={{ fontSize: "clamp(16px, 4vw, 22px)", fontWeight: "700", color: c.text, marginBottom: "6px" }}>
                {item.value}
              </div>
              <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: c.textLight, letterSpacing: "0.5px" }}>{item.label}</div>
              <div style={{ fontSize: "clamp(10px, 2vw, 11px)", color: c.textLight, marginTop: "4px", fontStyle: "italic", opacity: 0.8 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: "clamp(0px, 3vw, 32px) clamp(16px, 4vw, 32px) clamp(48px, 10vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        {/* PRIMARY FEATURES */}
        <div style={{ marginBottom: "clamp(48px, 8vw, 64px)" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "clamp(20px, 4vw, 28px)",
            paddingBottom: "12px",
            borderBottom: `2px solid ${c.accentPr}`,
          }}>
            <span style={{ fontSize: "clamp(18px, 5vw, 24px)" }}>🎯</span>
            <h2 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "700", margin: 0 }}>Essential Features</h2>
            <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, marginLeft: "auto", fontStyle: "italic" }}>Core estate management</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))",
            gap: "clamp(16px, 3vw, 28px)",
          }}>
            {/* Estate Status Card */}
            <Card c={c}>
              <CardHeader icon="📋" title="Estate Status" subtitle="Current blockchain state" />
              <div style={{ marginTop: "24px" }}>
                <StatItem label="Status" value={state.death_confirmed === 1 ? "Confirmed ✓" : "Active ●"} theme={theme} />
                <StatItem label="Locked Amount" value={(state.amount ? ((state.amount as number) / 1_000_000).toFixed(3) : "—") + " ₳"} theme={theme} />
                <StatItem label="Nominee" value={state.nominee ? (state.nominee as string).slice(0, 8) + "…" : "Not assigned"} theme={theme} />
                <StatItem label="Smart Contract" value={state.app_id ? `APP ${state.app_id}` : "Not deployed"} theme={theme} />
              </div>
            </Card>

            {/* Create Will - MAIN FEATURE */}
            <Card c={c}>
              <InteractiveComponent>
                <CardHeader icon="✍️" title="Create Digital Will" subtitle="Set beneficiaries & amounts" />
              </InteractiveComponent>
              {showCreateWill && <CreateWillForm c={c} setWillTime={setWillTime} />}
              {!showCreateWill && (
                <div style={{
                  marginTop: "20px",
                  padding: "clamp(16px, 3vw, 20px)",
                  background: c.accentPr + "15",
                  border: `1px solid ${c.accentPr}40`,
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setShowCreateWill(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.accentPr + "25";
                  e.currentTarget.style.borderColor = c.accentPr;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = c.accentPr + "15";
                  e.currentTarget.style.borderColor = c.accentPr + "40";
                }}>
                  <div style={{ fontSize: "clamp(12px, 3vw, 14px)", color: c.accentPr, fontWeight: "700" }}>
                    ✎ Click to create your will
                  </div>
                </div>
              )}
            </Card>

            {/* Report Death - MAIN FEATURE */}
            <Card c={c}>
              <InteractiveComponent>
                <CardHeader icon="⚡" title="Simulate Death Event" subtitle="Trigger transfer (30s demo)" />
              </InteractiveComponent>
              <ReportDeathForm c={c} willTime={willTime} />
            </Card>
          </div>
        </div>

        {/* EXECUTION TIMELINE - SEPARATE SECTION */}
        <div style={{ marginBottom: "clamp(48px, 8vw, 64px)" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "clamp(20px, 4vw, 28px)",
            paddingBottom: "12px",
            borderBottom: `2px solid ${c.success}`,
          }}>
            <span style={{ fontSize: "clamp(18px, 5vw, 24px)" }}>📊</span>
            <h2 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "700", margin: 0 }}>Execution Timeline</h2>
            <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, marginLeft: "auto", fontStyle: "italic" }}>Real-time progress</span>
          </div>

          <Card c={c} full>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(100px, 22vw, 150px), 1fr))",
              gap: "clamp(20px, 4vw, 28px)",
            }}>
              {[
                { step: "1", title: "Will Registered", status: "completed", desc: "Estate on-chain" },
                { step: "2", title: "Death Verified", status: state.death_confirmed === 1 ? "completed" : "pending", desc: "DigiLocker check" },
                { step: "3", title: "Grievance Period", status: state.death_confirmed === 1 && state.executed !== 1 ? "in-progress" : (state.death_confirmed === 1 ? "completed" : "pending"), desc: "30 days" },
                { step: "4", title: "Auto Transfer", status: state.executed === 1 ? "completed" : "pending", desc: "To nominees" },
              ].map((item) => (
                <div key={item.step} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: item.status === "pending" ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: "clamp(56px, 14vw, 72px)",
                    height: "clamp(56px, 14vw, 72px)",
                    borderRadius: "50%",
                    background: item.status === "completed" ? c.success : item.status === "in-progress" ? c.info : c.bgSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.status !== "pending" ? "#fff" : c.textLight,
                    fontSize: "clamp(20px, 5vw, 28px)",
                    fontWeight: "bold",
                    marginBottom: "clamp(12px, 3vw, 16px)",
                    boxShadow: item.status !== "pending" ? `0 4px 12px ${item.status === "completed" ? c.success : c.info}40` : "none",
                    animation: item.status === "in-progress" ? "pulse 2s infinite" : "none",
                  }}>
                    {item.status === "completed" ? "✓" : item.status === "in-progress" ? "◐" : "○"}
                  </div>
                  <div style={{ fontSize: "clamp(13px, 3vw, 15px)", fontWeight: "700", color: c.text, marginBottom: "4px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, marginBottom: "4px" }}>
                    {item.desc}
                  </div>
                  <div style={{
                    fontSize: "clamp(10px, 2.2vw, 11px)",
                    color: item.status === "completed" ? c.success : item.status === "in-progress" ? c.info : c.textLight,
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* SECONDARY FEATURES - COLLAPSABLE SECTION */}
        <div>
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(20px, 4vw, 28px)",
              paddingBottom: "12px",
              borderBottom: `2px solid ${c.accentSec}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => setExpandedFeature(expandedFeature === "features" ? null : "features")}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <span style={{ fontSize: "clamp(18px, 5vw, 24px)", transform: expandedFeature === "features" ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▶</span>
            <h2 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "700", margin: 0 }}>🔧 Advanced Capabilities</h2>
            <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: c.textLight, marginLeft: "auto", fontStyle: "italic" }}>Click to expand (6 features)</span>
          </div>

          {expandedFeature === "features" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 45vw, 320px), 1fr))",
              gap: "clamp(16px, 3vw, 24px)",
              animation: "slideDown 0.3s ease-out",
            }}>
              {/* Execution Timeline */}
              <FlipCard c={c} icon="🔄" title="Execution Flow" description="4-step process timeline">
                <div style={{ marginTop: "16px" }}>
                  {[
                    { step: "1", title: "📋 Will Registered", desc: "Estate owner creates digital will on-chain" },
                    { step: "2", title: "💀 Death Verified", desc: "Sentinel detects death certificate in DigiLocker" },
                    { step: "3", title: "⏱️ Grievance Period", desc: "30-day window for legal claims & disputes" },
                    { step: "4", title: "💰 Auto Transfer", desc: "Estate agent executes transfers to nominees" },
                  ].map((item) => (
                    <div key={item.step} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "clamp(12px, 2vw, 14px) 0",
                      borderBottom: `1px solid ${c.borderLight}`,
                      fontSize: "clamp(12px, 2.8vw, 13px)",
                    }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: c.accentPr + "20",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "14px",
                        color: c.accentPr,
                        fontWeight: "700",
                      }}>
                        {item.step}
                      </div>
                      <div>
                        <div style={{ color: c.text, fontWeight: "600", marginBottom: "2px" }}>{item.title}</div>
                        <div style={{ color: c.textLight, fontSize: "clamp(10px, 2.3vw, 11px)" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FlipCard>

              {/* Sentinel Agent */}
              <FlipCard c={c} icon="🛡️" title="Sentinel Monitor" description="AI-powered death detection">
                <div style={{ marginTop: "12px", fontSize: "clamp(12px, 2.8vw, 13px)", lineHeight: "1.8", color: c.textLight }}>
                  <div style={{ marginBottom: "14px", fontWeight: "600", color: c.text }}>Real-time monitoring with three key functions:</div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.accentPr}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🔍 Hourly Polling</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Checks DigiLocker every hour for new death certificates</div>
                  </div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.accentPr}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🎯 Smart Detection</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Verifies Aadhaar and cross-references death records</div>
                  </div>
                  <div style={{ paddingLeft: "16px", borderLeft: `2px solid ${c.accentPr}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>⚡ Instant Trigger</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Immediately reports to contract and Estate Agent</div>
                  </div>
                </div>
              </FlipCard>

              {/* Nominee Notifications */}
              <FlipCard c={c} icon="📱" title="Smart Notifications" description="Multi-language alerts system">
                <div style={{ marginTop: "12px", fontSize: "clamp(12px, 2.8vw, 13px)", lineHeight: "1.8", color: c.textLight }}>
                  <div style={{ marginBottom: "12px", fontWeight: "600", color: c.text }}>🌍 Supports 6 Indian Languages:</div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "14px",
                  }}>
                    {["🇮🇳 Hindi", "🇮🇳 English", "🇮🇳 Tamil", "🇮🇳 Telugu", "🇮🇳 Marathi", "🇮🇳 Bengali"].map((lang) => (
                      <div key={lang} style={{
                        padding: "6px 8px",
                        background: c.accentPr + "10",
                        borderRadius: "6px",
                        fontSize: "clamp(10px, 2.3vw, 11px)",
                        fontWeight: "500",
                        color: c.text,
                      }}>
                        {lang}
                      </div>
                    ))}
                  </div>
                  <div style={{ paddingLeft: "16px", borderLeft: `2px solid ${c.accentSec}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>📞 Multi-Channel</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>WhatsApp, SMS via Twilio with transaction details</div>
                  </div>
                </div>
              </FlipCard>

              {/* Vault Security */}
              <FlipCard c={c} icon="🔐" title="Encrypted Vault" description="Military-grade AES-256 security">
                <div style={{ marginTop: "12px", fontSize: "clamp(12px, 2.8vw, 13px)", lineHeight: "1.8", color: c.textLight }}>
                  <div style={{ marginBottom: "14px", fontWeight: "600", color: c.text }}>🛡️ Enterprise-Grade Protection:</div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.danger}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🔑 Key Management</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>256-bit keys, stored securely in .env (never in code)</div>
                  </div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.danger}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>📦 Estate Plans</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Assets, nominee addresses, amounts all encrypted locally</div>
                  </div>
                  <div style={{ paddingLeft: "16px", borderLeft: `2px solid ${c.danger}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>✅ Zero-Knowledge</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Backend only has encrypted blobs, no plaintext data</div>
                  </div>
                </div>
              </FlipCard>

              {/* Aadhaar & DigiLocker */}
              <FlipCard c={c} icon="🆔" title="eKYC Integration" description="Government verification systems">
                <div style={{ marginTop: "12px", fontSize: "clamp(12px, 2.8vw, 13px)", lineHeight: "1.8", color: c.textLight }}>
                  <div style={{ marginBottom: "12px", fontWeight: "600", color: c.text }}>✔️ Trusted Verifications:</div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.success}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🆔 Aadhaar Verification</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Validate owner & nominee identity with UIDAI</div>
                  </div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.success}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>📄 DigiLocker eSign</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Legally-binding digital signatures via government service</div>
                  </div>
                  <div style={{ paddingLeft: "16px", borderLeft: `2px solid ${c.success}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🏥 NDHM Records</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Cross-reference with health ministry records</div>
                  </div>
                </div>
              </FlipCard>

              {/* UPI Settlement */}
              <FlipCard c={c} icon="💵" title="Instant Settlements" description="Direct bank transfers">
                <div style={{ marginTop: "12px", fontSize: "clamp(12px, 2.8vw, 13px)", lineHeight: "1.8", color: c.textLight }}>
                  <div style={{ marginBottom: "12px", fontWeight: "600", color: c.text }}>🚀 Fast Payouts Through:</div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.warning}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>📲 UPI Transfers</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Direct to nominee's bank account within minutes</div>
                  </div>
                  <div style={{ marginBottom: "12px", paddingLeft: "16px", borderLeft: `2px solid ${c.warning}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>🏦 Bank Integration</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>Razorpay payouts API for reliable settlement</div>
                  </div>
                  <div style={{ paddingLeft: "16px", borderLeft: `2px solid ${c.warning}` }}>
                    <div style={{ fontWeight: "600", color: c.text, marginBottom: "4px" }}>📊 Transaction Trail</div>
                    <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)" }}>All settlements recorded on Algorand for audit</div>
                  </div>
                </div>
              </FlipCard>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
