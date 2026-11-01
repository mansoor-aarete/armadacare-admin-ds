import { createRoot } from "react-dom/client";
// SLDS 1 stylesheet from the pinned npm package — must load before the theme (src/styles/index.css).
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
import "./styles/index.css";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
