# 🥗 NutriAI — ML-Powered Nutrition & Meal Recommendation System

<div align="center">

**An end-to-end machine learning system that predicts fitness goals, estimates calorie needs, clusters body profiles, and generates personalised Indian meal recommendations.**

</div>

---

## ✨ Features

* BMI computation with category classification
* Fitness goal prediction using Logistic Regression
* Daily calorie estimation using Ridge Regression
* Body-type clustering using KMeans (k=4)
* PCA for dimensionality reduction and visualisation
* Macro nutrient breakdown (protein, carbs, fats)
* Personalised meal recommendations (1000+ Indian dishes)
* FastAPI backend with real-time predictions

---

## 🤖 Machine Learning

All models are trained dynamically at application startup.

* **Logistic Regression** → predicts fitness goal
* **Ridge Regression** → estimates calorie requirement
* **KMeans (k=4)** → assigns body-type cluster
* **PCA (5D)** → improves classification stability
* **PCA (2D)** → enables cluster visualisation

---

## ⚙️ Pipeline

```
User Input (age, height, weight, lifestyle)
        │
        ├──► BMR Calculation
        │
        ├──► Scaling → PCA → Logistic Regression
        │                        ↓
        │                  Predicted Goal
        │
        ├──► Scaling → Ridge Regression
        │                        ↓
        │                Calorie Estimate
        │
        ├──► Scaling → KMeans
        │                        ↓
        │                  Cluster ID
        │
        └──► Meal Scoring Engine
                                 ↓
                       Top 5 Meal Recommendations
```

---

## 📊 Data

* 5,000+ records → model training
* 1,000+ dishes → meal recommendations
* 700+ entries → body reference data

---

## 🚀 Quick Start

### Prerequisites

* Python 3.11+
* Node.js 18+
* npm 9+

---

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/nutriai.git
cd nutriai
```

---

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

API → [http://localhost:8000](http://localhost:8000)

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App → [http://localhost:5173](http://localhost:5173)

---

## 🔌 API

### POST `/predict`

**Input**

```json
{
  "age": 28,
  "height": 175,
  "weight": 72,
  "exercise_frequency": 4,
  "sleep_hours": 7.5
}
```

**Output (sample)**

```json
{
  "bmi": 23.5,
  "predicted_goal": "Muscle Building",
  "predicted_calories": 2180,
  "cluster_id": 2,
  "macros": {
    "protein": 164,
    "carbs": 245,
    "fats": 60
  }
}
```

---

### GET `/health`

```json
{ "status": "ok" }
```

---

## 📁 Structure

```
nutriai/
├── backend/
├── frontend/
└── README.md
```

---

## 🛠️ Tech Stack

**Backend:** FastAPI, scikit-learn, pandas, NumPy
**Frontend:** React, Vite, Tailwind CSS, Recharts

---

## 🔍 Implementation Notes

* All features are scaled before model usage
* PCA reduces noise and improves model stability
* KMeans captures latent body-type patterns
* Meal recommendations use weighted scoring (not random)
* Models retrain at startup (no saved artifacts)

---

## ⚡ Notes

* Not a medical diagnostic system
* Output depends on dataset quality
* Built for analytical and educational purposes

---

## 📌 Future Work

* Add evaluation metrics (accuracy, RMSE, silhouette score)
* Save trained models (joblib)
* User history tracking
* Cloud deployment
