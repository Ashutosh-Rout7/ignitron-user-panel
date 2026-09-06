import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.5;
      });
    }, 45);

    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1500);
    const t4 = setTimeout(() => navigate("/dashboard"), 3200);

    return () => { clearInterval(interval); [t1,t2,t3,t4].forEach(clearTimeout); };
  }, [navigate]);

  const messages = ["Initializing...", "Loading your data...", "Almost ready..."];

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center overflow-hidden relative">

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 px-4">

        {/* Logo with rings */}
        <div className="relative flex items-center justify-center">
          {/* Rotating ring 1 */}
          <div
            className="absolute w-36 h-36 rounded-full border border-orange/20"
            style={{ animation: "spin 8s linear infinite" }}
          />
          {/* Rotating ring 2 */}
          <div
            className="absolute w-48 h-48 rounded-full border border-orange/10"
            style={{ animation: "spin 12s linear infinite reverse" }}
          />
          {/* Rotating ring 3 */}
          <div
            className="absolute w-60 h-60 rounded-full border border-purple-500/10"
            style={{ animation: "spin 16s linear infinite" }}
          />

          {/* Dot on ring 1 */}
          <div
            className="absolute w-36 h-36"
            style={{ animation: "spin 8s linear infinite" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange shadow-lg shadow-orange/80" />
          </div>

          {/* Dot on ring 2 */}
          <div
            className="absolute w-48 h-48"
            style={{ animation: "spin 12s linear infinite reverse" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/80" />
          </div>

          {/* Core logo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-orange blur-xl opacity-70" />
            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-orange via-orange to-orange-hover flex items-center justify-center shadow-2xl border border-orange/30">
              <Flame className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <div
            className="text-5xl sm:text-6xl font-bold text-white tracking-tight"
            style={{
              textShadow: "0 0 40px rgba(249,115,22,0.4)",
              transition: "opacity 0.6s",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Ignitron
          </div>

          <div
            className="text-xs font-bold tracking-[0.4em] uppercase"
            style={{
              background: "linear-gradient(90deg, #f97316, #a855f7, #f97316)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
              transition: "opacity 0.6s 0.2s",
              opacity: phase >= 2 ? 1 : 0,
            }}
          >
            Volunteer Panel
          </div>
        </div>

        {/* Status + progress */}
        <div
          className="flex flex-col items-center gap-3 w-56"
          style={{
            transition: "opacity 0.6s 0.4s",
            opacity: phase >= 3 ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0,1,2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-orange"
                  style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
            <p className="text-xs text-white/50 tracking-wide">
              {messages[Math.min(Math.floor(progress / 34), 2)]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px bg-white/10 overflow-hidden rounded-full relative">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f97316, #a855f7)",
                boxShadow: "0 0 10px rgba(249,115,22,0.8)",
              }}
            />
          </div>

          <p className="text-[10px] text-white/20 tracking-widest">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

     <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes shimmer {
        0% { background-position: 0% }
        100% { background-position: 200% }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); opacity: 0.4; }
        50% { transform: translateY(-4px); opacity: 1; }
      }
`}</style>
    </div>
  );
}