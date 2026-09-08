# Owner review and featuring

Owner: **@visualizationcreation**. Open the [review queue](https://github.com/visualizationcreation/orb-share/pulls).

1. Read the PR description and **Files changed**. A normal listing submission changes only its entry in `orbs.json`. Investigate any changes to other entries or files. Verify creator ownership or permission and match the source commit to the submitted live edition.
2. Read the source as text, then review the live ORB in a browser. Check the stated subject, readable content, six-direction navigation, home route, source quality, uncertainty labels, attribution and any advertised audio/video. Do not install or execute contributor code locally. A successful syntax check is not content approval.
3. Validate the proposed JSON using the trusted `validate.cjs` from the upstream repository: `node /path/to/trusted/validate.cjs /path/to/proposed/orbs.json`. Do not use a PR-modified validator. This checks structure, duplicate IDs, fields and URL formats; live URL/ownership checks remain manual.
4. For changes, choose **Review changes → Request changes** and explain what needs correcting. For an accepted submission, choose **Review changes → Approve → Submit review**, then **Merge pull request** (or Squash and merge) and confirm. Record meaningful review findings in your review. Do not use admin bypass to skip review of outside submissions.
5. Wait for the `github-pages` deployment of that merge. Open the [published catalogue](https://visualizationcreation.github.io/orb-share/orbs.json) and [archive community section](https://visualizationcreation.github.io/orb-archive/#share). Confirm the title, creator, source snapshot and live link. No separate archive edit is needed for accepted entries.

To decline, explain the reason and close without merging. To remove a featured listing, remove its JSON object and commit deliberately; verify the next deployment and homepage refresh. To update it, review the new revision through another PR. Because creators host their own ORBs, their live websites may change later; the source snapshot records what was reviewed.

## Repository settings

Pages: `Deploy from a branch`, `main`, `/ (root)`. Branch protection for `main`: require PR before merging, one approving review, Code Owner review, dismiss stale approvals and resolve conversations. The sole Code Owner is `@visualizationcreation` for every path including CODEOWNERS itself. Auto-merge is off. Do not grant public write access. Owner/admin maintenance override is available; it is not submission approval.

[GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) · [Code Owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
