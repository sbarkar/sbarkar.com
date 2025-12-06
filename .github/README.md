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

### `dependabot-automerge.yml` — Automated Dependency Updates

Automatically enables GitHub's auto-merge feature for Dependabot PRs and PRs labeled `automerge` after CI passes.

**Trigger:**

- Runs after the `CI` workflow completes successfully.
- Targets Dependabot PRs (opened by `dependabot[bot]`) and any PR labeled `automerge`.

**Behavior:**

- Finds PRs associated with the successful CI run.
- Enables GitHub's native auto-merge feature (squash merge method).
- GitHub will automatically merge when all checks pass and there are no conflicts.
- Respects branch protection rules.

## Configuration

### Dependabot (`dependabot.yml`)

- **Ecosystem:** Yarn (uses `yarn.lock` for deterministic builds).
- **Schedule:** Daily updates.
- **Labels:** Auto-labeled `automerge` so the workflow detects them.
- **Commit prefix:** `chore(deps)` for consistency.

### Branch Protection (Manual Setup Required)

To ensure auto-merge workflows function safely:

1. Go to **Settings → Branches → Branch protection rules** for `main`.
2. Enable:
   - ✅ "Require a pull request before merging"
   - ✅ "Require status checks to pass before merging" (select `ci` job)
   - ✅ "Allow auto-merge" (enables GitHub's auto-merge API)
3. (Optional) "Require branches to be up to date before merging" (ensures fresh test runs).

**Rationale:** Branch protection ensures auto-merge PRs only merge after CI passes and there are no conflicts.

### Auto-merge Label (Optional)

Create a repository label `automerge` (e.g., green color) for visibility. Dependabot will auto-apply it; you can also manually add it to other PRs that should auto-merge.

## How It Works (End-to-End)

1. **Dependabot detects a security update** or version change.
2. **Dependabot opens a PR** and labels it `automerge` (configured in `dependabot.yml`).
3. **CI workflow triggers:** Runs on the PR (install → build → lint).
4. **If CI passes:**
   - `dependabot-automerge.yml` workflow triggers automatically.
   - Workflow enables GitHub's auto-merge feature for the PR.
   - GitHub waits for all branch protection checks.
   - If no conflicts exist, GitHub automatically merges (squash).
5. **If CI fails or conflicts exist:**
   - Auto-merge is not enabled or won't proceed.
   - PR stays open for manual review/fix.

## Important Notes

- **Yarn requirement:** This repository uses Yarn exclusively. All workflows and Dependabot use `yarn install --frozen-lockfile`. Do not use `npm` or create `package-lock.json`.
- **Merge conflicts:** If a Dependabot PR has merge conflicts (e.g., due to recent changes to `yarn.lock`), GitHub will not auto-merge. You can manually rebase the PR or let Dependabot handle it in the next run.
- **Manual override:** You can manually add the `automerge` label to any PR to trigger auto-merge behavior (e.g., chore tasks, documentation updates) if CI passes.
- **Vercel deployments:** Vercel will build and deploy the site on every push to `main` (after merge). See `vercel.json` for build/dev/install command overrides.

## Troubleshooting

- **Auto-merge not enabled:** Check the Actions log for `dependabot-automerge.yml`. Ensure the CI workflow completed successfully and the PR is either created by `dependabot[bot]` or labeled `automerge`. Verify branch protection allows auto-merge.
- **Build or lint fails:** Review the CI workflow output in GitHub Actions. Fix the code and push changes, or wait for Dependabot to update the PR.
- **PR has conflicts:** GitHub won't auto-merge if conflicts exist. Dependabot can auto-resolve some conflicts in its next update, or you can manually rebase the PR branch.
- **Workflow doesn't trigger:** Ensure the `CI` workflow completed (check Actions tab). The `dependabot-automerge.yml` workflow only triggers after `CI` completes.

For more details on workflows, see the individual `.yml` files. For package/build config, see `package.json`, `next.config.js`, `vercel.json`, and `eslint.config.mjs`.
