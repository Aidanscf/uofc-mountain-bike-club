import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the UofC MTB club site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>UofC Mountain Bike Club<\/title>/i);
  assert.match(html, /Send It With/);
  assert.match(html, /Past Rides/);
  assert.match(html, /About The Club &amp; Member Benefits/);
  assert.match(html, /Club Membership \/ \$10/);
  assert.match(html, /Where do we ride twice a week\?/);
  assert.match(html, /Ridley&#x27;s Cycle/);
  assert.match(html, /Inside Line/);
  assert.match(html, /15% off parts/);
  assert.match(html, /https:\/\/linktr\.ee\/uofc_mtb/);
  assert.doesNotMatch(html, /—/);
  assert.doesNotMatch(html, /Campus Trailhead Hub|MacEwan Student Centre|Wrench Nights:|Lead:|Bow Cycle|The Bike Shop|7Mesh/i);
  assert.doesNotMatch(html, /club van transports|full-face helmet and knee guards/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton/i);
});

test("keeps mobile responsive safeguards in the product stylesheet", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /@media \(max-width:\s*640px\)/);
  assert.match(css, /\.mobile-nav\.open\s*\{[\s\S]*max-height:\s*260px/);
  assert.match(css, /\.btn,\s*\n\s*\.btn-large\s*\{[\s\S]*width:\s*100%/);
  assert.match(css, /\.status-track\s*\{[\s\S]*flex-wrap:\s*wrap/);
  assert.match(css, /\.gallery-card,\s*\n\s*\.benefit-card,[\s\S]*transform:\s*none !important/);
  assert.match(css, /\.accordion-item button\s*\{[\s\S]*min-height:\s*64px/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
});
