const GOAL_EMOJI = {
  "Weight Loss": "📉",
  "Weight Gain": "📈",
  "Muscle Building": "💪",
  "Maintenance": "⚖️",
};

const MACRO_BAR = [
  { key: "protein", label: "Protein", color: "#2ECC8A", max: 60 },
  { key: "carbs",   label: "Carbs",   color: "#3beaf6", max: 120 },
  { key: "fats",    label: "Fats",    color: "#60A5FA", max: 50 },
];

export default function MealCards({ meals, goal }) {
  const emoji = GOAL_EMOJI[goal] || "🍽️";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(245,166,35,0.3), transparent)" }} />
        <div style={{ fontSize: 11, color: "#3beaf6", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>
          {emoji} Recommended Meals · {goal}
        </div>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.3))" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {meals.map((meal, i) => (
          <div key={i} className="meal-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E8EAF0", lineHeight: 1.4, flex: 1, marginRight: 8 }}>{meal.name}</div>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#3beaf6", lineHeight: 1 }}>{meal.calories}</div>
                <div style={{ fontSize: 9, color: "rgba(232,234,240,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>kcal</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {MACRO_BAR.map(m => (
                <div key={m.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "rgba(232,234,240,0.4)" }}>{m.label}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: m.color }}>{meal[m.key]}g</span>
                  </div>
                  <div className="bar-track" style={{ height: 5 }}>
                    <div className="bar-fill" style={{ width: `${Math.min(100, (meal[m.key] / m.max) * 100)}%`, background: m.color }} />
                  </div>
                </div>
              ))}
            </div>

            {meal.fibre > 0 && (
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: "rgba(232,234,240,0.35)" }}>Fibre</span>
                <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "rgba(232,234,240,0.45)" }}>{meal.fibre}g</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
