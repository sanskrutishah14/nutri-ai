import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#2ECC8A", "#3beaf6", "#60A5FA"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0D1117", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 8, padding: "10px 14px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#E8EAF0", marginBottom: 2 }}>{d.name}</div>
      <div style={{ fontSize: 12, color: "##3beaf6", fontFamily: "'JetBrains Mono', monospace" }}>{d.value}g · {d.pct}%</div>
    </div>
  );
};

export default function MacrosChart({ macros, calories }) {
  const pie = [
    { name: "Protein", value: macros.protein, pct: 30 },
    { name: "Carbs",   value: macros.carbs,   pct: 45 },
    { name: "Fats",    value: macros.fats,     pct: 25 },
  ];

  const radar = [
    { subject: "Protein",  A: macros.protein },
    { subject: "Carbs",    A: macros.carbs },
    { subject: "Fats",     A: macros.fats },
    { subject: "Fibre",    A: Math.round(calories / 100) },
    { subject: "Hydration",A: Math.round(calories / 80) },
  ];

  return (
    <div className="card" style={{ padding: 24, height: "100%" }}>
      <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>📐 Macro Distribution</div>
      <div style={{ fontSize: 12, color: "rgba(232,234,240,0.35)", marginBottom: 20 }}>Daily nutrient breakdown from ML prediction</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "center" }}>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                {pie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(232,234,240,0.45)", fontSize: 10 }} />
              <Radar name="Macros" dataKey="A" stroke="#3beaf6" fill="#3beaf6" fillOpacity={0.18} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 8 }}>
        {pie.map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i] }} />
            <span style={{ fontSize: 11, color: "rgba(232,234,240,0.55)" }}>{d.name}</span>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: COLORS[i] }}>{d.value}g</span>
          </div>
        ))}
      </div>
    </div>
  );
}
