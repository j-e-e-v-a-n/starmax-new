import { COMPANY_INFO } from '../data/company';

export const SITE_URL = 'https://starmaxsystems.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const IMAGE_ALT = 'Starmax Systems — CCTV, access control and network solutions in Kochi, Kerala';

type RouteSeo = {
  title: string;
  description: string;
  noindex?: boolean;
};

const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  'ip-cctv-systems': {
    title: 'IP CCTV Systems',
    description:
      'IP CCTV installation in Kochi by Starmax Systems — HD and 4K surveillance cameras, NVR setup, remote mobile viewing and AMC support for homes, shops and industries across Kerala.',
  },
  'access-control-systems': {
    title: 'Access Control Systems',
    description:
      'Access control systems installed by Starmax Systems — card, PIN, biometric and mobile-based door access for offices, hospitals, banks and industries across Kerala.',
  },
  'video-door-phone': {
    title: 'Video Door Phone Systems',
    description:
      'Video door phone sales and installation in Kochi by Starmax Systems — video intercom units for apartments, villas and offices with clean fitting and service support.',
  },
  'automatic-gates': {
    title: 'Automatic Gate Systems',
    description:
      'Automatic gate installation in Kochi — sliding and swing gate motors, automation kits and remote control systems supplied and installed by Starmax Systems, Kerala.',
  },
  'intercom-epabx': {
    title: 'Intercom and EPABX Systems',
    description:
      'Intercom and EPABX phone systems for offices, apartments, hotels and industries — supply, installation and annual maintenance by Starmax Systems, Kadavanthra, Kochi.',
  },
  'time-attendance-systems': {
    title: 'Time and Attendance Systems',
    description:
      'Biometric time and attendance systems by Starmax Systems — fingerprint and face attendance machines with payroll-ready reports for factories, offices and projects in Kerala.',
  },
  'home-automation': {
    title: 'Home Automation Systems',
    description:
      'Home automation in Kochi by Starmax Systems — smart lighting, curtain motors, video door phones and app-based control for modern homes and villas across Kerala.',
  },
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Starmax Systems | Security & Network Integration in Kochi, Kerala',
    description:
      'Starmax Systems, Kochi — CCTV surveillance, access control, automatic gates, video door phones and network installation for homes, businesses and industries across Kerala since 2003. Call +91 99954 33366.',
  },
  '/about': {
    title: 'About Starmax Systems | Security Solutions in Kerala',
    description:
      'Learn about Starmax Systems — a Kadavanthra, Kochi based security and network integrator delivering CCTV, access control and automation projects to 500+ clients across Kerala.',
  },
  '/services': {
    title: 'Security Systems & Automation Services | Starmax Systems',
    description:
      'Starmax Systems services in Kochi — IP CCTV, access control, video door phones, automatic gates, intercom EPABX, time attendance and home automation. Free site survey.',
  },
  '/gallery': {
    title: 'Security Systems Gallery | Starmax Systems Kochi',
    description:
      'Project gallery of CCTV, access control, gate automation, EPABX and structured network installations completed by Starmax Systems across homes, offices and industries in Kerala.',
  },
  '/clients': {
    title: 'Top Clients & References | Starmax Systems Kochi',
    description:
      'Trusted by 500+ clients across Kerala — banks, builders, hospitals, retailers, schools and industries rely on Starmax Systems for security and network infrastructure.',
  },
  '/testimonials': {
    title: 'Client Testimonials | Starmax Systems Kochi',
    description:
      'Client testimonials — what homes, businesses and industries across Kerala say about Starmax Systems for CCTV, access control, gate automation and network services.',
  },
  '/contact': {
    title: 'Contact Starmax Systems | Kadavanthra, Kochi',
    description:
      'Contact Starmax Systems at Kadavanthra, Kochi — call +91 99954 33366, WhatsApp, email info@starmaxsystems.com or visit Green Nest Business Center, Girinagar, Kochi 682020.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Starmax Systems Kochi',
    description:
      'Privacy policy of Starmax Systems, Kochi — how we collect, use and protect personal data submitted through our website callback, contact and enquiry forms.',
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
        },
      };
    }
    return { path, slug, seo: { title: 'Service Not Found | Starmax Systems', description: BRAND + ' — security and network solutions in Kochi, Kerala.', noindex: true } };
  }

  const seo = ROUTE_SEO[path];
  if (seo) return { path, slug: null, seo };

  return {
    path,
    slug: null,
    seo: {
      title: '404 - Page Not Found | Starmax Systems',
      description: 'Page not found.',
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
  setMeta(
    'name',
    'name',
    'robots',
    seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  setMeta('property', 'property', 'og:title', seo.title);
  setMeta('property', 'property', 'og:description', seo.description);
  setMeta('property', 'property', 'og:url', url);
  setMeta('property', 'property', 'og:image', DEFAULT_IMAGE);
  setMeta('property', 'property', 'og:image:alt', IMAGE_ALT);

  setMeta('name', 'name', 'twitter:title', seo.title);
  setMeta('name', 'name', 'twitter:description', seo.description);
  setMeta('name', 'name', 'twitter:image', DEFAULT_IMAGE);

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
          '@type': 'Organization',
          name: BRAND,
          url: `${SITE_URL}/`,
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
    ]);
    return;
  }

  setRouteJsonLd(crumbs);
};

const documentTitleFallback = (title: string): string => title.split('|')[0].trim();
