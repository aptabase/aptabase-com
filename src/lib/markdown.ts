/**
 * Markdown renderers for agent-facing resources: llms.txt, llms-full.txt and
 * the `.md` twin of each key page. Everything is derived from src/data so the
 * HTML pages, the Markdown pages and the llms files can never disagree.
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
  formatPricePerMonth,
} from "../data/pricing";
import {
  sdks,
  sdkGroups,
  sdksInGroup,
  sdkHref,
  type Sdk,
  type Snippet,
} from "../data/sdks";
import { faqs, faqsByCategory, type Faq } from "../data/faq";

const abs = (path: string) => new URL(path, product.url).toString();
const bullets = (items: readonly string[]) =>
  items.map((i) => `- ${i}`).join("\n");
const join = (...blocks: (string | false | undefined | null)[]) =>
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
  ].join("\n") +
  `\n\nNeed more than ${formatEvents(contactThreshold)} events per month? Email ${product.links.email} for a custom plan.`;

export const planFeaturesMd = () => bullets(planFeatures);

export const faqMd = (items: Faq[]) =>
  items
    .map((f) => `### ${f.question}\n\n${f.answers.join("\n\n")}`)
    .join("\n\n");

export const sdkLineMd = (s: Sdk) => {
  const href = sdkHref(s);
  return (
    `- [${s.name}](${s.repo}): \`${s.package}\` — \`${s.install}\`` +
    (href ? ` ([guide](${abs(href)}))` : "") +
    (s.community ? " (community-maintained)" : "")
  );
};

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

export const privacyFeaturesMd = () =>
  bullets(
    product.features
      .filter((f) => /anonymous|fingerprinting|compliant/i.test(f.title))
      .map((f) => f.description),
  );

export const regionsMd = () =>
  bullets([
    ...product.regions.map(
      (r) =>
        `${r.name} (${r.location}): ${r.dashboard} — app keys start with \`${r.keyPrefix}\``,
    ),
  ]);

const registerLinksMd = () =>
  product.regions.map((r) => `[${r.name}](${r.register})`).join(" or ");

const gettingStartedMd = () =>
  [
    `1. Create a free account in the ${registerLinksMd()} region (no credit card required).`,
    `2. Create an app in the dashboard and copy its App Key from the **Instructions** menu. Keys look like \`${product.regions.map((r) => `${r.keyPrefix}*`).join("` or `")}\`.`,
    "3. Install the SDK for your platform (list below), initialize it with the App Key, and call the track function for the events you care about.",
    "4. Open the dashboard — events show up in real time.",
  ].join("\n");

export const sdkBehaviourNotes = [
  "Nothing is tracked automatically — you call the track function for each event.",
  "Every event is enriched automatically with OS name/version, app version and locale.",
  "Custom property values must be strings or numbers.",
  "Tracking calls are non-blocking and run in the background.",
  `Events are separated into Debug and Release build modes automatically (see ${abs("/docs/build-modes")}).`,
];

const agentNotesMd = () =>
  bullets([
    `[llms.txt](${abs("/llms.txt")}) — index of everything an agent needs, with links.`,
    `[llms-full.txt](${abs("/llms-full.txt")}) — install, initialization and tracking code for every SDK.`,
    "Every key page has a Markdown version: append `.md` to the path (for example `/pricing.md`, `/about.md`, `/docs.md`, `/docs/build-modes.md`, `/for-swift.md`) or send `Accept: text/markdown`.",
  ]);

/* ---------- SDK reference (shared by llms-full.txt and /for-*.md) ---------- */

const snippetMd = (s: Snippet) =>
  join(
    `### ${s.title}`,
    s.intro,
    s.code !== undefined && "```" + (s.lang ?? "") + "\n" + s.code + "\n```",
    s.outro,
  ).trimEnd();

/** Package/install/repo header plus every snippet and note for one SDK. */
export const sdkReferenceMd = (sdk: Sdk) =>
  join(
    [
      `Package: \`${sdk.package}\``,
      `Install: \`${sdk.install}\``,
      `Repo: ${sdk.repo}`,
      sdk.requires && `Requires: ${sdk.requires}`,
      sdk.platforms && `Platforms: ${sdk.platforms}`,
      sdk.community && "Maintained by the community.",
    ]
      .filter(Boolean)
      .join("\n"),
    sdk.description,
    ...sdk.snippets.map(snippetMd),
    sdk.notes && `### Platform notes\n\n${bullets(sdk.notes)}`,
  ).trimEnd();

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
    bullets(sdkBehaviourNotes),
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

/** Markdown twin of /for-<slug>. */
export const frameworkMarkdown = (sdk: Sdk) => {
  const page = sdk.page;
  if (!page) throw new Error(`${sdk.id} has no landing page`);
  return join(
    `# ${product.name} Analytics for ${page.title}`,
    `${product.name} is an open source, privacy-first alternative to Google Firebase Analytics for ${page.title}: it collects no personal data, uses no cookies or device identifiers, and needs no consent banner.`,
    "## Get started",
    `1. Register: ${registerLinksMd()} — takes less than a minute, no credit card required.`,
    `2. Create an app in the dashboard and copy its App Key from the **Instructions** menu (\`${product.regions.map((r) => `${r.keyPrefix}*`).join("` / `")}\`).`,
    `3. Instrument your app with the [${page.sdkName}](${sdk.repo}) — see the quickstart below.`,
    "4. Explore: events show up on your dashboard in real time.",
    `## Quickstart: ${sdk.name}`,
    sdkReferenceMd(sdk),
    "### How the SDK behaves",
    bullets(sdkBehaviourNotes),
    `## Why add analytics to your ${page.title}?`,
    page.useCases.map((u) => `- **${u.title}** — ${u.description}`).join("\n"),
    "## Privacy",
    privacyFeaturesMd(),
    "## Pricing",
    `${pricingSummary()} Details: ${abs("/pricing")}`,
    `More: [Documentation](${abs("/docs")}) · [All SDKs](${abs("/integrations")}) · [SDK reference](${abs("/llms-full.txt")}) · [About](${abs("/about")})`,
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
      `[Integrations](${abs("/integrations")}): Landing pages per framework, each with a quickstart`,
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

/* ---------- llms-full.txt ---------- */

export const llmsFullTxt = () =>
  join(
    `# ${product.name} SDK reference`,
    `> ${product.oneLiner}`,
    `Install, initialization and tracking code for all ${sdks.length} SDKs. For product facts, pricing and the page index see ${abs("/llms.txt")}.`,
    "## General notes",
    bullets([
      `Get your App Key from the Aptabase dashboard under the "Instructions" menu.`,
      `App keys follow the format ${product.regions.map((r) => `\`${r.keyPrefix}*\` (${r.name})`).join(" or ")}.`,
      ...sdkBehaviourNotes,
    ]),
    ...sdkGroups.flatMap((g) =>
      sdksInGroup(g.id).map((sdk) => {
        const href = sdkHref(sdk);
        return join(
          `## ${sdk.name}`,
          sdkReferenceMd(sdk),
          href && `Guide: ${abs(href)}`,
        ).trimEnd();
      }),
    ),
    "## Optional",
    bullets([
      `[llms.txt](${abs("/llms.txt")}): Product facts, who it's for, full pricing table and the index of all SDKs`,
      `[Documentation](${abs("/docs")}): Getting started, SDK catalogue, data collected (Markdown: ${abs("/docs.md")})`,
      `[Pricing](${abs("/pricing")}): ${pricingSummary()} (Markdown: ${abs("/pricing.md")})`,
      `[About](${abs("/about")}): What Aptabase is and who it's for (Markdown: ${abs("/about.md")})`,
      `[MCP server](${product.links.mcp}): Query your Aptabase analytics from AI agents`,
      `[Privacy Policy](${abs("/legal/privacy")}) · [Terms of Service](${abs("/legal/terms")})`,
    ]),
  );
