import type { ReactNode } from "react";

export function Eyebrow({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-uf-soil sm:text-xs ${centered ? "justify-center" : ""}`}
    >
      <span className="h-px w-10 bg-gradient-to-r from-uf-soil to-transparent" />
      {children}
      {centered && <span className="h-px w-10 bg-gradient-to-l from-uf-soil to-transparent" />}
    </p>
  );
}
