import { COMPANY_INFO } from '../data/company';

export const SITE_URL = 'https://starmaxsystems.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const IMAGE_ALT = 'Starmax Systems — CCTV, access control and network solutions in Kochi, Kerala';

type RouteSeo = {
  title: string;
  description: string;
  keywords: string;
  noindex?: boolean;
};

const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  'ip-cctv-systems': {
    title: 'IP CCTV Systems',
    description:
      'IP CCTV installation in Kochi by Starmax Systems — HD and 4K surveillance cameras, NVR setup, remote mobile viewing and AMC support for homes, shops and industries across Kerala.',
    keywords: 'CCTV installation Kochi, IP CCTV Kerala, security cameras Kochi, NVR setup, 4K CCTV, commercial CCTV, residential CCTV, CCTV maintenance',
  },
  'access-control-systems': {
    title: 'Access Control Systems',
    description:
      'Access control systems installed by Starmax Systems — card, PIN, biometric and mobile-based door access for offices, hospitals, banks and industries across Kerala.',
    keywords: 'access control Kochi, biometric access Kerala, RFID access control, door access systems, office security, biometric door lock installation',
  },
  'video-door-phone': {
    title: 'Video Door Phone Systems',
    description:
      'Video door phone sales and installation in Kochi by Starmax Systems — video intercom units for apartments, villas and offices with clean fitting and service support.',
    keywords: 'video door phone Kochi, video intercom Kerala, apartment video door phone, villa intercom installation, smart door phone',
  },
  'automatic-gates': {
    title: 'Automatic Gate Systems',
    description:
      'Automatic gate installation in Kochi — sliding and swing gate motors, automation kits and remote control systems supplied and installed by Starmax Systems, Kerala.',
    keywords: 'automatic gate Kochi, sliding gate motor Kerala, swing gate automation, gate motor installation, boom barrier Kochi, automatic gates Kerala',
  },
  'intercom-epabx': {
    title: 'Intercom and EPABX Systems',
    description:
      'Intercom and EPABX phone systems for offices, apartments, hotels and industries — supply, installation and annual maintenance by Starmax Systems, Kadavanthra, Kochi.',
    keywords: 'EPABX Kochi, office intercom Kerala, telephone exchange installation, apartment intercom, business phone systems, EPABX maintenance',
  },
  'time-attendance-systems': {
    title: 'Time and Attendance Systems',
    description:
      'Biometric time and attendance systems by Starmax Systems — fingerprint and face attendance machines with payroll-ready reports for factories, offices and projects in Kerala.',
    keywords: 'biometric attendance Kochi, time attendance system Kerala, fingerprint attendance machine, face recognition attendance, employee attendance software',
  },
  'home-automation': {
    title: 'Home Automation Systems',
    description:
      'Home automation in Kochi by Starmax Systems — smart lighting, curtain motors, video door phones and app-based control for modern homes and villas across Kerala.',
    keywords: 'home automation Kochi, smart home Kerala, smart lighting installation, automated curtains, villa automation, home control systems',
  },
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Starmax Systems | Security & Network Integration in Kochi, Kerala',
    description:
      'Starmax Systems, Kochi — CCTV surveillance, access control, automatic gates, video door phones and network installation for homes, businesses and industries across Kerala since 2003. Call +91 99954 33366.',
    keywords: 'Starmax Systems, security systems Kochi, CCTV Kerala, network installation Kochi, home automation Kerala, security integrator',
  },
  '/about': {
    title: 'About Starmax Systems | Security Solutions in Kerala',
    description:
      'Learn about Starmax Systems — a Kadavanthra, Kochi based security and network integrator delivering CCTV, access control and automation projects to 500+ clients across Kerala.',
    keywords: 'about Starmax Systems, security company Kochi, security integrator Kerala, CCTV company Kadavanthra, Starmax experience',
  },
  '/services': {
    title: 'Security Systems & Automation Services | Starmax Systems',
    description:
      'Starmax Systems services in Kochi — IP CCTV, access control, video door phones, automatic gates, intercom EPABX, time attendance and home automation. Free site survey.',
    keywords: 'security system services Kochi, CCTV installation, access control, automatic gate, video intercom, EPABX, biometric attendance, home automation Kerala',
  },
  '/gallery': {
    title: 'Security Systems Gallery | Starmax Systems Kochi',
    description:
      'Project gallery of CCTV, access control, gate automation, EPABX and structured network installations completed by Starmax Systems across homes, offices and industries in Kerala.',
    keywords: 'security installation gallery Kochi, CCTV projects Kerala, gate automation projects, access control installation photos, Starmax project gallery',
  },
  '/clients': {
    title: 'Top Clients & References | Starmax Systems Kochi',
    description:
      'Trusted by 500+ clients across Kerala — banks, builders, hospitals, retailers, schools and industries rely on Starmax Systems for security and network infrastructure.',
    keywords: 'Starmax clients, security systems for business Kerala, CCTV for hospitals, office access control, industrial security Kochi',
  },
  '/testimonials': {
    title: 'Client Testimonials | Starmax Systems Kochi',
    description:
      'Client testimonials — what homes, businesses and industries across Kerala say about Starmax Systems for CCTV, access control, gate automation and network services.',
    keywords: 'Starmax reviews, security system reviews Kochi, CCTV installer testimonials Kerala, gate automation customer feedback',
  },
  '/contact': {
    title: 'Contact Starmax Systems | Kadavanthra, Kochi',
    description:
      'Contact Starmax Systems at Kadavanthra, Kochi — call +91 99954 33366, WhatsApp, email info@starmaxsystems.com or visit Green Nest Business Center, Girinagar, Kochi 682020.',
    keywords: 'contact Starmax Systems, CCTV quote Kochi, security consultation Kerala, Starmax phone number, security systems Kadavanthra',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Starmax Systems Kochi',
    description:
      'Privacy policy of Starmax Systems, Kochi — how we collect, use and protect personal data submitted through our website callback, contact and enquiry forms.',
    keywords: 'Starmax Systems privacy policy, contact form privacy, website data policy',
  },
  '/admin': {
    title: 'Admin | Starmax Systems',
    description: 'Private administration portal for Starmax Systems.',
    keywords: '',
    noindex: true,
  },
};

const BRAND = COMPANY_INFO.name;
const PHONE = COMPANY_INFO.contacts.primaryPhoneRaw;

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setRouteJsonLd = (data: unknown): void => {
  let el = document.head.querySelector<HTMLScriptElement>('script#route-jsonld');
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = 'route-jsonld';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const breadcrumb = (path: string, name: string): unknown => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...(path !== '/'
      ? [{ '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` }]
      : []),
  ],
});

const resolveRouteSeo = (rawPath: string): { seo: RouteSeo; path: string; slug: string | null } => {
  const path = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    const svc = SERVICE_SEO[slug];
    if (svc) {
      return {
        path,
        slug,
        seo: {
          title: `${svc.title} | Starmax Systems Kochi`,
          description: svc.description,
          keywords: svc.keywords,
        },
      };
    }
    return { path, slug, seo: { title: 'Service Not Found | Starmax Systems', description: BRAND + ' — security and network solutions in Kochi, Kerala.', keywords: '', noindex: true } };
  }

  const seo = ROUTE_SEO[path];
  if (seo) return { path, slug: null, seo };

  return {
    path,
    slug: null,
    seo: {
      title: '404 - Page Not Found | Starmax Systems',
      description: 'Page not found.',
      keywords: '',
      noindex: true,
    },
  };
};

export const applySeo = (rawPath: string): void => {
  const { seo, path, slug } = resolveRouteSeo(rawPath);
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;

  document.title = seo.title;
  setCanonical(url);

  setMeta('name', 'name', 'description', seo.description);
  setMeta('name', 'name', 'keywords', seo.keywords);
  setMeta('name', 'name', 'author', BRAND);
  setMeta('name', 'name', 'geo.region', 'IN-KL');
  setMeta('name', 'name', 'geo.placename', 'Kadavanthra, Kochi, Kerala');
  setMeta(
    'name',
    'name',
    'robots',
    seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  setMeta('property', 'property', 'og:title', seo.title);
  setMeta('property', 'property', 'og:type', 'website');
  setMeta('property', 'property', 'og:site_name', BRAND);
  setMeta('property', 'property', 'og:locale', 'en_IN');
  setMeta('property', 'property', 'og:description', seo.description);
  setMeta('property', 'property', 'og:url', url);
  setMeta('property', 'property', 'og:image', DEFAULT_IMAGE);
  setMeta('property', 'property', 'og:image:alt', IMAGE_ALT);
  setMeta('property', 'property', 'og:image:width', '1200');
  setMeta('property', 'property', 'og:image:height', '630');

  setMeta('name', 'name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'name', 'twitter:title', seo.title);
  setMeta('name', 'name', 'twitter:description', seo.description);
  setMeta('name', 'name', 'twitter:image', DEFAULT_IMAGE);
  setMeta('name', 'name', 'twitter:image:alt', IMAGE_ALT);

  if (path === '/') {
    setRouteJsonLd(null);
    return;
  }

  const crumbs = breadcrumb(path, documentTitleFallback(seo.title));

  if (slug) {
    const svcTitle = SERVICE_SEO[slug]?.title ?? seo.title;
    setRouteJsonLd([
      crumbs,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${svcTitle} in Kochi`,
        serviceType: svcTitle,
        provider: {
          '@id': `${SITE_URL}/#organization`,
          telephone: PHONE,
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${COMPANY_INFO.registeredOffice.doorNo}, ${COMPANY_INFO.registeredOffice.building}, ${COMPANY_INFO.registeredOffice.area}`,
            addressLocality: 'Kochi',
            addressRegion: 'Kerala',
            postalCode: COMPANY_INFO.registeredOffice.pincode,
            addressCountry: 'IN',
          },
        },
        areaServed: { '@type': 'State', name: 'Kerala, India' },
        url: `${SITE_URL}${path}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
      },
    ]);
    return;
  }

  setRouteJsonLd([
    crumbs,
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
    },
  ]);
};

const documentTitleFallback = (title: string): string => title.split('|')[0].trim();
