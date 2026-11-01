import { createBrowserRouter, Navigate } from "react-router";
import { ShowcasePage } from "./showcase/ShowcasePage";

// Design system only — no app pages yet. "/" goes to the component showcase.
export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/showcase" replace /> },
  { path: "/showcase", element: <ShowcasePage /> },
  { path: "*", element: <Navigate to="/showcase" replace /> },
]);
