import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const demos = [
    {
      title: "Manual Fetch",
      description: "Use enabled: false with refetch() to manually trigger queries",
      href: "/manual-fetch",
    },
    {
      title: "Conditional Query",
      description: "Use enabled: !!value to activate queries based on state",
      href: "/conditional-query",
    },
    {
      title: "Skip Token",
      description: "Use skipToken to declaratively skip queries when data is missing",
      href: "/skip-token",
    },
  ];

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Interactive Demos</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Lazy Query Patterns
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          React Query queries that don't run automatically on mount. Learn how to control when data
          fetching happens using the enabled option, refetch(), and skipToken.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <Link
            key={demo.href}
            to={demo.href}
            className="island-shell feature-card rise-in rounded-2xl p-6 no-underline transition hover:-translate-y-1"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">{demo.title}</h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{demo.description}</p>
          </Link>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">What are Lazy Queries?</p>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          By default, useQuery fetches data immediately when the component mounts. Lazy queries give
          you control over when fetching happens — useful for user-triggered actions, conditional
          dependencies, or avoiding unnecessary requests.
        </p>
      </section>
    </main>
  );
}
