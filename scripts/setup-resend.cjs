const { loadEnvConfig } = require("@next/env");
const { Resend } = require("resend");
const { setTimeout: delay } = require("node:timers/promises");

loadEnvConfig(process.cwd());
const keys = ["source", "role", "utm_source", "utm_medium", "utm_campaign", "referrer"];

async function call(request, operation) {
  // Keep setup requests below even a low team rate limit.
  await delay(600);
  const response = await request();
  if (response.error) throw new Error(`Resend ${operation}: ${response.error.name} (${response.error.statusCode ?? "unknown"})`);
  if (!response.data) throw new Error("Resend returned no configuration data");
  return response.data;
}

async function main({ env = process.env, args = process.argv.slice(2) } = {}) {
  // Production has the sensitive Vercel key. Local/preview builds should stay
  // independent of the production contact schema and never need a downloaded key.
  if (args.includes("--deployment") && env.VERCEL_ENV !== "production") {
    console.log("Resend setup skipped outside a Vercel production build.");
    return;
  }
  const checkOnly = args.includes("--check");
  if (!env.RESEND_API_KEY?.trim()) throw new Error("RESEND_API_KEY is unavailable here. Run in an environment with the existing server-side key; keep it out of chat and source control.");
  const resend = new Resend(env.RESEND_API_KEY.trim());
  const properties = [];
  let after;
  do {
    const page = await call(() => resend.contactProperties.list({ limit: 100, ...(after ? { after } : {}) }), "list contact properties");
    properties.push(...page.data);
    after = page.has_more ? page.data.at(-1)?.id : undefined;
    if (page.has_more && !after) throw new Error("Incomplete contact property pagination");
  } while (after);
  const missing = [];
  for (const key of keys) {
    const property = properties.find(item => item.key === key);
    if (property && property.type !== "string") throw new Error(`Contact property ${key} must have type string; no existing data was changed.`);
    if (!property) missing.push(key);
  }
  if (checkOnly && missing.length) throw new Error(`Missing contact properties: ${missing.join(", ")}. Run npm run setup:resend in this configured environment.`);
  for (const key of missing) {
    await call(() => resend.contactProperties.create({ key, type: "string" }), `create contact property ${key}`);
    console.log(`Created contact property: ${key}`);
  }
  if (env.RESEND_WAITLIST_SEGMENT_ID?.trim()) {
    await call(() => resend.segments.get(env.RESEND_WAITLIST_SEGMENT_ID.trim()), "check waitlist segment");
    console.log("Configured waitlist segment exists.");
  }
  console.log("All six contact properties are ready. No contacts were added and no email was sent.");
  console.log("Confirm the configured RESEND_FROM domain is verified, then test receipt delivery on the deployed preview with an address you control.");
}
module.exports = { main };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
