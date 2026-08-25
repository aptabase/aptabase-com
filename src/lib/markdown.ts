/**
 * Markdown renderers for agent-facing resources: llms.txt and the `.md` twin
 * of each key page. Everything is derived from src/data so the HTML pages,
 * the Markdown pages and llms.txt can never disagree.
 */
import { product } from "../data/product";
import {
  tiers,
  planFeatures,
  pricingNotes,
  contactThreshold,
  freeTier,
  firstPaidTier,
  lastTier,
  formatEvents,
  formatPrice,
  formatPricePerMonth,
} from "../data/pricing";
import { sdks, sdkGroups, sdksInGroup, sdkForPage } from "../data/sdks";
import { faqs, faqsByCategory, type Faq } from "../data/faq";

const abs = (path: string) => new URL(path, product.url).toString();
const bullets = (items: readonly string[]) =>
  items.map((i) => `- ${i}`).join("\n");
const join = (...blocks: (string | false | undefined)[]) =>
  blocks.filter(Boolean).join("\n\n") + "\n";

/* ---------- reusable fragments ---------- */

export const pricingSummary = () =>
  `Free up to ${formatEvents(freeTier.events)} events/month. Paid plans from ${formatPricePerMonth(firstPaidTier.price)} for ${formatEvents(firstPaidTier.events)} events up to ${formatPricePerMonth(lastTier.price)} for ${formatEvents(lastTier.events)} events. No overage fees.`;

export const pricingTableMd = () =>
  [
    "| Events per month | Price |",
    "| --- | --- |",
    ...tiers.map(
      (t) => `| ${formatEvents(t.events)} | ${formatPricePerMonth(t.price)} |`,
    ),
    `| ${formatEvents(contactThreshold)}+ | Contact ${product.links.email} |`,
  ].join("\n");

export const planFeaturesMd = () => bullets(planFeatures);

export const faqMd = (items: Faq[]) =>
  items
    .map((f) => `### ${f.question}\n\n${f.answers.join("\n\n")}`)
    .join("\n\n");

export const sdkLineMd = (s: (typeof sdks)[number]) =>
  `- [${s.name}](${s.repo}): \`${s.package}\` — \`${s.install}\`` +
  (s.page ? ` ([guide](${abs(s.page)}))` : "") +
  (s.community ? " (community-maintained)" : "");

export const sdkListMd = () =>
  sdkGroups
    .map(
      (g) => `### ${g.name}\n\n${sdksInGroup(g.id).map(sdkLineMd).join("\n")}`,
    )
    .join("\n\n");

export const audienceMd = () =>
  `### Who Aptabase is for\n\n${bullets(product.audience.for)}\n\n### Who Aptabase is not for\n\n${bullets(product.audience.notFor)}`;

export const dataMd = () =>
  `### Data collected\n\n${bullets(product.dataCollected)}\n\n### Data never collected\n\n${bullets(product.dataNotCollected)}\n\n${product.privacyModel}`;

export const featuresMd = () =>
  product.features.map((f) => `- **${f.title}** — ${f.description}`).join("\n");

export const regionsMd = () =>
  bullets([
    ...product.regions.map(
      (r) =>
        `${r.name} (${r.location}): ${r.dashboard} — app keys start with \`${r.keyPrefix}\``,
    ),
  ]);

const gettingStartedMd = () =>
  [
    `1. Create a free account in the ${product.regions.map((r) => `[${r.id}](${r.register})`).join(" or ")} region (no credit card required).`,
    `2. Create an app in the dashboard and copy its App Key from the **Instructions** menu. Keys look like \`${product.regions.map((r) => `${r.keyPrefix}*`).join("\` or \`")}\`.`,
    "3. Install the SDK for your platform (list below), initialize it with the App Key, and call the track function for the events you care about.",
    "4. Open the dashboard — events show up in real time.",
  ].join("\n");

const sdkNotesMd = () =>
  bullets([
    "Nothing is tracked automatically — you call the track function for each event.",
    "Every event is enriched automatically with OS name/version, app version and locale.",
    "Custom property values must be strings or numbers.",
    "Tracking calls are non-blocking and run in the background.",
    `Events are separated into Debug and Release build modes automatically (see ${abs("/docs/build-modes")}).`,
  ]);

const agentNotesMd = () =>
  bullets([
    `[llms.txt](${abs("/llms.txt")}) — index of everything an agent needs, with links.`,
    `[llms-full.txt](${abs("/llms-full.txt")}) — install, initialization and tracking code for every SDK.`,
    "Every key page has a Markdown version: append `.md` to the path (for example `/pricing.md`, `/about.md`, `/docs.md`, `/docs/build-modes.md`, `/for-swift.md`) or send `Accept: text/markdown`.",
  ]);

/* ---------- page twins ---------- */

export const pricingMarkdown = () =>
  join(
    `# ${product.name} Pricing`,
    "Start free and pay when you grow. " +
      pricingNotes.noCreditCard +
      " " +
      pricingNotes.billing,
    "## Plans",
    pricingTableMd(),
    "## Every plan includes",
    planFeaturesMd(),
    "## Overage",
    pricingNotes.overage,
    "## Pricing FAQ",
    faqMd(faqsByCategory("pricing")),
    `Sign up: ${product.regions.map((r) => `[${r.name}](${r.register})`).join(" · ")}`,
  );

export const aboutMarkdown = () =>
  join(
    `# About ${product.name}`,
    product.oneLiner,
    `${product.name} has been open source since ${product.since}: the server is licensed under ${product.license.server} and the SDKs under ${product.license.sdks}. Source: ${product.links.github}`,
    "## What it does",
    featuresMd(),
    "## Who it's for",
    audienceMd(),
    "## How the privacy model works",
    dataMd(),
    "## Hosting",
    regionsMd(),
    "## Pricing",
    `${pricingSummary()} Details: ${abs("/pricing")}`,
    "## Contact",
    bullets([
      `Email: ${product.links.email}`,
      `Discord: ${product.links.discord}`,
      `GitHub: ${product.links.github}`,
      `Twitter/X: ${product.links.twitter}`,
    ]),
  );

export const docsMarkdown = () =>
  join(
    `# ${product.name} Documentation`,
    product.oneLiner,
    "## Getting started",
    gettingStartedMd(),
    "## How the SDKs behave",
    sdkNotesMd(),
    `## SDKs (${sdks.length} platforms)`,
    sdkListMd(),
    `Don't see your platform? [Build your own SDK](${product.links.buildYourOwnSdk}).`,
    "## Guides",
    bullets([
      `[Build Modes](${abs("/docs/build-modes")}): Debug vs Release mode behavior`,
      `[Apple App Privacy](${abs("/docs/apple-app-privacy")}): How to fill out Apple's App Store privacy declaration when using Aptabase`,
    ]),
    "## Data & privacy",
    dataMd(),
    "## Hosting regions",
    regionsMd(),
    "## Limits & pricing",
    `${pricingSummary()} ${pricingNotes.overage} Details: ${abs("/pricing")}`,
    "## Tools",
    bullets([
      `[MCP server](${product.links.mcp}): lets AI agents (Cursor, Claude Desktop, …) query your Aptabase analytics. Aptabase has no public query API; the MCP server wraps the dashboard endpoints.`,
      "CSV export from the dashboard.",
    ]),
    "## Help",
    bullets([
      `Discord: ${product.links.discord}`,
      `GitHub issues: ${product.links.issues}`,
      `Email: ${product.links.email}`,
    ]),
    "## For AI agents",
    agentNotesMd(),
  );

export interface FrameworkLike {
  slug: string;
  name: string;
  title: string;
  href: string;
  sdkName: string;
  sdkUrl: string;
  sdkCodeExample: string;
  sdkLanguage: string;
  useCases: { title: string; description: string }[];
}

export const frameworkMarkdown = (fw: FrameworkLike) => {
  const sdk = sdkForPage(fw.href);
  return join(
    `# ${product.name} Analytics for ${fw.title}`,
    `${product.name} is an open source, privacy-first alternative to Google Firebase Analytics for ${fw.title}: it collects no personal data, uses no cookies or device identifiers, and needs no consent banner.`,
    "## Get started",
    `1. Register: ${product.regions.map((r) => `[${r.name}](${r.register})`).join(" or ")} — takes less than a minute.`,
    `2. Instrument: use the [${fw.sdkName}](${fw.sdkUrl}) to instrument your app.` +
      (sdk ? ` Package: \`${sdk.package}\`. Install: \`${sdk.install}\`.` : ""),
    "```" + fw.sdkLanguage + "\n" + fw.sdkCodeExample + "\n```",
    "3. Explore: events show up on your dashboard in real time.",
    `## Why add analytics to your ${fw.title}?`,
    fw.useCases.map((u) => `- **${u.title}** — ${u.description}`).join("\n"),
    "## Privacy",
    bullets(
      product.features
        .filter((f) => /anonymous|fingerprinting|compliant/i.test(f.title))
        .map((f) => f.description),
    ),
    "## Pricing",
    `${pricingSummary()} Details: ${abs("/pricing")}`,
    `More: [Documentation](${abs("/docs")}) · [All SDKs](${abs("/integrations")}) · [About](${abs("/about")})`,
  );
};

/* ---------- llms.txt ---------- */

export const llmsTxt = () =>
  join(
    `# ${product.name}`,
    `> ${product.oneLiner}`,
    audienceMd(),
    "## Key pages",
    bullets([
      `[Pricing](${abs("/pricing")}): ${pricingSummary()}`,
      `[Documentation](${abs("/docs")}): Getting started, SDKs, data collected`,
      `[About](${abs("/about")}): What Aptabase is, who it's for, how the privacy model works`,
      `[Integrations](${abs("/integrations")}): Landing pages per framework`,
      `[SDK reference (llms-full.txt)](${abs("/llms-full.txt")}): Install, initialization and tracking code for every SDK`,
    ]),
    "## Pricing (USD, monthly)",
    pricingTableMd(),
    "Every plan includes:",
    planFeaturesMd(),
    pricingNotes.overage,
    "## Features",
    featuresMd(),
    "## Documentation",
    bullets([
      `[Build Modes](${abs("/docs/build-modes")}): Debug vs Release mode behavior`,
      `[Apple App Privacy](${abs("/docs/apple-app-privacy")}): How to fill out Apple's App Store Privacy Declaration`,
      `[Build your own SDK](${product.links.buildYourOwnSdk}): How to write an SDK for a new platform`,
      `[MCP server](${product.links.mcp}): Query your Aptabase analytics from AI agents`,
    ]),
    `## SDKs (${sdks.length} platforms)`,
    sdkListMd(),
    "## Data & privacy",
    dataMd(),
    "## Hosting & compliance",
    bullets([
      ...product.regions.map(
        (r) =>
          `${r.name} (${r.location}): ${r.dashboard} — app keys \`${r.keyPrefix}*\``,
      ),
      `Compliance: ${product.compliance.join(", ")}. No cookies, no consent banner needed.`,
      `Open source since ${product.since}: server ${product.license.server}, SDKs ${product.license.sdks} — ${product.links.github}`,
    ]),
    "## FAQ",
    faqMd(faqs),
    "## Markdown for agents",
    agentNotesMd(),
    "## Optional",
    bullets([
      `[Blog](${abs("/blog")}): Product updates and platform guides`,
      `[Privacy Policy](${abs("/legal/privacy")})`,
      `[Terms of Service](${abs("/legal/terms")})`,
      `[Data Processing Agreement](${abs("/legal/dpa")})`,
      `[GitHub](${product.links.github}) · [Discord](${product.links.discord}) · [Twitter/X](${product.links.twitter}) · Email ${product.links.email}`,
    ]),
  );
