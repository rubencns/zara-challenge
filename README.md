# Zara Challenge

Mobile phone catalog with search, product details and a shopping cart.

Next.js 15, React 19, TypeScript, CSS Modules, SWR, Vitest + Testing Library.

## Setup

```bash
pnpm install
```

Create `.env.local` file at the root:

```
NEXT_PUBLIC_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
NEXT_PUBLIC_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

`pnpm dev` / `pnpm build && pnpm start` / `pnpm test` / `pnpm lint` / `pnpm format`

## Architecture

Clean Architecture + Repository Pattern. This is overkill for a project this size, but I wanted to show how I'd structure things if the app needed to grow. With more domains (checkout, user, orders...) I'd move to a screaming architecture where folders map to business domains (`products/`, `cart/`, `checkout/`) instead of technical layers.

```
src/
  domain/           # types, interfaces, business logic (calculateTotals)
  application/      # use cases
  infrastructure/   # implementations: httpClient, ApiProductRepository, LocalStorageCartRepository
  presentation/     # components, hooks, context, DependencyProvider
  app/              # Next.js pages
```

Each layer only depends on the ones below it. Dependencies are injected through `DependencyProvider` on the client and `serverUseCases.ts` on the server.

## Technical Decisions

- Listing and detail pages render server-side, search and cart are client-side.
- The cart uses `useReducer` + `localStorage`, hydrating on mount through the `getCart` use case.
- Search uses SWR with debounce, getting the initial data from the server as `fallbackData`.
- `React.cache` deduplicates the product detail fetch between `generateMetadata` and the page component.

## Tests

I focused on testing the parts with actual logic first (use cases, repositories, hooks, interactive components). Coverage could be improved by adding tests for the remaining presentational components and the context. `pnpm test:coverage` for the report.
