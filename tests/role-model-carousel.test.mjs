import test from "node:test";
import assert from "node:assert/strict";
import { cardsPerPageForWidth, chunkCards } from "../src/data/role-model-carousel.mjs";

test("role model carousel uses three cards on desktop, two on tablet, one on mobile", () => {
  assert.equal(cardsPerPageForWidth(1200), 3);
  assert.equal(cardsPerPageForWidth(900), 2);
  assert.equal(cardsPerPageForWidth(650), 1);
});

test("role model carousel chunks the roster into stable pages", () => {
  assert.deepEqual(chunkCards(["a", "b", "c", "d", "e"], 3), [
    ["a", "b", "c"],
    ["d", "e"],
  ]);
});
