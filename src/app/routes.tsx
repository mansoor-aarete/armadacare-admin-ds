import { createBrowserRouter, Navigate } from "react-router";
import { ConsoleApp } from "./console/ConsoleApp";
import { ShowcasePage } from "./showcase/ShowcasePage";

// "/" opens the console on the Accounts list view; "/showcase" is the design-system showcase.
export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/lightning/o/Account/list?filterName=NewThisWeek" replace /> },
  { path: "/showcase", element: <ShowcasePage /> },
  { path: "/lightning/*", element: <ConsoleApp /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
