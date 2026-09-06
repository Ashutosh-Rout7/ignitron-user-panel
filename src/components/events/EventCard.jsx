import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventCard({
  event,
  selected,
  disabled = false,
  onToggle,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: disabled ? 0 : -4 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      animate={{ scale: selected ? 1.02 : 1 }}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-2xl border text-left transition glass border-white/5",
        selected && "ring-brand border-transparent",
        disabled && "pointer-events-none opacity-40 blur-[1px]"
      )}
    >
      {/* EVENT IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={event.eventImage}
          alt={event.name}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur">
          {event.type}
        </span>

        {selected && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gradient-brand px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-glow">
            <CheckCircle2 className="h-3 w-3" />
            Selected
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            {event.name}
          </h3>

          <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">
            {event.description}
          </p>
        </div>

        <div className="text-[11px] text-muted-foreground">
          Category: {event.type}
        </div>

        <div
          className={cn(
            "mt-1 inline-flex w-full justify-center rounded-full px-3 py-2 text-xs font-semibold transition",
            selected
              ? "bg-gradient-brand text-primary-foreground"
              : "border border-white/10 bg-white/[0.03] text-foreground group-hover:bg-white/10"
          )}
        >
          {selected ? "Selected" : "Select Event"}
        </div>
      </div>
    </motion.button>
  );
}