<div align="center">

# 🩺 SAATHI
### Smart Assistive Adaptive Health Intelligence

**"Because Your Health Needs a Companion."**

*An Edge-AI Wearable System for Early Alzheimer's Risk Prediction and Preventive Care*

---

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![Flask](https://img.shields.io/badge/Flask-REST_API-black?style=flat-square&logo=flask)
![XGBoost](https://img.shields.io/badge/XGBoost-AUC_0.934-orange?style=flat-square)
![ESP32](https://img.shields.io/badge/Hardware-ESP32-teal?style=flat-square&logo=arduino)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Prototype_v1.0-purple?style=flat-square)

[Overview](#-overview) • [Problem](#-the-problem) • [Solution](#-our-solution) • [Architecture](#-system-architecture) • [Model](#-ai-model-performance) • [Setup](#-getting-started) • [API](#-api-reference) • [Team](#-team)

</div>

---

## 🧠 Overview

**SAATHI** (Smart Assistive Adaptive Health Intelligence) is an end-to-end preventive healthcare system designed to detect early Alzheimer's risk in individuals aged 35–40 — a full **25 years before symptoms typically appear**.

The system integrates three tightly coupled components:

| Component | Description |
|---|---|
| 🩹 **Edge Wearable Band** | Continuously tracks heart rate, sleep, gait, and physical activity using ESP32 + medical-grade sensors |
| 🤖 **Edge-AI Risk Engine** | XGBoost model trained on 2,149 real patient records — predicts Alzheimer's risk with 93.4% AUC-ROC |
| 📊 **Caretaker Dashboard** | Web portal for family members and caretakers — live risk score, 6-month trends, AI weekly reports, doctor sharing |

> SAATHI does not treat. SAATHI does not diagnose.
> SAATHI **warns you early enough to act.**

> ⚕️ **Medical Disclaimer:** SAATHI is a research prototype and wellness monitoring tool. It does not replace clinical diagnosis or medical advice from a qualified healthcare professional. All outputs should be reviewed by a licensed neurologist.

---

## 🔴 The Problem

```
55 million people worldwide live with Alzheimer's disease.
In India alone, over 5.3 million are affected.
That number will triple by 2050.
```

The most devastating truth about Alzheimer's:

- ❌ **Diagnosis happens at 60–65** when irreversible damage is done
- ❌ **Neurological damage begins 15–20 years earlier** with no warning
- ❌ **No continuous monitoring tool** exists for the 35–45 age group
- ❌ **Caretakers operate blind** — no data, no trends, no early alerts
- ❌ **Doctors see patients once in 6 months** — missing the daily picture

> The window to intervene exists. We just had no tool to see through it.
> **Until SAATHI.**

---

## 💚 Our Solution

Monitor the right people at the right time.
Not at 65 when it is too late. At 38 when lifestyle changes can still make a difference.

### The SAATHI Approach

```
Age 38 today             Age 50                   Age 63
      │                      │                       │
      ▼                      ▼                       ▼
[SAATHI starts]      [Risk trending up]       [Doctor acts early]
      │                      │                       │
  Low Risk             Moderate Risk           Caught before
  Score: 28             Score: 54             symptoms appear
      │                      │
 Lifestyle             Caretaker
 nudges sent             alerted
```

### What Makes SAATHI Different

| Feature | Traditional Healthcare | SAATHI |
|---|---|---|
| Detection window | Age 60–65 (too late) | Age 35–40 (25 years early) |
| Monitoring frequency | Every 6 months at clinic | Continuous, every 30 seconds |
| Data available to caretaker | None | Real-time dashboard |
| Doctor communication | Manual, infrequent | One-click weekly report |
| Explainability | Black box | SHAP-powered AI explanations |
| Cost | High clinical visits | Affordable wearable (~₹1,600) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    SAATHI WEARABLE BAND                       │
│                                                               │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│  │MAX30102  │   │ MPU6050  │   │  OLED    │   │  ESP32   │ │
│  │Heart Rate│   │ Gait +   │   │ Display  │   │ WiFi +   │ │
│  │  + SpO2  │   │  Steps   │   │          │   │ Control  │ │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘ │
└──────────────────────────┬───────────────────────────────────┘
                           │
                  WiFi (JSON every 30s)
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   SAATHI EDGE-AI ENGINE                       │
│                                                               │
│   Flask REST API                                              │
│   ┌─────────────┐   ┌─────────────┐   ┌──────────────────┐  │
│   │  /predict   │   │  /explain   │   │ /trend/simulate  │  │
│   │ Risk Score  │   │    SHAP     │   │  6-month trend   │  │
│   └─────────────┘   └─────────────┘   └──────────────────┘  │
│                                                               │
│        XGBoost Model — 2,149 patients — AUC 0.934            │
└──────────────────────────┬───────────────────────────────────┘
                           │
                      HTTP / JSON
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                SAATHI CARETAKER DASHBOARD                     │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Live    │  │ 6-Month  │  │    AI    │  │  Patient   │  │
│  │  Risk    │  │  Trends  │  │ Weekly   │  │  Profile   │  │
│  │  Score   │  │  Charts  │  │  Report  │  │            │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
│                                                               │
│    Powered by Claude AI for natural language weekly summaries │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 AI Model Performance

### Dataset

| Property | Details |
|---|---|
| Source | [Alzheimer's Disease Dataset — Kaggle](https://www.kaggle.com/datasets/rabieelkharoua/alzheimers-disease-dataset) |
| License | CC BY 4.0 — Kharoua R., 2024 |
| Patients | 2,149 |
| Features | 32 (clinical, lifestyle, cognitive, demographic) |
| Target | Binary diagnosis — Alzheimer's / No Alzheimer's |

### Model Comparison — Full Feature Set

| Model | Accuracy | AUC-ROC | Precision | Recall | F1-Score |
|---|---|---|---|---|---|
| Logistic Regression | 82.4% | 0.871 | 0.81 | 0.78 | 0.79 |
| Decision Tree | 84.1% | 0.841 | 0.83 | 0.80 | 0.81 |
| Random Forest | 89.3% | 0.912 | 0.89 | 0.84 | 0.86 |
| Gradient Boosting | 90.1% | 0.921 | 0.90 | 0.85 | 0.87 |
| **XGBoost ✓ Selected** | **91.7%** | **0.934** | **0.91** | **0.87** | **0.89** |

### Wearable-Only Feature Set (Realistic Deployment)

> With only **14 features** a wearable + app can realistically collect —
> XGBoost still achieves **AUC-ROC: 0.89** — strong performance with real-world inputs.

### What the Model Outputs

```
Input:  14 patient features (band sensor + self-reported)
                    │
                    ▼
            XGBoost Model
                    │
                    ▼
Output: ┌───────────────────────────────────────┐
        │  risk_score:       67.4               │
        │  risk_level:       High               │
        │  risk_factors:     [Sleep Quality,    │
        │                     Activity Level,   │
        │                     Family History]   │
        │  recommendations:  [Sleep 7+ hrs,     │
        │                     Walk daily,       │
        │                     See neurologist]  │
        │  shap_explanation: per-feature basis  │
        └───────────────────────────────────────┘
```

### SHAP Explainability

SAATHI uses **SHAP (SHapley Additive exPlanations)** to explain every prediction. The AI never gives a black-box answer — it always shows exactly which factors drove the score up or down for each individual patient. This is critical for clinical trust and caretaker confidence.

---

## 🔩 Hardware Components

| Component | Purpose | Est. Cost (INR) |
|---|---|---|
| ESP32 Dev Board | Microcontroller + WiFi | ₹500 |
| MAX30102 | Heart rate + SpO2 sensor | ₹250 |
| MPU6050 | Accelerometer + gait tracking | ₹120 |
| SSD1306 OLED 0.96" | On-band display | ₹180 |
| LiPo Battery 3.7V 500mAh | Power supply | ₹280 |
| TP4056 Charging Module | Battery charging circuit | ₹40 |
| Watch strap + casing | Wearable form factor | ₹100 |
| Jumper wires + breadboard | Assembly and prototyping | ₹130 |
| **Total Prototype Cost** | | **≈ ₹1,600** |

### Wiring — I2C Bus (All sensors share same pins)

```
ESP32 Pin 21 (SDA) → MAX30102 SDA + MPU6050 SDA + OLED SDA
ESP32 Pin 22 (SCL) → MAX30102 SCL + MPU6050 SCL + OLED SCL
ESP32 3.3V         → All sensor VCC
ESP32 GND          → All sensor GND
```

---

## 🛠️ Tech Stack

### AI and Backend

```
Python 3.10+
├── XGBoost 1.7.6        — primary prediction model
├── scikit-learn 1.3.0   — preprocessing, evaluation, model comparison
├── SHAP 0.42.1          — explainability engine
├── Flask 2.3.3          — REST API server
├── Flask-CORS 4.0.0     — cross-origin dashboard requests
├── pandas + numpy       — data processing
├── matplotlib + seaborn — analysis and training charts
└── joblib               — model serialization
```

### Hardware

```
ESP32
├── Arduino IDE + C++    — firmware development
├── MAX30102 library     — heart rate signal processing
├── MPU6050 library      — motion and gait processing
├── Adafruit SSD1306     — OLED display control
└── ArduinoJson          — JSON serialization for API calls
```

### Frontend Dashboard

```
HTML5 + CSS3 + Vanilla JavaScript
├── Chart.js             — trend charts and data visualization
└── Claude API           — AI-generated weekly caretaker reports
```

---

## 📁 Project Structure

```
SAATHI-AlzheimerRiskMonitor/
│
├── 📂 model/
│   ├── 01_explore.py              # Data exploration and visualization
│   ├── 02_prepare_data.py         # Cleaning and feature engineering
│   ├── 03_train_models.py         # Train and compare 5 ML models
│   ├── 04_best_model.py           # XGBoost deep analysis + SHAP
│   ├── 05_api.py                  # Flask REST API — 4 endpoints
│   ├── 06_test_api.py             # Full API test suite
│   ├── saathi_model.pkl           # Trained XGBoost model (generated)
│   ├── saathi_features.pkl        # Feature configuration (generated)
│   └── saved_data/                # Train/test splits, scalers (generated)
│
├── 📂 hardware/
│   ├── saathi_band.ino            # ESP32 firmware (Arduino IDE)
│   ├── wiring_diagram.png         # Hardware connection diagram
│   └── components.md              # Bill of materials
│
├── 📂 dashboard/
│   ├── index.html                 # Caretaker web dashboard
│   ├── style.css                  # Dashboard styles
│   └── app.js                     # Dashboard logic and API calls
│
├── 📂 docs/
│   ├── exploration.png            # Dataset analysis charts
│   ├── model_comparison.png       # 5-model comparison chart
│   ├── best_model_analysis.png    # Confusion matrix and ROC curve
│   ├── shap_summary.png           # SHAP feature importance plot
│   ├── system_architecture.png    # Full architecture diagram
│   └── saathi_presentation.pdf    # Project presentation slides
│
├── 📂 research/
│   ├── feature_mapping.md         # Dataset features → band sensors
│   └── references.md              # Research papers and citations
│
├── requirements.txt
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- Arduino IDE (for hardware flashing)
- VS Code (recommended editor)
- Kaggle account (free — to download dataset)

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/SAATHI-AlzheimerRiskMonitor.git
cd SAATHI-AlzheimerRiskMonitor
```

### Step 2 — Set up Python environment

```bash
# Create virtual environment
python -m venv venv

# Activate — Windows
venv\Scripts\activate

# Activate — Mac / Linux
source venv/bin/activate

# Install all dependencies
pip install -r requirements.txt
```

### Step 3 — Download the dataset

Download `alzheimers_disease_data.csv` from
[Kaggle](https://www.kaggle.com/datasets/rabieelkharoua/alzheimers-disease-dataset)
and place it inside the `model/` folder.

### Step 4 — Train the model

```bash
cd model

python 01_explore.py        # Explore data — generates exploration.png
python 02_prepare_data.py   # Clean and split data
python 03_train_models.py   # Train 5 models — generates model_comparison.png
python 04_best_model.py     # Deep analysis — generates shap_summary.png
```

### Step 5 — Start the API server

```bash
python 05_api.py
# API is now live at http://localhost:5000
# Test it: http://localhost:5000/health
```

### Step 6 — Open the caretaker dashboard

Open `dashboard/index.html` in your browser.
Make sure the API server (Step 5) is still running.

### Step 7 — Flash hardware (optional for full demo)

1. Open `hardware/saathi_band.ino` in Arduino IDE
2. Update WiFi SSID, password, and your laptop IP address
3. Select board: ESP32 Dev Module
4. Flash to device

---

## 🔌 API Reference

**Base URL:** `http://localhost:5000`

---

### GET /health

Check if API is running.

```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "running",
  "model": "SAATHI-v1",
  "features": ["Age", "BMI", "..."],
  "timestamp": "2026-04-26T10:00:00"
}
```

---

### POST /predict

Get Alzheimer's risk score for a patient.

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Age": 38,
    "BMI": 26.5,
    "Smoking": 0,
    "AlcoholConsumption": 2,
    "PhysicalActivity": 3.5,
    "SleepQuality": 6,
    "FamilyHistoryAlzheimers": 1,
    "CardiovascularDisease": 0,
    "Diabetes": 0,
    "Depression": 0,
    "HeadInjury": 0,
    "Hypertension": 0,
    "MemoryComplaints": 1,
    "BehavioralProblems": 0
  }'
```

**Response:**
```json
{
  "risk_score": 67.4,
  "risk_level": "High",
  "color": "red",
  "risk_factors": [
    "Family history of Alzheimers",
    "Memory complaints reported",
    "Poor sleep quality"
  ],
  "recommendations": [
    "Improve sleep: aim for 7-8 hours per night",
    "Schedule neurologist consultation within 3 months"
  ],
  "timestamp": "2026-04-26T10:30:00",
  "model_version": "SAATHI-v1"
}
```

---

### POST /explain

Get SHAP explanation — shows exactly which features drove this prediction.

```bash
curl -X POST http://localhost:5000/explain \
  -H "Content-Type: application/json" \
  -d '{ ...same patient data as /predict... }'
```

**Response:**
```json
{
  "top_factors": [
    {
      "feature": "MemoryComplaints",
      "value": 1,
      "impact": 0.234,
      "direction": "increases risk"
    },
    {
      "feature": "SleepQuality",
      "value": 4,
      "impact": 0.198,
      "direction": "increases risk"
    },
    {
      "feature": "PhysicalActivity",
      "value": 6,
      "impact": -0.142,
      "direction": "decreases risk"
    }
  ]
}
```

---

### POST /trend/simulate

Get 6-month weekly risk score history for dashboard charts.

```bash
curl -X POST http://localhost:5000/trend/simulate \
  -H "Content-Type: application/json" \
  -d '{"base_score": 55, "weeks": 24}'
```

---

### POST /predict/batch

Predict risk for multiple patients in a single call.

---

## 📈 Features Used for Prediction

| Feature | Category | How SAATHI Collects It |
|---|---|---|
| Age | Demographic | Onboarding profile |
| BMI | Lifestyle | Self-reported at signup |
| Smoking | Lifestyle | Self-reported |
| Alcohol consumption | Lifestyle | Self-reported |
| Physical activity | **Band sensor** | Step count → hours/week |
| Sleep quality | **Band sensor** | Accelerometer sleep pattern detection |
| Family history of Alzheimer's | Medical | Self-reported once at onboarding |
| Cardiovascular disease | Medical | Doctor diagnosis — reported at signup |
| Diabetes | Medical | Doctor diagnosis — reported at signup |
| Depression | Medical | PHQ-2 questionnaire — weekly in-app |
| Head injury history | Medical | Self-reported once at onboarding |
| Hypertension | **Band + Profile** | Resting HR trend + self-reported |
| Memory complaints | **Caretaker input** | Reported weekly on dashboard |
| Behavioral problems | **Caretaker input** | Reported weekly on dashboard |

---

## 🔭 Future Scope

### Near-Term (6–12 months)
- [ ] Custom PCB for miniaturized wearable form factor
- [ ] EEG patch integration for brainwave pattern monitoring
- [ ] Mobile app (React Native) for real-time caretaker push alerts
- [ ] Offline edge inference — XGBoost model runs on ESP32 itself

### Medium-Term (1–2 years)
- [ ] Longitudinal personal baseline — model retrains on each user's own data
- [ ] Multi-disease expansion — cardiovascular risk, diabetes, Parkinson's early markers
- [ ] Voice-based cognitive assessment built into companion app
- [ ] Regional language support — Hindi, Marathi, Tamil, Telugu for Indian caretakers

### Long-Term (2–5 years)
- [ ] HL7 FHIR API for direct hospital EMR / HIS integration
- [ ] Federated learning — model improves across all SAATHI users without raw data leaving device
- [ ] Clinical validation study in partnership with neurology departments
- [ ] CDSCO regulatory pathway for medical device certification in India
- [ ] Health insurance integration for preventive care incentive programs

---

## 📚 Research Foundation

SAATHI is grounded in peer-reviewed clinical research:

1. **Livingston G, et al. (2020).** Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. *The Lancet*, 396(10248), 413–446.

2. **FINGER Trial (2015).** A 2-year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring to prevent cognitive decline. *The Lancet*, 385(9984), 2255–2263.

3. **Jack CR Jr, et al. (2018).** NIA-AA Research Framework: Toward a biological definition of Alzheimer's disease. *Alzheimer's & Dementia*, 14(4), 535–562.

4. **Lundberg SM & Lee SI (2017).** A unified approach to interpreting model predictions. *NeurIPS 2017.* — Foundation for SHAP explainability used in SAATHI.

5. **Kharoua R. (2024).** Alzheimer's Disease Dataset. Kaggle. Licensed CC BY 4.0.

---

## 👥 Team

<div align="center">

**SAATHI — Built with purpose.**

| Name | Role |
|---|---|
| [Your Name] | AI Model · Backend API · System Architecture |
| [Team Member 2] | Frontend Dashboard · UI/UX Design |
| [Team Member 3] | Hardware · Sensors · Device Integration |

*Developed as part of [Hackathon / Event Name]*
*[Institution Name], Pune, Maharashtra, India — 2026*

</div>

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for full terms.

Free to use for research and educational purposes.
Commercial use requires explicit written permission from the SAATHI team.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

---

**SAATHI — Smart Assistive Adaptive Health Intelligence**

*"Because Your Health Needs a Companion."*

---

*If SAATHI helped or inspired you — leave a ⭐ on this repo.*

*Every star tells us this work matters.*

</div>
