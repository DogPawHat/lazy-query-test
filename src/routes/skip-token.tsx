import { useState } from "react";
import { useQuery, skipToken } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchPostById } from "../lib/api";
import { QueryStateInspector } from "../components/QueryStateInspector";

export const Route = createFileRoute("/skip-token")({
  component: SkipTokenDemo,
});

function SkipTokenDemo() {
  const [postId, setPostId] = useState<number | null>(null);

  const result = useQuery({
    queryKey: ["post", postId],
    queryFn: postId ? () => fetchPostById(postId) : skipToken,
  });

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-[2rem] p-8">
        <p className="island-kicker mb-2">Pattern 3</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
          Skip Token for Declarative Skipping
        </h1>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          Use <code>skipToken</code> to declaratively skip queries when data is
          missing. Unlike enabled: false, skipToken is a value that can be
          passed to queryFn.
        </p>

        <div className="mb-6 rounded-lg bg-slate-900 p-4 text-sm text-slate-100 overflow-x-auto">
          <pre>{`import { skipToken } from '@tanstack/react-query'

const [postId, setPostId] = useState<number | null>(null)

const result = useQuery({
  queryKey: ['post', postId],
  queryFn: postId ? () => fetchPostById(postId) : skipToken,
})`}</pre>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-[var(--sea-ink)]">
            Select Post ID
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <button
                key={id}
                onClick={() => setPostId(id)}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium transition"
                style={{
                  borderColor: postId === id ? "var(--lagoon)" : "var(--line)",
                  backgroundColor:
                    postId === id ? "var(--lagoon)" : "var(--surface)",
                  color: postId === id ? "#fff" : "var(--sea-ink)",
                }}
              >
                {id}
              </button>
            ))}
            <button
              onClick={() => setPostId(null)}
              className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
            >
              Clear
            </button>
          </div>
          <p className="mt-2 text-xs text-[var(--sea-ink-soft)]">
            {postId
              ? `Selected post ${postId}`
              : "No post selected (using skipToken)"}
          </p>
        </div>

        <div className="mb-6">
          <QueryStateInspector result={result} />
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              void result.refetch();
            }}
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
          >
            Try refetch()
          </button>
          {result.isError &&
            result.error.message.includes("Missing queryFn") && (
              <p className="mt-2 text-sm text-red-500">
                Error: {result.error.message}
              </p>
            )}
        </div>

        {result.isSuccess && result.data && (
          <div className="island-shell rounded-xl p-4">
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: "var(--kicker)" }}
            >
              Post #{result.data.id}
            </h3>
            <h4 className="font-semibold text-[var(--sea-ink)] mb-2">
              {result.data.title}
            </h4>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {result.data.body}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)]">
          <h4 className="text-sm font-semibold mb-2 text-[var(--sea-ink)]">
            Key Insights
          </h4>
          <ul className="text-xs space-y-1 text-[var(--sea-ink-soft)] list-disc pl-4">
            <li>
              <code>skipToken</code> is a special value that tells React Query
              to skip this query
            </li>
            <li>Unlike enabled: false, skipToken works at the queryFn level</li>
            <li>
              <code>refetch()</code> throws "Missing queryFn" error when
              skipToken is active (use enabled: false if you need manual
              refetch)
            </li>
            <li>
              fetchStatus will be "idle" when skipped, status stays in previous
              state
            </li>
            <li>
              Useful for TypeScript type safety with optional query parameters
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
