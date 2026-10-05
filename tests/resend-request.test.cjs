const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");

test("rate-limit retries respect Retry-After and stop after recovery", async () => {
  const waits = [];
  const { resendRequest } = load("lib/resend-request.ts", { "node:timers/promises": { setTimeout: async ms => waits.push(ms) } });
  let calls = 0;
  const result = await resendRequest(async () => ++calls === 1
    ? { error: { name: "rate_limit_exceeded", statusCode: 429 }, headers: { "retry-after": "3" } }
    : { data: { id: "saved" }, error: null });
  assert.equal(result.data.id, "saved");
  assert.deepEqual(waits, [3000]);
  assert.equal(calls, 2);
});

test("quotas, long retry delays, and ambiguous writes are not retried", async () => {
  const { resendRequest } = load("lib/resend-request.ts", { "node:timers/promises": { setTimeout: async () => assert.fail("should not wait") } });
  for (const response of [
    { error: { name: "daily_quota_exceeded", statusCode: 429 } },
    { error: { name: "rate_limit_exceeded", statusCode: 429 }, headers: { "retry-after": "60" } },
    { error: { name: "internal_server_error", statusCode: 500 } },
  ]) {
    let calls = 0;
    await resendRequest(async () => { calls++; return response; });
    assert.equal(calls, 1);
  }
});
