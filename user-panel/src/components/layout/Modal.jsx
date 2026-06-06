import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({open,onClose, title, children, footer,}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl glass-strong p-6 shadow-glow"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {title && <h2 className="text-lg font-semibold">{title}</h2>}

            <div className="mt-4">{children}</div>

            {footer && (
              <div className="mt-6 flex justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}