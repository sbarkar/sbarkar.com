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
Detects Dependabot PRs and PRs labeled `automerge`, runs CI checks, and enables GitHub auto-merge if checks pass.

**Trigger:**
- Dependabot security/version update PRs (opened by `dependabot[bot]`).
- Any PR labeled `automerge` (manual override for other bots or tasks).

**Behavior:**
- Runs the same CI checks as `ci.yml` (install, build, lint).
- If all checks pass, enables GitHub auto-merge (squash merge method).
- GitHub respects branch protection and will not merge if conflicts exist or required checks are unsatisfied.

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
2. **Dependabot opens a PR** and labels it `automerge`.
3. **Workflow triggers:** `dependabot-automerge.yml` detects the PR.
4. **CI runs:** install → build → lint.
5. **If CI passes:**
   - Workflow enables GitHub auto-merge.
   - GitHub waits for branch protection checks.
   - If no conflicts and all checks pass, GitHub automatically merges (squash).
6. **If CI fails or conflicts exist:**
   - Auto-merge is not enabled.
   - PR stays open for manual review/fix.

## Important Notes

- **Yarn requirement:** This repository uses Yarn exclusively. All workflows and Dependabot use `yarn install --frozen-lockfile`. Do not use `npm` or create `package-lock.json`.
- **Merge conflicts:** If a Dependabot PR has merge conflicts (e.g., due to recent changes to `yarn.lock`), GitHub will not auto-merge. You can manually rebase the PR or let Dependabot handle it in the next run.
- **Manual override:** You can manually add the `automerge` label to any PR to trigger auto-merge behavior (e.g., chore tasks, documentation updates) if CI passes.
- **Vercel deployments:** Vercel will build and deploy the site on every push to `main` (after merge). See `vercel.json` for build/dev/install command overrides.

## Troubleshooting

- **Auto-merge not enabled:** Check that `dependabot-automerge.yml` job conditions match your PR (either created by `dependabot[bot]` or labeled `automerge`). Also ensure the PR author is not restricted by branch protection (GitHub Actions is typically allowed).
- **Build or lint fails:** Review the workflow output in GitHub Actions. Fix the code and either wait for Dependabot to re-run or manually push a fix to the PR branch.
- **PR has conflicts:** Dependabot can auto-resolve some conflicts; for others, you'll need to manually rebase or wait for a new update attempt.

For more details on workflows, see the individual `.yml` files. For package/build config, see `package.json`, `next.config.js`, `vercel.json`, and `eslint.config.mjs`.
