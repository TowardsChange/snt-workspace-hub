import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: SplitLogin,
});

const HEADLINE = "Bring AI to every pre-construction decision.";
const SUBTEXT =
  "SpieB AI helps SPIE Batignolles teams query their document base, compare bids and run trusted agents — securely, in one place.";

function useTypewriter(text: string, speed = 35, startDelay = 250) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return out;
}

function SplitLogin() {
  const nav = useNavigate();
  const typed = useTypewriter(HEADLINE);
  const done = typed.length === HEADLINE.length;

  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif' }}
    >
      {/* LEFT: dark panel with typewriter */}
      <div
        className="relative hidden md:flex flex-col justify-between flex-1 px-16 py-14 overflow-hidden"
        style={{ background: "#0B1220", color: "white" }}
      >
        {/* subtle grid + glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(800px 500px at 20% 10%, rgba(245,154,35,0.10), transparent 60%), radial-gradient(700px 500px at 80% 90%, rgba(0,103,184,0.18), transparent 60%)",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          aria-hidden
        >
          <defs>
            <pattern id="grid2" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>

        {/* Top: SPIE Batignolles wordmark */}
        <div className="relative z-10">
          {/* TODO: replace with real SPIE Batignolles logo */}
          <div
            style={{
              background: "transparent",
              width: 200,
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              SPIE
            </div>
            <div style={{ height: 2, width: 56, background: "#F59A23" }} />
            <div
              style={{
                color: "white",
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              Batignolles
            </div>
          </div>
        </div>

        {/* Middle: typewriter headline */}
        <div className="relative z-10 max-w-[640px]">
          <h1
            style={{
              fontFamily:
                '"Times New Roman", "Source Serif Pro", Georgia, serif',
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              minHeight: 180,
            }}
          >
            {typed}
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 3,
                height: "0.95em",
                background: "#F59A23",
                marginLeft: 6,
                verticalAlign: "-0.12em",
                animation: "spieb-caret 1s steps(2) infinite",
              }}
            />
          </h1>
          <p
            className="mt-8 text-white/70"
            style={{
              fontSize: 16,
              lineHeight: 1.55,
              maxWidth: 520,
              opacity: done ? 1 : 0,
              transform: done ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 600ms ease, transform 600ms ease",
            }}
          >
            {SUBTEXT}
          </p>
        </div>

        {/* Bottom: tag */}
        <div className="relative z-10 text-xs uppercase tracking-[0.18em] text-white/40">
          Internal AI Workspace · Pre-construction
        </div>

        <style>{`@keyframes spieb-caret { 0%,100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
      </div>

      {/* RIGHT: login panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-[400px]">
          {/* SpieB.ai wordmark */}
          <div className="flex items-center gap-2 mb-12">
            <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
              <rect x="3" y="3" width="8" height="18" rx="1.5" fill="#F59A23" />
              <rect x="3" y="14" width="18" height="7" rx="1.5" fill="#F59A23" />
            </svg>
            <span
              style={{ fontSize: 22, fontWeight: 700, color: "#1B1B1B", letterSpacing: "-0.01em" }}
            >
              SpieB<span style={{ color: "#F59A23" }}>.ai</span>
            </span>
          </div>

          <h2
            style={{
              fontWeight: 600,
              fontSize: 28,
              color: "#1B1B1B",
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
          >
            Sign in
          </h2>
          <p style={{ fontSize: 15, color: "#5e5e5e", marginBottom: 32 }}>
            Use your SPIE Batignolles work account to continue.
          </p>

          <button
            type="button"
            onClick={() => nav({ to: "/home" })}
            className="group w-full flex items-center justify-center gap-3 transition-colors"
            style={{
              height: 48,
              background: "#1A2540",
              color: "white",
              border: "1px solid #1A2540",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#11192e")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A2540")}
          >
            <svg viewBox="0 0 21 21" width="18" height="18" aria-hidden>
              <rect x="0" y="0" width="9" height="9" fill="#F25022" />
              <rect x="10" y="0" width="9" height="9" fill="#7FBA00" />
              <rect x="0" y="10" width="9" height="9" fill="#00A4EF" />
              <rect x="10" y="10" width="9" height="9" fill="#FFB900" />
            </svg>
            Sign in with Microsoft
          </button>

          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              color: "#5e5e5e",
              textAlign: "center",
            }}
          >
            Signed in as{" "}
            <span style={{ color: "#1B1B1B", fontWeight: 500 }}>
              pascal.bigard@spiebatignolles.fr
            </span>
          </div>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "center",
              gap: 20,
              fontSize: 12,
              color: "#9a9a9a",
            }}
          >
            <a href="#" style={{ color: "#9a9a9a" }}>Privacy &amp; cookies</a>
            <a href="#" style={{ color: "#9a9a9a" }}>Terms of use</a>
            <a href="#" style={{ color: "#9a9a9a" }}>Help</a>
          </div>
        </div>
      </div>
    </div>
  );
}
