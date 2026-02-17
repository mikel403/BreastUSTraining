import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NodulesPage from "../pages/NodulesPage";
import NodulesDetailPage from "../pages/NodulesDetailPage";
import NodulesDescribePage from "../pages/NodulesDescribePage";
import Layout from "../NavBar/Layout";
import DescribedNodulesPage from "../pages/DescribedNodulesPage";
import CreateNodulePage from "../pages/CreateNodulePage";
import ResultsPage from "../pages/ResultsPage";
import NodulesDetailList from "../Description/components/NodulesDetailList";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ChangeUserPage from "../pages/ChangeUserPage";
import ProtectedRoute from "../api/protectedRoute";
import CreateAccountPage from "../pages/CreateAccountPage";

const router = createBrowserRouter([
  { path: "/breastultrasound", element: <LoginPage /> },
  { path: "/breastultrasound/register", element: <CreateAccountPage /> },
  {
    path: "/breastultrasound",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "nodules",
        element: (
          <ProtectedRoute>
            <NodulesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "newNodules",
        element: (
          <ProtectedRoute>
            <CreateNodulePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "described-nodules",
        element: (
          <ProtectedRoute>
            <DescribedNodulesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-username",
        element: (
          <ProtectedRoute>
            <ChangeUserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "nodules/:name",
        element: (
          <ProtectedRoute>
            <NodulesDescribePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "described-nodules/:name",
        element: (
          <ProtectedRoute>
            <NodulesDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "results",
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
