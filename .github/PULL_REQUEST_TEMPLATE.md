## Summary

This PR upgrades Tailwind CSS to v4 and updates PostCSS configuration to use the new `@tailwindcss/postcss` plugin.

## What I changed
- Upgraded `tailwindcss` to v4 and added `@tailwindcss/postcss`.
- Updated `postcss.config.js` to use `@tailwindcss/postcss` as the PostCSS plugin.
- Committed generated `yarn.lock`.

## Verification
- Build: `yarn build` (local build completed successfully)
- Lint: `yarn lint` (no lint errors)

## Notes
- Removed `package-lock.json` to avoid mixing npm and Yarn lockfiles. This repo uses Yarn (`yarn.lock`).
- Tailwind v4 may require visual verification for style regressions. Please run `yarn dev` and review pages locally.

## Post-merge
- Ensure Vercel preview deploy looks correct. If you see layout or style regressions, revert or fix specific style changes.

Closes: replace Dependabot PR #176 (optional) — or keep both and merge as appropriate.
