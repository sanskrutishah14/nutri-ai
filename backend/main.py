import pandas as pd
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings("ignore")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

bmi_df = pd.read_csv("data/Body_Measurements___original_CSV.csv")
food_df = pd.read_csv("data/Indian_Food_Nutrition_Processed.csv")
diet_df = pd.read_csv("data/Personalized_Diet_Recommendations.csv")

bmi_df.columns = bmi_df.columns.str.strip()
food_df.columns = food_df.columns.str.strip()
diet_df.columns = diet_df.columns.str.strip()

food_df = food_df.dropna(subset=["Calories (kcal)", "Protein (g)", "Carbohydrates (g)", "Fats (g)"])
food_df = food_df[food_df["Calories (kcal)"] > 0].reset_index(drop=True)

diet_df = diet_df.dropna(subset=["Age", "Height_cm", "Weight_kg", "Recommended_Calories", "Recommended_Meal_Plan"])
diet_df["BMI"] = diet_df["Weight_kg"] / ((diet_df["Height_cm"] / 100) ** 2)

def assign_goal(row):
    bmi = row["BMI"]
    cal = row["Recommended_Calories"]
    actual = row["Caloric_Intake"]
    if bmi < 18.5:
        return "Weight Gain"
    elif bmi > 27:
        return "Weight Loss"
    elif cal > actual:
        return "Muscle Building"
    else:
        return "Maintenance"

diet_df["Goal"] = diet_df.apply(assign_goal, axis=1)

features_cls = ["Age", "Height_cm", "Weight_kg", "Exercise_Frequency", "Sleep_Hours", "Caloric_Intake", "Protein_Intake", "Carbohydrate_Intake", "Fat_Intake"]
features_reg = ["Age", "Height_cm", "Weight_kg", "Exercise_Frequency", "Sleep_Hours", "Caloric_Intake", "Protein_Intake"]

X_cls = diet_df[features_cls].fillna(diet_df[features_cls].median())
y_cls = diet_df["Goal"]
X_reg = diet_df[features_reg].fillna(diet_df[features_reg].median())
y_reg = diet_df["Recommended_Calories"]

le = LabelEncoder()
y_cls_enc = le.fit_transform(y_cls)

scaler_cls = StandardScaler()
X_cls_scaled = scaler_cls.fit_transform(X_cls)

pca = PCA(n_components=5)
X_pca = pca.fit_transform(X_cls_scaled)

log_reg = LogisticRegression(max_iter=1000, C=0.5)
log_reg.fit(X_pca, y_cls_enc)

scaler_reg = StandardScaler()
X_reg_scaled = scaler_reg.fit_transform(X_reg)

ridge = Ridge(alpha=10.0)
ridge.fit(X_reg_scaled, y_reg)

km_features = ["Height_cm", "Weight_kg", "BMI", "Exercise_Frequency", "Recommended_Calories"]
km_data = diet_df[km_features].fillna(diet_df[km_features].median())
scaler_km = StandardScaler()
km_scaled = scaler_km.fit_transform(km_data)
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
kmeans.fit(km_scaled)
diet_df["Cluster"] = kmeans.labels_

cluster_profiles = diet_df.groupby("Cluster").agg(
    avg_cal=("Recommended_Calories", "mean"),
    avg_protein=("Recommended_Protein", "mean"),
    avg_carbs=("Recommended_Carbs", "mean"),
    avg_fats=("Recommended_Fats", "mean"),
).reset_index()

pca_2d = PCA(n_components=2)
pca_2d.fit(km_scaled)
cluster_coords = pca_2d.transform(km_scaled)
diet_df["pca_x"] = cluster_coords[:, 0]
diet_df["pca_y"] = cluster_coords[:, 1]

class UserInput(BaseModel):
    age: float
    height: float
    weight: float
    exercise_frequency: float = 3
    sleep_hours: float = 7

def recommend_meals(goal: str, target_cal: float, n: int = 5):
    goal_map = {
        "Weight Loss": {"max_cal": 300, "min_protein": 10},
        "Weight Gain": {"min_cal": 350, "min_protein": 15},
        "Muscle Building": {"min_protein": 18, "max_cal": 500},
        "Maintenance": {"min_cal": 200, "max_cal": 500},
    }
    cfg = goal_map.get(goal, {"min_cal": 200, "max_cal": 500})
    filtered = food_df.copy()
    if "max_cal" in cfg:
        filtered = filtered[filtered["Calories (kcal)"] <= cfg["max_cal"]]
    if "min_cal" in cfg:
        filtered = filtered[filtered["Calories (kcal)"] >= cfg["min_cal"]]
    if "min_protein" in cfg:
        filtered = filtered[filtered["Protein (g)"] >= cfg["min_protein"]]
    if len(filtered) < n:
        filtered = food_df.copy()
    meal_cal = target_cal / 3
    filtered["score"] = (
        -np.abs(filtered["Calories (kcal)"] - meal_cal) / (meal_cal + 1)
        + filtered["Protein (g)"] / (filtered["Protein (g)"].max() + 1)
        - filtered["Fats (g)"] / (filtered["Fats (g)"].max() + 1) * 0.3
    )
    top = filtered.nlargest(n, "score")
    meals = []
    for _, row in top.iterrows():
        meals.append({
            "name": row["Dish Name"],
            "calories": round(row["Calories (kcal)"], 1),
            "protein": round(row["Protein (g)"], 1),
            "carbs": round(row["Carbohydrates (g)"], 1),
            "fats": round(row["Fats (g)"], 1),
            "fibre": round(row.get("Fibre (g)", 0), 1),
        })
    return meals

@app.post("/predict")
def predict(data: UserInput):
    bmi = data.weight / ((data.height / 100) ** 2)
    caloric_estimate = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
    protein_estimate = data.weight * 1.2
    carb_estimate = caloric_estimate * 0.45 / 4
    fat_estimate = caloric_estimate * 0.25 / 9

    X_input_cls = np.array([[data.age, data.height, data.weight, data.exercise_frequency,
                              data.sleep_hours, caloric_estimate, protein_estimate, carb_estimate, fat_estimate]])
    X_input_cls_scaled = scaler_cls.transform(X_input_cls)
    X_input_pca = pca.transform(X_input_cls_scaled)
    goal_enc = log_reg.predict(X_input_pca)[0]
    goal_proba = log_reg.predict_proba(X_input_pca)[0]
    goal = le.inverse_transform([goal_enc])[0]
    goal_confidence = round(float(np.max(goal_proba)) * 100, 1)

    X_input_reg = np.array([[data.age, data.height, data.weight, data.exercise_frequency,
                              data.sleep_hours, caloric_estimate, protein_estimate]])
    X_input_reg_scaled = scaler_reg.transform(X_input_reg)
    predicted_calories = float(ridge.predict(X_input_reg_scaled)[0])
    predicted_calories = max(1200, min(4000, predicted_calories))

    km_input = np.array([[data.height, data.weight, bmi, data.exercise_frequency, predicted_calories]])
    km_input_scaled = scaler_km.transform(km_input)
    cluster_id = int(kmeans.predict(km_input_scaled)[0])
    profile = cluster_profiles[cluster_profiles["Cluster"] == cluster_id].iloc[0]

    pca_point = pca_2d.transform(km_input_scaled)
    sample_pca = diet_df[["pca_x", "pca_y", "Cluster"]].sample(min(300, len(diet_df)), random_state=42).to_dict(orient="records")

    meals = recommend_meals(goal, predicted_calories)

    all_probs = {le.inverse_transform([i])[0]: round(float(p) * 100, 1) for i, p in enumerate(goal_proba)}

    return {
        "bmi": round(bmi, 2),
        "bmi_category": (
            "Underweight" if bmi < 18.5 else
            "Normal" if bmi < 25 else
            "Overweight" if bmi < 30 else
            "Obese"
        ),
        "predicted_goal": goal,
        "goal_confidence": goal_confidence,
        "goal_probabilities": all_probs,
        "predicted_calories": round(predicted_calories),
        "cluster_id": cluster_id,
        "cluster_profile": {
            "avg_cal": round(profile["avg_cal"]),
            "avg_protein": round(profile["avg_protein"]),
            "avg_carbs": round(profile["avg_carbs"]),
            "avg_fats": round(profile["avg_fats"]),
        },
        "pca_scatter": sample_pca,
        "user_pca": {"x": round(float(pca_point[0][0]), 3), "y": round(float(pca_point[0][1]), 3)},
        "recommended_meals": meals,
        "macros": {
            "protein": round(predicted_calories * 0.30 / 4),
            "carbs": round(predicted_calories * 0.45 / 4),
            "fats": round(predicted_calories * 0.25 / 9),
        }
    }

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
