/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import Layout from "./components/Layout";
import UpdateNotifier from "./components/UpdateNotifier";
import PdfExportProvider from "./components/PdfExportProvider";
import AiErrorProvider from "./components/AiErrorProvider";
import { MotionConfig } from "framer-motion";

const Onboarding = React.lazy(() => import("./screens/Onboarding"));
const Home = React.lazy(() => import("./screens/Home"));
const Flashcards = React.lazy(() => import("./screens/Flashcards"));
const MockTests = React.lazy(() => import("./screens/MockTests"));
const Stats = React.lazy(() => import("./screens/Stats"));
const FormulaLibrary = React.lazy(() => import("./screens/FormulaLibrary"));
const Settings = React.lazy(() => import("./screens/Settings"));
const About = React.lazy(() => import("./screens/About"));

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-app">
    <div className="flex flex-col items-center gap-4">
      <div className="size-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-soft)] animate-pulse shadow-glow" />
      <div className="h-1.5 w-24 rounded-full bg-surface-2 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-[var(--color-primary)] animate-[indeterminate_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  </div>
);

const AppRoutes = () => {
  const { state } = useAppContext();
  const location = useLocation();

  if (!state.user.onboardingCompleted && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/onboarding/1" replace />;
  }

  return (
    <MotionConfig
      reducedMotion={state.user.animationsEnabled === false ? "always" : "user"}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="mobile-frame">
        <div className="mobile-frame__device">
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location}>
              <Route path="/onboarding/:step" element={<Onboarding />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/tests" element={<MockTests />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/formulas" element={<FormulaLibrary />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </MotionConfig>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AiErrorProvider>
          <PdfExportProvider>
            <UpdateNotifier />
            <AppRoutes />
          </PdfExportProvider>
        </AiErrorProvider>
      </BrowserRouter>
    </AppProvider>
  );
}
