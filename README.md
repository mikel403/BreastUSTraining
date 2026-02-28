# BreastUSTraining (v1.1.0)

## A web-based platform for structured BI-RADS breast ultrasound annotation, expert comparison, and AI-assisted agreement analysis

BreastUSTraining is a modular web-based platform for structured BI-RADS
breast ultrasound annotation designed for radiologists and trainees
already familiar with the BI-RADS lexicon. The system supports repeated
lesion description, comparison with expert radiologists and AI outputs,
and quantitative evaluation of intra- and inter-observer agreement to
promote consistent descriptor usage and reproducible annotation
practices.

This repository contains the full source code for version v1.1.0,
including the Django backend, React frontend, and AI-assisted modules
for ROI detection, descriptor extraction, and BI-RADS-oriented feedback
within a research and training workflow.

---

## Key Features

- Interactive breast ultrasound case annotation interface\
- Structured BI-RADS descriptor annotation workflow\
- AI-assisted ROI suggestion (YOLO-based)\
- Descriptor-driven BI-RADS estimation (interpretable pipeline)\
- Expert panel comparison and benchmarking\
- Single-radiologist comparison for targeted reference analysis\
- Intra- and inter-observer agreement analysis (Cohen's and Fleiss'
  kappa)\
- Statistical visualization and feedback dashboards\
- Secure authentication (Djoser + SimpleJWT)\
- Protected media access for user-uploaded medical images\
- Modular client--server architecture for research reproducibility

---

## Scientific Context

BreastUSTraining was developed as a research-oriented training and
self-assessment platform to improve consistency in breast ultrasound
description using the BI-RADS lexicon. Breast ultrasound interpretation
is inherently subjective and highly dependent on observer experience,
leading to variability in descriptor assignment and downstream clinical
interpretation.

The platform enables structured, repeated annotation of ultrasound
cases, comparison against expert radiologists and AI outputs, and
quantitative evaluation of observer agreement at the level of individual
BI-RADS descriptors. Rather than functioning as a standalone teaching
system, it is intended as a practical annotation training and research
tool for users who have already received prior instruction on BI-RADS
terminology.

The system integrates: - Computer vision for ROI detection\

- Descriptor-based medical annotation workflows\
- Interpretable AI assistance aligned with BI-RADS reasoning\
- Observer agreement metrics (Cohen's kappa, Fleiss' kappa)\
- Structured data collection for observer variability research

The AI module is designed as an assistive educational component and not
as an autonomous diagnostic system.

---

## Quick Start

### Backend

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend: http://127.0.0.1:8000/\
Frontend: http://localhost:5173/

---

## System Architecture

The application follows a modular client--server architecture:

- Frontend: React + TypeScript (Vite SPA)\
- Backend: Django + Django REST Framework\
- Authentication: Djoser + SimpleJWT (JWT-based)\
- Database: MySQL (relational storage of users, nodules, annotations,
  metrics)\
- Media Storage: Server-side media storage (ultrasound images, ROIs,
  user uploads)\
- AI Integration: Descriptor-driven BI-RADS educational feedback

Core modules: - `WebApp/` -- Django project (settings, urls, wsgi/asgi)\

- `core/` -- Authentication and platform logic\
- `nodule/` -- Models, annotations, AI utilities, statistics, comparison
  logic\
- `frontend/` -- React application (SPA)\
- `docs/` -- Technical documentation

---

## Media and Security Model

Breast ultrasound images and cropped ROIs are stored in server-side
media storage. Public reference dataset images are served through a
controlled public namespace for efficient interface loading, while
user-uploaded medical images are treated as private content.

Private images: - Are not exposed through direct `/media/` public
access\

- Are retrieved exclusively via authenticated backend endpoints\
- Are protected by JWT authentication and ownership checks\
- Are rendered in the frontend using authenticated requests (e.g.,
  `SecureImage` component)

This design follows a privacy-by-design approach suitable for medical
training and research environments.

---

## AI Modules Overview (Paper-Aligned)

### ROI Detection

YOLO-based utilities are used to assist with Region of Interest (ROI)
identification in ultrasound images, supporting the annotation workflow
and optional cropping of nodules.

### Descriptor Extraction

The platform follows a descriptor-driven methodology aligned with the
associated publication for extracting BI-RADS-relevant characteristics
from ultrasound ROIs, including: 
- Shape\
- Margin\
- Orientation\
- Echogenicity\
- Posterior features\
- Calcifications\
- Suggestivity patterns

### BI-RADS Category Estimation

BI-RADS category estimation is computed from predicted descriptors using
an interpretable probabilistic model (Naive Bayes), preserving
transparency and consistency with descriptor-based clinical reasoning.

### Expert and Radiologist Comparison

User annotations can be compared with: - Aggregated expert panel
annotations\

- AI model outputs\
- A specifically selected radiologist for targeted comparison and
  reflective self-assessment

This enables qualitative and quantitative feedback without defining a
single absolute ground truth.

---

## Intended Use and Scope

BreastUSTraining is intended for: - Radiology trainees and breast
imaging specialists\

- Medical AI and observer variability research\
- Structured BI-RADS annotation training\
- Academic and controlled research studies

The platform is not a diagnostic system and should not be used for
clinical decision-making. AI outputs are provided solely as assistive
educational feedback within the annotation workflow.

---

## License

MIT License

Copyright (c) 2025 Mikel Carrilero-Mardones

---

## Contact

Maintainer: Mikel Carrilero-Mardones\
Repository: https://github.com/mikel403/BreastUSTraining\
Email: mcarrilero@dia.uned.es
