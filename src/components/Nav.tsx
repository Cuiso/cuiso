"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Nav() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <a
          href="#hero"
          className="font-mono text-[13px] font-semibold tracking-tight text-ink focus-ring"
        >
          cuiso
        </a>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
