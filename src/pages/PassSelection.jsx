import { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useApp } from "../lib/app-store";
import { cn } from "../lib/utils";
import { getpass, buyPass } from "../services/AllServices";
import { toast } from "sonner";

function PassSelection() {
  // PassSelection.jsx
const { user, setPass } = useApp();  // ← add setPass

  const navigate = useNavigate();

  const [passes, setPasses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // ✅ NEW

  // ── 3D tilt refs (one per card, keyed by opt.id) ──
  const cardRefs = useRef({});

  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * -1.5 + 24}px 50px rgba(0,0,0,0.55)`;
  };

  const handleMouseLeave = (id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    card.style.boxShadow = "";
  };

  useEffect(() => {
    loadPasses();
  }, []);

  const loadPasses = async () => {
    try {
      const data = await getpass();
      console.log("Passes:", data);
      setPasses(data);
    } catch (error) {
      console.error("Failed to fetch passes", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }



const onContinue = async () => {
  if (!selected) return;

  // ← block if already purchased
  if (user?.passId) {
    toast.error("You have already purchased a pass. Cannot change it.");
    setTimeout(() => navigate("/events"), 2000);
    return;
  }

  try {
    const res = await buyPass(selected.id);
    const message = res?.data || res;

    setPass(selected.id);
    toast.success("Pass purchased successfully");
    setTimeout(() => navigate("/events"), 2000);

  } catch (error) {
    console.error(error);
    toast.error("Failed to purchase pass");
  }
};

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Step 2 of 3
        </span>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
          Choose Your{" "}
          <span className="text-gradient-brand">
            Ignitron Pass
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          One purchase, full access. Pick the pass that matches your participation level.
        </p>
      </div>

      {/* ✅ MESSAGE UI */}
      {message && (
        <div className="mt-6 mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300 text-center">
          {message}
        </div>
      )}

      {loading ? (
        <div className="mt-12 text-center">
          Loading passes...
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {passes.map((opt) => {
            const active = selected?.id === opt.id;

            return (
              <motion.button
                key={opt.id}
                ref={(el) => { cardRefs.current[opt.id] = el; }}
                type="button"
                onClick={() => setSelected(opt)}
                onMouseMove={(e) => handleMouseMove(e, opt.id)}
                onMouseLeave={() => handleMouseLeave(opt.id)}
                whileHover={{ y: -4 }}
                animate={{
                  scale: active ? 1.02 : 1,
                }}
                style={{ transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
                className={cn(
                  "relative overflow-hidden rounded-3xl border p-8 text-left transition glass border-white/5",
                  active && "ring-brand border-transparent"
                )}
              >
                {opt.type === "500" && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-semibold text-primary-foreground shadow-glow">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </span>
                )}

                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {opt.type === "300"
                    ? "Standard Pass"
                    : "Premium Pass"}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight">
                    ₹{opt.price}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    / student
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
                    <span>Access up to {opt.maxevents} events</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
                    <span>Event registration</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
                    <span>Digital pass</span>
                  </li>
                </ul>

                <div
                  className={cn(
                    "mt-8 inline-flex w-full justify-center rounded-full px-4 py-3 text-sm font-semibold transition",
                    active
                      ? "bg-gradient-brand text-primary-foreground"
                      : "border border-white/10 bg-white/[0.04] text-foreground"
                  )}
                >
                  {active ? "Selected" : "Select Pass"}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <PrimaryButton
          onClick={onContinue}
          disabled={!selected}
        >
          Continue to Events
        </PrimaryButton>
      </div>
    </div>
  );
}

export default PassSelection;
