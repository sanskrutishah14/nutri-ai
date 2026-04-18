import { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import ResultsDashboard from "./components/ResultsDashboard";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendOk, setBackendOk] = useState(null);

  useEffect(() => {
    fetch(`${API}/health`)
      .then(r => r.ok ? setBackendOk(true) : setBackendOk(false))
      .catch(() => setBackendOk(false));
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="orb" style={{ width: 500, height: 500, top: -150, left: -150, background: "rgba(245,166,35,0.07)" }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: -100, right: -100, background: "rgba(46,204,138,0.05)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <header style={{ borderBottom: "1px solid rgba(245,166,35,0.12)", padding: "20px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#F5A623,#CC7D00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🥗</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#3beaf6" }}>NutriAI</div>
              <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>ML-Powered Nutrition Engine</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {["KMeans", "PCA", "Ridge", "LogReg"].map(tag => (
                <span key={tag} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 999, background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", color: "#3beaf6", fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
              ))}
              <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: `1px solid ${backendOk === null ? "rgba(255,255,255,0.15)" : backendOk ? "rgba(46,204,138,0.4)" : "rgba(239,68,68,0.4)"}`, color: backendOk === null ? "rgba(232,234,240,0.4)" : backendOk ? "#2ECC8A" : "#FCA5A5", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: backendOk === null ? "rgba(255,255,255,0.2)" : backendOk ? "#2ECC8A" : "#EF4444", display: "inline-block" }} />
                {backendOk === null ? "Connecting…" : backendOk ? "Backend live" : "Backend offline"}
              </span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 16, color: "#E8EAF0" }}>
              Your Personalized<br />
              <span style={{ color: "#3beaf6" }}>Nutrition Blueprint</span>
            </h1>
            <p style={{ color: "rgba(232,234,240,0.5)", fontSize: 16, maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
              Machine learning trained on 5,000+ patient records and 1,000+ Indian dishes to craft your ideal meal plan.
            </p>
          </div>

          {backendOk === false && (
            <div style={{ maxWidth: 640, margin: "0 auto 28px", padding: "16px 20px", borderRadius: 12, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <div style={{ fontWeight: 600, color: "#FCA5A5", marginBottom: 8 }}>⚠️ Backend not responding</div>
              <div style={{ fontSize: 13, color: "rgba(232,234,240,0.55)", lineHeight: 1.7 }}>
                Make sure FastAPI is running on port 8000.<br />
                In your <code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>backend/</code> folder run:<br />
                <code style={{ display: "block", marginTop: 8, padding: "8px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 6, color: "#F5A623", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                  pip install -r requirements.txt<br />
                  uvicorn main:app --reload
                </code>
              </div>
            </div>
          )}

          <InputForm onSubmit={handleSubmit} loading={loading} backendOk={backendOk} />

          {error && (
            <div style={{ maxWidth: 640, margin: "20px auto 0", padding: "14px 20px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-word" }}>
              {error}
            </div>
          )}

          {result && <ResultsDashboard result={result} />}
        </main>
      </div>
    </div>
  );
}
