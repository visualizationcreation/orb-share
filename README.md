# ORB Share

A place for anyone with a GitHub account to submit an ORB for the community section of the [ORB Archive](https://visualizationcreation.github.io/orb-archive/#share).

**[Create and share your ORB — walkthrough](https://visualizationcreation.github.io/orb-share/)** · [Submit a listing](https://github.com/visualizationcreation/orb-share/edit/main/orbs.json) · [Review queue](https://github.com/visualizationcreation/orb-share/pulls)

1. Create an ORB and verify its readings, compass, sources and working controls.
2. Publish it in your own public GitHub repository using GitHub Pages.
3. Generate a listing using the walkthrough. Fork this repository, add that object to the `orbs` array in `orbs.json`, and open a pull request against this repository's `main` branch.
4. `@visualizationcreation` reviews the submission, requests changes if needed, and approves and merges accepted work.
5. GitHub Pages publishes the approved catalogue. The archive's community section reads it automatically after deployment. An open PR is never featured.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the complete browser-only steps and [REVIEWING.md](REVIEWING.md) for owner instructions.

## What this repository contains

This repository hosts the public walkthrough and the **approved directory listings**. Creators keep their ORB's HTML and media in their own repositories. We link to their live sites and retain a source commit for the reviewed edition. A listing is not a transfer of ownership or a license to reuse a creator's work. The creator's own repository should explain its license and media credits.

`orbs.json` begins empty; it contains no demonstration or pending submissions. To validate a proposed catalogue, run `node validate.cjs` (Node.js required only for this optional local check). Validation is not an automated review and does not approve content. Do not run a contributor's scripts to review a listing.

## Publishing and approval gate

GitHub Pages publishes `main` from `/ (root)` with `.nojekyll`. The archive fetches `https://visualizationcreation.github.io/orb-share/orbs.json`; it never reads forks, PR branches, issue bodies or preview deployments. The root `CODEOWNERS` assigns every file to `@visualizationcreation`. Protect `main` with required pull requests, one approval, required Code Owner review and dismissal of stale approvals. Keep auto-merge off. Owner/admin bypass remains available for deliberate maintenance; outside contributors have no direct write access.

For edits to the workflow itself, use a separate PR from listing submissions. Preserve CODEOWNERS, branch protection and the deployment source. New content changes require renewed review. Creator-hosted sites may change after review; the listing's immutable source link identifies the reviewed revision. Update its revision through another PR for a material update. The owner can remove a listing by deleting its object and publishing the catalogue again.
