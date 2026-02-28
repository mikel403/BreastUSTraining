# Security, Privacy, and Access Control (As-Built)

## Scope

BreastUSTraining is a web-based training and research platform for structured BI-RADS annotation in breast ultrasound. The platform includes authenticated access, protected access to ultrasound images and ROIs, storage of user annotations, and computation of agreement metrics for educational and research feedback.

This document describes the security and privacy mechanisms **as implemented** in the current system (v1.1.0).

---

## Authentication (Djoser + SimpleJWT)

### Backend authentication mechanism
The backend uses **Djoser** together with **SimpleJWT** and authenticates protected endpoints using JWT authentication.

Clients must include a valid access token in the `Authorization` header for protected API requests.

The configured header type is:
- `Authorization: JWT <access_token>`

---

## Frontend Token Handling (As Implemented)

### Persisted authentication store
The frontend stores authentication state using a persisted Zustand store (`AuthStore`), which contains:
- `accesstoken`
- `refreshtoken`
- `username`

This store is persisted in the browser (via Zustand `persist`) under the key `"auth"`, allowing session continuity across page reloads.

---

## JWT Injection in API Requests

All authenticated HTTP requests use a shared Axios instance (`src/libs/axios.ts`) configured with a request interceptor.

Operational behavior:
1. The interceptor reads the current access token from the AuthStore at request time.
2. If a token exists, it injects the header:
   - `Authorization: JWT <access_token>`

This centralizes authentication logic and ensures consistent protection across all feature modules (Nodule, Description, Correlation, User).

---

## Token Refresh Mechanism (As Implemented)

The frontend implements a timer-driven refresh strategy using the refresh token.

### Refresh workflow
- If a refresh token exists in the AuthStore, the application schedules a periodic refresh call.
- Every 4 minutes, the frontend executes:
  - `POST /auth/jwt/refresh/`
  - Payload: `{ "refresh": "<refresh_token>" }`
- On successful response, the new access token (`res.data.access`) replaces the previous token in the AuthStore.

This mechanism maintains valid access tokens during active sessions without requiring the user to re-authenticate.

> Token refresh is interval-based. Requests are not automatically retried on 401 responses at the Axios layer.

---

## Route-Level Access Control (Frontend)

In addition to backend protection, the frontend enforces route-level access control through a `ProtectedRoute` component.

As implemented:
- All routes except **Login** and **Create Account** are protected.
- On route access (or when the access token changes), the system validates the token using `verifyToken()`.
- If the token is missing, invalid, or expired, the user is redirected to the login route (`/breastultrasound`).
- If valid, the requested route is rendered.

This prevents unauthenticated users from accessing protected UI views such as:
- Nodule pages
- Description workflows
- Results and statistics dashboards
- User-specific data views

The backend remains the final authority for access control.

---

## Authentication Endpoints

Authentication and user management routes are exposed under the `/auth/` prefix via Djoser:

- `/auth/` → Djoser user management (registration, user endpoints)
- `/auth/jwt/create/` → JWT login
- `/auth/jwt/refresh/` → Access token refresh (used by frontend timer)
- `/auth/jwt/verify/` → Token verification (used by ProtectedRoute logic)

Additionally, the backend exposes:
- `/reset-password/` (custom endpoint in the `core` app)

Djoser configuration includes:
- `PASSWORD_RESET_CONFIRM_RETYPE = True`

---

## CORS and Security Middleware (Backend)

The backend includes Django security and CORS middleware:

- `django.middleware.security.SecurityMiddleware`
- `django.middleware.csrf.CsrfViewMiddleware`
- `corsheaders.middleware.CorsMiddleware`

This configuration supports deployments where the React frontend and Django backend are served from different origins while maintaining controlled API access.

---

## Authorization and Role Logic

### Server-side enforcement
Protected operations (e.g., accessing cases, submitting annotations, retrieving results, AI comparisons, and statistics) are enforced by the backend using JWT authentication and permission checks.

The backend acts as the source of truth for:
- Resource access
- Data ownership validation
- Feature availability

### User categories
The platform distinguishes between user categories (e.g., test vs registered users) to control:
- Access to specific platform capabilities
- Inclusion in expert-panel and cohort comparisons
- Participation in aggregated agreement statistics

This separation preserves the integrity of expert baselines and research analytics.

---

## Protected Media Access (Ultrasound Images and ROIs)

### Media access model (as implemented)
Ultrasound images, ROIs, and user-uploaded nodules are stored in server-side media storage (`MEDIA_ROOT`) and are **not exposed as public static resources**.

Operational behavior:
- Direct public access to the `/media/` directory is disabled at the web server (Apache) level.
- The frontend does not load sensitive images via public file paths.
- Protected images are retrieved through authenticated backend endpoints.
- The backend verifies authentication and ownership permissions before serving media files.

A dedicated frontend utility component (`SecureImage.tsx`) retrieves protected images using authenticated Axios requests (JWT header) and renders them as blob URLs, preventing direct media exposure.

---

## Public Dataset vs Private Media Boundary

The platform differentiates between:
- Public reference dataset images
- User-uploaded medical images

Reference dataset images (curated for research and training) may be exposed through a restricted public URL namespace (e.g., `/public-media/...`) to enable efficient interface loading.

In contrast:
- User-uploaded nodules
- Uploaded ROIs
- Derived private case images

are always treated as private content and are only accessible through authenticated API endpoints with permission checks.

---

## Data Stored and Privacy Boundary

### Stored data categories
The platform stores:
- User accounts required for authentication
- BI-RADS descriptor annotations submitted by users
- Agreement metrics and longitudinal performance statistics
- User-uploaded nodules (images/ROIs) in server-side media storage

### Ownership and access to user-uploaded nodules
User-uploaded nodules stored in the media storage are treated as **private user-generated content**:

- Each uploaded nodule is associated with the uploading user (owner).
- Access to these nodules is restricted to the owner and authorized staff through authenticated backend requests.
- The frontend never accesses private media via unrestricted public URLs.
- The backend enforces authentication and ownership checks before returning any media file.

---

## Privacy Boundary

The platform is designed for training and research use and does not require patient-identifying information to function.

Ultrasound cases and datasets used within the system are assumed to be:
- curated for educational or research purposes,
- anonymised prior to upload, and
- handled under the policies and ethical approvals of the hosting institution or study protocol.

Users are responsible for ensuring that uploaded images do not contain identifiable patient information.

---

## AI Outputs and Safety Boundary

AI outputs (descriptor suggestions, AI comparisons, and expert panel comparisons) are integrated as **assistive educational feedback** within the annotation workflow.

The system:
- does not perform autonomous diagnosis,
- does not replace clinical judgement,
- and presents AI results solely as decision-support and training feedback.

---

## Summary

In v1.1.0, BreastUSTraining implements:
- Djoser-based authentication and user management
- SimpleJWT-based API authentication (`Authorization: JWT <token>`)
- Centralized Axios interceptor for automatic JWT injection
- Timer-based token refresh via `/auth/jwt/refresh/`
- Protected frontend routes with token verification
- Disabled direct public access to `/media/` at the web server level
- Authenticated backend delivery of ultrasound images and ROIs
- Secure blob-based rendering of protected images in the frontend
- Owner-restricted access to user-uploaded medical media
- Separation between public reference dataset and private user uploads
- Server-side enforcement of access control and research cohort integrity
- Secure storage of annotations and statistical metrics for longitudinal analysis