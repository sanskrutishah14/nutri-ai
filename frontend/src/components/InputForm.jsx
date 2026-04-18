import { useState } from "react";

const FIELDS = [
  { key: "age", label: "Age", unit: "years", min: 10, max: 90, placeholder: "e.g. 28", icon: "🧑" },
  { key: "height", label: "Height", unit: "cm", min: 100, max: 230, placeholder: "e.g. 172", icon: "📏" },
  { key: "weight", label: "Weight", unit: "kg", min: 30, max: 200, placeholder: "e.g. 68", icon: "⚖️" },
];

export default function InputForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    exercise_frequency: 3,
    sleep_hours: 7,
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      age: parseFloat(form.age),
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      exercise_frequency: parseFloat(form.exercise_frequency),
      sleep_hours: parseFloat(form.sleep_hours),
    });
  };

  const valid = form.age && form.height && form.weight;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640, margin: "0 auto" }}>
      <div className="card" style={{ padding: "32px 36px" }}>

        {/* STEP 1 */}
        <div
          style={{
            marginBottom: 28,
            borderBottom: "1px solid rgba(59,234,246,0.15)",
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#3beaf6",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Step 1 — Body Metrics
          </div>

          <div style={{ color: "#A78BFA", fontSize: 13 }}>
            Enter your measurements for ML-powered analysis
          </div>
        </div>

        {/* INPUTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#A78BFA",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {f.icon} {f.label}
              </label>

              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type="number"
                  name={f.key}
                  value={form[f.key]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  min={f.min}
                  max={f.max}
                  required
                  style={{ padding: "11px 44px 11px 14px", fontSize: 15 }}
                />

                <span
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 11,
                    color: "#3beaf6",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {f.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* STEP 2 */}
        <div
          style={{
            marginBottom: 24,
            borderTop: "1px solid rgba(59,234,246,0.15)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#3beaf6",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Step 2 — Lifestyle
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {/* EXERCISE */}
            <div>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#A78BFA",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                <span>🏃 Exercise</span>
                <span
                  style={{
                    color: "#3beaf6",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {form.exercise_frequency}×/week
                </span>
              </label>

              <input
                type="range"
                name="exercise_frequency"
                min={0}
                max={7}
                step={1}
                value={form.exercise_frequency}
                onChange={handleChange}
                style={{
                  width: "100%",
                  accentColor: "#3beaf6",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "#6D28D9",
                  marginTop: 4,
                }}
              >
                <span>Sedentary</span>
                <span>Daily</span>
              </div>
            </div>

            {/* SLEEP */}
            <div>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#A78BFA",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                <span>😴 Sleep</span>
                <span
                  style={{
                    color: "#3beaf6",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {form.sleep_hours}h
                </span>
              </label>

              <input
                type="range"
                name="sleep_hours"
                min={4}
                max={10}
                step={0.5}
                value={form.sleep_hours}
                onChange={handleChange}
                style={{
                  width: "100%",
                  accentColor: "#3beaf6",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "#6D28D9",
                  marginTop: 4,
                }}
              >
                <span>4h</span>
                <span>10h</span>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !valid}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Analyzing with ML models…
            </>
          ) : (
            "Generate My Nutrition Plan →"
          )}
        </button>
      </div>
    </form>
  );
}