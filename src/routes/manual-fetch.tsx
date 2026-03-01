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
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-[2rem] p-8">
        <p className="island-kicker mb-2">Pattern 1</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
          Manual Fetch with enabled: false
        </h1>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          Use <code>enabled: false</code> to prevent automatic fetching. Call{" "}
          <code>refetch()</code> to trigger the query manually.
        </p>

        <div className="mb-6 rounded-lg bg-slate-900 p-4 text-sm text-slate-100 overflow-x-auto">
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
          className="mb-6 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {result.isFetching ? "Fetching..." : "Fetch Todos"}
        </button>

        <div className="mb-6">
          <QueryStateInspector result={result} />
        </div>

        {result.isSuccess && result.data && (
          <div className="island-shell rounded-xl p-4">
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: "var(--kicker)" }}
            >
              Todos ({result.data.length})
            </h3>
            <ul className="space-y-2">
              {result.data.slice(0, 5).map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-2 text-sm text-[var(--sea-ink)]"
                >
                  <span
                    className="inline-block w-4 h-4 rounded border flex-shrink-0"
                    style={{
                      backgroundColor: todo.completed
                        ? "var(--lagoon)"
                        : "transparent",
                      borderColor: todo.completed
                        ? "var(--lagoon)"
                        : "var(--line)",
                    }}
                  />
                  <span
                    className={todo.completed ? "line-through opacity-60" : ""}
                  >
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)]">
          <h4 className="text-sm font-semibold mb-2 text-[var(--sea-ink)]">
            Key Insights
          </h4>
          <ul className="text-xs space-y-1 text-[var(--sea-ink-soft)] list-disc pl-4">
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
