export const siteConfig = {
  name: "FairPlay Africa",
  tagline: "Protecting African Creativity",
  description:
    "FairPlay Africa helps filmmakers and content creators track, detect, and reduce piracy while opening ethical pathways to monetize distribution. Built by Africans, for Africa.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fairplayafrica.com",
  ogImage: "/og-image.png",
  logo: "/logo.png",
  links: {
    twitter: "https://twitter.com/fairplayafrica",
    instagram: "https://instagram.com/fairplayafrica",
    linkedin: "https://linkedin.com/company/fairplayafrica",
  },
  email: "hello@fairplayafrica.com",
  navigation: [
    { name: "Home", href: "/" },
    { name: "What We Offer", href: "/#offers" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ],
  footerLinks: {
    product: [
      { name: "Features", href: "/#offers" },
      { name: "Pricing", href: "/pricing" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Demo", href: "/#demo" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Partners", href: "/partners" },
      { name: "Career", href: "/career" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/privacy#terms" },
      { name: "Refund Policy", href: "/privacy#refund" },
    ],
  },
  seo: {
    keywords: [
      "anti-piracy",
      "content protection",
      "Africa",
      "filmmakers",
      "Nollywood",
      "digital rights",
      "piracy monitoring",
      "content fingerprinting",
      "African cinema",
      "film distribution",
      "copyright protection",
      "streaming security",
    ],
    author: "FairPlay Africa",
    twitterHandle: "@fairplayafrica",
  },
} as const;

export type SiteConfig = typeof siteConfig;
