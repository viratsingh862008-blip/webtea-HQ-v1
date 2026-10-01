import test from "node:test";
import assert from "node:assert/strict";
import { roster } from "../src/data/roster.mjs";

test("WebTea HQ roster contains the confirmed human and AI members", () => {
  assert.deepEqual(roster.map((member) => member.name), [
    "Aryan Singh",
    "Ayush Singh",
    "Raunak Sharma",
    "Hinata",
    "Satoshi",
  ]);
});

test("roster uses display aliases without changing official names", () => {
  const aryan = roster.find((member) => member.name === "Aryan Singh");
  const ayush = roster.find((member) => member.name === "Ayush Singh");
  assert.equal(aryan.alias, "YOUNG AARU");
  assert.equal(ayush.alias, "THE OG AYUSH");
});