import logo from "@/assets/spie-batignolles-logo.png";

export function SpiebLogo({ size = 22 }: { size?: number }) {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="SPIE Batignolles"
        style={{ height: size * 1.6, width: "auto", display: "block" }}
      />
    </div>
  );
}
