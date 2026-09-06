import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Sparkles,
  Ticket,
  Users,
  Bot,
  Zap,
  Trophy,
  Music,
  Code2,
} from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { useApp } from "../lib/app-store";
import { askIgnitronAI } from "../services/AllServices";

function Home() {
  const { role } = useApp();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const stats = [
    { label: "Flagship events",   value: "12+",   icon: CalendarCheck2 },
    { label: "Expected footfall", value: "8,000", icon: Users },
    { label: "Prize pool",        value: "₹5L",   icon: Sparkles },
    { label: "Passes sold",       value: "2,400", icon: Ticket },
  ];

  const highlights = [
    { icon: Code2,  label: "Hackathons", desc: "48-hour build sprints with real prizes" },
    { icon: Trophy, label: "Sports",     desc: "Cricket, volleyball, kabaddi & more" },
    { icon: Music,  label: "Cultural",   desc: "Solo song, rangoli, dance & drama" },
    { icon: Zap,    label: "Technical",  desc: "Math olympiad, business quiz & robotics" },
  ];

  const handleGetPass = () =>
    navigate(role === "guest" ? "/login" : "/pass-selection");

  const handleBrowseEvents = () =>
    navigate(role === "guest" ? "/login" : "/events");

const askAI = async () => {
  if (!question.trim() || aiLoading) return;

  const userMsg = question.trim();
  setQuestion("");
  setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
  setAiLoading(true);

  try {
    const reply = await askIgnitronAI(userMsg);

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: "Something went wrong. Please try again." },
    ]);
  } finally {
    setAiLoading(false);
  }
};

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Ignitron 2027 · Feb 14 — 16"
        title={
          <>
            The flagship fest for{" "}
            <span className="text-gradient-brand">
              builders, designers
            </span>{" "}
            & dreamers.
          </>
        }
        description="One pass. Twelve curated events. Three days of hackathons, talks, robotics, music and chaos. Built by students, for students."
      >
        <button
          onClick={handleGetPass}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
        >
          Get your pass
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          onClick={handleBrowseEvents}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium transition hover:bg-white/10"
        >
          Browse events
        </button>
      </PageHero>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl glass p-5"
            >
              <Icon className="h-4 w-4 text-[color:var(--ignitron-orange)]" />
              <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S HAPPENING ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            What's happening at{" "}
            <span className="text-gradient-brand">Ignitron 2027</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Four categories. Endless memories.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass p-6 text-center hover:shadow-glow transition"
            >
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold">{label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── AI ASSISTANT ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 shadow-glow"
        >
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-purple)] opacity-20 blur-3xl" />
          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-orange)] opacity-20 blur-3xl" />

          <div className="relative flex flex-col gap-8">

            {/* header */}
            <div className="flex items-center gap-4">
              <div className="relative grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                <Bot className="h-7 w-7 text-white" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-[8px] font-bold text-black">
                  AI
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Ask <span className="text-gradient-brand">Ignitron AI</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Got doubts about events, passes, or registration? Ask away.
                </p>
              </div>
              <div className="ml-auto hidden md:flex items-center gap-2 rounded-full border border-[color:var(--ignitron-orange)]/30 bg-[color:var(--ignitron-orange)]/10 px-4 py-2">
                <Sparkles className="h-3 w-3 text-[color:var(--ignitron-orange)]" />
                <span className="text-xs font-medium text-[color:var(--ignitron-orange)]">
                  Powered by Claude AI
                </span>
              </div>
            </div>

            {/* chat window */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 h-64 overflow-y-auto flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <Bot className="h-10 w-10 text-[color:var(--ignitron-purple)] opacity-40" />
                  <p className="text-sm text-muted-foreground">
                    Hi! I'm Ignitron AI. Ask me anything about the fest.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "What events are available?",
                      "How do I register?",
                      "What are the pass prices?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuestion(q)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex-shrink-0 grid h-7 w-7 place-items-center rounded-full ${
                        msg.role === "ai" ? "bg-gradient-brand" : "bg-white/10"
                      }`}>
                        {msg.role === "ai"
                          ? <Bot className="h-3.5 w-3.5 text-white" />
                          : <span className="text-[10px]">👤</span>
                        }
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-none bg-[color:var(--ignitron-purple)]/20 border border-[color:var(--ignitron-purple)]/30 text-foreground"
                          : "rounded-tl-none bg-white/5 border border-white/10 text-foreground"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {aiLoading && (
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-brand flex-shrink-0">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-4 py-2.5">
                        <span className="inline-flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--ignitron-purple)]" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--ignitron-purple)]" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[color:var(--ignitron-purple)]" style={{ animationDelay: "300ms" }} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* input box */}
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[color:var(--ignitron-orange)] via-[color:var(--ignitron-purple)] to-[color:var(--ignitron-orange)] opacity-0 group-focus-within:opacity-100 blur-sm transition duration-500" />

              <div className="relative flex items-end gap-3 rounded-2xl border border-white/10 bg-[oklch(0.13_0.03_285)] p-3 group-focus-within:border-transparent transition">
                <div className="flex-shrink-0 mb-1">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askAI();
                    }
                  }}
                  placeholder="Ask about events, passes, schedule, registration..."
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none leading-relaxed"
                />

                <div className="flex-shrink-0 mb-1">
                  <button
                    onClick={askAI}
                    disabled={!question.trim() || aiLoading}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[color:var(--ignitron-orange)]" />
                  Powered by Ignitron AI
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Press Enter to send · Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center shadow-glow">
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-orange)] opacity-20 blur-3xl" />
          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-purple)] opacity-25 blur-3xl" />

          <h2 className="relative text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to <span className="text-gradient-brand">ignite</span>?
          </h2>

          <p className="relative mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Create your account, pick a pass, choose your events. Takes under two minutes.
          </p>

          <button
            onClick={() => navigate(role === "guest" ? "/register" : "/pass-selection")}
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Register now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;