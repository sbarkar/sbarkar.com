# Dependabot Auto-Merge Setup Guide

This document explains how the Dependabot auto-merge system works and what repository settings are required.

## Overview

The repository is configured to automatically merge Dependabot pull requests after all CI checks pass. This ensures dependencies stay up-to-date without manual intervention while maintaining code quality.

## How It Works

1. **Dependabot creates a PR** with dependency updates (runs daily)
2. **CI workflow runs** (`ci.yml`) - builds and lints the code
3. **Auto-merge workflow triggers** (`dependabot-automerge.yml`) - approves the PR and enables auto-merge
4. **GitHub automatically merges** the PR once all required checks pass

## Required Repository Settings

### 1. Enable Auto-Merge Feature

Go to **Settings → General → Pull Requests**:

- ✅ Check "Allow auto-merge"

### 2. Configure Branch Protection

Go to **Settings → Branches → Branch protection rules** for `main`:

**Required settings:**

- ✅ "Require a pull request before merging"
- ✅ "Require status checks to pass before merging"
  - Select: `ci` (from the CI workflow)
- ✅ "Require branches to be up to date before merging" (recommended)

**Optional but recommended:**

- ✅ "Require approval before merging" (works with auto-approve in workflow)
- ⚠️ Do NOT enable "Require review from Code Owners" unless you want manual reviews

### 3. Workflow Permissions (Already Configured)

The workflow has the necessary permissions:

- `contents: write` - to merge PRs
- `pull-requests: write` - to approve PRs

## Configuration Files

### Dependabot Configuration (`.github/dependabot.yml`)

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily" # Checks for updates daily
    open-pull-requests-limit: 5
    commit-message:
      prefix: "chore(deps)"
    groups:
      dependencies:
        patterns: ["*"]
        update-types: ["minor", "patch"] # Groups non-breaking updates
```

**Key features:**

- Daily updates
- Groups minor and patch updates to reduce PR volume
- Major version updates create separate PRs (may require manual review – see considerations below)

### Auto-Merge Workflow (`.github/workflows/dependabot-automerge.yml`)

```yaml
name: Dependabot Auto-Merge
on:
  pull_request_target: # Secure token access
    types: [opened, synchronize, reopened]

jobs:
  auto-merge:
    if: github.actor == 'dependabot[bot]'
    steps:
      - Auto-approve the PR
      - Enable auto-merge with squash strategy
```

**Security notes:**

- Uses `pull_request_target` for secure token access
- Only runs for PRs created by `dependabot[bot]`
- Uses built-in `GITHUB_TOKEN` (no additional secrets needed)

## Update Types and Behavior

| Update Type                     | Behavior                              | Risk Level | Recommendation              |
| ------------------------------- | ------------------------------------- | ---------- | --------------------------- |
| **Patch** (e.g., 1.0.0 → 1.0.1) | Grouped and auto-merged               | 🟢 Low     | Safe to auto-merge          |
| **Minor** (e.g., 1.0.0 → 1.1.0) | Grouped and auto-merged               | 🟡 Medium  | Safe to auto-merge with CI  |
| **Major** (e.g., 1.0.0 → 2.0.0) | Separate PR, auto-merged if CI passes | 🔴 High    | Requires strong CI coverage |

**All updates must pass CI (build + lint) before merging.**

### ⚠️ Major Version Update Considerations

Major version updates may contain breaking changes. Auto-merging is safe **only if**:

- ✅ Your CI suite thoroughly tests all functionality
- ✅ Your build process catches TypeScript/compilation errors
- ✅ You regularly monitor merged PRs and deployment status
- ✅ You can quickly rollback if issues occur

**For critical dependencies** (e.g., React, Next.js, TypeScript), consider:

- Manual review before auto-merge triggers
- Temporarily disabling auto-merge: comment `@dependabot ignore this major version`
- Reviewing the changelog before merge
- Testing in a staging environment first

**Current setup:** All major updates auto-merge by default. This works well for a personal CV site with good CI coverage. Adjust based on your risk tolerance.

## Monitoring and Control

### View Auto-Merge Activity

- Go to **Actions** tab to see workflow runs
- Each Dependabot PR will trigger the auto-merge workflow
- Check the workflow logs if something fails

### Temporarily Disable Auto-Merge

If you need to pause auto-merging:

**Option 1: Disable the workflow**

- Go to **Actions → Dependabot Auto-Merge → ... → Disable workflow**

**Option 2: Close Dependabot PRs**

- Comment `@dependabot ignore this major version` to skip major updates
- Comment `@dependabot ignore this dependency` to skip a specific package
- Close the PR manually (Dependabot will respect this)

### Re-enable Auto-Merge

- Re-enable the workflow in Actions tab
- Comment `@dependabot reopen` on closed PRs

## Troubleshooting

### PR not auto-merging

**Check:**

1. ✅ Auto-merge enabled in repository settings?
2. ✅ Branch protection configured with required checks?
3. ✅ CI workflow passing?
4. ✅ No merge conflicts?

**Common issues:**

- **"Required status checks are missing"**: Add `ci` to required checks in branch protection
- **"Auto-merge is not enabled"**: Enable in Settings → General → Pull Requests
- **"Review required"**: The workflow auto-approves, but check branch protection settings
- **"Merge conflicts"**: Dependabot will automatically rebase in the next run

### Workflow not running

**Check:**

1. ✅ Workflow file syntax correct? (Run `yamllint` locally)
2. ✅ Workflow enabled in Actions tab?
3. ✅ PR created by `dependabot[bot]`?

### Security concerns

**The workflow is secure because:**

- Uses `pull_request_target` (runs in the context of the base branch)
- Only runs for PRs from `dependabot[bot]` (verified by GitHub)
- Uses built-in `GITHUB_TOKEN` with minimal permissions
- All changes validated by CI before merge
- Dependabot PRs are isolated (no code execution from PR branch)

## Manual Override

If you need to manually review a Dependabot PR:

1. Close the PR (auto-merge workflow won't run again)
2. Review the changes
3. Re-open and merge manually, OR
4. Comment `@dependabot reopen` and let it auto-merge

## Benefits

✅ **Always up-to-date**: Dependencies updated daily
✅ **Security**: Security patches applied automatically
✅ **Quality**: All updates validated by CI before merge
✅ **Low maintenance**: No manual intervention needed
✅ **Reduced PR volume**: Minor/patch updates grouped together
✅ **Safe**: Breaking changes tested by CI before merge

## Additional Resources

- [GitHub Dependabot documentation](https://docs.github.com/en/code-security/dependabot)
- [Auto-merge documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
- [Branch protection documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
