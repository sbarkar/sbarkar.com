# GitHub Automation

This directory contains GitHub workflows and configuration for CI/CD and automated maintenance.

## Workflows

### `ci.yml` — Build & Lint Checks

Runs on every push and pull request. Verifies the project builds and lints successfully using Yarn.

**Steps:**

- Install dependencies: `yarn install --frozen-lockfile`
- Build: `yarn build`
- Lint: `yarn lint`

**Status:** Required for merging to `main` (via branch protection).

## Configuration

### Dependabot (`dependabot.yml`)

- **Ecosystem:** Yarn (uses `yarn.lock` for deterministic builds).
- **Schedule:** Daily updates.
- **Commit prefix:** `chore(deps)` for consistency.

### Branch Protection (Recommended Setup)

1. Go to **Settings → Branches → Branch protection rules** for `main`.
2. Enable:
   - ✅ "Require a pull request before merging"
   - ✅ "Require status checks to pass before merging" (select `ci` job)
3. (Optional) "Require branches to be up to date before merging" (ensures fresh test runs).

**Rationale:** Branch protection ensures PRs only merge after CI passes and there are no conflicts.

## Important Notes

- **Yarn requirement:** This repository uses Yarn exclusively. All workflows and Dependabot use `yarn install --frozen-lockfile`. Do not use `npm` or create `package-lock.json`.
- **Merge conflicts:** If a Dependabot PR has merge conflicts (e.g., due to recent changes to `yarn.lock`), you can manually rebase the PR branch or let Dependabot handle it in the next run.
- **Vercel deployments:** Vercel will build and deploy the site on every push to `main` (after merge). See `vercel.json` for build/dev/install command overrides.

## Troubleshooting

- **Build or lint fails:** Review the CI workflow output in GitHub Actions. Fix the code and push changes, or wait for Dependabot to update the PR.
- **PR has conflicts:** Dependabot can auto-resolve some conflicts in its next update, or you can manually rebase the PR branch.

For more details on workflows, see the individual `.yml` files. For package/build config, see `package.json`, `next.config.js`, `vercel.json`, and `eslint.config.mjs`.
