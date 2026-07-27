import { type FC } from "react";
import { motion } from "framer-motion";

interface RibbonTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Título de sección estilo "cinta" (banner con puntas), inspirado en la
 * referencia: bloque verde salvia sólido con colitas dobladas debajo de
 * cada punta, y el texto en script blanco encima.
 */
const RibbonTitle: FC<RibbonTitleProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative inline-block mx-auto ${className}`}
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Colitas dobladas (detrás del cuerpo de la cinta) */}
      <span
        className="absolute -bottom-2 left-2 w-4 h-5 bg-green-moss-dark"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-2 right-2 w-4 h-5 bg-green-moss-dark"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
        aria-hidden="true"
      />

      {/* Cuerpo de la cinta */}
      <span
        className="relative flex items-center justify-center bg-green-moss px-10 sm:px-14 py-4 sm:py-5 shadow-md"
        style={{
          clipPath:
            "polygon(3% 0, 97% 0, 100% 50%, 97% 100%, 3% 100%, 0 50%)",
          boxShadow: "0 6px 18px rgba(95,111,86,0.25)",
        }}
      >
        <span className="font-script text-3xl sm:text-4xl md:text-5xl text-cream-white leading-none">
          {children}
        </span>
      </span>
    </motion.div>
  );
};

export default RibbonTitle;
