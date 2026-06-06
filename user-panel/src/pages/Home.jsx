import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

import { PageHero } from "../components/ui/PageHero";
import { events } from "../lib/mock-events";
import { useApp } from "../lib/app-store";

function Home() {
  const featured = events.slice(0, 6);

  const { role } = useApp();
  const navigate = useNavigate();

  const stats = [
    { label: "Flagship events", value: "12+", icon: CalendarCheck2 },
    { label: "Expected footfall", value: "8,000", icon: Users },
    { label: "Prize pool", value: "₹5L", icon: Sparkles },
    { label: "Passes sold", value: "2,400", icon: Ticket },
  ];

  const handleGetPass = () => {
    if (role === "guest") {
      navigate("/login");
    } else {
      navigate("/pass-selection");
    }
  };

  const handleBrowseEvents = () => {
    if (role === "guest") {
      navigate("/login");
    } else {
      navigate("/events");
    }
  };

  return (
    <div>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/10"
        >
          Browse events
        </button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl glass p-5">
              <Icon className="h-4 w-4 text-[color:var(--ignitron-orange)]" />

              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
              </p>

              <p className="text-xs text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Featured this year
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A taste of what's lined up. Pick a pass to unlock the full lineup.
            </p>
          </div>

          <button
            onClick={handleBrowseEvents}
            className="hidden text-sm font-medium text-gradient-brand md:inline"
          >
            See all events →
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
              }}
              className="overflow-hidden rounded-2xl glass"
            >
              <div
                className={`h-32 bg-gradient-to-br ${e.gradient} grid place-items-center text-5xl`}
              >
                {e.emoji}
              </div>

              <div className="p-4">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {e.category}
                </span>

                <h3 className="mt-1 text-base font-semibold">
                  {e.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {e.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center shadow-glow">
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-orange)] opacity-20 blur-3xl" />

          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[color:var(--ignitron-purple)] opacity-25 blur-3xl" />

          <h2 className="relative text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to <span className="text-gradient-brand">ignite</span>?
          </h2>

          <p className="relative mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Create your account, pick a pass, choose your events. Takes under
            two minutes.
          </p>

          <button
            onClick={() =>
              navigate(
                role === "guest"
                  ? "/register"
                  : "/pass-selection"
              )
            }
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