# BreastUSTraining (v1.1.0)

## A web-based platform for BI-RADS breast ultrasound annotation, expert comparison, and AI-assisted agreement analysis

BreastUSTraining is a modular web-based training platform designed to support radiologists and trainees in learning breast ultrasound interpretation using the BI-RADS lexicon. The system integrates artificial intelligence, expert panel comparison, and statistical feedback to enhance diagnostic training, consistency, and reproducibility.

This repository contains the full source code for version v1.1.0, including the Django backend, React frontend, and AI-assisted modules for ROI detection, descriptor extraction, and BI-RADS-based educational feedback.

---

## Key Features

- Interactive breast ultrasound case annotation
- BI-RADS descriptor training interface
- AI-assisted ROI suggestion (YOLO-based)
- Descriptor-driven BI-RADS estimation
- Expert panel comparison and benchmarking
- Intra- and inter-observer agreement analysis (Cohen’s kappa)
- Statistical visualization and feedback dashboards
- Secure authentication (Djoser + SimpleJWT)
- Modular client–server architecture for research reproducibility

---

## Scientific Context

BreastUSTraining was developed as a research-oriented educational platform to improve consistency in breast ultrasound interpretation and BI-RADS descriptor usage. The system enables repeated annotation, structured comparison against expert panels and AI outputs, and quantitative evaluation of observer agreement.

The platform integrates:
- Computer vision for ROI detection
- Descriptor-based medical annotation workflows
- Interpretable AI assistance aligned with BI-RADS reasoning
- Observer agreement metrics (Cohen’s kappa, Fleiss’ kappa)
- Research-oriented statistical analysis

The AI module is designed as an assistive educational tool and not as an autonomous diagnostic system.

---

## Quick Start

### Backend
```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Backend: http://127.0.0.1:8000/  
Frontend: http://localhost:5173/

---

## System Architecture

The application follows a modular client–server architecture:

- Frontend: React + TypeScript (Vite SPA)
- Backend: Django + Django REST Framework
- Authentication: Djoser + SimpleJWT (JWT-based)
- Database: MySQL
- Media Storage: Server-side (ultrasound images, ROIs, user uploads)
- AI Integration: Descriptor-driven BI-RADS educational feedback

Core modules:
- `WebApp/` – Django project (settings, urls, wsgi/asgi)
- `core/` – Authentication and platform logic
- `nodule/` – Models, annotations, AI utilities, statistics
- `frontend/` – React application (SPA)
- `docs/` – Technical documentation

---

## AI Modules Overview (Paper-Aligned)

### ROI Detection
YOLO-based utilities are used to assist with Region of Interest (ROI) identification in ultrasound images to support the annotation workflow.

### Descriptor Extraction
The platform follows the methodology described in the associated publication for extracting BI-RADS descriptors from ultrasound ROIs, including:
- Shape
- Margin
- Orientation
- Echogenicity
- Posterior features
- Calcifications
- Suggestivity patterns

### BI-RADS Category Estimation
BI-RADS category estimation is computed from predicted descriptors using a probabilistic Naive Bayes model. This preserves interpretability and remains consistent with descriptor-driven clinical reasoning.

### Expert Panel Comparison
User annotations are compared against expert panel annotations and AI outputs to provide structured educational feedback and benchmarking.

---

## Repository Structure

```
BreastUSTraining/
├── WebApp/                # Django backend
│   ├── core/              # Authentication and core logic
│   ├── nodule/            # Models, AI utilities, statistics, comparison logic
│   ├── WebApp/            # Project configuration (settings, urls, wsgi, asgi)
│   ├── manage.py
│   └── requirements.txt
├── frontend/              # React + TypeScript SPA
├── docs/                  # Technical documentation
└── README.md
```

---

## Authentication System

The platform uses:
- Djoser for user management
- SimpleJWT for access and refresh tokens
- Protected API endpoints with:
  Authorization: JWT <access_token>

All routes except login and registration are protected at the frontend and enforced server-side.

---

## Reproducibility

The repository is structured to ensure reproducibility:

- Backend dependencies pinned in `requirements.txt`
- Frontend dependency locking via `package-lock.json`
- Deterministic schema via Django migrations
- Versioned release (v1.1.0)
- Modular documentation in `/docs`

This design allows full replication of the platform in academic and research environments.

---

## Research and Academic Use

This platform is intended for:
- Medical AI research
- Radiology training studies
- Observer agreement analysis
- Educational BI-RADS training environments

It is suitable for controlled studies, academic validation, and reproducible research workflows.

---

## License

MIT License

Copyright (c) 2025 Mikel Carrilero-Mardones

---

## Contact

Maintainer: Mikel Carrilero-Mardones  
Repository: https://github.com/mikel403/BreastUSTraining  
Email: mcarrilero@dia.uned.es
