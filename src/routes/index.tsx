import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: MicrosoftLogin,
});

function MicrosoftLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("pascal.bigard@spiebatignolles.fr");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      style={{
        fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
        background:
          "radial-gradient(ellipse at top right, #2A3A66 0%, #1A2540 55%, #11192e 100%)",
      }}
    >
      {/* Subtle geometric overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M 0 0 L 80 80" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="flex-1 flex items-start justify-center pt-[18vh] px-4 relative z-10">
        <div
          className="bg-white"
          style={{
            width: 440,
            minHeight: 480,
            borderRadius: 4,
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
            padding: "44px 44px 36px",
          }}
        >
          {/* Microsoft logo */}
          <svg viewBox="0 0 108 24" width="108" height="24" aria-label="Microsoft">
            <rect x="0" y="0" width="10" height="10" fill="#F25022" />
            <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
            <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
            <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
            <text x="28" y="16" fontFamily="Segoe UI, sans-serif" fontSize="14" fill="#5e5e5e">
              Microsoft
            </text>
          </svg>

          {/* TODO: replace with real SPIE Batignolles logo */}
          <div
            className="mt-6 mb-8"
            style={{
              background: "#1A2540",
              height: 56,
              width: 200,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              SPIE
            </div>
            <div style={{ height: 2, width: 48, background: "#F59A23" }} />
            <div
              style={{
                color: "white",
                fontWeight: 400,
                fontSize: 13,
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              Batignolles
            </div>
          </div>

          <h1
            style={{
              fontWeight: 600,
              fontSize: 24,
              color: "#1B1B1B",
              marginBottom: 12,
            }}
          >
            Sign in
          </h1>
          <p style={{ fontWeight: 400, fontSize: 15, color: "#1B1B1B", marginBottom: 24 }}>
            to continue to SpieB AI
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%",
              height: 36,
              paddingLeft: 8,
              fontSize: 15,
              border: "1px solid #666",
              borderBottom: focused ? "2px solid #0067b8" : "1px solid #666",
              borderRadius: 0,
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          <div style={{ marginTop: 8, fontSize: 13 }}>
            <a href="#" style={{ color: "#0067b8", display: "block", marginBottom: 4 }}>
              Can't access your account?
            </a>
            <a href="#" style={{ color: "#0067b8", display: "block" }}>
              Sign-in options
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button
              type="button"
              onClick={() => nav({ to: "/home" })}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005a9e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0067b8")}
              style={{
                width: 108,
                height: 32,
                background: "#0067b8",
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                borderRadius: 0,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sign in
            </button>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
              gap: 16,
              fontSize: 12,
              color: "#5e5e5e",
            }}
          >
            <a href="#" style={{ color: "#5e5e5e" }}>Privacy &amp; cookies</a>
            <a href="#" style={{ color: "#5e5e5e" }}>Terms of use</a>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 flex items-center justify-between"
        style={{ padding: "16px 24px", color: "#B5B5B5", fontSize: 11 }}
      >
        <span>© 2025 Microsoft</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" style={{ color: "#B5B5B5" }}>Privacy &amp; cookies</a>
          <a href="#" style={{ color: "#B5B5B5" }}>Terms of use</a>
        </div>
      </div>
    </div>
  );
}
