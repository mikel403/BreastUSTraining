# Installation Guide

## Overview

This document describes how to install and run the BreastUSTraining platform locally for development and research purposes.

The system consists of:
- A Django REST backend (Djoser + SimpleJWT)
- A React + TypeScript frontend (Vite)
- A MySQL database
- Server-side media storage for ultrasound images, ROIs, and user-uploaded nodules

MySQL Workbench is optional and only used as a graphical database client. The application only requires a running MySQL Server.

---

## System Requirements

### Backend
- Python 3.9 or higher
- pip
- MySQL Server (8.0 recommended)

### Frontend
- Node.js 18+ (recommended)
- npm

### Optional
- MySQL Workbench (database GUI)
- Virtual environment tools (venv or conda)

---

## 1. Clone the Repository

Clone the repository and move into the project directory:

```
git clone <REPOSITORY_URL>
cd BreastUSTraining
```

If you are working with a specific release:

```
git checkout v1.1.0
```

---

## 2. Backend Installation (Django)

The backend is located in the directory containing `manage.py` and the `WebApp/` folder.

### 2.1 Create and Activate a Virtual Environment

Linux / macOS:
```
python -m venv venv
source venv/bin/activate
```

Windows:
```
python -m venv venv
venv\Scripts\activate
```

Alternatively, a Conda environment can be used if preferred.

---

### 2.2 Install Backend Dependencies

Install the required Python packages:

```
pip install -r requirements.txt 
```

If you want to install torch and torchvision that comes with ultralytics:

```
pip install -r requirements_torch2.txt
```

---

## 3. Database Setup (MySQL)

Create the database:

```
CREATE DATABASE breastustraining CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create a dedicated database user (recommended):

```
CREATE USER 'breastus_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON breastustraining.* TO 'breastus_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 4. Configure Django Database Settings

Configure the database in your Django settings file (e.g., `WebApp/settings/dev.py` or `prod.py`):

```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "breastustraining",
        "USER": "breastus_user",
        "PASSWORD": "your_password",
        "HOST": "127.0.0.1",
        "PORT": "3306",
    }
}
```

Also ensure media settings are defined:

```
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
```

---

## 5. Apply Migrations and Run the Backend

From the directory containing `manage.py`:

```
python manage.py migrate
python manage.py runserver
```

The backend API will be available at:
http://127.0.0.1:8000/

---
If something fails check which python packages haven't been installed correctly

## 6. Frontend Installation (React + Vite)

Navigate to the frontend directory and install dependencies:

```
cd frontend
npm install
```

Configure the backend base URL in:
`src/libs/url.ts`

For local development, it should typically point to:
```
http://127.0.0.1:8000
```

Run the development server:

```
npm run dev
```

The frontend will be available at:
http://localhost:5173/

---

## 7. Authentication Configuration

The platform uses Djoser with SimpleJWT for authentication.

Main endpoints:
- POST /auth/jwt/create/ (login)
- POST /auth/jwt/refresh/ (refresh token)
- POST /auth/jwt/verify/ (token validation)

Authenticated API requests must include:
```
Authorization: JWT <access_token>
```

---

## 8. Media Storage

Ultrasound images, ROIs, and user-uploaded nodules are stored in Django’s media directory (`MEDIA_ROOT`).

Key characteristics:
- Media files are stored server-side
- Access to protected media is controlled through authenticated backend endpoints
- User-uploaded nodules are private and only accessible to their owner

Create the subfolders ai_descriptions, full_nodule, models and nodule in your media folder and populate them with your data.

During development (DEBUG=True), Django serves media files via MEDIA_URL.