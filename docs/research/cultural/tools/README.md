# Export tools (research documentation only, not shipped)

Small Node scripts that regenerate the readable drafts, verification lists and the editorial review packet **from the `content/festivals/*.ts` files**. They write only under `docs/research/cultural/`. They are not part of the app and are not run by any npm script. They use absolute paths to this repository (`/Users/nidhinagumalla/Code/HinduFestivals/`), so edit `ROOT` if the project moves.

| Script | Writes |
|---|---|
| `batch-a-export.mjs` | `p3-05-batch-a-drafts-for-review.md`, `p3-05-batch-a-verification-list.md`, `p3-05-batch-a-editorial-review-packet.md` (the per-section reviewer notes and the packet header are written in the script; edit them there) |
| `pilot-export.mjs` | `p3-03-drafts-for-review.md` and the note-derived sections of `p3-03-verification-list.md` (the three reviewed pilots) |
| `ts-resolve.mjs` | A tiny loader so Node can import the extensionless relative imports in `content/` |

Run from the repository root (Node 24 runs TypeScript with type stripping; the `@/` alias is type-only in the content files, so it is stripped):

```bash
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/cultural/tools/batch-a-export.mjs
node --experimental-strip-types --no-warnings --import ./docs/research/cultural/tools/ts-resolve.mjs docs/research/cultural/tools/pilot-export.mjs
```
