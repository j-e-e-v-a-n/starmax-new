import { ClientItem } from '../types';

// Crisp, self-contained SVG brand vectors for client identities
const createSvgLogo = (svgContent: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

const svgTata = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <circle cx="24" cy="24" r="18" fill="#005B94"/>
  <path d="M16 16h16v3.5h-6.2v12h-3.6v-12H16V16z" fill="#FFFFFF"/>
  <text x="52" y="31" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#005B94" letter-spacing="2">TATA</text>
</svg>
`);

const svgMahindra = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
  <path d="M12 32L24 14l12 18h-6l-6-9-6 9h-6zm14-11l3.5-5 3.5 5h-7z" fill="#D71921"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#10264D" letter-spacing="0.5">MAHINDRA</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#D71921" letter-spacing="2.5">LOGISTICS</text>
</svg>
`);

const svgRailTel = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 48" fill="none">
  <rect x="6" y="8" width="32" height="32" rx="8" fill="#024D94"/>
  <path d="M14 24a8 8 0 0 1 16 0M18 24a4 4 0 0 1 8 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="22" cy="24" r="2" fill="#FFCC00"/>
  <text x="48" y="30" font-family="Inter, -apple-system, sans-serif" font-size="17" font-weight="800" fill="#024D94" letter-spacing="1">RAILTEL</text>
</svg>
`);

const svgKTDC = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <circle cx="22" cy="24" r="16" fill="#0E7C57"/>
  <path d="M15 28c3-8 11-8 14 0" stroke="#FFCC00" stroke-width="3" stroke-linecap="round" fill="none"/>
  <circle cx="22" cy="18" r="3.5" fill="#FFFFFF"/>
  <text x="48" y="30" font-family="Inter, -apple-system, sans-serif" font-size="19" font-weight="900" fill="#0E7C57" letter-spacing="1.5">KTDC</text>
</svg>
`);

const svgKinder = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48" fill="none">
  <rect x="6" y="8" width="32" height="32" rx="10" fill="#00A3AD"/>
  <path d="M22 14v20M12 24h20" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#10264D" letter-spacing="0.5">KINDER</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#00A3AD" letter-spacing="1.5">HOSPITALS</text>
</svg>
`);

const svgSkyline = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" fill="none">
  <path d="M10 34V18l8-6 8 6v16h-4V21l-4-3-4 3v13h-4z" fill="#0878E8"/>
  <path d="M26 34V12l8-6 8 6v22h-4V15l-4-3-4 3v19h-4z" fill="#10264D"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#10264D" letter-spacing="1">SKYLINE</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="700" fill="#0878E8" letter-spacing="2">BUILDERS</text>
</svg>
`);

const svgPurva = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48" fill="none">
  <polygon points="12,32 22,12 32,32 27,32 22,21 17,32" fill="#B38025"/>
  <circle cx="22" cy="15" r="2.5" fill="#10264D"/>
  <text x="42" y="24" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#10264D" letter-spacing="1">PURVA</text>
  <text x="43" y="36" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#B38025" letter-spacing="2">GRANDBAY</text>
</svg>
`);

const svgDLife = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <rect x="6" y="8" width="32" height="32" rx="8" fill="#E84A27"/>
  <text x="12" y="30" font-family="Inter, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#FFFFFF">D'</text>
  <text x="48" y="26" font-family="Inter, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#10264D" letter-spacing="0.5">D'LIFE</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="8" font-weight="700" fill="#E84A27" letter-spacing="1.5">HOME INTERIORS</text>
</svg>
`);

const svgBose = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <rect x="4" y="10" width="152" height="28" rx="6" fill="#111111"/>
  <text x="80" y="30" font-family="'Arial Black', -apple-system, sans-serif" font-size="18" font-style="italic" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">BOSE</text>
</svg>
`);

const svgNextEdu = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" fill="none">
  <circle cx="22" cy="24" r="16" fill="#008080"/>
  <polygon points="16,21 28,15 28,27" fill="#FFFFFF"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#10264D" letter-spacing="1">NEXT</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="700" fill="#008080" letter-spacing="1.5">EDUCATION</text>
</svg>
`);

const svgKRBakes = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 48" fill="none">
  <rect x="6" y="8" width="32" height="32" rx="16" fill="#8B1E1E"/>
  <text x="11" y="29" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="900" fill="#FFCC00">KR</text>
  <text x="48" y="25" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#8B1E1E" letter-spacing="1">KR BAKES</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="8.5" font-weight="600" fill="#536B8E" letter-spacing="1">SWEETS &amp; CAFE</text>
</svg>
`);

const svgZodiac = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <polygon points="20,10 32,24 20,38 8,24" fill="#0B2046"/>
  <circle cx="20" cy="24" r="5" fill="#C5A059"/>
  <text x="48" y="30" font-family="Times New Roman, serif" font-size="18" font-weight="800" fill="#0B2046" letter-spacing="2">ZODIAC</text>
</svg>
`);

const svgMatrix = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48" fill="none">
  <rect x="6" y="8" width="32" height="32" rx="6" fill="#0878E8"/>
  <path d="M12 16h20M12 24h20M12 32h20" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <text x="48" y="30" font-family="Inter, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#10264D" letter-spacing="1">MATRIX</text>
</svg>
`);

const svgTravancore = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48" fill="none">
  <circle cx="22" cy="24" r="16" fill="#10264D"/>
  <path d="M14 24q8-10 16 0q-8 10-16 0z" fill="#E5B25D"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#10264D" letter-spacing="0.5">TRAVANCORE</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#536B8E" letter-spacing="1.5">COMMERCIAL</text>
</svg>
`);

const svgMontagu = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48" fill="none">
  <circle cx="22" cy="24" r="16" fill="#003B73"/>
  <path d="M22 14v16m-6-6c2 4 10 4 12 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <text x="48" y="24" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#003B73" letter-spacing="0.5">MONTAGU</text>
  <text x="49" y="36" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#0878E8" letter-spacing="1.5">MARITIME</text>
</svg>
`);

const svgMaqtro = createSvgLogo(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 48" fill="none">
  <polygon points="22,10 34,17 34,31 22,38 10,31 10,17" fill="#0A3C7B"/>
  <text x="48" y="30" font-family="Inter, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#0A3C7B" letter-spacing="1">MAQTRO</text>
</svg>
`);

export const CLIENTS: ClientItem[] = [
  { id: '1', name: 'Tata', industry: 'Conglomerate & Enterprise', logo: svgTata, image: svgTata },
  { id: '2', name: 'Mahindra Logistics', industry: 'Logistics & Supply Chain', logo: svgMahindra, image: svgMahindra },
  { id: '3', name: 'RailTel', industry: 'Telecommunications & Infrastructure', logo: svgRailTel, image: svgRailTel },
  { id: '4', name: 'KTDC', industry: 'Hospitality & Tourism', logo: svgKTDC, image: svgKTDC },
  { id: '5', name: 'Kinder Hospital', industry: 'Healthcare & Medical', logo: svgKinder, image: svgKinder },
  { id: '6', name: 'Skyline', industry: 'Real Estate & Construction', logo: svgSkyline, image: svgSkyline },
  { id: '7', name: 'Purva GrandBay', industry: 'Residential & Commercial Spaces', logo: svgPurva, image: svgPurva },
  { id: '8', name: 'DLife', industry: 'Interior Design & Furnishing', logo: svgDLife, image: svgDLife },
  { id: '9', name: 'Bose', industry: 'Audio & Consumer Electronics', logo: svgBose, image: svgBose },
  { id: '10', name: 'Next Education', industry: 'Educational Technology', logo: svgNextEdu, image: svgNextEdu },
  { id: '11', name: 'KR Bakes', industry: 'Food & Retail Chains', logo: svgKRBakes, image: svgKRBakes },
  { id: '12', name: 'Zodiac', industry: 'Apparel & Retail', logo: svgZodiac, image: svgZodiac },
  { id: '13', name: 'Travancore', industry: 'Corporate & Hospitality', logo: svgTravancore, image: svgTravancore },
  { id: '14', name: 'Janatha', industry: 'Commercial Enterprises' },
  { id: '15', name: 'VGC Beena', industry: 'Business Group' },
  { id: '16', name: 'Matrix', industry: 'Technology & Solutions', logo: svgMatrix, image: svgMatrix },
  { id: '17', name: 'Montagu Maritime', industry: 'Maritime & Logistics', logo: svgMontagu, image: svgMontagu },
  { id: '18', name: 'Maqtro', industry: 'Infrastructure & Projects', logo: svgMaqtro, image: svgMaqtro },
  { id: '19', name: 'Royal', industry: 'Commercial Premises' },
  { id: '20', name: 'Devas', industry: 'Enterprises' },
  { id: '21', name: 'Donmax', industry: 'Commercial Solutions' }
];
