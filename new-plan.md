# Lazy Query Demo App - Implementation Plan

## Context

This TanStack Start app was scaffolded from a blog template. The goal is to strip out the blog/content infrastructure and replace the pages with interactive demos of React Query's "lazy query" patterns — queries that don't run automatically on mount, giving you control over when data fetching happens. This sets up a playground for experimenting with `useQuery`'s `enabled` option, `refetch()`, and `skipToken`.

pnpm is already the package manager (pnpm-lock.yaml exists, no npm lock file). React Query is already installed and configured with devtools.

---

## Phase 1: Remove blog/content-collections infrastructure

**Delete files:**

- `src/routes/blog.index.tsx`
- `src/routes/blog.$slug.tsx`
- `src/routes/rss[.]xml.ts`
- `src/routes/about.tsx`
- `src/components/MdxCallout.tsx`
- `src/components/MdxMetrics.tsx`
- `src/lib/site.ts`
- `content-collections.ts`
- `content/` directory
- `.content-collections/` directory

**Edit `vite.config.ts`:** Remove `contentCollections` import and plugin entry.

**Edit `tsconfig.json`:** Remove `"content-collections"` path alias.

**Run:** `pnpm remove @content-collections/core @content-collections/markdown @content-collections/mdx @content-collections/vite remark-gfm`

---

## Phase 2: Create shared utilities

### `src/lib/api.ts` — Fetch functions + types for JSONPlaceholder

- `Todo`, `User`, `Post` TypeScript interfaces
- `fetchTodos()` — GET `/todos?_limit=10`
- `fetchUsers(query: string)` — GET `/users`, filter client-side by name/username/email
- `fetchPostById(id: number)` — GET `/posts/:id`

### `src/components/QueryStateInspector.tsx` — Reusable state visualizer

Accepts a query result and renders a grid of labeled pills showing:

- Boolean flags: `isPending`, `isFetching`, `isLoading`, `isError`, `isSuccess`
- String values: `status`, `fetchStatus`
- Each flag colored green when true, gray when false
- Uses existing design tokens (`--lagoon`, `--sea-ink`, `--line`, etc.)

---

## Phase 3: Create demo route pages

### `src/routes/index.tsx` — Landing page / demo hub

- Brief hero explaining lazy queries
- Three cards linking to each demo pattern, each with a short description

### `src/routes/manual-fetch.tsx` — Pattern 1: `enabled: false` + `refetch()`

```tsx
useQuery({ queryKey: ["todos"], queryFn: fetchTodos, enabled: false });
```

- "Fetch Todos" button calls `refetch()`
- QueryStateInspector showing all flags
- Code snippet showing the pattern
- Explanatory notes about `isPending` vs `isLoading` vs `isFetching`

### `src/routes/conditional-query.tsx` — Pattern 2: `enabled: !!value`

```tsx
const [search, setSearch] = useState("");
useQuery({ queryKey: ["users", search], queryFn: () => fetchUsers(search), enabled: !!search });
```

- Text input for searching users
- Query activates when input is non-empty, disables when cleared
- QueryStateInspector + results list

### `src/routes/skip-token.tsx` — Pattern 3: `skipToken`

```tsx
const [postId, setPostId] = useState<number | null>(null);
useQuery({ queryKey: ["post", postId], queryFn: postId ? () => fetchPostById(postId) : skipToken });
```

- Numbered buttons (1-10) to select a post ID, "Clear" button to reset
- Note that `refetch()` is a no-op with skipToken active
- QueryStateInspector + post content display

---

## Phase 4: Update navigation and layout

**`src/components/Header.tsx`:** Replace Blog/About/Docs nav links with:

- Home, Manual Fetch, Conditional Query, Skip Token

**`src/routes/__root.tsx`:** Update `<title>` to "Lazy Query Demos"

---

## Phase 5: Verification

1. `pnpm dev` — app starts without errors
2. Home page shows three demo cards with working links
3. Manual Fetch: button triggers fetch, states update in inspector, todos render
4. Conditional Query: typing activates query, clearing disables it
5. Skip Token: selecting post ID fetches data, clearing shows idle state
6. React Query Devtools (bottom-right panel) shows query cache entries and states

---

## Key files to modify

| File                        | Action                            |
| --------------------------- | --------------------------------- |
| `src/routes/index.tsx`      | Rewrite                           |
| `src/components/Header.tsx` | Update nav links                  |
| `src/routes/__root.tsx`     | Update title                      |
| `vite.config.ts`            | Remove content-collections plugin |
| `tsconfig.json`             | Remove content-collections path   |

## New files

| File                                     | Purpose                                 |
| ---------------------------------------- | --------------------------------------- |
| `src/lib/api.ts`                         | JSONPlaceholder fetch functions + types |
| `src/components/QueryStateInspector.tsx` | Query state visualizer                  |
| `src/routes/manual-fetch.tsx`            | Pattern 1 demo                          |
| `src/routes/conditional-query.tsx`       | Pattern 2 demo                          |
| `src/routes/skip-token.tsx`              | Pattern 3 demo                          |

## Existing code to reuse

- `src/integrations/tanstack-query/root-provider.tsx` — QueryClient setup (no changes needed)
- `src/styles.css` — All CSS classes: `page-wrap`, `island-shell`, `feature-card`, `display-title`, `island-kicker`, `nav-link`, `rise-in`
- `src/components/ThemeToggle.tsx`, `Footer.tsx` — Keep as-is
