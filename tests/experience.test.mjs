import test from "node:test";
import assert from "node:assert/strict";
import { clamp, wrapIndex } from "../src/data/experience.mjs";

test("clamp keeps an interaction value inside its visual range", () => {
  assert.equal(clamp(-1, 0, 1), 0);
  assert.equal(clamp(0.4, 0, 1), 0.4);
  assert.equal(clamp(2, 0, 1), 1);
});

test("wrapIndex loops interaction indexes without exceeding the collection", () => {
  assert.equal(wrapIndex(0, 6), 0);
  assert.equal(wrapIndex(6, 6), 0);
  assert.equal(wrapIndex(-1, 6), 5);
  assert.equal(wrapIndex(8, 6), 2);
});
