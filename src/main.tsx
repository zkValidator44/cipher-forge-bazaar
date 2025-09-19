import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RainbowKitProviderWrapper } from "./providers/RainbowKitProvider";

createRoot(document.getElementById("root")!).render(
  <RainbowKitProviderWrapper>
    <App />
  </RainbowKitProviderWrapper>
);
