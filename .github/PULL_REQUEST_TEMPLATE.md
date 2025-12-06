## Summary

Describe the change and why it is needed. For dependency upgrades, include verification details and any migration notes.

## What I changed

- Describe the files changed and high-level purpose (e.g., upgrade Tailwind to v4, update PostCSS config).

## Verification checklist

- [ ] Run `yarn dev` and verify the change at `http://localhost:3000`.
- [ ] Run `npx prettier --write .` and `yarn lint`.
- [ ] Run `yarn build` locally (if the change affects build/SSR).
- [ ] Confirm no visual regressions in Vercel preview after merge.

## Notes

- If this is a dependency upgrade with breaking changes (e.g., Tailwind v4), include migration notes and link to relevant docs.
- Avoid mixing `npm` and `yarn` lockfiles — prefer `yarn.lock` for this repository.

If this change affects the site's structure or data shape, please coordinate before merging.
