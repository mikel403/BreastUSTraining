# Security, Privacy, and Access Control (As-Built)

## Scope

BreastUSTraining is a web-based training and research platform for BI-RADS descriptor learning in breast ultrasound. The platform includes authenticated access, protected access to ultrasound images and ROIs, storage of user annotations, and computation of agreement metrics for educational feedback.

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

### Media access model (authenticated backend delivery)
Ultrasound images, ROIs, and user-uploaded nodules are stored in server-side media storage and are not exposed as public static resources.

Operational behavior:
- The frontend requests images and nodules through backend endpoints.
- The backend verifies authentication before serving media files.
- Direct anonymous access to protected media is not permitted.

During development (`DEBUG=True`), Django serves media via:
- `MEDIA_URL` and `MEDIA_ROOT`
using controlled URL patterns.

---

## Data Stored and Privacy Boundary

### Stored data categories
The platform stores:
- User accounts required for authentication
- BI-RADS descriptor annotations submitted by users
- User-uploaded nodules (images/ROIs) stored in server-side media storage


### Ownership and access to user-uploaded nodules
User-uploaded nodules stored in the media storage are treated as **private user-generated content**:

- Each uploaded nodule is associated with the uploading user (owner).
- Access to these nodules is restricted to the owner through authenticated backend requests.
- The frontend never accesses media via unrestricted public URLs.
- The backend enforces authentication and ownership checks before returning the file.

---

## Privacy Boundary

The platform is designed for training and research use. It does not require patient-identifying information to function.

Ultrasound cases and datasets used within the system are assumed to be:
- curated for educational or research purposes, and
- handled under the policies and ethical approvals of the hosting institution or study protocol.

---

## AI Outputs and Safety Boundary

AI outputs (descriptor suggestions, AI comparisons, and expert panel comparisons) are integrated as **assistive educational feedback**.

The system:
- does not perform autonomous diagnosis,
- does not replace clinical judgement,
- and presents AI results only as training support within the annotation workflow.

---

## Summary

In v1.1.0, BreastUSTraining implements:
- Djoser-based authentication endpoints
- SimpleJWT-based JWT authentication for the API
- JWT header format `Authorization: JWT <token>`
- Axios interceptor for automatic JWT injection
- Timer-based token refresh via `/auth/jwt/refresh/`
- Protected frontend routes using token verification
- Authenticated backend delivery of ultrasound images and nodules
- Owner-restricted access to user-uploaded media
- Server-side enforcement of access control and cohort logic
- Storage of annotations and statistical metrics for longitudinal training analysis