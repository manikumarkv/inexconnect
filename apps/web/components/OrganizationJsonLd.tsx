import { SITE } from "@inexconnect/ui";

/**
 * Organization + WebSite structured data for the homepage.
 * Tells search engines that "iNexConnect" is one company (not a typo of
 * "nexconnect"), which profiles belong to it, and what the site is called.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: ["iNexConnect LLC", "inexconnect", "iNex Connect"],
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE.url}/og-image.png`,
      description: SITE.description,
      slogan: SITE.tagline,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "Place", name: SITE.areaServed },
        { "@type": "Country", name: "United States" },
      ],
      sameAs: SITE.profiles,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      alternateName: SITE.legalName,
      url: SITE.url,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
} as const;

export default function OrganizationJsonLd(): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      // Static, trusted data; "<" is escaped so the JSON cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
