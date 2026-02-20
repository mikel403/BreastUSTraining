# BreastUSTraining (v1.1.0)

## AI-Assisted Web Platform for Breast Ultrasound Training and BI-RADS Descriptor Learning

BreastUSTraining is a modular web-based training platform designed to support radiologists and trainees in learning breast ultrasound interpretation using the BI-RADS lexicon. The system integrates artificial intelligence, expert panel comparison, and statistical feedback to enhance diagnostic training and reproducibility.

This repository contains the full source code for version **v1.1.0**, including the Django backend, React frontend, and AI-assisted modules for lesion detection and descriptor prediction.

---

## 📌 Key Features

- Interactive breast ultrasound case annotation
- BI-RADS descriptor training interface
- AI-assisted lesion detection (YOLO-based)
- AI-based BI-RADS descriptor prediction
- Expert panel comparison and benchmarking
- Intra- and inter-observer agreement analysis (Cohen’s Kappa)
- Secure authentication system (login, registration, token refresh)
- Research-oriented statistical analysis tools
- Modular client-server architecture

---

## 🧠 Scientific Context

BreastUSTraining was developed as a research-oriented educational platform to improve consistency in breast ultrasound interpretation. The system allows repeated case annotation, expert comparison, and quantitative evaluation of observer agreement, making it suitable for both clinical training and academic research.

The platform integrates:

- Computer Vision (lesion detection)
- Machine Learning (descriptor prediction)
- Medical annotation workflows
- Statistical agreement metrics

---

## 🏗️ System Architecture

The application follows a client-server architecture:

- **Frontend**: React + TypeScript (Vite)
- **Backend**: Django + Django REST Framework
- **Database**: MySQL
- **AI Modules**: YOLO detection + BI-RADS prediction models
- **Media Storage**: Ultrasound images and ROIs stored server-side

### Core Components

- `WebApp/` → Django backend (API, models, AI logic)
- `frontend/` → React TypeScript SPA
- `nodule/` → Core annotation and AI utilities
- `core/` → Authentication and main system logic

---

## 🚀 Version 1.1.0 Updates

- Added user registration (sign-up) functionality
- Improved authentication flow
- Registered users gain full platform access
- Test users remain excluded from expert comparison panels

---

## 🖥️ Technology Stack

### Backend

- Python 3.9+
- Django
- Django REST Framework
- Gunicorn (deployment)
- MySQL

### Frontend

- React
- TypeScript
- Vite
- Axios

### AI & Data Processing

- YOLO-based lesion detection
- BI-RADS descriptor prediction model
- Statistical analysis (Cohen’s Kappa, correlation metrics)
- NumPy / SciPy / Pandas (research utilities)

---

## 📂 Repository Structure

```
BreastUSTraining/
├── WebApp/                # Django backend
│   ├── core/              # Authentication and main logic
│   ├── nodule/            # Annotation, AI, and utilities
│   ├── WebApp/            # Final urls of the backend
│           ├── settings/  #Common, production and development settings
│           ├── wsgi.py
│           ├── asgi.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/              # React + TypeScript application
└── README.md
```

---

## ⚙️ Installation Guide (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mikel403/BreastUSTraining.git
cd BreastUSTraining
git checkout v1.1.0
```

---

### 2️⃣ Backend Setup (Django)

#### Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file or configure:

- Database credentials (MySQL)
- Secret key
- Media paths
- Debug mode

#### Apply Migrations

```bash
python manage.py migrate
```

#### Run Backend Server

```bash
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000/
```

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173/
```

---

## 🔐 Authentication System

The platform includes:

- User registration (v1.1.0)
- Login with token authentication
- Token refresh
- Password reset functionality
- Role-based access logic (test vs registered users)

---

## 🤖 AI Modules Overview

### 1. Lesion Detection (YOLO)

- Automatically suggests Region of Interest (ROI)
- Assists users during annotation

### 2. BI-RADS Descriptor Prediction

- Predicts ultrasound descriptors from ROI
- Provides probabilistic outputs
- Supports educational feedback

### 3. Expert Panel Comparison

- Aggregates expert annotations
- Compares user performance against expert consensus

### 4. Statistical Analysis

- Intra-observer agreement
- Inter-observer agreement
- Correlation metrics
- Cohen’s Kappa computation

---

## 📊 Training Workflow

1. User logs into the platform
2. Selects an ultrasound case
3. Annotates BI-RADS descriptors
4. AI assistance (optional)
5. Results compared with expert panel and AI
6. Statistical feedback generated

---

## 🗄️ Database Design (Conceptual)

Main entities:

- Users
- Cases (Ultrasound images)
- Nodules
- BI-RADS descriptors
- Annotations
- Expert panel data
- Statistical results

---

## 🚢 Deployment (Production)

Recommended stack:

- Gunicorn + Nginx (Backend)
- MySQL (Database)
- Static files via Nginx
- HTTPS (SSL certificate)

Example:

```bash
gunicorn WebApp.wsgi:application --bind 0.0.0.0:8000
```

---

## 🧪 Research and Academic Use

This platform is designed for:

- Medical AI research
- Radiology training studies
- Observer agreement analysis
- Educational evaluation systems

Suitable for publications, clinical studies, and academic validation.

---

## 📖 Documentation

Full technical documentation is available in the `/docs` directory, including:

- Architecture details
- API documentation
- AI module explanations
- Developer guide

---

## 👨‍💻 Developer Guide

### Code Modularity

- Backend organized by Django apps (`core`, `nodule`)
- AI utilities isolated in `utils/`
- Frontend modular React components
- REST API communication via JSON

### Recommended Practices

- Follow PEP8 for Python
- Use TypeScript types strictly in frontend
- Maintain API consistency
- Document new AI modules in `/docs/ai-modules.md`

---

## 🔒 Privacy and Data Considerations

- No clinical patient data included in repository
- Secure authentication required for platform access
- Media files handled server-side
- Research-compliant architecture

---

## 📜 License

This project is intended for academic and research purposes.
MIT License

Copyright (c) 2025 Mikel Carrilero-Mardones

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 📚 Citation (Recommended)

If you use this platform in research, please cite the associated publication and repository:

```
BreastUSTraining: AI-Assisted Web Platform for Breast Ultrasound Training
Version: v1.1.0
GitHub: https://github.com/mikel403/BreastUSTraining
```

---

## 🙌 Acknowledgments

Developed as part of a research initiative in medical AI, radiology training, and educational technology, integrating machine learning and web-based clinical training methodologies.

---

## 📬 Contact

Maintainer: Mikel
Repository: https://github.com/mikel403/BreastUSTraining
email: mcarrilero@dia.uned.es
