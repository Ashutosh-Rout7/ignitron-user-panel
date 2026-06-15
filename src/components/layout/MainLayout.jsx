import { Header } from "./Header";

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ignitron — Built for the next generation
        of builders.
      </footer>
    </div>
  );
}