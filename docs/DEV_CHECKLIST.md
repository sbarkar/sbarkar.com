# Developer Checklist

Quick checklist to validate changes before opening a PR.

- Start dev server and visually verify:

```bash
yarn dev
# open http://localhost:3000
```

- Format & lint:

```bash
npx prettier --write .
yarn lint
```

- Run a production build to catch SSR/TypeScript issues:

```bash
yarn build
```

- If you added/changed UI primitives, export them from `src/components/ui/index`.
- If you modify `src/data/resume-data.tsx`, keep the object shape consistent (`as const`).

CI will run `yarn build` and `yarn lint` on `main`.
