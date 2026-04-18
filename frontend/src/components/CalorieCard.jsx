const CLUSTER_LABELS = {
  0: "Lean & Active",
  1: "Average Build",
  2: "High Energy",
  3: "Endurance",
};

const CLUSTER_COLORS = {
  0: "#2ECC8A",
  1: "#3beaf6",
  2: "#EF4444",
  3: "#A78BFA",
};

export default function CalorieCard({ calories, cluster, profile }) {
  const color = CLUSTER_COLORS[cluster] ?? "#3beaf6";
  const label = CLUSTER_LABELS[cluster] ?? `Cluster ${cluster}`;

  const macros = [
    { name: "Protein", g: Math.round(calories * 0.30 / 4), pct: 30, color: "#2ECC8A" },
    { name: "Carbs",   g: Math.round(calories * 0.45 / 4), pct: 45, color: "#3beaf6" },
    { name: "Fats",    g: Math.round(calories * 0.25 / 9), pct: 25, color: "#60A5FA" },
  ];

  return (
    <div className="stat-card" style={{ padding: 24, height: "100%" }}>
      <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
        🔥 Calorie Target{" "}
        <span style={{ color: "rgba(245,166,35,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>Ridge</span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 6 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "##3beaf6", lineHeight: 1 }}>
          {calories.toLocaleString()}
        </span>
        <span style={{ fontSize: 13, color: "rgba(232,234,240,0.45)", marginBottom: 8 }}>kcal/day</span>
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: `${color}18`, border: `1px solid ${color}35`, marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>Cluster {cluster} — {label}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {macros.map(m => (
          <div key={m.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: "rgba(232,234,240,0.55)" }}>{m.name}</span>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: m.color }}>{m.g}g · {m.pct}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${m.pct * 2}%`, background: `linear-gradient(90deg,${m.color}66,${m.color})` }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(232,234,240,0.35)", marginBottom: 3 }}>Cluster avg cal</div>
          <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "rgba(232,234,240,0.7)" }}>{profile.avg_cal.toLocaleString()} kcal</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "rgba(232,234,240,0.35)", marginBottom: 3 }}>Cluster avg protein</div>
          <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "rgba(232,234,240,0.7)" }}>{profile.avg_protein}g</div>
        </div>
      </div>
    </div>
  );
}
