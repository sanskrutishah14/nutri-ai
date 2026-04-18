🥗 NutriAI — ML-Powered Nutrition & Meal Recommendation System
<div align="center">


<svg xmlns="http://www.w3.org/2000/svg" width="152.75" height="28" role="img" aria-label="PYTHON: 3.11+"><title>PYTHON: 3.11+</title><g shape-rendering="crispEdges"><rect width="89.5" height="28" fill="#555"/><rect x="89.5" width="63.25" height="28" fill="#3776ab"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><image x="9" y="7" width="14" height="14" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlB5dGhvbjwvdGl0bGU+PHBhdGggZD0iTTE0LjI1LjE4bC45LjIuNzMuMjYuNTkuMy40NS4zMi4zNC4zNC4yNS4zNC4xNi4zMy4xLjMuMDQuMjYuMDIuMi0uMDEuMTNWOC41bC0uMDUuNjMtLjEzLjU1LS4yMS40Ni0uMjYuMzgtLjMuMzEtLjMzLjI1LS4zNS4xOS0uMzUuMTQtLjMzLjEtLjMuMDctLjI2LjA0LS4yMS4wMkg4Ljc3bC0uNjkuMDUtLjU5LjE0LS41LjIyLS40MS4yNy0uMzMuMzItLjI3LjM1LS4yLjM2LS4xNS4zNy0uMS4zNS0uMDcuMzItLjA0LjI3LS4wMi4yMXYzLjA2SDMuMTdsLS4yMS0uMDMtLjI4LS4wNy0uMzItLjEyLS4zNS0uMTgtLjM2LS4yNi0uMzYtLjM2LS4zNS0uNDYtLjMyLS41OS0uMjgtLjczLS4yMS0uODgtLjE0LTEuMDUtLjA1LTEuMjMuMDYtMS4yMi4xNi0xLjA0LjI0LS44Ny4zMi0uNzEuMzYtLjU3LjQtLjQ0LjQyLS4zMy40Mi0uMjQuNC0uMTYuMzYtLjEuMzItLjA1LjI0LS4wMWguMTZsLjA2LjAxaDguMTZ2LS44M0g2LjE4bC0uMDEtMi43NS0uMDItLjM3LjA1LS4zNC4xMS0uMzEuMTctLjI4LjI1LS4yNi4zMS0uMjMuMzgtLjIuNDQtLjE4LjUxLS4xNS41OC0uMTIuNjQtLjEuNzEtLjA2Ljc3LS4wNC44NC0uMDIgMS4yNy4wNXptLTYuMyAxLjk4bC0uMjMuMzMtLjA4LjQxLjA4LjQxLjIzLjM0LjMzLjIyLjQxLjA5LjQxLS4wOS4zMy0uMjIuMjMtLjM0LjA4LS40MS0uMDgtLjQxLS4yMy0uMzMtLjMzLS4yMi0uNDEtLjA5LS40MS4wOXptMTMuMDkgMy45NWwuMjguMDYuMzIuMTIuMzUuMTguMzYuMjcuMzYuMzUuMzUuNDcuMzIuNTkuMjguNzMuMjEuODguMTQgMS4wNC4wNSAxLjIzLS4wNiAxLjIzLS4xNiAxLjA0LS4yNC44Ni0uMzIuNzEtLjM2LjU3LS40LjQ1LS40Mi4zMy0uNDIuMjQtLjQuMTYtLjM2LjA5LS4zMi4wNS0uMjQuMDItLjE2LS4wMWgtOC4yMnYuODJoNS44NGwuMDEgMi43Ni4wMi4zNi0uMDUuMzQtLjExLjMxLS4xNy4yOS0uMjUuMjUtLjMxLjI0LS4zOC4yLS40NC4xNy0uNTEuMTUtLjU4LjEzLS42NC4wOS0uNzEuMDctLjc3LjA0LS44NC4wMS0xLjI3LS4wNC0xLjA3LS4xNC0uOS0uMi0uNzMtLjI1LS41OS0uMy0uNDUtLjMzLS4zNC0uMzQtLjI1LS4zNC0uMTYtLjMzLS4xLS4zLS4wNC0uMjUtLjAyLS4yLjAxLS4xM3YtNS4zNGwuMDUtLjY0LjEzLS41NC4yMS0uNDYuMjYtLjM4LjMtLjMyLjMzLS4yNC4zNS0uMi4zNS0uMTQuMzMtLjEuMy0uMDYuMjYtLjA0LjIxLS4wMi4xMy0uMDFoNS44NGwuNjktLjA1LjU5LS4xNC41LS4yMS40MS0uMjguMzMtLjMyLjI3LS4zNS4yLS4zNi4xNS0uMzYuMS0uMzUuMDctLjMyLjA0LS4yOC4wMi0uMjFWNi4wN2gyLjA5bC4xNC4wMXptLTYuNDcgMTQuMjVsLS4yMy4zMy0uMDguNDEuMDguNDEuMjMuMzMuMzMuMjMuNDEuMDguNDEtLjA4LjMzLS4yMy4yMy0uMzMuMDgtLjQxLS4wOC0uNDEtLjIzLS4zMy0uMzMtLjIzLS40MS0uMDgtLjQxLjA4eiIvPjwvc3ZnPg=="/><text transform="scale(.1)" x="532.5" y="175" textLength="485" fill="#fff">PYTHON</text><text transform="scale(.1)" x="1211.25" y="175" textLength="392.5" fill="#fff" font-weight="bold">3.11+</text></g></svg>





<img width="153" height="28" alt="Python-3" src="https://github.com/user-attachments/assets/453f98f6-74b3-483a-8532-7750fb3be834" />




An end-to-end machine learning system that predicts fitness goals, estimates daily calorie requirements, clusters body profiles, and generates personalised Indian meal recommendations.

</div>
✨ Features
BMI Computation & Classification with category mapping
Fitness Goal Prediction using Logistic Regression
Calorie Estimation via Ridge Regression
Body-Type Clustering using KMeans (k=4)
Dimensionality Reduction with PCA for stability + visualisation
Macro Nutrient Breakdown (protein, carbs, fats)
Personalised Meal Recommendations from 1000+ Indian dishes
Real-time API Integration with FastAPI backend
🤖 Machine Learning Models

All models are trained dynamically at application startup (no serialized models).

Model	Purpose
Logistic Regression	Predicts fitness goal
Ridge Regression	Estimates daily calorie requirement
KMeans Clustering	Assigns body-type cluster
PCA (5D)	Feature reduction for classification
PCA (2D)	Cluster visualisation
⚙️ ML Pipeline
User Input (age, height, weight, exercise, sleep)
        │
        ├──► BMR Calculation (Mifflin-St Jeor)
        │
        ├──► StandardScaler → PCA(5) → Logistic Regression
        │                                ↓
        │                        Predicted Goal
        │
        ├──► StandardScaler → Ridge Regression
        │                                ↓
        │                       Calorie Estimate
        │
        ├──► StandardScaler → KMeans (k=4)
        │                                ↓
        │                      Body Cluster ID
        │
        ├──► PCA(2)
        │                                ↓
        │                     2D Cluster Projection
        │
        └──► Goal-weighted Scoring
                                         ↓
                           Top 5 Meal Recommendations
📊 Datasets
Dataset	Size	Purpose
Personalized Diet Dataset	5,000+ rows	Model training
Indian Food Nutrition Dataset	1,000+ dishes	Meal recommendations
Body Measurements Dataset	700+ entries	Cluster reference
🚀 Quick Start
Prerequisites
Python 3.11+
Node.js 18+
npm 9+
1. Clone Repository
git clone https://github.com/YOUR_USERNAME/nutriai.git
cd nutriai
2. Run Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

API: http://localhost:8000

3. Run Frontend
cd frontend
npm install
npm run dev

App: http://localhost:5173

🔌 API
POST /predict

Input

{
  "age": 28,
  "height": 175,
  "weight": 72,
  "exercise_frequency": 4,
  "sleep_hours": 7.5
}

Output (abridged)

{
  "bmi": 23.5,
  "predicted_goal": "Muscle Building",
  "predicted_calories": 2180,
  "cluster_id": 2,
  "macros": {
    "protein": 164,
    "carbs": 245,
    "fats": 60
  },
  "recommended_meals": [...]
}
GET /health
{ "status": "ok" }
📁 Project Structure
nutriai/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── data/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
🛠️ Tech Stack

Backend

FastAPI
scikit-learn
pandas, NumPy
Uvicorn

Frontend

React + Vite
Tailwind CSS
Recharts
🔍 Key Implementation Details
Feature scaling applied before all ML models
PCA used to reduce noise and improve classification stability
KMeans clustering used for latent body-type grouping
Meal recommendation uses goal-based weighted scoring, not random selection
Models retrain on startup ensuring reproducibility without saved artifacts
⚡ Notes
This is a data-driven recommendation system, not a medical diagnostic tool
Predictions depend on dataset quality and feature representation
Designed for educational and analytical use
📌 Future Improvements
Model evaluation metrics (accuracy, RMSE, silhouette score)
Persistent model storage (joblib)
User history tracking
Deployment (Docker + cloud)
📄 License

MIT License
