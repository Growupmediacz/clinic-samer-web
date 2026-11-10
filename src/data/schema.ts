import { site, insurers } from './site';
import type { FaqItem } from './faq';

const openingHours = () => {
  if (!site.hours) return undefined;
  const map: Record<string, string> = { mo: 'Monday', tu: 'Tuesday', we: 'Wednesday', th: 'Thursday', fr: 'Friday', sa: 'Saturday', su: 'Sunday' };
  return Object.entries(site.hours).filter(([, h]) => h).map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: map[d], opens: h![0], closes: h![1] }));
};

export const physicianSchema = {
  '@type': 'Physician',
  '@id': `${site.url}/#lekar`,
  name: 'MUDr. Samer Asad',
  medicalSpecialty: ['Gynecologic', 'Obstetric'],
  knowsLanguage: ['cs', 'en', 'fr', 'it', 'ar'],
  url: `${site.url}/o-nas`,
  image: `${site.url}/og-image.jpg`,
  telephone: site.phone,
  address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: 'Praha 4', addressCountry: 'CZ' },
  worksFor: { '@id': `${site.url}/#klinika` },
};

export const clinicSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': `${site.url}/#klinika`,
      name: site.legalName,
      legalName: site.company,
      url: site.url,
      image: `${site.url}/og-image.jpg`,
      logo: `${site.url}/favicon.png`,
      telephone: site.phone,
      email: site.email,
      medicalSpecialty: ['Gynecologic', 'Obstetric'],
      address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: 'Praha 4 – Braník', addressRegion: 'Praha', addressCountry: 'CZ' },
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      hasMap: site.mapsUrl,
      availableLanguage: ['cs', 'en', 'fr', 'it', 'ar'],
      isAcceptingNewPatients: true,
      paymentAccepted: insurers.map((i) => i.name).join(', '),
      openingHoursSpecification: openingHours(),
      sameAs: [site.zlProfile],
    },
    physicianSchema,
  ],
};

export const faqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});
