// news-image-20261117: copy the front-page image for 17 November 2026 to the
// grader's output directory. Node 22, standard library only. The image is
// entry.png beside this file; the output is always the same bytes.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, 'entry.png'));
const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, bytes);
// The grader runs this twice and requires identical bytes: confirm the copy
// landed whole before reporting success.
if (readFileSync(outPath).length !== bytes.length) {
  throw new Error(`entry.png copy incomplete: wrote ${bytes.length} bytes`);
}
