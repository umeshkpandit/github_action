import { mkdirSync, writeFileSync } from "node:fs";
import { greet } from "../src/greet.js";

mkdirSync("dist", { recursive: true });
writeFileSync("dist/release.txt", `${greet("Actions")}\n`);
