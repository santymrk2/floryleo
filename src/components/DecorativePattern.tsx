import type { FC } from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface DecorativePatternProps {
  corner?: Corner;
  className?: string;
}

/**
 * Decoración botánica SVG para las esquinas de las secciones.
 * Hojas estilizadas con un diseño orgánico y sutil.
 */
const DecorativePattern: FC<DecorativePatternProps> = ({
  corner = "top-left",
  className = "",
}) => {
  const rotations: Record<Corner, string> = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90)",
    "bottom-left": "rotate(-90)",
    "bottom-right": "rotate(180)",
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: rotations[corner] }}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rama curva principal */}
        <path
          d="M0 120 C30 100 50 70 60 40 C65 25 68 15 70 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.15"
          className="text-green-moss"
        />

        {/* Hoja 1 */}
        <path
          d="M30 80 C35 75 42 72 45 68 C42 65 35 62 30 58 C28 62 28 75 30 80Z"
          fill="currentColor"
          opacity="0.12"
          className="text-green-moss"
        />

        {/* Hoja 2 */}
        <path
          d="M48 60 C52 56 58 54 60 50 C57 47 52 44 48 42 C46 46 46 56 48 60Z"
          fill="currentColor"
          opacity="0.10"
          className="text-green-moss"
        />

        {/* Hoja 3 */}
        <path
          d="M15 100 C20 96 26 94 28 90 C26 87 20 84 15 82 C13 86 13 96 15 100Z"
          fill="currentColor"
          opacity="0.08"
          className="text-green-moss"
        />

        {/* Detalle dorado */}
        <circle
          cx="60"
          cy="40"
          r="2"
          fill="currentColor"
          opacity="0.2"
          className="text-gold-accent"
        />
        <circle
          cx="68"
          cy="20"
          r="1.5"
          fill="currentColor"
          opacity="0.15"
          className="text-gold-accent"
        />
      </svg>
    </div>
  );
};

export default DecorativePattern;
