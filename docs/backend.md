# Backend Architecture (Django REST + Djoser + SimpleJWT)

## Overview

The backend of BreastUSTraining is implemented as a Django REST API that supports authentication, ultrasound nodule management, BI-RADS descriptor annotation, AI-assisted comparison, expert panel aggregation, and statistical analysis for the results dashboard.

It is designed as a research-oriented backend that ensures reproducibility, traceability of annotations, and controlled access to medical imaging data. The system follows a modular Django architecture with separated apps for core platform logic and nodule/annotation workflows.

---

## Tech Stack

- Django
- Django REST Framework (DRF)
- Djoser (authentication and user management)
- SimpleJWT (JWT-based authentication)
- MySQL (primary relational database)
- Django Media Storage (ultrasound images, ROIs, AI artifacts)

---

## Project Structure

### Django Project (`WebApp/`)

The main Django project contains configuration and global routing:

- `manage.py` – Django management entry point
- `WebApp/asgi.py` – ASGI application definition
- `WebApp/wsgi.py` – WSGI application definition
- `WebApp/urls.py` – Root URL configuration
- `WebApp/settings/`
  - `common.py` – shared configuration
  - `dev.py` – development settings
  - `prod.py` – production settings
  - `__init__.py`

This multi-settings structure allows environment-specific configuration while maintaining a shared core configuration.

---

## Django Applications

The backend is primarily organized into two main apps:

### 1. `core` App

The `core` app handles platform-level and user-related logic beyond default Djoser functionality.

Main responsibilities:
- Custom user-related logic
- Auxiliary endpoints (e.g., password reset integration)
- Serializers and views related to core platform functionality
- Admin configuration and basic system models

Key files:
- `core/models.py`
- `core/serializers.py`
- `core/views.py`
- `core/urls.py`
- `core/admin.py`

---

### 2. `nodule` App

The `nodule` app contains the core domain logic of the platform, including nodules, annotations, AI integration, expert panel comparison, and statistics.

Main responsibilities:
- Nodule storage and retrieval
- BI-RADS descriptor annotations
- AI-generated descriptions
- Expert panel comparison logic
- Statistical computation for agreement metrics
- Image handling and utilities

Key files:
- `nodule/models.py`
- `nodule/serializers.py`
- `nodule/views.py`
- `nodule/urls.py`
- `nodule/validators.py`

---

## Utility Modules (`nodule/utils/`)

The `utils` package centralizes computational and AI-related logic used by the API views:

- `YOLO.py` – ROI detection and nodule localization utilities
- `openImage.py` – image loading and preprocessing helpers
- `descriptionModel.py` – descriptor inference pipeline integration
- `biradsModel.py` – descriptor-to-BI-RADS estimation logic (Naive Bayes-based in this implementation)
- `AIDescriptionFromDatabase.py` – AI inference for database nodules
- `descriptors.py` – BI-RADS descriptor handling and mapping
- `expert_panel.py` – aggregation of expert annotations and comparison logic
- `statistics.py` – statistical computations for results and graphs
- `correlation.py` – agreement metrics (Cohen’s kappa, Fleiss’ kappa, etc.)

These modules decouple heavy logic from API views and improve maintainability and reproducibility.

---

## Authentication (Djoser + SimpleJWT)

Authentication is handled using Djoser with SimpleJWT.

Available endpoints under `/auth/` include:
- `POST /auth/jwt/create/` – Obtain access and refresh tokens (login)
- `POST /auth/jwt/refresh/` – Refresh access token
- `POST /auth/jwt/verify/` – Verify token validity

Authenticated API requests must include the header:

`Authorization: JWT <access_token>`

A custom password reset flow is also exposed through the backend (`/reset-password/`), integrated with Djoser configuration.

---

## Data Models (Core Domain)

### Nodule

Represents an ultrasound case available for description.

Fields:
- `name` – nodule identifier
- `image` – cropped/ROI image (`upload_to="nodule/images"`)
- `full_image` – full ultrasound image (`upload_to="full_nodule/images"`)
- `new` – User who uploaded the image

This model supports both database nodules and user-uploaded nodules.

---

### Description

Represents a BI-RADS annotation for a given nodule.

Relationships:
- `user` (FK to AUTH_USER_MODEL, nullable)
- `ai` (FK to AI, nullable)
- `nodule` (FK to Nodule)

A database constraint enforces that exactly one author exists:
- Either a human user OR the AI model (mutually exclusive)

Stored BI-RADS descriptors:
- Shape
- Margin
- Orientation (including “no orientation”)
- Echogenicity
- Posterior features
- Calcification
- Suggestivity (special clinical cases)
- BI-RADS category (2, 3, 4A, 4B, 4C, 5)
- Timestamp (`time`)

Indexes:
- `(user, nodule)`
- `(ai, nodule)`

These indexes optimize queries for comparisons, statistics, and history retrieval.

---

### Physicist

Extends the Django user model via a OneToOne relationship.

Fields:
- `experience` (years in breast ultrasound)
- `profession` (e.g., radiologist)

Used for profile information and research analysis.

---

### AI

Represents an AI entity that generates automated descriptions.

Field:
- `name` – identifier of the AI model

---

### TestUser

Marks users that operate under test-mode restrictions.

This supports the test account behavior shown in the frontend (limited capabilities and sample expert annotations).

---

## Media Storage and File Organization

The backend uses Django’s media storage (`MEDIA_ROOT`) to store:

- ROI images (`media/nodule/`)
- Full ultrasound images (`media/full_nodule/`)
- AI-generated description artifacts (`media/ai_descriptions/`)
- Stored model files (`media/models/`)

User-uploaded nodules are stored server-side and are treated as private content. Access control is enforced through authenticated backend endpoints rather than public file exposure.

---

## API Responsibilities for the Frontend

The backend provides endpoints consumed by the React frontend for:

- Nodule browsing and filtering
- Nodule detail retrieval
- Description submission
- AI description generation
- Expert panel comparison
- Statistical analysis and graphs
- User profile management

All business logic is centralized in the backend, while the frontend acts as a visualization and interaction layer.

---

## Statistics and Analytics Pipeline

The backend computes and exposes metrics used in the Results page, including:

- Intraobserver agreement (Cohen’s κ)
- Interobserver agreement with selected radiologists (Cohen’s κ)
- Impact on team agreement (Δ Fleiss’ κ)
- Descriptor distribution statistics across BI-RADS categories
- Comparison between user, AI, and expert panel annotations

These computations are implemented primarily in:
- `nodule/utils/statistics.py`
- `nodule/utils/correlation.py`
- `nodule/utils/expert_panel.py`

---

## Configuration and Environment Management

The project uses a split settings architecture:
- `common.py` for shared settings
- `dev.py` for development environment
- `prod.py` for production deployment

An `.env` file is used to store environment variables (e.g., secret keys, database credentials), improving security and reproducibility across environments.

---

## Summary

The BreastUSTraining backend follows a modular Django REST architecture with:

- JWT-based authentication via Djoser + SimpleJWT
- A dedicated domain app (`nodule`) for annotations, AI logic, and statistics
- A core app for user and platform-level functionality
- Structured data models aligned with BI-RADS descriptors
- Server-side media management for ultrasound images and user uploads
- Reproducible statistical computation for training feedback and expert comparison

This architecture supports secure data handling, scalable annotation workflows, and research-grade reproducibility aligned with the associated publication.