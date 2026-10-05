const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const email = "developer@example.test";
const failure = { name: "validation_error", statusCode: 422, message: "Bad property" };
const ok = { data: { id: "contact-1" }, error: null };
const existing = { data: { id: "contact-1", properties: { source: { type: "string", value: "waitlist" }, utm_source: { type: "string", value: "original" } }, unsubscribed: true }, error: null };

function harness(options = {}) {
  const calls = [];
  const action = (name, value) => async (...args) => {
    calls.push({ name, args });
    if (value instanceof Error) throw value;
    return typeof value === "function" ? value() : value;
  };
  const resend = {
    contacts: {
      get: action("get", options.get ?? { data: null, error: { name: "not_found", statusCode: 404 } }),
      create: action("create", options.create ?? ok),
      update: action("update", options.update ?? ok),
      segments: { add: action("segment", options.segment ?? ok) },
    },
    emails: { send: action("send", options.send ?? { data: { id: "email-1" }, error: null }) },
  };
  const service = load("lib/waitlist.ts", {
    "@/lib/resend": { getResend: () => resend, getResendFrom: () => "Appfox <hello@appfox.app>", getWaitlistSegmentId: () => "beta-segment" },
    "@/lib/waitlist-email": load("lib/waitlist-email.ts"),
    "@/lib/resend-request": load("lib/resend-request.ts", { "node:timers/promises": { setTimeout: async () => {} } }),
  });
  return { calls, save: service.saveWaitlistSignup };
}

test("failed contact storage never sends a receipt or returns success", async () => {
  const h = harness({ create: { data: null, error: failure } });
  await assert.rejects(h.save({ email }), /waitlist_persist_failed/);
  assert.equal(h.calls.filter(c => c.name === "send").length, 0);
  assert.equal(h.calls.filter(c => c.name === "create").length, 1);
});
test("failed lookup does not assume a new applicant", async () => {
  const h = harness({ get: { data: null, error: { name: "rate_limit_exceeded", statusCode: 429 } } });
  await assert.rejects(h.save({ email }), /waitlist_persist_failed/);
  assert.equal(h.calls.length, 3);
});
test("new request persists metadata and segment before sending a receipt", async () => {
  const h = harness();
  const result = await h.save({ email, utmSource: "guide", role: "indie" });
  assert.equal(result.saved, true);
  assert.equal(result.alreadyJoined, false);
  assert.equal(result.confirmation, "sent");
  assert.deepEqual(h.calls.map(c => c.name), ["get", "create", "send"]);
  const payload = h.calls[1].args[0];
  assert.equal(payload.properties.utm_source, "guide");
  assert.equal(payload.segments[0].id, "beta-segment");
  const receipt = h.calls[2].args;
  assert.equal(receipt[0].from, "Appfox <hello@appfox.app>");
  assert.ok(!receipt[1].idempotencyKey.includes(email));
  assert.match(receipt[0].text, /not an invitation/);
});
for (const send of [{ data: null, error: failure }, new Error("network down")]) {
  test(`receipt ${send instanceof Error ? "transport" : "provider"} failure preserves the saved request`, async () => {
    const h = harness({ send });
    const result = await h.save({ email });
    assert.equal(result.saved, true);
    assert.equal(result.confirmation, "failed");
  });
}
test("existing applicants keep first-touch attribution and unsubscribe choice", async () => {
  const h = harness({ get: existing });
  const result = await h.save({ email, role: "studio", utmSource: "new-source" });
  assert.equal(result.alreadyJoined, true);
  assert.equal(result.confirmation, "not_requested");
  const payload = h.calls.find(c => c.name === "update").args[0];
  assert.equal(payload.properties.role, "studio");
  assert.equal(payload.properties.utm_source, undefined);
  assert.equal(payload.unsubscribed, undefined);
  assert.ok(h.calls.some(c => c.name === "segment"));
  assert.ok(!h.calls.some(c => c.name === "send"));
});
test("role update failure is not acknowledged as saved", async () => {
  const h = harness({ get: existing, update: { data: null, error: failure } });
  await assert.rejects(h.save({ email, role: "studio" }), /waitlist_persist_failed/);
});
test("an existing unrelated contact still receives a first access-request receipt", async () => {
  const h = harness({ get: { data: { id: "contact-2", properties: {} }, error: null } });
  const result = await h.save({ email });
  assert.equal(result.alreadyJoined, false);
  assert.equal(result.confirmation, "sent");
  assert.deepEqual(h.calls.map(c => c.name), ["get", "segment", "update", "send"]);
});
test("configured segment failure is not silently discarded", async () => {
  const h = harness({ get: existing, segment: { data: null, error: failure } });
  await assert.rejects(h.save({ email }), /waitlist_persist_failed/);
});
test("concurrent contact creation confirms the existing record before success", async () => {
  let reads = 0;
  const h = harness({ get: () => ++reads === 1 ? { data: null, error: { statusCode: 404 } } : existing, create: { data: null, error: { statusCode: 409 } } });
  const result = await h.save({ email });
  assert.equal(result.alreadyJoined, true);
  assert.equal(result.saved, true);
  assert.ok(!h.calls.some(c => c.name === "send"));
});
test("create response without a saved contact id fails closed", async () => {
  const h = harness({ create: { data: null, error: null } });
  await assert.rejects(h.save({ email }), /waitlist_persist_failed/);
});

test("API rejects malformed input and honeypots do not count as saved requests", async () => {
  let saves = 0;
  const route = load("app/api/waitlist/route.ts", {
    "@/lib/email": load("lib/email.ts"),
    "@/lib/waitlist": { saveWaitlistSignup: async () => { saves++; return { saved: true, alreadyJoined: false, confirmation: "sent" }; } },
  });
  for (const body of ["{", "null", "[]"]) {
    const response = await route.POST(new Request("http://localhost/api/waitlist", { method: "POST", body }));
    assert.equal(response.status, 400);
  }
  const bot = await route.POST(new Request("http://localhost/api/waitlist", { method: "POST", body: JSON.stringify({ email, website: "bot" }) }));
  assert.equal((await bot.json()).saved, false);
  assert.equal(saves, 0);
});
