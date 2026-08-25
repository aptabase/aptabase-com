/**
 * Single source of truth for pricing. Used by the homepage pricing section,
 * /pricing, /pricing.md, llms.txt and the SoftwareApplication JSON-LD offers.
 */

export interface Tier {
  /** Events per month included in this tier. */
  events: number;
  /** Monthly price in USD. 0 = free. */
  price: number;
}

export const currency = "USD";

export const tiers: Tier[] = [
  { events: 20_000, price: 0 },
  { events: 200_000, price: 10 },
  { events: 1_000_000, price: 20 },
  { events: 2_000_000, price: 40 },
  { events: 5_000_000, price: 75 },
  { events: 10_000_000, price: 140 },
  { events: 20_000_000, price: 240 },
  { events: 30_000_000, price: 300 },
  { events: 50_000_000, price: 450 },
];

export const freeTier = tiers[0];
export const firstPaidTier = tiers[1];
export const lastTier = tiers[tiers.length - 1];

/** Above this many events/month, pricing is by agreement. */
export const contactThreshold = lastTier.events;

/** Included in every plan, free or paid. */
export const planFeatures = [
  "Unlimited Apps",
  "EU or US data residency",
  "Built-in Dashboard",
  "Live View Dashboard",
  "Session Timeline",
  "Export to CSV",
  "SDKs for popular platforms",
  "100% Data Ownership",
];

export const pricingNotes = {
  billing: "Billed monthly in USD. Cancel any time.",
  noCreditCard: "No credit card required for the free plan.",
  overage:
    "There are no overage fees. We email you when you're close to your plan's monthly limit; if you exceed it, analytics are temporarily paused until the start of the next month.",
};

export const formatEvents = (n: number) => n.toLocaleString("en-US");
export const formatPrice = (price: number) => (price === 0 ? "Free" : `$${price}`);
export const formatPricePerMonth = (price: number) =>
  price === 0 ? "Free" : `$${price}/month`;
