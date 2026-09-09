# ORB Share

Create with the ORB Skill. Submit a link or file. The owner reviews; the assistant handles publication after approval.

**[Share this ORB](https://visualizationcreation.github.io/orb-share/#submit)** · [Submission queue](https://github.com/visualizationcreation/orb-share/issues) · [Owner workflow](REVIEWING.md)

Contributors use the ORB Skill as described in the [field guide](https://visualizationcreation.github.io/the-orb-skill/) or the [published ORB prompt](https://visualizationcreation.github.io/orbbasic/) in their own AI workspace. Submissions must preserve the shared ORB format. Original topics and perspectives help grow the collection. Contributors use their own tools and generation allowance; no AI credentials or computer-control permissions are requested.

## Simple intake

1. Create and check a finished ORB Web artifact.
2. On the Share page, enter the title, creator credit, short summary and live/download link; alternatively choose to attach an HTML/ZIP on GitHub.
3. Confirm ORB format, permission to host with credit and public submission. Open the prefilled GitHub issue, attach any files, and submit. A GitHub account is required; a repository, hosting, commit SHA, JSON editing and fork are not.
4. The owner asks their assistant to review the current intake. The assistant prepares file/format/evidence checks and a preview. The owner decides. Only explicit approval of the reviewed edition authorizes publication.
5. After approval, the assistant handles repository/files, hosting if needed, attribution and the approved archive listing. Submission never automatically features an ORB.

Submissions and attachments are public. GitHub accepts HTML and ZIP attachments up to 25 MB each; use a public download link for larger packages. Keep index.html and required assets together. See [attachment instructions](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files).

## Repository internals

Issues are intake. The root orbs.json remains the approved catalogue, managed by the owner/assistant after approval; the archive never consumes pending issue bodies. validate.cjs checks catalogue data, not content quality or owner approval. The existing submission-template.json and pull_request_template.md are for maintainer catalogue work, not required contributor steps.

Pages publishes main/root with .nojekyll. CODEOWNERS assigns every path to @visualizationcreation. main has required PR, one approval, Code Owner review, stale-approval dismissal and conversation resolution; the owner's administrative maintenance override remains available. Do not weaken these protections or give contributors write access. No automatic issue-to-publishing workflow or ongoing monitor is installed.

Each approved edition retains creator credit and source/media provenance. Review records identify the issue, exact attachment hash or source revision, approval and published destination. A material update needs renewed review. See CONTRIBUTING.md and REVIEWING.md for details.


## ORB Share file tool

Open `tool.html` to paste or load ORB File 1, preview its map and authored compass, save it, or prepare the existing submission form. See FORMAT.md and authoring-brief.txt. Input stays in the browser until the contributor manually submits it on GitHub. The reader supports text and unrecorded scripts; existing custom HTML/ZIP and media submissions remain supported. Rebuild the embedded example and brief with `node build-tool.cjs`.
