import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnalyticsErrorBoundary } from "./components/AnalyticsErrorBoundary";
import { analytics, resourceMonitor } from "./lib/analytics";
import { PostHogProvider } from "posthog-js/react";
import { getCurrentPlatform, getPlatformClasses } from "./lib/platform";
import "./assets/shimmer.css";
import "./styles.css";

// Initialize analytics before rendering
analytics.initialize();

// Start resource monitoring (check every 2 minutes)
resourceMonitor.startMonitoring(120000);

// Add platform-specific classes to enable platform-specific styling
(async () => {
  try {
    const platformClass = await getPlatformClasses();
    document.documentElement.classList.add(platformClass);
    console.log(`Platform detected: ${await getCurrentPlatform()}`);
  } catch (error) {
    // Fallback to browser detection if Tauri API is not available
    const isMacLike = typeof navigator !== "undefined" &&
      (navigator.platform?.toLowerCase().includes("mac") ||
        navigator.userAgent?.toLowerCase().includes("mac os x"));
    const isWindows = typeof navigator !== "undefined" &&
      navigator.platform?.toLowerCase().includes("win");
    
    if (isMacLike) {
      document.documentElement.classList.add("platform-macos");
    } else if (isWindows) {
      document.documentElement.classList.add("platform-windows");
    } else {
      document.documentElement.classList.add("platform-linux");
    }
    console.log("Platform detected using browser fallback");
  }
})();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === "development",
      }}
    >
      <ErrorBoundary>
        <AnalyticsErrorBoundary>
          <App />
        </AnalyticsErrorBoundary>
      </ErrorBoundary>
    </PostHogProvider>
  </React.StrictMode>,
);
