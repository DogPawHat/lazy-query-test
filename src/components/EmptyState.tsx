import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-(--line) bg-[linear-gradient(170deg,color-mix(in_oklab,var(--surface-strong)_88%,white_12%),var(--surface))] px-6 py-8 text-center">
      <div className="pointer-events-none absolute -top-14 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.18),transparent_68%)]" />
      <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-(--chip-line) bg-(--chip-bg)">
        <Inbox className="h-6 w-6 text-(--lagoon-deep)" />
      </div>
      <h4 className="relative mb-2 text-base font-semibold text-(--sea-ink)">
        {title}
      </h4>
      <p className="relative mx-auto max-w-md text-sm text-(--sea-ink-soft)">
        {description}
      </p>
      {action ? <div className="relative mt-5">{action}</div> : null}
    </div>
  );
}
