import { Check } from "lucide-react";

interface Props {
  steps: string[];
  current: number; // 0-based
}

export function Stepper({ steps, current }: Props) {
  return (
    <ol className="flex w-full items-center gap-2 overflow-x-auto pb-1">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 min-w-[120px] items-center gap-2">
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                    ? "bg-primary text-primary-foreground shadow-elevated"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`hidden h-px flex-1 sm:block ${done ? "bg-emerald-500" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
