import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchUsers } from "../lib/api";
import { QueryStateInspector } from "../components/QueryStateInspector";

export const Route = createFileRoute("/conditional-query")({
  component: ConditionalQueryDemo,
});

function ConditionalQueryDemo() {
  const [search, setSearch] = useState("");

  const result = useQuery({
    queryKey: ["users", search],
    queryFn: () => fetchUsers(search),
    enabled: !!search,
  });

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <section className="island-shell rise-in rounded-4xl p-8">
        <p className="island-kicker mb-2">Pattern 2</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-(--sea-ink)">
          Conditional Query with enabled
        </h1>
        <p className="mb-6 text-(--sea-ink-soft)">
          Use <code>enabled: !!value</code> to activate the query only when a
          condition is met. The query disables automatically when the input is
          empty.
        </p>

        <div className="mb-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          <pre>{`const [search, setSearch] = useState('')

const result = useQuery({
  queryKey: ['users', search],
  queryFn: () => fetchUsers(search),
  enabled: !!search,  // Only fetch when search has a value
})`}</pre>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-(--sea-ink)">
            Search Users
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search by name, username, or email..."
            className="w-full rounded-lg border border-(--line) bg-(--surface) px-4 py-2.5 text-sm text-(--sea-ink) placeholder:text-(--sea-ink-soft) focus:border-(--lagoon) focus:outline-none"
          />
          <p className="mt-2 text-xs text-(--sea-ink-soft)">
            Query is {search ? "enabled" : "disabled"} (enabled: {!!search})
          </p>
        </div>

        <div className="mb-6">
          <QueryStateInspector result={result} />
        </div>

        {result.isFetching && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-(--lagoon)" />
          </div>
        )}

        {!result.isFetching && result.isSuccess && result.data && (
          <div className="island-shell rounded-xl p-4">
            <h3
              className="mb-3 text-sm font-semibold tracking-wide uppercase"
              style={{ color: "var(--kicker)" }}
            >
              Results ({result.data.length} user
              {result.data.length !== 1 ? "s" : ""})
            </h3>
            {result.data.length > 0 ? (
              <ul className="space-y-3">
                {result.data.map((user) => (
                  <li
                    key={user.id}
                    className="rounded-lg border border-(--line) bg-(--surface) p-3"
                  >
                    <div className="font-semibold text-(--sea-ink)">
                      {user.name}
                    </div>
                    <div className="text-xs text-(--sea-ink-soft)">
                      @{user.username}
                    </div>
                    <div className="text-xs text-(--sea-ink-soft)">
                      {user.email}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-(--sea-ink-soft)">No users found</p>
            )}
          </div>
        )}

        <div className="mt-6 rounded-lg border border-(--line) bg-(--surface) p-4">
          <h4 className="mb-2 text-sm font-semibold text-(--sea-ink)">
            Key Insights
          </h4>
          <ul className="list-disc space-y-1 pl-4 text-xs text-(--sea-ink-soft)">
            <li>
              Query automatically enables/disables based on the enabled
              condition
            </li>
            <li>When disabled, the query returns to idle state</li>
            <li>Cached data is retained even when query is disabled</li>
            <li>
              Useful for dependent queries, search inputs, and conditional
              fetching
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
