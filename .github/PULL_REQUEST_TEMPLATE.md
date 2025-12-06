<!-- PR template to remind contributors to run local checks -->

## Summary

Describe the change and why it is needed.

## Validation checklist

- [ ] Run `yarn dev` and verify the change at `http://localhost:3000`.
- [ ] Run `npx prettier --write .` and `yarn lint`.
- [ ] Run `yarn build` locally (if the change affects build/SSR).
- [ ] Keep changes minimal and data-driven edits inside `src/data/resume-data.tsx` when possible.

If this change affects the site's structure or data shape, please coordinate before merging.
