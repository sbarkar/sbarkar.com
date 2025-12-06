<!-- Copilot / AI agent instructions for the sbarkar.com repo -->

# Copilot Instructions — sbarkar.com

Purpose: make AI coding agents immediately productive editing this Next.js CV site.

**Big Picture:**

- **Framework:** Next.js (app router), React, TypeScript, TailwindCSS (shadcn/ui primitives).
- **Single-page CV:** `src/app/page.tsx` renders the whole CV using a single canonical data object `src/data/resume-data.tsx`.
- **UI pattern:** small reusable primitives live under `src/components/ui/*` (Buttons, Card, Badge, Avatar, Command, etc.) and are composed by higher-level components in `src/components`.
- **Static assets:** logos and image exports under `src/images/logos` and icons in `src/components/icons`.
- **Analytics/telemetry:** `src/app/layout.tsx` includes `@vercel/analytics` and `@vercel/speed-insights` — avoid removing unless instructed.

**Key files to edit (common tasks):**

- Add/update resume content: `src/data/resume-data.tsx` (single source of truth).
- Change layout or global CSS: `src/app/layout.tsx`, `src/app/globals.css`.
- Add/change components: `src/components/*` and shared primitives in `src/components/ui/*`.
- Images/logos: `src/images/logos/*` (exports used from `resume-data.tsx`).
- Dev / deploy config: `package.json`, `next.config.js`, `Dockerfile`, `docker-compose.yaml`.

**Conventions & patterns to follow:**

- Import alias: use `@/` to reference `src/*` (see `tsconfig.json` paths).
- Client vs Server components: the app router (files in `src/app`) are server components by default — add a top-line `"use client";` for client components (see `src/components/command-menu.tsx`).
- UI primitives follow shadcn conventions; try to reuse `src/components/ui/*` for consistent styles and accessibility.
- Print-friendly design: project uses Tailwind print utilities and a `.print-force-new-page` helper in `globals.css` — prefer CSS classes for print behavior.
- Data-driven pages: adding/removing resume sections is usually done by mutating `RESUME_DATA` (typed `as const`) rather than editing `page.tsx` markup when possible.

**Dev & build workflows (commands):**

- Install: `yarn install` (or `npm install`).
- Dev: `yarn dev` (runs `next dev`).
- Build: `yarn build` (runs `next build`).
- Start (production): `yarn start` (runs `next start`).
- Lint: `yarn lint`.
- Docker: `docker compose build` then `docker compose up -d`; stop with `docker compose down`.

**Package manager (important):**

- **Always use `yarn`** for this repository. The project is locked to Yarn (see `yarn.lock` and `package.json` `packageManager` field). Use `yarn install --frozen-lockfile` locally and in CI to ensure deterministic installs. Do not switch to `npm` or use `package-lock.json`.

When making changes that affect rendering, run `yarn dev` and open `http://localhost:3000`.

**Examples (concrete edits):**

- Add a new project: edit `src/data/resume-data.tsx` -> `projects` array; include `title`, `description`, `techStack`, optional `link` object.
- Add a new UI primitive: create `src/components/ui/<name>.tsx` and export it from `src/components/ui/index` (follow existing file structure).
- Make a component client-side: add `"use client";` at top; prefer small, focused client components (command menu, interactive controls).

**Integration points & external deps:**

- `@vercel/analytics` and `@vercel/speed-insights` (layout). Keep them if telemetry matters.
- Tailwind + `prettier-plugin-tailwindcss` used for style ordering — run formatter after edits.
- No test suite is present; rely on manual dev server and visual checks.

**TypeScript notes:**

- `tsconfig.json` is strict. Keep types and `as const` shapes intact to avoid cascading type errors.

**Do not change without confirmation:**

- `src/data/resume-data.tsx` object keys used across site (name, contact, projects, work, education) — preserve shape unless updating all usages.
- `src/app/layout.tsx` analytics imports.

If anything above is unclear or you want me to include additional examples (e.g., a step-by-step to add a new project card or add a social link), tell me which area and I'll iterate.

---

**Quick Edit Examples**

- Add a project to `src/data/resume-data.tsx` (append to `projects`):

```ts
{
	title: "Example Project",
	techStack: ["Next.js", "TypeScript"],
	description: "Short description",
	link: { label: "GitHub", href: "https://github.com/your/repo" },
}
```

- Make an existing component client-side (when it uses state/effects/DOM):

```tsx
"use client";
import React, { useEffect } from "react";
// component code with useEffect or event handlers
```

- Add a simple UI primitive: create `src/components/ui/Label.tsx` and export it:

```tsx
export const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-medium">{children}</span>
);
```

Then export from `src/components/ui/index` (follow existing index pattern).

**Formatting & Lint**

- Format and lint after edits:

```bash
yarn lint
npx prettier --write .
```

Note: project uses `prettier-plugin-tailwindcss` — run the formatter to keep class ordering consistent.

**Local dev tips & troubleshooting**

- Dev server: `http://localhost:3000`.
- If CSS/utility changes don't appear, restart the dev server — Tailwind can be cached by Next's dev server.
- Avatar images currently use direct `src` on `AvatarImage` (not `next/image`). If migrating to `next/image`, update imports and verify SSR behavior.

**Next.js specifics & compatibility notes**

- App router files in `src/app` are server components by default — avoid client hooks unless you add `"use client";`.
- `tsconfig.json` defines `@/*` alias. Use `@/` imports for consistency.
- `package.json` lists `next@^15.5.2` — upgrading Next may introduce breaking changes; test thoroughly when bumping.

**CI / Deployment notes**

- Vercel: the project is ready for Vercel; pushing to `main` or using the Vercel dashboard will deploy automatically with default settings.
- GitHub Actions: a lightweight CI runs `yarn build` and `yarn lint` (see `.github/workflows/ci.yml`).

**Files to avoid changing (without coordination)**

- `src/data/resume-data.tsx`: central data shape — changing keys will break `page.tsx`.
- `src/app/layout.tsx`: contains analytics and speed-insights imports.

**Per-change validation checklist (for PRs / edits)**

- Run `yarn dev` and visually verify the change at `http://localhost:3000`.
- Run `npx prettier --write .` and `yarn lint`.
- Run a local production build to catch SSR/TypeScript issues: `yarn build`.
- Keep changes minimal and data-driven edits in `resume-data.tsx` when possible.

---

**Repository hygiene suggestions (optional tasks)**

- Add a simple GitHub Actions CI (added): `.github/workflows/ci.yml` runs `yarn install`, `yarn build`, and `yarn lint`.
- Add a PR template to remind contributors to run the validation checklist (added): `.github/PULL_REQUEST_TEMPLATE.md`.
- Add a short developer checklist `docs/DEV_CHECKLIST.md` (added) summarizing these steps.

If you want, I can also add a small Vercel configuration or an extended CI that caches node modules. Tell me which of these you'd like next.
