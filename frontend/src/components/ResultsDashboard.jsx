import BMICard from "./BMICard";
import GoalCard from "./GoalCard";
import CalorieCard from "./CalorieCard";
import MacrosChart from "./MacrosChart";
import PCAScatter from "./PCAScatter";
import MealCards from "./MealCards";

export default function ResultsDashboard({ result }) {
  return (
    <div style={{ marginTop: 52 }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 11, color: "#2ECC8A", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 8 }}>✓ Analysis Complete</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#E8EAF0", margin: 0 }}>Your Results</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <div className="fade-up delay-1"><BMICard bmi={result.bmi} category={result.bmi_category} /></div>
        <div className="fade-up delay-2"><GoalCard goal={result.predicted_goal} confidence={result.goal_confidence} probabilities={result.goal_probabilities} /></div>
        <div className="fade-up delay-3"><CalorieCard calories={result.predicted_calories} cluster={result.cluster_id} profile={result.cluster_profile} /></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="fade-up delay-4"><MacrosChart macros={result.macros} calories={result.predicted_calories} /></div>
        <div className="fade-up delay-4"><PCAScatter scatter={result.pca_scatter} userPoint={result.user_pca} userCluster={result.cluster_id} /></div>
      </div>

      <div className="fade-up delay-5">
        <MealCards meals={result.recommended_meals} goal={result.predicted_goal} />
      </div>
    </div>
  );
}
