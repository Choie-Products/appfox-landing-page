const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");

const keys = ["source", "role", "utm_source", "utm_medium", "utm_campaign", "referrer"];
const properties = keys.map(key => ({ id: key, key, type: "string" }));
const production = { VERCEL_ENV: "production", RESEND_API_KEY: "test-key" };

function harness(pages = [{ data: properties, has_more: false }], error = null) {
  const created = [];
  const reads = [];
  let clients = 0;
  const setup = load("scripts/setup-resend.cjs", {
    "@next/env": { loadEnvConfig() {} },
    "node:timers/promises": { setTimeout: async () => {} },
    resend: { Resend: class {
      constructor() { clients++; }
      contactProperties = {
        list: async options => { reads.push(options); return { data: pages.shift(), error }; },
        create: async property => { created.push(property); return { data: { id: property.key }, error: null }; },
      };
    } },
  });
  return { run: setup.main, created, reads, clients: () => clients };
}

test("production build creates missing fields while preserving existing properties", async () => {
  const h = harness([{ data: properties.slice(0, 2), has_more: false }]);
  await h.run({ env: production, args: ["--deployment"] });
  assert.deepEqual(h.created.map(property => property.key), keys.slice(2));
  assert.ok(h.created.every(property => property.type === "string"));
});

test("an already configured account needs no schema writes, including paginated fields", async () => {
  const h = harness([{ data: properties.slice(0, 2), has_more: true }, { data: properties.slice(2), has_more: false }]);
  await h.run({ env: production, args: ["--deployment"] });
  assert.equal(h.reads[1].after, "role");
  assert.equal(h.created.length, 0);
});

test("production build fails when the key or required contact access is missing", async () => {
  const h = harness([], { name: "restricted_api_key", statusCode: 401 });
  await assert.rejects(h.run({ env: { VERCEL_ENV: "production" }, args: ["--deployment"] }), /RESEND_API_KEY is unavailable/);
  assert.equal(h.clients(), 0);
  await assert.rejects(h.run({ env: production, args: ["--deployment"] }), /list contact properties: restricted_api_key/);
});

test("local and preview builds never modify the production Resend account", async () => {
  const h = harness();
  for (const env of [{}, { ...production, VERCEL_ENV: "preview" }]) {
    await h.run({ env, args: ["--deployment"] });
  }
  assert.equal(h.clients(), 0);
});

test("manual check reports missing fields without creating them", async () => {
  const h = harness([{ data: [], has_more: false }]);
  await assert.rejects(h.run({ env: production, args: ["--check"] }), /Missing contact properties: source, role/);
  assert.equal(h.created.length, 0);
});

test("incompatible field types fail before any schema writes", async () => {
  const h = harness([{ data: [{ key: "role", type: "number" }], has_more: false }]);
  await assert.rejects(h.run({ env: production, args: ["--deployment"] }), /role must have type string/);
  assert.equal(h.created.length, 0);
});
