import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchUsers } from '../lib/api'
import { QueryStateInspector } from '../components/QueryStateInspector'

export const Route = createFileRoute('/conditional-query')({
  component: ConditionalQueryDemo,
})

function ConditionalQueryDemo() {
  const [search, setSearch] = useState('')

  const result = useQuery({
    queryKey: ['users', search],
    queryFn: () => fetchUsers(search),
    enabled: !!search,
  })

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-[2rem] p-8">
        <p className="island-kicker mb-2">Pattern 2</p>
        <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
          Conditional Query with enabled
        </h1>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          Use <code>enabled: !!value</code> to activate the query only when a
          condition is met. The query disables automatically when the input is empty.
        </p>

        <div className="mb-6 rounded-lg bg-slate-900 p-4 text-sm text-slate-100 overflow-x-auto">
          <pre>{`const [search, setSearch] = useState('')

const result = useQuery({
  queryKey: ['users', search],
  queryFn: () => fetchUsers(search),
  enabled: !!search,  // Only fetch when search has a value
})`}</pre>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-[var(--sea-ink)]">
            Search Users
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search by name, username, or email..."
            className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:outline-none focus:border-[var(--lagoon)]"
          />
          <p className="mt-2 text-xs text-[var(--sea-ink-soft)]">
            Query is {search ? 'enabled' : 'disabled'} (enabled: {!!search})
          </p>
        </div>

        <div className="mb-6">
          <QueryStateInspector result={result} />
        </div>

        {result.isSuccess && result.data && (
          <div className="island-shell rounded-xl p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--kicker)' }}>
              Results ({result.data.length} user{result.data.length !== 1 ? 's' : ''})
            </h3>
            {result.data.length > 0 ? (
              <ul className="space-y-3">
                {result.data.map((user) => (
                  <li
                    key={user.id}
                    className="p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)]"
                  >
                    <div className="font-semibold text-[var(--sea-ink)]">{user.name}</div>
                    <div className="text-xs text-[var(--sea-ink-soft)]">@{user.username}</div>
                    <div className="text-xs text-[var(--sea-ink-soft)]">{user.email}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--sea-ink-soft)]">No users found</p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)]">
          <h4 className="text-sm font-semibold mb-2 text-[var(--sea-ink)]">Key Insights</h4>
          <ul className="text-xs space-y-1 text-[var(--sea-ink-soft)] list-disc pl-4">
            <li>Query automatically enables/disables based on the enabled condition</li>
            <li>When disabled, the query returns to idle state</li>
            <li>Cached data is retained even when query is disabled</li>
            <li>Useful for dependent queries, search inputs, and conditional fetching</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
