/**
 * schema.org JSON-LD builders. Emitted via <JsonLd /> in the layouts.
 * All facts come from src/data — never hardcode product details here.
 */
import { product } from "../data/product";
import {
  tiers,
  currency,
  formatEvents,
  contactThreshold,
} from "../data/pricing";
import type { Faq } from "../data/faq";

export type JsonLd = Record<string, unknown>;

const SOFTWARE_ID = `${product.url}/#software`;
const ORG_ID = `${product.url}/#organization`;

export const organization = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: product.name,
  url: product.url,
  logo: `${product.url}/logo-email.png`,
  email: product.links.email,
  sameAs: [product.links.github, product.links.twitter, product.links.discord],
});

export const website = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: product.name,
  url: product.url,
  publisher: { "@id": ORG_ID },
});

export const softwareApplication = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: product.name,
  url: product.url,
  description: product.oneLiner,
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Analytics",
  operatingSystem: "Web",
  isAccessibleForFree: true,
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  softwareHelp: `${product.url}/docs`,
  featureList: product.features.map((f) => f.title),
  author: { "@id": ORG_ID },
  offers: [
    ...tiers.map((tier) => ({
      "@type": "Offer",
      name:
        tier.price === 0
          ? `Free — up to ${formatEvents(tier.events)} events/month`
          : `${formatEvents(tier.events)} events/month`,
      price: tier.price,
      priceCurrency: currency,
      url: `${product.url}/pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tier.price,
        priceCurrency: currency,
        billingDuration: "P1M",
        unitText: "MONTH",
      },
    })),
    {
      "@type": "Offer",
      name: `More than ${formatEvents(contactThreshold)} events/month`,
      url: `${product.url}/pricing`,
      availability: "https://schema.org/InStock",
      description: `Contact ${product.links.email}`,
    },
  ],
});

export const faqPage = (items: Faq[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answers.join("\n\n") },
  })),
});

export const breadcrumbs = (
  trail: { name: string; url: string }[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${product.url}${item.url}`,
  })),
});

export const blogPosting = (post: {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  tags?: string[];
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.publishedDate,
  url: `${product.url}/blog/${post.slug}`,
  image: `${product.url}/blogcover/${post.slug}.png`,
  keywords: post.tags?.join(", "),
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});
