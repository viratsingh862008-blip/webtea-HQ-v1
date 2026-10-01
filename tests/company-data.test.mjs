import test from "node:test";
import assert from "node:assert/strict";
import { company } from "../src/data/company.ts";

test("WebTea HQ has the canonical company identity", () => {
  assert.equal(company.name, "WebTea HQ");
  assert.equal(company.hq, "Bettiah, Bihar, India");
  assert.equal(company.founded, "7 July 2026");
  assert.equal(company.businessModel, "AI-powered digital agency and startup");
});

test("WebTea HQ describes the WebTea meaning accurately", () => {
  assert.match(company.nameMeaning, /internet/i);
  assert.match(company.nameMeaning, /tea/i);
  assert.match(company.nameMeaning, /simple/i);
});

test("founders have defined public roles", () => {
  assert.equal(company.founders.length, 2);
  assert.equal(company.founders[0].name, "Aryan Singh");
  assert.equal(company.founders[0].role, "Co-Founder & Chief Technology Officer");
  assert.equal(company.founders[1].name, "Ayush Singh");
  assert.equal(company.founders[1].role, "Co-Founder & Chief Marketing & Creative Officer");
});

test("services communicate the complete-service positioning", () => {
  const serviceNames = company.services.map((service) => service.name).join(" ");
  for (const expected of ["Web", "AI", "Marketing", "Content", "Automation"]) {
    assert.match(serviceNames, new RegExp(expected, "i"));
  }
});
