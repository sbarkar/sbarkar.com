# Repository Settings Checklist for Auto-Merge

This checklist helps ensure all GitHub repository settings are configured correctly for Dependabot auto-merge to work.

## ✅ Required Settings

### 1. General Settings → Pull Requests

Navigate to: **Settings → General → Pull Requests**

- [ ] **Allow auto-merge** - ✅ MUST be enabled
  - This allows PRs to be automatically merged when all checks pass
  - Without this, the auto-merge workflow will fail

### 2. Branch Protection Rules

Navigate to: **Settings → Branches → Branch protection rules**

Create or edit the rule for `main` branch:

#### Required Settings:

- [ ] **Require a pull request before merging** - ✅ MUST be enabled
- [ ] **Require status checks to pass before merging** - ✅ MUST be enabled
  - [ ] Add required check: `ci` (from CI workflow)
  - [ ] Add required check: `auto-merge` (from auto-merge workflow) - OPTIONAL but recommended

#### Recommended Settings:

- [ ] **Require branches to be up to date before merging** - ⭐ Recommended
  - Ensures tests run against the latest main branch
  - Prevents race conditions
- [ ] **Require approval from someone other than the last pusher** - ⭐ Recommended
  - The auto-merge workflow provides this approval automatically
  - Set to "1 approval required"

#### ⚠️ Important Considerations:

- [ ] **Require review from Code Owners** - ⚠️ Recommended: DISABLED for full automation
  - **For fully automated merges:** Disable this setting
  - **For selective automation:** Keep enabled and add Dependabot as a code owner in specific paths
  - **Trade-off:** If enabled without proper CODEOWNERS config, manual review will always be needed
  - **Alternative:** Configure `.github/CODEOWNERS` to require reviews only for critical files

### 3. Actions Permissions

Navigate to: **Settings → Actions → General**

#### Workflow Permissions:

- [ ] **Read and write permissions** - ✅ MUST be selected
  - Required for workflows to approve and merge PRs
  - Alternative: Keep "Read repository contents" and add specific permissions (already in workflow)

#### Allow GitHub Actions:

- [ ] **Allow all actions and reusable workflows** - ✅ Recommended
  - OR specifically allow: `actions/*`, `dependabot/fetch-metadata`

## 🔍 Verification Steps

After configuring settings:

1. **Test with a Manual PR:**

   ```bash
   git checkout -b test-auto-merge
   # Make a small change
   echo "# Test" >> README.md
   git add README.md
   git commit -m "test: verify auto-merge setup"
   git push origin test-auto-merge
   ```

   - Create PR from GitHub UI
   - Check that CI runs
   - Check that you can enable auto-merge manually

2. **Wait for Next Dependabot PR:**
   - Dependabot runs daily
   - Check that auto-merge workflow triggers
   - Verify PR gets approved automatically
   - Confirm PR merges after CI passes

3. **Force a Dependabot PR (Optional):**
   - Go to **Insights → Dependency graph → Dependabot**
   - Click "Last checked X ago" → "Check for updates"
   - This triggers Dependabot immediately

## 🎯 Success Criteria

When properly configured, you should see:

✅ Dependabot creates a PR
✅ CI workflow runs and passes
✅ Auto-merge workflow runs and approves the PR
✅ "Auto-merge enabled" badge shows on the PR
✅ PR automatically merges when all checks pass
✅ No manual intervention needed

## 🚨 Troubleshooting

### "Auto-merge is not enabled for this repository"

- **Fix:** Enable auto-merge in Settings → General → Pull Requests

### "Required status checks are missing"

- **Fix:** Add `ci` to required checks in branch protection rules

### "Workflow does not have permissions to approve"

- **Fix:** Enable "Read and write permissions" in Actions settings

### "Review required" but auto-merge not working

- **Fix:** Ensure "Require review from Code Owners" is disabled
- **OR:** Add a CODEOWNERS file with the bot as owner (not recommended)

### Workflow runs but doesn't approve

- **Check:** Workflow logs in Actions tab for errors
- **Check:** PR is created by `dependabot[bot]`
- **Check:** GITHUB_TOKEN has correct permissions

## 📚 Additional Resources

- [GitHub Auto-merge Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
- [Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)

---

**Note:** These settings must be configured by a repository administrator. They cannot be set via code or workflows.
