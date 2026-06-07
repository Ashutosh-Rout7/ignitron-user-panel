import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/organizer");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">

      {/* glow blobs */}
      <div className="absolute h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute h-48 w-48 rounded-full bg-orange-400/10 blur-2xl translate-x-32 translate-y-20" />

      {/* logo */}
      <div className="relative flex flex-col items-center gap-6 animate-fade-in">

        <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-orange-500 shadow-[0_0_60px_rgba(249,115,22,0.6)]">
          <Flame className="h-12 w-12 text-white" strokeWidth={2} />
          <div className="absolute inset-0 rounded-3xl bg-orange-400/30 animate-ping" />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Ignitron
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Organizer Panel
          </p>
        </div>

        <p className="text-sm text-white/40">
          Setting up your workspace...
        </p>

        {/* progress bar */}
        <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full animate-[grow_3s_linear_forwards]" />
        </div>

      </div>

      <style>{`
        @keyframes grow {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}