app_tsx = r"""import { useState, useEffect, useRef } from "react";

const API = "http://localhost:8001";
const OWNER = "TN5PRWG2ZWPQRKMMF7WOVHRW4WESQHIU7M3OUAAVJ2CLQJRDMGJOHEF2NQ";
const APP_ID = "758796378";

const DARK = {
  bg: "#090d18", card: "#0f1623", border: "#1a2236",
  green: "#00d4aa", red: "#ff5555", blue: "#4f8ef7",
  amber: "#f5a623", text: "#f0f4ff", muted: "#5a6a8a",
  sub: "#8896b0", surface: "#0a0f1e", toggle: "#1a2236",
};
const LIGHT = {
  bg: "#f4f7fb", card: "#ffffff", border: "#dde3f0",
  green: "#009e80", red: "#e53935", blue: "#2563eb",
  amber: "#d97706", text: "#0f1623", muted: "#6b7280",
  sub: "#4b5563", surface: "#eef1f8", toggle: "#e2e8f0",
};

type Theme = typeof DARK;

function useTheme() {
  const [dark, setDark] = useState(true);
  return { t: dark ? DARK : LIGHT, dark, toggle: () => setDark(d => !d) };
}

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return { copy, copied };
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

function Nav({ t, dark, toggle }: { t: Theme; dark: boolean; toggle: () => void }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${t.border}`, background: t.card, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: t.green, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={dark ? "#090d18" : "#fff"}><path d="M12 2L4 20h3l5-10 5 10h3z"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>Digital Will</div>
          <div style={{ fontSize: 10, color: t.muted, letterSpacing: "0.4px" }}>ALGORAND TESTNET</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, background: `${t.green}18`, color: t.green, border: `1px solid ${t.green}35`, padding: "3px 10px", borderRadius: 20, display: "none" }} className="desktop-badge">
          APP_ID {APP_ID}
        </span>
        <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${t.border}`, background: t.toggle, color: t.sub, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}

function Hero({ t }: { t: Theme }) {
  return (
    <div style={{ padding: "40px 24px 32px", textAlign: "center", borderBottom: `1px solid ${t.border}` }}>
      <div style={{ display: "inline-block", fontSize: 11, background: `${t.green}15`, color: t.green, border: `1px solid ${t.green}30`, padding: "4px 14px", borderRadius: 20, marginBottom: 14, letterSpacing: "0.5px", fontWeight: 600 }}>
        ALGOBHARAT HACK SERIES 3 · PROBLEM 01
      </div>
      <h1 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 12, color: t.text }}>
        Your estate.<br />
        <span style={{ color: t.green }}>Executed automatically.</span>
      </h1>
      <p style={{ fontSize: 14, color: t.muted, maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.7 }}>
        Self-executing digital will on Algorand. No courts. No lawyers. No waiting.
        Assets reach nominees within seconds of a verified death event.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,4vw,40px)", flexWrap: "wrap" }}>
        {[["~3.5s", "Settlement"], ["₹0", "Lawyer fees"], ["30 days", "Grievance window"], ["AES-256", "Vault encryption"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(16px,3vw,22px)", fontWeight: 800, color: t.green }}>{v}</div>
            <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pulse({ t }: { t: Theme }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: t.green }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.green, display: "inline-block", animation: "pulse 2s infinite" }} />
      Live
    </span>
  );
}

function TxDisplay({ txId, t }: { txId: string; t: Theme }) {
  const { copy, copied } = useCopy(txId);
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 12, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: t.muted }}>Transaction ID</span>
        <button onClick={copy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? t.green : t.muted, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
          <CopyIcon />{copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <a href={`https://lora.algokit.io/testnet/transaction/${txId}`} target="_blank" rel="noreferrer"
        style={{ fontSize: 11, color: t.green, fontFamily: "monospace", wordBreak: "break-all", textDecoration: "none", lineHeight: 1.5 }}>
        {txId}
      </a>
    </div>
  );
}

function StatusCard({ t }: { t: Theme }) {
  const [state, setState] = useState<Record<string, unknown>>({});
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const load = () => fetch(`${API}/status`).then(r => r.json()).then(setState).catch(() => {});
    load();
    const t1 = setInterval(load, 4000);
    const t2 = setInterval(() => setTick(x => x + 1), 1000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);
  const confirmed = state.death_confirmed === 1;
  const executed = state.executed === true;
  const nominee = (state.nominee as string) || "";
  const amount = state.amount ? ((state.amount as number) / 1_000_000).toFixed(3) + " ALGO" : "—";
  const execTx = (state.execution_tx as string) || "";
  const rows = [
    ["Contract", `APP_ID ${APP_ID}`],
    ["Network", "Algorand Testnet"],
    ["Nominee", nominee ? nominee.slice(0, 8) + "…" + nominee.slice(-6) : "—"],
    ["Amount", amount],
    ["Grievance", "30s demo · 30d prod"],
  ];
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Estate Status</div>
          <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Refreshes every 4s</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <Pulse t={t} />
          <span style={{ fontSize: 11, background: executed ? `${t.green}18` : confirmed ? `${t.amber}18` : `${t.green}18`, color: executed ? t.green : confirmed ? t.amber : t.green, border: `1px solid ${executed ? t.green : confirmed ? t.amber : t.green}30`, padding: "2px 10px", borderRadius: 20 }}>
            {executed ? "Executed" : confirmed ? "Grievance window" : "Active"}
          </span>
        </div>
      </div>
      {rows.map(([l, v]) => (
        <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${t.border}` }}>
          <span style={{ fontSize: 13, color: t.muted }}>{l}</span>
          <span style={{ fontSize: 13, fontFamily: "monospace", color: t.text, fontWeight: 500 }}>{v}</span>
        </div>
      ))}
      {execTx && <TxDisplay txId={execTx} t={t} />}
    </div>
  );
}

function Timeline({ t }: { t: Theme }) {
  const [state, setState] = useState<Record<string, unknown>>({});
  useEffect(() => {
    fetch(`${API}/status`).then(r => r.json()).then(setState).catch(() => {});
    const id = setInterval(() => fetch(`${API}/status`).then(r => r.json()).then(setState).catch(() => {}), 4000);
    return () => clearInterval(id);
  }, []);
  const confirmed = state.death_confirmed === 1;
  const executed = state.executed === true;
  const steps = [
    { label: "Will registered", sub: "Nominee + amount encrypted in AES-256 vault", done: !!(state.nominee) },
    { label: "Death detected", sub: "DigiLocker CRS API · Aadhaar-linked", done: confirmed },
    { label: "Grievance window", sub: "30 days · family can contest", active: confirmed && !executed },
    { label: "Transfer executed", sub: "ALGO lands in nominee wallet on-chain", done: executed },
  ];
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 22 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4 }}>Execution Flow</div>
      <div style={{ fontSize: 12, color: t.muted, marginBottom: 20 }}>End-to-end process</div>
      {steps.map((st, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < steps.length - 1 ? 20 : 0, position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", marginTop: 3, background: st.done ? t.green : st.active ? t.blue : t.border, boxShadow: st.active ? `0 0 0 4px ${t.blue}25` : "none", transition: "all 0.4s" }} />
            {i < steps.length - 1 && <div style={{ width: 1, flex: 1, background: t.border, marginTop: 4 }} />}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 4 : 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: st.done || st.active ? t.text : t.muted, marginBottom: 2 }}>{st.label}</div>
            <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.5 }}>{st.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Countdown({ seconds, t }: { seconds: number; t: Theme }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
    const id = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const pct = ((seconds - left) / seconds) * 100;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.muted, marginBottom: 6 }}>
        <span>Grievance window</span>
        <span style={{ color: t.amber, fontWeight: 600 }}>{left}s remaining</span>
      </div>
      <div style={{ height: 4, background: t.border, borderRadius: 4 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: t.green, borderRadius: 4, transition: "width 1s linear" }} />
      </div>
    </div>
  );
}

function CreateWill({ t }: { t: Theme }) {
  const [nominee, setNominee] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const inp: React.CSSProperties = { width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit", marginTop: 6, transition: "border 0.2s" };
  const submit = async () => {
    setLoading(true); setStatus("Registering will on-chain…");
    try {
      const r = await fetch(`${API}/create-will`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ owner_address: OWNER, nominee_address: nominee, amount_algo: parseFloat(amount) }) });
      const d = await r.json();
      setStatus("Will created successfully.");
      setDone(true);
    } catch (e: any) { setStatus("Error: " + e.message); }
    setLoading(false);
  };
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.green}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.green} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Create Digital Will</div>
          <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Register your estate on-chain</div>
        </div>
      </div>
      {done ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${t.green}15`, border: `2px solid ${t.green}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.green} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.green, marginBottom: 4 }}>Will registered</div>
          <div style={{ fontSize: 12, color: t.muted }}>Nominee and amount stored securely</div>
          <button onClick={() => { setDone(false); setNominee(""); setAmount(""); setStatus(""); }} style={{ marginTop: 14, padding: "8px 20px", borderRadius: 8, background: "none", border: `1px solid ${t.border}`, color: t.muted, fontSize: 12, cursor: "pointer" }}>Register another</button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>Nominee Algorand address</label>
            <input style={inp} value={nominee} onChange={e => setNominee(e.target.value)} placeholder="Paste nominee wallet address…" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>ALGO amount to transfer</label>
            <input style={inp} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 2.5" />
          </div>
          <button onClick={submit} disabled={loading || !nominee || !amount}
            style={{ width: "100%", padding: "11px 0", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", background: loading || !nominee || !amount ? t.border : t.green, color: loading || !nominee || !amount ? t.muted : "#090d18", transition: "all 0.2s" }}>
            {loading ? "Submitting…" : "Create will on Algorand"}
          </button>
          {status && <p style={{ fontSize: 12, color: t.green, marginTop: 10 }}>{status}</p>}
        </>
      )}
    </div>
  );
}

function TriggerDeath({ t }: { t: Theme }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState("");
  const [countdown, setCountdown] = useState(0);
  const trigger = async () => {
    setLoading(true); setStatus("Sending death event on-chain…");
    try {
      const r = await fetch(`${API}/report-death`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ owner_address: OWNER }) });
      const d = await r.json();
      if (d.error) { setStatus("Error: " + d.error); setLoading(false); return; }
      setTxId(d.tx_id);
      setCountdown(d.grievance_seconds);
      setStatus(`Death confirmed on-chain. Will executes in ${d.grievance_seconds}s.`);
    } catch (e: any) { setStatus("Error: " + e.message); }
    setLoading(false);
  };
  return (
    <div style={{ background: t.card, border: `1px solid ${t.red}40`, borderRadius: 16, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.red}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.red} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Death Certificate</div>
          <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>DigiLocker CRS API in production</div>
        </div>
      </div>
      <div style={{ background: `${t.amber}10`, border: `1px solid ${t.amber}25`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: t.amber, lineHeight: 1.6, margin: 0 }}>
          In production, the Sentinel Agent polls India's Civil Registration System hourly via DigiLocker Pull Partner API with Aadhaar eKYC. This button simulates that trigger for the demo.
        </p>
      </div>
      <button onClick={trigger} disabled={loading || !!txId}
        style={{ width: "100%", padding: "11px 0", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading || !!txId ? "not-allowed" : "pointer", background: txId ? `${t.green}15` : `${t.red}20`, color: txId ? t.green : t.red, border: `1px solid ${txId ? t.green : t.red}40`, transition: "all 0.2s" }}>
        {loading ? "Processing…" : txId ? "Death event triggered" : "Trigger death event"}
      </button>
      {status && <p style={{ fontSize: 12, color: txId ? t.green : t.muted, marginTop: 10 }}>{status}</p>}
      {countdown > 0 && !status.includes("Error") && <Countdown seconds={countdown} t={t} />}
      {txId && <TxDisplay txId={txId} t={t} />}
    </div>
  );
}

export default function App() {
  const { t, dark, toggle } = useTheme();
  return (
    <div style={{ background: t.bg, minHeight: "100vh", color: t.text, fontFamily: "'Segoe UI',system-ui,sans-serif", transition: "background 0.3s,color 0.3s" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} * { box-sizing: border-box; } input::placeholder{color:${t.muted}}`}</style>
      <Nav t={t} dark={dark} toggle={toggle} />
      <Hero t={t} />
      <div style={{ padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, maxWidth: 920, margin: "0 auto" }}>
        <StatusCard t={t} />
        <Timeline t={t} />
        <CreateWill t={t} />
        <TriggerDeath t={t} />
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px", borderTop: `1px solid ${t.border}`, color: t.muted, fontSize: 12 }}>
        Built on <span style={{ color: t.green, fontWeight: 700 }}>Algorand</span> · AlgoBharat Hack Series 3 ·{" "}
        <a href={`https://lora.algokit.io/testnet/application/${APP_ID}`} target="_blank" rel="noreferrer" style={{ color: t.green, textDecoration: "none" }}>View contract</a>
      </div>
    </div>
  );
}
"""

with open("frontend/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_tsx)
print("Done — refresh http://localhost:5173")