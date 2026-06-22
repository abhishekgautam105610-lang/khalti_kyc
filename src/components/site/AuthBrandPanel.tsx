import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";

// Decorative bank logo grid (stylized — letters stand in for real bank marks)
const banks = [
  { l: "N", bg: "bg-rose-500", fg: "text-white" },
  { l: "✚", bg: "bg-white", fg: "text-rose-600" },
  { l: "R", bg: "bg-white", fg: "text-yellow-600" },
  { l: "▲", bg: "bg-white", fg: "text-red-600" },
  { l: "NMB", bg: "bg-sky-500", fg: "text-white" },
  { l: "NB", bg: "bg-white", fg: "text-blue-700" },
  { l: "✿", bg: "bg-red-600", fg: "text-white" },
  { l: "◎", bg: "bg-white", fg: "text-red-600" },
  { l: "◆", bg: "bg-white", fg: "text-emerald-600" },
  { l: "S", bg: "bg-yellow-500", fg: "text-black" },
  { l: "श", bg: "bg-white", fg: "text-blue-700" },
  { l: "▲", bg: "bg-white", fg: "text-red-500" },
  { l: "★", bg: "bg-white", fg: "text-green-700" },
  { l: "✦", bg: "bg-pink-500", fg: "text-white" },
  { l: "☀", bg: "bg-orange-400", fg: "text-white" },
  { l: "C", bg: "bg-white", fg: "text-green-700" },
  { l: "❀", bg: "bg-orange-500", fg: "text-white" },
  { l: "G", bg: "bg-white", fg: "text-emerald-600" },
  { l: "M", bg: "bg-white", fg: "text-purple-700" },
  { l: "KS", bg: "bg-white", fg: "text-blue-600" },
];

export function AuthBrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-neutral-900 p-10 text-white lg:flex">
      <Link to="/" className="flex items-center gap-1.5">
        <span className="text-3xl font-extrabold text-primary">khalti</span>
        <Send className="h-5 w-5 -rotate-12 fill-primary text-primary" />
      </Link>

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div className="mx-auto h-[420px] w-[260px] rounded-[2.5rem] border-[10px] border-neutral-800/80 bg-neutral-800/30" />
        </div>

        <div className="relative mx-auto grid w-fit grid-cols-5 gap-3 py-8">
          {banks.map((b, i) => (
            <div
              key={i}
              className={`grid h-14 w-14 place-items-center rounded-full text-sm font-bold shadow-lg ${b.bg} ${b.fg}`}
            >
              {b.l}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold leading-tight text-amber-400">
          60+ Bank &amp; Financial
          <br />
          Institutions
        </h2>
        <p className="mt-2 text-2xl font-bold text-white">
          Integrated with Khalti
        </p>
      </div>
    </div>
  );
}
