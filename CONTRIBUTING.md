# Create and submit an ORB

Anyone with a GitHub account may propose a listing. Featuring is a decision by `@visualizationcreation`, not an automatic result of submitting.

## 1. Make your ORB

Use the [public ORB basic prompt](https://visualizationcreation.github.io/orbbasic/) in an AI chat, or your installed ORB skill. Pick a clear topic, reader and question. Explore, verify sources and shape connected readings. The [ORB field guide](https://visualizationcreation.github.io/the-orb-skill/) explains the method. A slash command alone does not install a skill in another AI tool.

Ask for a browsable ORB Web artifact with `index.html` as its entry page. Keep a visible six-direction compass, stable point links, sourced readings, a way home and an honest continuation prompt. UP broadens, DOWN deepens, LEFT/RIGHT visit adjacent facets, FORWARD/BACKWARD follow implications/precursors on a labeled thread. History Back is separate. At an evidence boundary, label what remains unresolved instead of inventing certainty. Audio and video are optional; only advertise playback that actually works.

## 2. Publish in your own repository

On GitHub choose **New repository**. Give it a topic-based name such as `urban-trees-orb`, select **Public**, and add a README. Create it, then **Add file → Upload files**. Upload `index.html` at the repository root and any required assets using their expected paths. Commit the upload. Add a blank `.nojekyll` file for a plain static site. Do not upload credentials, private notes or media you cannot share.

Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save. Wait for the deployment; open the exact live URL GitHub shows. Test the published site on desktop and mobile, including compass moves, sources and any supplied media. If your artifact needs a framework build, follow its build instructions before uploading the static output.

## 3. Prepare a listing

Use the [listing generator](https://visualizationcreation.github.io/orb-share/#listing). You need a title, 20–300 character summary, GitHub username, live site URL, source repository URL, 1–5 tags and the full 40-character source commit SHA. To get the SHA, open your repository's latest commit and use **Copy full SHA**. Confirm that commit is the edition served by Pages. Mark audio/video only when the submitted edition contains working playback. If a GitHub organization owns the repository, use your own username as creator and explain your relationship in the PR.

## 4. Fork, edit and open a pull request

1. Open [orb-share](https://github.com/visualizationcreation/orb-share) and select **Fork → Create fork**. If you already have a fork, use **Sync fork** first.
2. In your fork, open `orbs.json`, select the pencil (**Edit this file**) and add your generated object **inside the `orbs` array**. Keep `schemaVersion` and all existing entries. Put a comma between objects; do not add a comma after the last object. When the array is empty, replace `[]` with `[ your object ]`.
3. Commit the change on a new branch such as `add-my-orb` in your fork. Optional local check: `node validate.cjs`.
4. Select **Contribute → Open pull request**. Confirm the base repository is `visualizationcreation/orb-share`, base branch `main`, and the head is your fork's submission branch. Title it `Add ORB: Your title`. Fill the checklist and submit the pull request.
5. Keep this PR limited to your listing in `orbs.json`. Do not change the website, validator, CODEOWNERS, existing listings or publishing configuration. Workflow suggestions belong in a separate PR.

## 5. Review and featuring

The owner checks the live ORB, evidence, usability, content rights and source revision. Respond to comments by updating the same branch; GitHub updates the PR. Changed submissions need renewed review. Only after the owner approves and merges does the listing enter the published catalogue and appear in the main page's **Community ORBs** section. Pages deployment can take a few minutes. A closed, unmerged PR is not featured.

For a new edition or a material change, update the existing listing and source revision in another PR rather than creating a duplicate. Creators remain responsible for their hosted content. No guaranteed review time or acceptance is promised.

## GitHub references

- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- [Create a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
