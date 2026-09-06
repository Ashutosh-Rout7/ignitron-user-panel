import {
  ShieldCheck,
  Mail,
  MapPin,
  Crown,
  User,
  Sparkles,
} from "lucide-react";

export default function AdminProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[30px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20"></div>

          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="relative p-10">

            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-6xl font-black text-white">
                      A
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-1 right-1 bg-emerald-500 p-2 rounded-full border-4 border-slate-900">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/20">
                <Crown className="w-4 h-4" />
                SUPER ADMIN
              </div>

              {/* Name */}
              <h1 className="mt-5 text-4xl font-black text-white">
                System Administrator
              </h1>

              <p className="text-slate-300 mt-2">
                Ignitron Management System
              </p>
            </div>

            {/* Information Cards */}

            <div className="grid md:grid-cols-2 gap-5 mt-10">

              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-400" />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Full Name
                  </p>
                  <h3 className="text-white font-bold">
                    System Administrator
                  </h3>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Email
                  </p>
                  <h3 className="text-white font-bold">
                    admin@gmail.com
                  </h3>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-violet-400" />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Role
                  </p>
                  <h3 className="text-white font-bold">
                    SUPER ADMIN
                  </h3>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Location
                  </p>
                  <h3 className="text-white font-bold">
                    Odisha, India
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Box */}

            <div className="mt-10 rounded-3xl p-6 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-white/10 text-center">

              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />

              <h2 className="text-2xl font-bold text-white">
                Administrator Access
              </h2>

              <p className="text-slate-300 mt-3">
                You have complete access to manage
                users, events, organizers, volunteers,
                registrations and the entire system.
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}