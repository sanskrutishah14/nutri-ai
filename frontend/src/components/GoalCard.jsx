const GOAL_META = {
  "Weight Loss": { icon: "📉", color: "#60A5FA", desc: "Caloric deficit with high protein" },
  "Weight Gain": { icon: "📈", color: "#3beaf6", desc: "Caloric surplus with lean protein" },
  "Muscle Building": { icon: "💪", color: "#2ECC8A", desc: "Protein-rich, moderate carbs" },
  "Maintenance": { icon: "⚖️", color: "#A78BFA", desc: "Balanced macronutrient split" },
};

export default function GoalCard({ goal, confidence, probabilities }) {
  const meta = GOAL_META[goal] || { icon: "🎯", color: "#3beaf6", desc: "" };
  const entries = Object.entries(probabilities || {}).sort((a,b) => b[1]-a[1]);

  return (
    <div className="stat-card" style={{ padding: 24, height: "100%" }}>
      <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>🎯 Predicted Goal <span style={{ color: "rgba(245,166,35,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>LogReg</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${meta.color}18`, border: `1px solid ${meta.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{meta.icon}</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: meta.color }}>{goal}</div>
          <div style={{ fontSize: 12, color: "rgba(232,234,240,0.45)", marginTop: 2 }}>{meta.desc}</div>
        </div>
      </div>

      <div style={{ marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "rgba(232,234,240,0.45)" }}>Confidence</span>
        <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: meta.color }}>{confidence}%</span>
      </div>
      <div className="bar-track" style={{ marginBottom: 18 }}>
        <div className="bar-fill" style={{ width: `${confidence}%`, background: `linear-gradient(90deg, ${meta.color}77, ${meta.color})` }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {entries.map(([g, p]) => {
          const m = GOAL_META[g] || { color: "#888" };
          return (
            <div key={g} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 68, fontSize: 10, color: "rgba(232,234,240,0.45)", flexShrink: 0, textAlign: "right" }}>{g.split(" ")[0]}</div>
              <div className="bar-track" style={{ flex: 1 }}>
                <div className="bar-fill" style={{ width: `${p}%`, background: m.color + "88" }} />
              </div>
              <div style={{ width: 38, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: m.color, textAlign: "right" }}>{p}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
