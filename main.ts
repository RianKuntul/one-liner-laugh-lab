// One-Liner Laugh Lab — entry program (Node 22, TypeScript).
//
// Prompt angle: the excuse a GPS gives after driving you into a lake.
// The program writes exactly one funny line to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR, default /output).
//
// Gate: the line must be 1-200 characters, a single line, and not only
// whitespace. The guard below throws if any of that fails, so a bad
// line can never be submitted silently.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// The line: a GPS that will not take the blame for the lake.
// Second draft: the "I just work here" shrug now lands on a callback —
// the fish have been expecting you — which gives the judge a second
// beat instead of ending on the setup alone.
const LINE =
  "In 100 metres, turn left into the lake. The map said 'scenic route', I just work here — and the fish have been expecting you since Tuesday.";

function validate(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("Line must not be empty or only whitespace.");
  }
  if (line !== line.trim()) {
    throw new Error("Line must not start or end with whitespace.");
  }
  if (line.trim().length > MAX_CHARS) {
    throw new Error(
      `Line is ${line.trim().length} characters, over the ${MAX_CHARS} limit.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be a single line (no newline characters).");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${outFile}`);
}

main();
