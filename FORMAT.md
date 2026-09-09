# ORB File 1

ORB Share reads structured UTF-8 text containing one JSON object, saved as `subject.orb.txt` or `.json`. It is a content format, not the old Orb Engine terrain syntax. No HTML, scripts, calculated coordinates, or generation-service access is required.

The reader supports 1–200 points, up to 2 MB per file. Plain text is displayed literally, never executed or interpreted as HTML. Unknown fields and unsupported versions fail validation explicitly instead of being silently discarded. Existing recordings, media and synchronized transcripts belong in the existing HTML/ZIP submission route for now; do not strip them to convert a media edition.

## Required root fields

- `format`: exactly `"orb"`.
- `formatVersion`: the number `1`.
- `id`: stable ORB identifier, 1–80 letters, digits, hyphens, underscores or dots.
- `title`: up to 80 characters.
- `summary`: up to 400 characters.
- `creator`: public credit, up to 60 characters. Never infer a personal name from an account or local path.
- `edition`: an authored content revision string, up to 80 characters.
- `entry`: an existing point ID, the root anchor.
- `points`: nonempty array described below.
- `route`: nonempty ordered array of unique existing point IDs. This is a reading sequence, separate from the conceptual graph. It may select a subset; other points remain browsable.

Optional `authorship`: an object with `modelLabel`, `modelId`, and `skillVersion`. Values may be strings or null. Record only confirmed provenance. Use “older model version” for older editions when appropriate; unknown IDs and versions remain null. File format, content edition, script revision and reader version are distinct.

## Points

Each point has `id`, `title` (up to 160 characters), `reading` (plain text, up to 100,000 characters; paragraphs separated by blank lines), `thread` (a named causal, temporal, logical or workflow relationship), `sources` and `links`.

`sources` is an array of up to 40 objects with `title` and an HTTPS `url`. An empty list is allowed with a review warning; factual claims still need appropriate evidence. Cite source titles in the prose where useful. Structural validation does not verify factual accuracy, originality, source support or sharing rights.

`links` contains all six keys: `up`, `down`, `left`, `right`, `forward`, `backward`. Each value is either:

```json
{"to":"another-point-id","label":"A meaningful destination"}
```

or:

```json
{"reason":"This is the root; broader context is not authored here."}
```

UP broadens context; DOWN deepens explanation or scale; LEFT/RIGHT connect adjacent facets; FORWARD/BACKWARD follow the point's named thread. History back is separate. Do not invent links to fill directions. Layout does not define meaning.

Optional `floor`: `{ "kind": "open-question", "known": "...", "question": "...", "unknown": "..." }`. Kind can also be `unresearched` or `hypothesis`. Do not present missing research as the frontier of human knowledge.

## Optional unrecorded scripts

`scripts` is an array of up to 10 scripts. Each has a unique `id`, `title`, `mode` (`learn` or `feel`), `revision`, and nonempty `passages` array. Each passage is `{ "point": "existing-point-id", "text": "continuous authored prose" }`. The reader labels every script unrecorded and displays the source-point mapping. Do not use this field for a changed transcript paired with an existing recording.

Learn is a coherent explanatory account. Feel & Experience is a warm, second-person guided dream, with sensory detail, gentle invitations and an unhurried return. Retain evidence, uncertainty and cultural attribution in both. Do not generate audio just to export an ORB file.

## Opening, saving and submissions

Open or paste the file in `tool.html`. Parsing happens locally in the browser; it does not send the file to a model, store it in a server or fetch embedded source URLs automatically. Save serializes the complete supported data without changing its content edition. Whitespace in JSON may change. There is no automatic persistence: keep the file to reopen it.

Prepare submission carries title, credit, summary, filename and edition to the existing form. The contributor confirms permissions and manually attaches the saved file on GitHub. No upload or submission occurs at preview time. Owner review and approval of the exact submitted version remain required for archive publication.

The example and copyable brief are embedded in the reader for file-based/local use. Run `node build-tool.cjs` after editing the example or brief. No paid services or external dependencies are needed.
