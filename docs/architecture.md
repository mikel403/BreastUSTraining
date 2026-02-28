# System Architecture

## Architectural Overview

BreastUSTraining is a modular web-based platform for AI-assisted breast ultrasound training and observer agreement analysis. It follows a client–server architecture that integrates (i) an interactive annotation and results UI, (ii) a Django REST backend, and (iii) paper-aligned AI and analytics modules.

The architecture is composed of four layers:

1. **Frontend**: React + TypeScript single-page application (SPA)
2. **Backend API**: Django REST Framework with Djoser + SimpleJWT
3. **AI & Analytics**: assistive inference + agreement/statistical computations
4. **Persistence**: MySQL database + server-side media storage (ultrasound images/ROIs)

Security and privacy mechanisms are documented in **`docs/security.md`**.

---

## Frontend Architecture (React + TypeScript)

The frontend is implemented as a SPA with a domain-oriented structure. All source code is located under `src/`.

### Technology stack (frontend)
- React + TypeScript
- React Router (RouterProvider + route configuration)
- Zustand (persisted authentication store)
- TanStack React Query (data fetching, caching, request state)
- Axios (HTTP client with JWT injection)
- Chakra UI (UI components/theme provider)
- Bootstrap CSS (base styling)

### Frontend project structure

The frontend is organized by feature domains. Each domain typically contains:
- **`components/`**: UI components specific to the feature
- **`<domain>Hooks/`**: data hooks for API integration (React Query) and business logic

High-level structure:

- `src/api/`
  - Authentication and user lifecycle requests (e.g., login, logout, refresh, register, reset password, token verification, media security)
- `src/libs/`
  - `url.ts`: base URL / API target
  - `axios.ts`: configured Axios instance (injects JWT into requests)
- `src/store/`
  - `store.tsx`: persisted Zustand AuthStore (access token, refresh token, username)
- `src/routing/`
  - `routes.tsx`: route definitions and router instance
- `src/NavBar/`
  - `Layout.tsx` and `NavBar.tsx`: layout shell and navigation
- `src/pages/`
  - Top-level pages/screens (login, home, create nodule, describe, results, account management)
- Domain modules:
  - `src/Correlation/` (agreement tables and graphs)
  - `src/Description/` (BI-RADS description workflow and AI/expert comparison hooks)
  - `src/Nodule/` (case/nodule listing, detail views, upload flow)
  - `src/User/` (user hooks; account-related operations)

This structure keeps UI rendering (components) separated from remote state and logic (hooks), and makes feature development independent and maintainable.

---

## Frontend Runtime Flow

### Application entry point (`main.tsx`)
At runtime, the app configures global providers and routing:

- `ChakraProvider`: UI system wrapper
- `QueryClientProvider`: React Query client for caching and async state
- `RouterProvider`: route-driven navigation

The frontend also implements a periodic refresh mechanism:
- If a refresh token exists in the auth store, the app schedules `refreshRequest()` every **4 minutes** to keep the access token valid during active usage.

This provides a smooth authenticated user experience without manual re-login in normal sessions.

---

## Authentication State (Zustand AuthStore)

Authentication state is stored client-side using a persisted Zustand store:

- `accesstoken`
- `refreshtoken`
- `username`

State setters are exposed as:
- `setaccesstoken(...)`
- `setrefreshtoken(...)`
- `setusername(...)`

Persistence is enabled via `zustand/middleware` (`persist`) under the storage key `"auth"`, allowing session continuity across browser reloads.

---

## API Access Layer (Axios + JWT)

The frontend centralizes outbound HTTP behavior in `src/libs/axios.ts`:

- Uses a configured Axios instance for all API calls
- Attaches the JWT access token to requests (Authorization header)
- Works together with the auth store (Zustand) and token refresh request logic

The backend target/base URL is centralized in `src/libs/url.ts`, enabling consistent environment configuration.

---

## Feature Modules (Domain-Level Architecture)

### 1) Nodule (cases / upload / navigation)
The `Nodule` domain includes:
- pages and components for listing nodules/cases, viewing details, and creating/uploading nodules
- hooks encapsulating backend requests and query caching patterns

### 2) Description (BI-RADS annotation + comparison)
The `Description` domain covers the main user workflow:
- descriptor selection forms and UI
- submission of BI-RADS descriptors
- hooks for computing or retrieving:
  - AI-based description outputs
  - expert panel comparisons
  - user submitted descriptions

### 3) Correlation (agreement + statistics UI)
The `Correlation` domain implements the results analytics user interface, including:
- intraobserver agreement computations
- interobserver agreement comparisons with selected radiologists
- team-impact analysis using Δ Fleiss’ kappa
- statistical graphs comparing descriptor distributions

### 4) User (account operations)
The `User` domain provides hooks for account-level operations and user-related API interactions.

---

## Backend Layer (Django REST + Djoser + SimpleJWT)

The backend exposes a REST API and handles:

- Authentication and user management (Djoser + SimpleJWT)
- Case/nodule metadata and annotation persistence
- Expert panel comparison services
- Statistical computation and aggregation
- AI-assisted inference orchestration (paper-aligned pipeline)
- Controlled access to ultrasound images and ROIs (server-side media storage)

---

## AI and Analytics (Paper-Inspired Integration)

The AI components integrated in the platform are conceptually based on the methodology described in the associated publication, but adapted for an interactive training and comparison environment.

The operational AI workflow in the web application is:

1. YOLO-based ROI detection (nodule localization)
2. CNN + attention-based descriptor extraction
3. Descriptor-based probabilistic classification for BI-RADS category estimation
4. Rule-based post-processing and comparison with expert panel and user annotations

The platform was designed from the outset as an educational and observer-analysis system, not as a strict reproduction of the research training pipeline described in the publication.

Therefore, the AI module should be interpreted as an assistive component that supports:
- user vs AI comparison,
- user vs expert panel benchmarking,
- educational feedback through descriptor-level analysis,

rather than as an autonomous diagnostic or standalone research inference system.
---

## Persistence Layer (Database + Media)

- Structured entities (users, nodules/cases, annotations, expert references, statistics) are stored in MySQL.
- User-uploaded ultrasound images and cropped ROIs are stored in server-side media storage and are **not publicly accessible**; they are served exclusively through authenticated backend endpoints with permission checks (owner/staff access).
- Images from the public reference dataset are served via a **public URL namespace** (e.g., `/public-media/...`) for fast access, while user-uploaded content remains private by default.

---

## End-to-End Data Flow (Typical Session)

1. User logs in (JWT obtained via backend auth)
2. Frontend stores tokens in AuthStore
3. User navigates to nodules/cases and selects a tumour
4. User submits BI-RADS descriptors
5. Backend stores annotation and updates derived statistics
6. User can compare immediately with:
   - AI outputs
   - other radiologists (where available)
7. Results page presents agreement tables and statistical graphs
8. Token refresh runs periodically during active sessions (refresh token present)

