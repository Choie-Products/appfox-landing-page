const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");

test("first visit attribution survives an internal trip to the access form", () => {
  const storage = new Map();
  const window = { location: { origin: "https://appfox.app", search: "?utm_source=newsletter&utm_campaign=launch" } };
  const document = { referrer: "https://example.test/article?private=value" };
  const { captureAttribution } = load("lib/attribution.ts", {}, {
    window, document,
    sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  });
  const first = captureAttribution();
  assert.equal(first.referrer, "https://example.test");
  window.location.search = "";
  document.referrer = "https://appfox.app/guides";
  assert.equal(captureAttribution().utmCampaign, "launch");
  assert.equal(captureAttribution().utmSource, "newsletter");
});
test("blocked storage still captures the current URL without breaking the form", () => {
  const { captureAttribution } = load("lib/attribution.ts", {}, {
    window: { location: { origin: "https://appfox.app", search: "?utm_source=search" } }, document: { referrer: "" },
    sessionStorage: { getItem() { throw new Error("blocked"); } },
  });
  assert.equal(captureAttribution().utmSource, "search");
});
test("malformed saved attribution cannot add arbitrary form fields", () => {
  const { captureAttribution } = load("lib/attribution.ts", {}, {
    window: { location: { origin: "https://appfox.app", search: "" } }, document: { referrer: "" },
    sessionStorage: { getItem: () => JSON.stringify({ email: "injected@example.test", utmSource: "a".repeat(300), utmCampaign: 3 }) },
  });
  const captured = captureAttribution();
  assert.equal(captured.email, undefined);
  assert.equal(captured.utmCampaign, undefined);
  assert.equal(captured.utmSource.length, 200);
});
