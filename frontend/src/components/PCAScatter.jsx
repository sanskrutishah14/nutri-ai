import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

const CLUSTER_COLORS = { 0: "#2ECC8A", 1: "#3beaf6", 2: "#EF4444", 3: "#A78BFA" };
const CLUSTER_LABELS = { 0: "Lean & Active", 1: "Average Build", 2: "High Energy", 3: "Endurance" };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (d.isUser) {
    return (
      <div style={{ background: "#0D1117", border: "1px solid #2ECC8A", borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#2ECC8A" }}>You</div>
        <div style={{ fontSize: 11, color: "rgba(232,234,240,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>PC1: {d.x?.toFixed(2)} · PC2: {d.y?.toFixed(2)}</div>
      </div>
    );
  }
  return (
    <div style={{ background: "#0D1117", border: `1px solid ${CLUSTER_COLORS[d.cluster]}55`, borderRadius: 8, padding: "8px 12px" }}>
      <div style={{ fontSize: 11, color: CLUSTER_COLORS[d.cluster] }}>{CLUSTER_LABELS[d.cluster]}</div>
    </div>
  );
};

export default function PCAScatter({ scatter, userPoint, userCluster }) {
  const grouped = [0, 1, 2, 3].map(c => ({
    cluster: c,
    color: CLUSTER_COLORS[c],
    label: CLUSTER_LABELS[c],
    data: scatter.filter(p => p.Cluster === c).map(p => ({ x: p.pca_x, y: p.pca_y, cluster: c })),
  }));

  const userData = [{ x: userPoint.x, y: userPoint.y, cluster: userCluster, isUser: true }];

  return (
    <div className="card" style={{ padding: 24, height: "100%" }}>
      <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>🔬 PCA Cluster Map</div>
      <div style={{ fontSize: 12, color: "rgba(232,234,240,0.35)", marginBottom: 16 }}>KMeans clusters visualised via PCA — your position highlighted</div>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 0, right: 10, bottom: 0, left: -20 }}>
            <XAxis dataKey="x" name="PC1" tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "PC1", position: "insideBottomRight", offset: -5, fill: "rgba(232,234,240,0.25)", fontSize: 10 }} />
            <YAxis dataKey="y" name="PC2" tick={{ fill: "rgba(232,234,240,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "PC2", angle: -90, position: "insideLeft", fill: "rgba(232,234,240,0.25)", fontSize: 10 }} />
            <ZAxis range={[12, 12]} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            {grouped.map(g => (
              <Scatter key={g.cluster} name={g.label} data={g.data} fill={g.color} fillOpacity={0.45} />
            ))}
            <Scatter name="You" data={userData} fill="#FFFFFF" shape={(props) => {
              const { cx, cy } = props;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={10} fill="none" stroke="#2ECC8A" strokeWidth={2} />
                  <circle cx={cx} cy={cy} r={5} fill="#2ECC8A" />
                </g>
              );
            }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
        {grouped.map(g => (
          <div key={g.cluster} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, opacity: 0.7 }} />
            <span style={{ fontSize: 10, color: "rgba(232,234,240,0.45)" }}>{g.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ECC8A", border: "1.5px solid #2ECC8A" }} />
          <span style={{ fontSize: 10, color: "#2ECC8A" }}>You</span>
        </div>
      </div>
    </div>
  );
}
