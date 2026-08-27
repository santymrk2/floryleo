import { type FC, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { WEDDING } from "../data/wedding";
import { GIFT_PHOTOS, GIFTS, MERCADO_PAGO, type Gift } from "../data/gifts";
import RibbonTitle from "./RibbonTitle";
import Modal from "./Modal";

/* ── Animaciones ──────────────────────────────── */
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Íconos ───────────────────────────────────── */
const SuitIcon: FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L8 6H4l2 4H2l2 4h14l2-4h-4l2-4h-4l-4-4z" />
    <path d="M12 6v12" />
    <path d="M8 22h8" />
  </svg>
);

const GiftIcon: FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
  </svg>
);

const CopyIcon: FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon: FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/* ── Botón copiar ─────────────────────────────── */
const CopyButton: FC<{ copied: boolean; onClick: () => void }> = ({ copied, onClick }) => (
  <motion.button
    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] cursor-pointer transition-colors duration-300 ${
      copied
        ? "bg-green-moss text-cream-white"
        : "bg-green-moss/10 text-green-moss-dark hover:bg-green-moss/20"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.94 }}
    onClick={onClick}
  >
    {copied ? <CheckIcon /> : <CopyIcon />}
    {copied ? "¡Copiado!" : "Copiar"}
  </motion.button>
);

/* ── Bloque de dato (CBU / Alias) ─────────────── */
const DataBlock: FC<{
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}> = ({ label, value, copied, onCopy }) => (
  <div
    className="w-full rounded-xl px-4 py-3 text-left"
    style={{
      background: "rgba(124,141,114,0.08)",
      border: "1px dashed rgba(124,141,114,0.3)",
    }}
  >
    <div className="mb-1 flex items-center justify-between gap-3">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-light/50">
        {label}
      </p>
      <CopyButton copied={copied} onClick={onCopy} />
    </div>
    <p className="font-sans text-sm sm:text-[15px] font-semibold tracking-wider text-charcoal break-all">
      {value}
    </p>
  </div>
);

/* ── Íconos para la lista de regalos ───────────── */
const ArrowLeftIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ExternalLinkIcon: FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6M10 14L21 3" />
  </svg>
);

/* ── Detalle de un regalo en la grilla ─────────── */
const GiftRow: FC<{ gift: Gift; onPick: () => void }> = ({ gift, onPick }) => (
  <motion.article
    className="flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-3.5 text-left"
    style={{
      background: "rgba(255,253,247,0.7)",
      border: "1px solid rgba(124,141,114,0.16)",
      boxShadow: "0 2px 10px rgba(44,44,44,0.05)",
    }}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -3 }}
  >
    <div
      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24"
      style={{ background: "rgba(124,141,114,0.1)" }}
    >
      <img
        src={GIFT_PHOTOS[gift.icon]}
        alt={gift.name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>

    <div className="min-w-0 flex-1">
      <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gold-accent font-bold">
        {gift.tag}
      </p>
      <h4 className="mt-1 font-sans text-[13px] sm:text-sm font-semibold leading-snug text-charcoal">
        {gift.name}
      </h4>
      <p className="mt-1.5 font-sans text-base font-bold text-charcoal">
        ${gift.price.toLocaleString("es-AR")}
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <button
          className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-green-moss px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-cream-white transition-colors duration-300 hover:bg-green-moss-light"
          onClick={onPick}
        >
          Quiero regalar esto
        </button>
        <a
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-green-moss px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-green-moss-dark transition-colors duration-300 hover:bg-green-moss/10"
          href={gift.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver producto
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  </motion.article>
);

/* ── Tarjeta de Regalo (abre modal con la lista) ─ */
const GiftCard: FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Gift | null>(null);
  const [copied, setCopied] = useState<"cbu" | "alias" | null>(null);
  const { alias, cbu, titular } = MERCADO_PAGO;

  const copy = async (key: "cbu" | "alias") => {
    const raw = key === "cbu" ? cbu.replace(/\s+/g, "") : alias;
    try {
      await navigator.clipboard.writeText(raw);
    } catch {
      /* Fallback para contextos sin Clipboard API (http, navegadores viejos) */
      const ta = document.createElement("textarea");
      ta.value = raw;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const openMercadoPago = () => {
    const fallback = MERCADO_PAGO.webUrl;
    const start = Date.now();
    /* Intenta abrir la app vía deep link */
    window.location.href = MERCADO_PAGO.appScheme;
    /* Si en ~1.2s seguimos en la página (la app no abrió), vamos al sitio web */
    window.setTimeout(() => {
      if (Date.now() - start < 2000 && !document.hidden) {
        window.location.href = fallback;
      }
    }, 1200);
  };

  return (
    <>
      <motion.div
        className="card-glass flex flex-col items-center p-7 sm:p-9 text-center cursor-pointer select-none"
        variants={cardIn}
        whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(44,44,44,0.1)" }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Regalo: ver detalles"
      >
        <div className="text-green-moss/70 mb-5">
          <GiftIcon />
        </div>
        <h3 className="font-script text-2xl sm:text-3xl text-green-moss mb-4">
          Regalo
        </h3>
        <p className="font-sans text-sm text-charcoal/60 mb-6 leading-relaxed">
          Tu presencia es el mejor regalo. Si además querés tener un detalle con
          nosotros...
        </p>

        <span className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-green-moss/70">
          <InfoIcon />
          Ver detalles
        </span>
      </motion.div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        ariaLabel="Lista de regalos"
        maxWidthClass="max-w-lg"
      >
        <AnimatePresence mode="wait">
          {selected === null ? (
            /* ── Paso 1: Lista de regalos ── */
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center">
                <div className="text-green-moss/70 mb-4 flex justify-center">
                  <GiftIcon />
                </div>
                <h3 className="font-script text-3xl text-green-moss mb-2">Regalos</h3>
              </div>

              <div className="gold-divider mb-6 mt-6" />

              <p className="mb-5 text-center font-sans text-sm text-charcoal/60 leading-relaxed">
                Tu cariño y tu presencia ya son el mejor regalo. Si además querés
                hacernos un obsequio, armamos esta lista para ayudarte a elegir algo
                que de verdad nos haga falta en nuestra nueva casa.
              </p>

              {/* Cómo funciona */}
              <div
                className="mb-6 rounded-2xl p-4"
                style={{ background: "rgba(255,253,247,0.7)", border: "1px solid rgba(124,141,114,0.16)" }}
              >
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-green-moss-dark">
                  ¿Cómo funciona?
                </p>
                <ol className="ml-4 list-decimal space-y-1 font-sans text-xs leading-relaxed text-charcoal/70">
                  <li>Elegí el regalo que quieras hacernos.</li>
                  <li>
                    Tocá <b className="text-green-moss-dark">"Quiero regalar esto"</b> y vas a ver
                    nuestro alias de Mercado Pago.
                  </li>
                  <li>
                    Copiá el alias y hacé la transferencia por el monto que prefieras
                    (total o parcial).
                  </li>
                </ol>
              </div>

              {/* Grilla de regalos */}
              <div className="flex flex-col gap-4">
                {GIFTS.map((gift) => (
                  <GiftRow
                    key={gift.icon}
                    gift={gift}
                    onPick={() => setSelected(gift)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Paso 2: Datos de Mercado Pago ── */
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center">
                <div className="text-green-moss/70 mb-4 flex justify-center">
                  <GiftIcon />
                </div>
                <h3 className="font-script text-3xl text-green-moss mb-2">¡Gracias! 💛</h3>
                <p className="mx-auto max-w-xs font-sans text-sm text-charcoal/60 leading-relaxed">
                  Vas a regalarnos: <b className="text-charcoal">{selected.name}</b>
                </p>
              </div>

              <div className="gold-divider mb-6 mt-6" />

              <div className="w-full space-y-3">
                <DataBlock
                  label="Alias"
                  value={alias}
                  copied={copied === "alias"}
                  onCopy={() => copy("alias")}
                />
                <DataBlock
                  label="CBU"
                  value={cbu}
                  copied={copied === "cbu"}
                  onCopy={() => copy("cbu")}
                />
              </div>

              <p className="mt-5 text-center font-sans text-[10px] uppercase tracking-[0.15em] text-green-moss/60">
                A nombre de {titular}
              </p>

              <div className="mt-5">
                <motion.button
                  className="w-full rounded-full bg-gold-accent px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-cream-white shadow-md transition-colors duration-300 hover:bg-gold-accent-light"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={openMercadoPago}
                >
                  Abrir Mercado Pago
                </motion.button>
              </div>

              <p className="mt-3 text-center">
                <a
                  className="font-sans text-xs text-green-moss-dark underline underline-offset-4"
                  href={MERCADO_PAGO.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ¿No se abrió la app? Tocá acá
                </a>
              </p>

              <div className="mt-8 flex flex-col items-center gap-3">
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelected(null)}
                >
                  <ArrowLeftIcon />
                  Elegir otro regalo
                </motion.button>
                <button
                  className="cursor-pointer font-sans text-xs text-charcoal/50 underline underline-offset-4 hover:text-charcoal transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
};

/* ── Tarjeta de Dress Code (abre modal) ────────── */
const InfoIcon: FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const RuleBlock: FC<{ label: string; items: readonly string[] }> = ({ label, items }) => (
  <div>
    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-green-moss-dark mb-2">
      {label}
    </p>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 font-sans text-sm text-charcoal/60 leading-relaxed"
        >
          <span className="text-gold-accent text-[8px] mt-1.5 shrink-0" aria-hidden="true">
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const DressCodeCard: FC = () => {
  const [open, setOpen] = useState(false);
  const details = WEDDING.dressCodeDetails;

  return (
    <>
      <motion.div
        className="card-glass flex flex-col items-center p-7 sm:p-9 text-center cursor-pointer select-none"
        variants={cardIn}
        whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(44,44,44,0.1)" }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Dress code: ver detalles"
      >
        <div className="text-green-moss/70 mb-5">
          <SuitIcon />
        </div>
        <h3 className="font-script text-2xl sm:text-3xl text-green-moss mb-4">
          Dress Code
        </h3>
        <p className="font-sans text-sm text-charcoal/60 mb-3 leading-relaxed">
          Para esta ocasión tan especial,
          <br />
          te pedimos asistir...
        </p>
        <span className="inline-block font-script text-4xl text-green-moss">
          {WEDDING.dressCode}
        </span>

        <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-green-moss/70">
          <InfoIcon />
          Ver detalles
        </span>
      </motion.div>

      <Modal open={open} onClose={() => setOpen(false)} ariaLabel="Detalles del dress code">
        <div className="text-center">
          <div className="text-green-moss/70 mb-4 flex justify-center">
            <SuitIcon />
          </div>
          <h3 className="font-script text-3xl text-green-moss mb-2">
            Dress Code
          </h3>
          <span className="inline-block font-script text-4xl text-green-moss">
            {WEDDING.dressCode}
          </span>
        </div>

        <div className="gold-divider mb-6 mt-6" />

        <div className="space-y-5 text-left">
          <RuleBlock label="Mujeres" items={details.women} />
          <RuleBlock label="Hombres" items={details.men} />
          <RuleBlock label="Paleta sugerida" items={[details.palette]} />
          <p className="flex gap-2 font-sans text-sm text-charcoal/60 leading-relaxed">
            <span className="text-gold-accent text-[8px] mt-1.5 shrink-0" aria-hidden="true">
              ✦
            </span>
            {details.note}
          </p>
        </div>

        <div className="mt-8 text-center">
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(false)}
          >
            Entendido
          </motion.button>
        </div>
      </Modal>
    </>
  );
};

/* ── Componente principal ──────────────────────── */
interface InfoCardsProps {
  id?: string;
}

const InfoCards: FC<InfoCardsProps> = ({ id }) => {
  return (
    <section id={id} className="section-padding relative">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal-light/40 mb-4">
            Para que todo salga perfecto
          </p>
          <RibbonTitle>Información</RibbonTitle>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 items-stretch max-w-2xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Tarjeta: Dress Code */}
          <DressCodeCard />

          {/* Tarjeta: Regalo */}
          <GiftCard />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoCards;