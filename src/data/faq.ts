/**
 * Frequently asked questions. Rendered on the homepage (all), on /pricing
 * (pricing category), in the FAQPage JSON-LD, llms.txt and the Markdown twins.
 */

export type FaqCategory = "privacy" | "pricing";

export interface Faq {
  question: string;
  /** One paragraph per entry. */
  answers: string[];
  category: FaqCategory;
}

export const faqs: Faq[] = [
  {
    category: "privacy",
    question: "What does “Data not linked to anyone” really mean?",
    answers: [
      "It means all data points sent by an App instrumented by Aptabase are disconnected in a way that prevents them from being associated with a specific individual. We do not apply any pseudonymisation, every datapoint 100% anonymised for that extra peace of mind and compliance.",
    ],
  },
  {
    category: "privacy",
    question: "But what's the difference between Pseudonymised and Anonymised?",
    answers: [
      "Based on the GDPR Article 4(5), the main difference between pseudonymisation and anonymisation is that pseudonymisation is a reversible process that allows the data subject to be re-identified using the additional information kept separately, whereas anonymisation is an irreversible process that results in data that cannot be linked back to a specific individual.",
      "Opt-in consent is required whenever personal data is collected, even when pseudonymisation techniques such as hashing is applied as the data is still considered personal data. However, anonymised data is not considered personal data and therefore does not require consent as per Recital 26 of the GDPR.",
    ],
  },
  {
    category: "privacy",
    question: "This seems to good to be true. What's the catch?",
    answers: [
      "Anonymous analytics have a huge benefit in terms of end-user data privacy and significantly reduced compliance burden. However, it does come with a few limitations for app developers.",
      "Because data points collected by Aptabase do not have a unique user identifier, it's not possible to perform user-level analytics such as Monthly Active Users or User Retention.",
      "While we've grown used to these metrics, have you asked yourself if they are really worth it? The alternative is to ask for consent, which also has its own limitations. We believe that the benefits of anonymous analytics far outweigh the limitations.",
    ],
  },
  {
    category: "pricing",
    question: "Why is Aptabase not free like Firebase and Google Analytics?",
    answers: [
      "You've likely heard this many times, but simply put — we don't sell your end-users data.",
      "Free analytics usually sell end-users data to third-parties (known as Data Brokers) which then use it to perform user profiling and targeted advertising. This is a huge privacy concern and is the reason why we have to charge a subscription fee to keep the lights on.",
    ],
  },
  {
    category: "pricing",
    question: "What happens if I go over my plan's monthly limit?",
    answers: [
      "You will not be charged any overage fees. We will send you an email notification when you're close to reaching your plan's monthly limit. If you exceed your plan's monthly limit, we will temporarily disable your analytics until the start of the next month.",
    ],
  },
  {
    category: "pricing",
    question: "What counts as an event?",
    answers: [
      "Every call to the SDK's track function counts as one event. Nothing is tracked automatically, so you decide exactly how many events your app sends.",
    ],
  },
];

export const faqsByCategory = (category: FaqCategory) =>
  faqs.filter((f) => f.category === category);
