import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createInquiryHandler,
  type InquiryDependencies,
  type Reservation,
} from "../src/lib/inquiry-handler";
import { mailContent } from "../src/lib/inquiry-server";
import { inquirySchema } from "../src/lib/inquiry-schema";
const valid = {
  name: "Cliente de teste",
  email: "cliente@example.com",
  service: "Site",
  message: "Gostaria de criar um site para apresentar meus serviços.",
  submissionId: "de91edb4-a6a2-4f02-b7b2-7a18016eab23",
};
const request = (body: unknown = valid, headers: Record<string, string> = {}) =>
  new Request("https://portfolio.test/api/orcamento", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
function fixture(overrides: Partial<InquiryDependencies> = {}) {
  let sent = 0;
  const states = new Map<string, { digest: string; state: Reservation }>();
  const deps: InquiryDependencies = {
    configured: () => true,
    secret: () => "test-only-secret-not-used-in-deployments",
    origin: () => "192.0.2.1",
    reserve: async (_origin, id, digest) => {
      const old = states.get(id);
      if (old) return old.digest === digest ? old.state : "conflict";
      states.set(id, { digest, state: "pending" });
      return "reserved";
    },
    complete: async (id, digest, state) => {
      states.set(id, { digest, state });
    },
    send: async () => {
      sent++;
    },
    ...overrides,
  };
  return { handler: createInquiryHandler(deps), sent: () => sent };
}
test("valid request awaits SMTP and handles duplicate without sending again", async () => {
  const f = fixture();
  assert.equal((await f.handler(request())).status, 200);
  assert.equal((await f.handler(request())).status, 200);
  assert.equal(f.sent(), 1);
});
test("invalid, oversized, honeypot and injected recipient are rejected", async () => {
  for (const body of [
    { ...valid, email: "invalid" },
    { ...valid, to: "attacker@example.com" },
    { ...valid, company: "bot" },
    { ...valid, message: "x".repeat(17000) },
    { ...valid, website: "javascript:alert(1)" },
  ]) {
    const f = fixture();
    assert.ok((await f.handler(request(body))).status >= 400);
    assert.equal(f.sent(), 0);
  }
});
test("missing configuration, missing origin and protection failure fail closed", async () => {
  for (const override of [
    { configured: () => false },
    { origin: () => null },
    {
      reserve: async () => {
        throw Error("offline");
      },
    },
  ]) {
    const f = fixture(override);
    assert.equal((await f.handler(request())).status, 503);
    assert.equal(f.sent(), 0);
  }
});
test("distributed limit response prevents sending", async () => {
  const f = fixture({ reserve: async () => "limited" });
  assert.equal((await f.handler(request())).status, 429);
  assert.equal(f.sent(), 0);
});
test("SMTP error records uncertain state and prevents retry", async () => {
  let attempts = 0;
  const f = fixture({
    send: async () => {
      attempts++;
      throw Error("timeout");
    },
  });
  const result = await f.handler(request());
  assert.equal(result.status, 503);
  assert.equal((await result.json()).uncertain, true);
  assert.equal((await f.handler(request())).status, 409);
  assert.equal(attempts, 1);
});
test("concurrent duplicate stays pending until first send completes", async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const f = fixture({ send: async () => gate });
  const first = f.handler(request());
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal((await f.handler(request())).status, 409);
  release();
  assert.equal((await first).status, 200);
});
test("reusing a submission ID for a different message is rejected", async () => {
  const f = fixture();
  await f.handler(request());
  assert.equal(
    (
      await f.handler(
        request({
          ...valid,
          message: "Outra mensagem com conteúdo diferente.",
        }),
      )
    ).status,
    409,
  );
  assert.equal(f.sent(), 1);
});
test("cross-origin and non-JSON requests are rejected", async () => {
  const f = fixture();
  assert.equal(
    (await f.handler(request(valid, { origin: "https://evil.test" }))).status,
    403,
  );
  assert.equal(
    (await f.handler(request(valid, { "content-type": "text/plain" }))).status,
    415,
  );
});
test("HTML is escaped and plain text is retained", () => {
  const data = inquirySchema.parse({
    ...valid,
    message: '<script>alert("x")</script> & texto',
  });
  const mail = mailContent(data);
  assert.ok(!mail.html.includes("<script>"));
  assert.ok(mail.html.includes("&lt;script&gt;"));
  assert.ok(mail.text.includes("<script>"));
});
