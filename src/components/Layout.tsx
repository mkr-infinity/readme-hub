import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, FileText, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import Chatbot from "./Chatbot";
import { useAppContext } from "../context/AppContext";

const NAV_ITEMS = [
  { to: "/", label: "Home", Icon: Home, accent: "var(--color-primary)" },
  { to: "/flashcards", label: "Cards", Icon: BookOpen, accent: "#3b82f6" },
  { to: "/tests", label: "Tests", Icon: FileText, accent: "#14b8a6" },
  { to: "/settings", label: "Settings", Icon: SettingsIcon, accent: "#f59e0b" },
] as const;

const Layout: React.FC = () => {
  const { state } = useAppContext();
  const {
    navBarHeight = 68,
    navBarIconSize = 22,
    navBarHideLabels = false,
    navOrientation = "horizontal",
  } = state.user;

  const location = useLocation();
  const hideNavPaths = ["/onboarding"];
  const shouldHideNav = hideNavPaths.some((p) => location.pathname.startsWith(p));
  const isVertical = navOrientation === "vertical";

  const navHeight = Math.max(60, navBarHeight);

  return (
    <div
      className={`flex h-full w-full overflow-hidden anime-page-bg text-primary-fg font-display ${
        isVertical ? "flex-row" : "flex-col"
      }`}
    >
      <main
        className="flex-1 overflow-y-auto safe-area-top"
        style={{
          WebkitOverflowScrolling: "touch",
          paddingBottom: shouldHideNav
            ? "env(safe-area-inset-bottom)"
            : !isVertical
            ? `calc(${navHeight + 36}px + env(safe-area-inset-bottom))`
            : "env(safe-area-inset-bottom)",
          paddingLeft:
            !shouldHideNav && isVertical
              ? `calc(88px + env(safe-area-inset-left))`
              : "env(safe-area-inset-left)",
        }}
      >
        <Outlet />
      </main>

      {!shouldHideNav && (
        <>
          {location.pathname === "/" && <Chatbot />}

          {isVertical ? (
            <nav
              className="fixed left-0 top-1/2 -translate-y-1/2 z-50 safe-area-left"
              style={{ paddingLeft: "env(safe-area-inset-left)" }}
            >
              <div className="glass shadow-card-lg rounded-[28px] flex flex-col items-center gap-1 p-1.5 ml-2">
                {NAV_ITEMS.map(({ to, label, Icon, accent }) => (
                  <NavLink key={to} to={to} end={to === "/"}>
                    {({ isActive }) => (
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ y: -1 }}
                        className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-colors ${
                          isActive ? "text-white" : "text-tertiary-fg"
                        }`}
                      >
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="nav-pill-v"
                              transition={{ type: "spring", stiffness: 420, damping: 32 }}
                              className="absolute inset-0 rounded-2xl shadow-glow"
                              style={{
                                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                              }}
                            />
                            <motion.span
                              layoutId="nav-spark-v"
                              className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                            />
                          </>
                        )}
                        <Icon size={navBarIconSize} className="relative z-10" strokeWidth={isActive ? 2.6 : 2} />
                        {!navBarHideLabels && (
                          <span className="relative z-10 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                            {label}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          ) : (
            <nav
              className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none"
              style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 10px)` }}
            >
              <div
                className="pointer-events-auto glass shadow-card-lg rounded-[28px] flex items-stretch gap-1 px-1.5 py-1.5 w-full max-w-md relative overflow-hidden"
                style={{ height: navHeight }}
              >
                {/* subtle moving sheen */}
                <motion.div
                  aria-hidden
                  className="absolute inset-y-0 w-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
                  }}
                  initial={{ x: "-30%" }}
                  animate={{ x: ["-30%", "130%"] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />

                {NAV_ITEMS.map(({ to, label, Icon, accent }) => (
                  <NavLink key={to} to={to} end={to === "/"} className="flex-1">
                    {({ isActive }) => (
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={`relative flex flex-col items-center justify-center h-full rounded-[22px] transition-colors ${
                          isActive ? "text-white" : "text-tertiary-fg"
                        }`}
                      >
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="nav-pill-h"
                              transition={{ type: "spring", stiffness: 420, damping: 30 }}
                              className="absolute inset-0 rounded-[22px] shadow-glow"
                              style={{
                                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                              }}
                            />
                            {/* glowing dot under icon */}
                            <motion.span
                              layoutId="nav-dot-h"
                              className="absolute bottom-1 size-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                            />
                          </>
                        )}

                        <motion.div
                          animate={{
                            y: isActive ? -2 : 0,
                            scale: isActive ? 1.06 : 1,
                            rotate: isActive ? [0, -6, 6, 0] : 0,
                          }}
                          transition={{
                            y: { type: "spring", stiffness: 350, damping: 26 },
                            scale: { type: "spring", stiffness: 350, damping: 26 },
                            rotate: { duration: 0.55, ease: "easeOut" },
                          }}
                          className="relative z-10 flex flex-col items-center"
                        >
                          <Icon size={navBarIconSize} strokeWidth={isActive ? 2.6 : 2} />
                          {!navBarHideLabels && (
                            <span className="text-[10px] font-bold tracking-wide mt-0.5">
                              {label}
                            </span>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Layout;
