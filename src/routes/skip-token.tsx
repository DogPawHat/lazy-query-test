import { useState } from "react";
import { useQuery, skipToken } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchPostById } from "../lib/api";
import { EmptyState } from "../components/EmptyState";
import { QueryStateInspector } from "../components/QueryStateInspector";
import { useThrottledLoading } from "../hooks/useThrottledLoading";

export const Route = createFileRoute("/skip-token")({
  component: SkipTokenDemo,
});

function SkipTokenDemo() {
  const [postId, setPostId] = useState<number | null>(null);

  const result = useQuery({
    queryKey: ["post", postId],
    queryFn: postId ? () => fetchPostById(postId) : skipToken,
    retry: false,
  });

  const showSpinner = useThrottledLoading(result.isFetching);

  const dataSection = (() => {
    if (showSpinner) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-(--lagoon)" />
        </div>
      );
    }

    if (postId == null) {
      return (
        <EmptyState
          title="No post selected"
          description="Choose a post ID to run the query with skipToken."
        />
      );
    }

    if (result.data == null) {
      return (
        <EmptyState
          title="No post data"
          description="Select a different post ID or try fetching again."
        />
      );
    }

    return (
      <div className="island-shell rounded-xl p-4">
        <h3
          className="mb-3 text-sm font-semibold tracking-wide uppercase"
          style={{ color: "var(--kicker)" }}
        >
          Post #{result.data.id}
        </h3>
        <h4 className="mb-2 font-semibold text-(--sea-ink)">{result.data.title}</h4>
        <p className="text-sm text-(--sea-ink-soft)">{result.data.body}</p>
      </div>
    );
  })();

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <section className="island-shell rise-in rounded-4xl p-8">
        <p className="island-kicker mb-2">Pattern 3</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-(--sea-ink)">
          Skip Token for Declarative Skipping
        </h1>
        <p className="mb-6 text-(--sea-ink-soft)">
          Use <code>skipToken</code> to declaratively skip queries when data is
          missing. Unlike enabled: false, skipToken is a value that can be
          passed to queryFn.
        </p>

        <div className="mb-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          <pre>{`import { skipToken } from '@tanstack/react-query'

const [postId, setPostId] = useState<number | null>(null)

const result = useQuery({
  queryKey: ['post', postId],
  queryFn: postId ? () => fetchPostById(postId) : skipToken,
})`}</pre>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-(--sea-ink)">
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
              className="rounded-lg border border-(--line) bg-(--surface) px-3 py-1.5 text-sm font-medium text-(--sea-ink) transition hover:bg-(--link-bg-hover)"
            >
              Clear
            </button>
          </div>
          <p className="mt-2 text-xs text-(--sea-ink-soft)">
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
            className="rounded-lg border border-(--line) bg-(--surface) px-4 py-2 text-sm font-medium text-(--sea-ink) transition hover:bg-(--link-bg-hover)"
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

        {dataSection}
      </section>
    </main>
  );
}
