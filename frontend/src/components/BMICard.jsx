const RANGES = [
  { label: "Underweight", min: 0, max: 18.5, color: "#60A5FA" },
  { label: "Normal", min: 18.5, max: 25, color: "#2ECC8A" },
  { label: "Overweight", min: 25, max: 30, color: "#23f5f5" },
  { label: "Obese", min: 30, max: 45, color: "#EF4444" },
];

export default function BMICard({ bmi, category }) {
  const current = RANGES.find(r => r.label === category) || RANGES[1];
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 35) * 100));

  return (
    <div className="stat-card" style={{ padding: 24, height: "100%" }}>
      <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>📊 BMI Analysis</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 20 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: current.color, lineHeight: 1 }}>{bmi}</span>
        <span style={{ fontSize: 13, color: "rgba(232,234,240,0.45)", marginBottom: 8 }}>kg/m²</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: current.color }}>{category}</span>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "rgba(232,234,240,0.4)" }}>10 — 45</span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${current.color}88, ${current.color})` }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {RANGES.map(r => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.label === category ? r.color : "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 11, color: r.label === category ? r.color : "rgba(232,234,240,0.35)" }}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
