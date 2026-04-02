import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { NewAssessment } from "./components/NewAssessment";
import { AdminDashboard } from "./components/AdminDashboard";
import { SubmissionDetail } from "./components/SubmissionDetail";
import { AIAutoFill } from "./components/AIAutoFill";
import { MySubmissions } from "./components/MySubmissions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/new-assessment",
    Component: NewAssessment,
  },
  {
    path: "/my-submissions",
    Component: MySubmissions,
  },
  {
    path: "/ai-autofill",
    Component: AIAutoFill,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/submission/:id",
    Component: SubmissionDetail,
  },
]);
