import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

const ToastCtx = createContext({
  show: () => {},
});

export function Toast({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((t) => {
    const id = Date.now() + Math.random();

    setToasts((p) => [...p, { ...t, id }]);

    setTimeout(() => {
      setToasts((p) => p.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}

      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-scale-in glass rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[280px]"
          >
            <div
              className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                t.type === "success"
                  ? "bg-success/15 text-success"
                  : "bg-danger/15 text-danger"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
            </div>

            <div className="text-sm font-medium flex-1">
              {t.message}
            </div>

            <button
              onClick={() =>
                setToasts((p) =>
                  p.filter((x) => x.id !== t.id)
                )
              }
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);