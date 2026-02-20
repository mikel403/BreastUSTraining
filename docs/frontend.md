# Frontend Architecture (React + TypeScript)

## Overview

The BreastUSTraining frontend is a React + TypeScript Single-Page Application (SPA) built with Vite. It provides authenticated access to a training platform for breast ultrasound BI-RADS description, including nodule browsing, structured annotation, AI/expert comparison, and statistical feedback dashboards.

The frontend is organized using a domain-oriented architecture where each main data domain (Nodule, Description, Correlation, User) contains its own components and hooks, while shared infrastructure (routing, API, store, layout) is centralized.

---

## Tech Stack

- React + TypeScript (Vite)
- React Router (RouterProvider)
- Zustand (persisted authentication state)
- TanStack React Query (server state management and caching)
- Axios (HTTP client)
- Chakra UI (UI framework)
- Bootstrap CSS (base styling)

---

## High-Level Frontend Structure (`src/`)

The application follows a modular, domain-driven folder structure:

### Core Infrastructure
- `src/main.tsx` → Application entry point and global providers
- `src/routing/routes.tsx` → Route definitions
- `src/store/store.tsx` → Global authentication state (Zustand)
- `src/libs/axios.ts` → Axios instance with JWT interceptor
- `src/libs/url.ts` → Backend base URL configuration
- `src/NavBar/` → Global layout and navigation bar

### API Layer
Located in `src/api/`, handling authentication and user lifecycle:
- `loginRequest.ts`
- `logoutRequest.ts`
- `refreshRequest.ts`
- `registerRequest.ts`
- `resetPassword.ts`
- `resetUsername.ts`
- `verifyToken.ts`
- `protectedRoute.tsx` (route-level access protection)

### Domain Modules
Each domain contains `components/` and `*Hooks/`:

- `src/Nodule/` → Nodule browsing, filtering, and upload logic
- `src/Description/` → BI-RADS description workflow and AI/expert comparison
- `src/Correlation/` → Statistics, agreement metrics, and graphs
- `src/User/` → User-related hooks (profile and account operations)

### Pages (`src/pages/`)
Top-level screens rendered by the router:
- `LoginPage.tsx`
- `CreateAccountPage.tsx`
- `ProfilePage.tsx`
- `HomePage.tsx`
- `NodulesPage.tsx`
- `NodulesDetailPage.tsx`
- `NodulesDescribePage.tsx`
- `DescribedNodulesPage.tsx`
- `CreateNodulePage.tsx`
- `ResultsPage.tsx`
- `ChangeUserPage.tsx`
- `ChangePasswordPage.tsx`

---

## Application Entry Point (`main.tsx`)

The application bootstraps the global providers:

- `ChakraProvider` for UI
- `QueryClientProvider` (React Query) for server state
- `RouterProvider` for routing

Additionally, a periodic token refresh mechanism is implemented:
- If a refresh token exists, `refreshRequest()` is executed every 4 minutes
- This maintains session continuity without forcing frequent re-authentication

---

## Layout and Navigation Architecture

### Global Layout (`Layout.tsx`)
The application uses a shared layout wrapper that:
- Renders the top navigation bar
- Displays the active page content below the navbar
- Ensures consistent UI structure across all protected pages

### Navigation Bar (`NavBar.tsx`)

The top navigation bar defines the primary user workflow and contains three main sections:

#### 1. Home
- Redirects to the Home page
- Displays platform information, usage instructions, and references

#### 2. Describe Ultrasound Images (Dropdown)
- **From Database**
  - Opens the nodule browser with filtering and search capabilities
- **New Image**
  - Opens the user upload workflow for new ultrasound images

#### 3. Profile Options (Dropdown)
- **Results**
  - Opens the statistics and agreement analysis dashboard
- **Edit Profile**
  - Opens the user profile page (username, profession, experience, etc.)
- **Log out**
  - Ends the session and redirects to the login page

This layout reflects the core pedagogical workflow: browse → describe → compare → analyze results.

---

## Routing and Page Access Control

Routing is defined in `src/routing/routes.tsx` and wrapped with `ProtectedRoute` for authenticated sections.

### Public Routes
- Login page
- Create account page

### Protected Routes (Require valid JWT)
- Home page
- Nodule browsing and detail pages
- Description workflow pages
- Results/statistics dashboard
- Profile and account management pages

---

## Authentication State Management (Zustand)

Authentication is handled using a persisted Zustand store (`AuthStore`) containing:
- `accesstoken`
- `refreshtoken`
- `username`

Persistence is enabled via `persist` middleware under the storage key `"auth"`, allowing sessions to survive page reloads.

---

## JWT Handling and HTTP Layer

All API requests use a centralized Axios instance (`src/libs/axios.ts`).

### Request Interceptor
Before each request:
- The access token is retrieved from the AuthStore
- If present, the header is injected:
  
  `Authorization: JWT <access_token>`

This ensures consistent authentication across all modules without manual header management.

---

## Token Refresh Workflow (SimpleJWT)

Token refresh is implemented as:

- Endpoint: `POST /auth/jwt/refresh/`
- Payload: `{ refresh: <refresh_token> }`
- On success: the new access token is stored in the AuthStore

The refresh is timer-driven (every 4 minutes) when a refresh token exists.

---

## ProtectedRoute Mechanism

All routes except login and account creation are wrapped with `ProtectedRoute`.

Behavior:
- Validates the current access token using `verifyToken()`
- If the token is invalid or expired, the user is redirected to the login route (`/breastultrasound`)
- If valid, the requested page is rendered

This provides frontend-level access control, while the backend enforces final authorization.

---

## Nodule Browsing and Description Workflow

### Nodule Browser (`NodulesPage`)
Features:
- Search by nodule name
- Filter by number of times described
- Option to show only user-uploaded nodules
- Random tumour selection
- Grid visualization with thumbnails and metadata

### Description Workflow (`NodulesDescribePage`)
- Structured BI-RADS descriptor form
- Progress tracking UI
- After submission, users can compare:
  - Their description
  - AI predictions
  - Expert panel annotations (when available)

---

## Results and Statistics (Correlation Domain)

The Results page provides analytical feedback based on user annotations:

- Intraobserver agreement (Cohen’s κ)
- Interobserver agreement with selected radiologist (Cohen’s κ)
- Impact on team agreement (Δ Fleiss’ κ)
- Descriptor distribution graphs
- BI-RADS normalization and descriptor normalization visualizations
- Comparison against overall users or expert cohort

These views are implemented in:
- `src/Correlation/components/`
- `src/Correlation/correlationHooks/`

---

## Design Principles

The frontend follows these architectural principles:

- Domain-driven modular structure (Correlation, Description, Nodule, User)
- Separation of UI (components) and logic (hooks)
- Centralized authentication and API handling
- Persistent session management with JWT
- Reusable global layout and navigation
- Clear routing separation between public and protected pages

This design supports scalability, maintainability, and reproducibility in research-oriented training workflows.