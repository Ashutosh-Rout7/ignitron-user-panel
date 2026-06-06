import { Link } from "react-router-dom";
import logoImage from "../../assets/ims.png";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="relative grid h-14 w-14 place-items-center rounded-xl overflow-hidden">
        <img
          src={logoImage}
          alt="Ignitron Logo"
          className="h-full w-full object-cover"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          𝑰𝑴𝑺
        </span>
        <span className="text-[10px] font-medium bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
          Ignitron 2k27
        </span>
      </span>
    </Link>
  );
}