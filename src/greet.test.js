import assert from "node:assert/strict";
import test from "node:test";
import { greet } from "./greet.js";

test("greet includes the name", () => {
  assert.equal(greet("Ada"), "Hello, Ada");
});
