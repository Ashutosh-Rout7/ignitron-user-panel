import { Flame } from "lucide-react";

export function IgnitronLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 shadow-lg">
        
        <Flame
          className="h-5 w-5 text-white"
          strokeWidth={2.5}
        />
      </div>

      <div className="flex flex-col leading-tight">
        
        <span className="text-base font-bold tracking-tight">
          Ignitron
        </span>

        <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
          Event System
        </span>
      </div>
    </div>
  );
}