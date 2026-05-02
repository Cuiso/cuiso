import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SkeuoCardAccent = "primary" | "secondary" | "tertiary" | "none";

export type SkeuoCardProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
  accent?: SkeuoCardAccent;
  eyebrow?: ReactNode;
  stamp?: ReactNode;
};

const frameClass: Record<Exclude<SkeuoCardAccent, "none">, string> = {
  primary:
    "border-[#0a1530]/80 bg-[linear-gradient(155deg,#274a85_0%,#16306a_50%,#0e1c3a_100%)] dark:border-black/55 dark:bg-[linear-gradient(155deg,#3b6cc4_0%,#1d3b6f_50%,#0f1d3a_100%)]",
  secondary:
    "border-[#5e1322]/80 bg-[linear-gradient(155deg,#c2354f_0%,#992238_50%,#761a2c_100%)] dark:border-black/55 dark:bg-[linear-gradient(155deg,#d44a66_0%,#a3253d_50%,#7a1a2d_100%)]",
  tertiary:
    "border-[#1c4a30]/80 bg-[linear-gradient(155deg,#3f956a_0%,#2c7048_50%,#22593a_100%)] dark:border-black/55 dark:bg-[linear-gradient(155deg,#5cb87f_0%,#3a8a5d_50%,#25613e_100%)]",
};

export function SkeuoCard({
  className,
  inset = false,
  accent = "none",
  eyebrow,
  stamp,
  children,
  ...props
}: SkeuoCardProps) {
  if (accent === "none") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-ink/10 bg-surface-card text-ink dark:border-ink/20",
          inset
            ? "shadow-[var(--shadow-inset)]"
            : "shadow-[var(--shadow-raised)]",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-multiply dark:mix-blend-overlay dark:opacity-30"
          style={{ backgroundImage: "var(--paper-noise)" }}
        />
        <div className="relative p-5">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border text-white shadow-[var(--shadow-raised)]",
        frameClass[accent],
        className,
      )}
      {...props}
    >
      {/* subtle bevel: highlight on top, shade on bottom */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.18) inset, 0 -1px 0 0 rgba(0,0,0,0.35) inset",
        }}
      />
      {/* soft top sheen — gives the medium-metallic feel without being shiny */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {(eyebrow || stamp) && (
        <div className="relative flex items-center justify-between gap-3 px-5 pt-4 pb-3 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/95">
          <span className="truncate drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
            {eyebrow}
          </span>
          {stamp ? (
            <span className="shrink-0 rounded-sm border border-white/30 bg-white/10 px-2 py-0.5 text-[0.6rem] tracking-[0.18em] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.22)]">
              {stamp}
            </span>
          ) : null}
        </div>
      )}

      {/* inner paper window — set into the colored frame */}
      <div
        className={cn(
          "relative mx-3 mb-3 overflow-hidden rounded-md bg-surface-card text-ink",
          (eyebrow || stamp) ? "" : "mt-3",
        )}
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.28), 0 2px 4px rgba(0,0,0,0.32) inset, 0 -1px 0 rgba(255,255,255,0.45) inset",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply dark:mix-blend-overlay dark:opacity-25"
          style={{ backgroundImage: "var(--paper-noise)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--paper-tint)" }}
        />
        <div className="relative p-5">{children}</div>
      </div>
    </div>
  );
}
