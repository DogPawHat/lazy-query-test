# Lazy Query Test

Interactive TanStack Query demos that focus on **lazy/conditional fetching** patterns in React.

## Live Demo

Netlify: https://lazy-query-test.netlify.app/

## Project Overview

This app demonstrates three ways to control when queries run:

1. `enabled: false` + `refetch()` for manual fetching
2. `enabled: !!value` for condition-based fetching
3. `skipToken` for declaratively skipping a query when inputs are missing

Each route includes:

1. A small, runnable UI example
2. Query state inspection to visualize status flags
3. Practical behavior for loading, empty, and data states

## Routes

- `/` - landing page linking to all demos
- `/manual-fetch` - manual query trigger with `refetch()`
- `/conditional-query` - query enabled only when input exists
- `/skip-token` - `skipToken` pattern for optional query functions

## Local Development

```bash
pnpm install
pnpm dev
```

Default dev server: `http://localhost:3000`

## Scripts

```bash
pnpm dev           # Start local dev server
pnpm build         # Build production bundle
pnpm preview       # Preview production build locally
pnpm test          # Run tests
pnpm lint          # Run lint checks
pnpm lint:fix      # Auto-fix lint issues
pnpm format        # Format code
pnpm format:check  # Check formatting only
```
