import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchTodos } from "../lib/api";
import { QueryStateInspector } from "../components/QueryStateInspector";

export const Route = createFileRoute("/manual-fetch")({
  component: ManualFetchDemo,
});

function ManualFetchDemo() {
  const result = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: false,
  });

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <section className="island-shell rise-in rounded-[2rem] p-8">
        <p className="island-kicker mb-2">Pattern 1</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
          Manual Fetch with enabled: false
        </h1>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          Use <code>enabled: false</code> to prevent automatic fetching. Call <code>refetch()</code>{" "}
          to trigger the query manually.
        </p>

        <div className="mb-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          <pre>{`const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  enabled: false,  // Don't fetch on mount
})

// Later, when user clicks a button:
result.refetch()`}</pre>
        </div>

        <button
          onClick={() => result.refetch()}
          disabled={result.isFetching}
          className="mb-6 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {result.isFetching ? "Fetching..." : "Fetch Todos"}
        </button>

        <div className="mb-6">
          <QueryStateInspector result={result} />
        </div>

        {result.isSuccess && result.data && (
          <div className="island-shell rounded-xl p-4">
            <h3
              className="mb-3 text-sm font-semibold tracking-wide uppercase"
              style={{ color: "var(--kicker)" }}
            >
              Todos ({result.data.length})
            </h3>
            <ul className="space-y-2">
              {result.data.slice(0, 5).map((todo) => (
                <li key={todo.id} className="flex items-center gap-2 text-sm text-[var(--sea-ink)]">
                  <span
                    className="inline-block h-4 w-4 flex-shrink-0 rounded border"
                    style={{
                      backgroundColor: todo.completed ? "var(--lagoon)" : "transparent",
                      borderColor: todo.completed ? "var(--lagoon)" : "var(--line)",
                    }}
                  />
                  <span className={todo.completed ? "line-through opacity-60" : ""}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
          <h4 className="mb-2 text-sm font-semibold text-[var(--sea-ink)]">Key Insights</h4>
          <ul className="list-disc space-y-1 pl-4 text-xs text-[var(--sea-ink-soft)]">
            <li>
              <code>isPending</code>: true when there's no data yet
            </li>
            <li>
              <code>isLoading</code>: true when isPending + isFetching
            </li>
            <li>
              <code>isFetching</code>: true during any fetch (including refetch)
            </li>
            <li>
              <code>status</code>: "pending" | "error" | "success"
            </li>
            <li>
              <code>fetchStatus</code>: "fetching" | "paused" | "idle"
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
