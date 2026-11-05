import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'ip-cctv',
    slug: 'ip-cctv-systems',
    title: 'IP CCTV Systems',
    shortDescription: 'Closed-circuit television systems help monitor premises and provide visual oversight of important areas.',
    fullDescription: 'Closed-circuit television systems help monitor premises and provide visual oversight of important areas. Starmax Systems offers a range of IP CCTV camera options that can be selected according to the client\'s budget, premises and intended application.',
    image: '/src/assets/images/cctv_ip_systems_1791638488951.jpg',
    whatIsIt: 'IP (Internet Protocol) CCTV systems utilize digital network cameras that capture video signals and transmit data over an IP network. This architecture allows flexible positioning, scalable recorder integration (NVRs), and configuration tailored to specific indoor or outdoor security coverage needs.',
    applications: [
      'Commercial office entrances, reception zones, and stairwells',
      'Retail storefronts, checkout counters, and inventory aisles',
      'Warehouses, loading bays, and perimeter fences',
      'Banking facilities and financial transaction counters',
      'Apartment buildings, parking basements, and residential compounds',
      'Educational institutions, campus walkways, and assembly areas'
    ],
    capabilities: [
      'High-definition IP dome, bullet, and turret cameras',
      'Network Video Recorder (NVR) storage configurations',
      'Infrared (IR) night vision and low-light surveillance options',
      'Motion detection zones configured around critical entryways',
      'Indoor ceiling-mounted and weather-resistant outdoor enclosures',
      'Local network viewing and monitored workstation playback setup'
    ],
    benefits: [
      'Visual oversight of critical points across residential or commercial property',
      'Camera selections aligned with your physical site layout and budget',
      'Structured cabling and clean professional hardware installation',
      'Ongoing routine maintenance and technical support',
      'Scalable network camera additions as site requirements expand'
    ],
    relatedServices: ['access-control-systems', 'video-door-phone', 'time-attendance-systems'],
    ctaText: 'Enquire About CCTV Systems'
  },
  {
    id: 'access-control',
    slug: 'access-control-systems',
    title: 'Access Control Systems',
    shortDescription: 'Manage authorized physical entry and exit across designated doors, barriers, and secure facility zones.',
    fullDescription: 'Access control systems help organizations manage who can enter designated areas and access specific resources. Starmax Systems provides solutions for managing authorized access according to the requirements of each premises.',
    image: '/src/assets/images/access_control_biometric_1791638461654.jpg',
    whatIsIt: 'Physical access control systems govern door access using electronic locking hardware, credential readers, and management controllers. They replace physical keys with verifiable credentials like cards, PINs, or biometric templates.',
    applications: [
      'Corporate headquarters, server rooms, and executive suites',
      'Research laboratories, cleanrooms, and medical storage',
      'Industrial plants, factory gates, and machinery rooms',
      'Commercial tenant floors and shared co-working spaces',
      'Gated residential towers and clubhouse fitness centres',
      'Educational institutions, faculty rooms, and administrative records'
    ],
    capabilities: [
      'Biometric fingerprint recognition and optical biometric readers',
      'RFID proximity cards, contactless smart cards, and key fobs',
      'Digital keypad PIN-based authorization access terminals',
      'Electromagnetic (EM) locks, drop bolts, and motorized strike releases',
      'Exit push buttons, emergency break-glass units, and door sensors',
      'Multi-door controller networks with centralized credential administration',
      'Time-zone based door scheduling and access permission groups'
    ],
    benefits: [
      'Controlled physical authorization without rekeying physical locks',
      'Detailed audit trails of door transactions and entry attempts',
      'Protection of sensitive server rooms and administrative files',
      'Configurable permissions tailored to distinct employee roles',
      'Professional installation compliant with fire exit requirements'
    ],
    relatedServices: ['time-attendance-systems', 'automatic-gates', 'video-door-phone'],
    ctaText: 'Enquire About Access Control'
  },
  {
    id: 'video-door-phone',
    slug: 'video-door-phone',
    title: 'Video Door Phone Systems',
    shortDescription: 'Allow occupants to see, verify, and communicate with visitors before deciding whether to grant entry.',
    fullDescription: 'Video door phone systems allow occupants to communicate with visitors before deciding whether to grant entry. Depending on the selected model, these systems may include a camera, indoor display, audio communication and door-entry functionality.',
    image: '/src/assets/images/video_door_phone_1791638515404.jpg',
    whatIsIt: 'Video door phone (VDP) solutions connect an outdoor doorbell camera unit with an indoor video monitor station, enabling direct two-way audio and visual verification of incoming visitors.',
    applications: [
      'Independent villas, duplexes, and private bungalows',
      'Multi-apartment buildings and residential towers with lobby stations',
      'Gated community gatehouse-to-villa intercom connections',
      'Small business offices and private consultation clinics',
      'Reception access points for corporate suites'
    ],
    capabilities: [
      'Clear color indoor display monitors with tactile or touch controls',
      'Weather-resistant outdoor doorbell stations with wide-angle camera lenses',
      'Two-way audio communication between visitor and occupant',
      'Electronic door strike release trigger from indoor monitor',
      'Optional infrared night vision illumination for dark doorways',
      'Optional snapshot capture, chime selection, and tamper alerts where supported',
      'Multi-screen extension options for multi-storey residences'
    ],
    benefits: [
      'Visual confirmation of visitors before opening main entrance doors',
      'Convenient remote door unlock button from interior monitors',
      'Discreet screening of unsolicited callers or couriers',
      'Clean wall-mounted installation with concealed wiring',
      'Options suited for single residences or multi-tenant apartments'
    ],
    relatedServices: ['automatic-gates', 'access-control-systems', 'home-automation'],
    ctaText: 'Enquire About Video Door Phones'
  },
  {
    id: 'automatic-gates',
    slug: 'automatic-gates',
    title: 'Automatic Gate Systems',
    shortDescription: 'Automated electric and hydraulic entrance gates for vehicles and pedestrians across residences and commercial sites.',
    fullDescription: 'Automatic gates help manage vehicle and pedestrian entry into premises. Starmax Systems provides gate solutions selected according to available space, traffic requirements and the intended application.',
    image: '/src/assets/images/automatic_sliding_gate_1791638440556.jpg',
    whatIsIt: 'Automated gate systems equip physical perimeter gates with heavy-duty electromechanical or hydraulic motor drives, safety photocells, and remote wireless controls to automate vehicle and pedestrian access.',
    applications: [
      'Residential villas, bungalows, and private driveways',
      'Gated residential layouts and apartment compound main gates',
      'Commercial business parks and corporate headquarters',
      'Logistics yards, industrial warehouses, and loading entries',
      'Educational institutions, hospitals, and public facilities',
      'Perimeter vehicle checkposts requiring controlled access'
    ],
    capabilities: [
      'Motorized sliding gate automation systems with rack and pinion drives',
      'Electromechanical and hydraulic swing gate arm operators',
      'Automatic boom barrier gates for vehicle parking and toll points',
      'Overhead and cantilever gate mechanisms for specialized spaces',
      'Tiger-teeth road blocker systems where high-security vehicle deterrence is required',
      'Infrared safety photo-beam sensors to prevent closure on vehicles or pedestrians',
      'Wireless remote transmitters, RFID proximity integration, and manual key override'
    ],
    benefits: [
      'Convenient automated entry without leaving your vehicle',
      'Durable motor ratings tailored to gate weight and daily duty cycle',
      'Safety sensors to prevent closure against obstacles or pedestrians',
      'Professional mechanical mounting and electrical termination',
      'Maintenance support to keep motors and limit switches operating smoothly'
    ],
    relatedServices: ['video-door-phone', 'access-control-systems', 'ip-cctv-systems'],
    ctaText: 'Enquire About Automatic Gates'
  },
  {
    id: 'intercom-epabx',
    slug: 'intercom-epabx',
    title: 'Intercom and EPABX Systems',
    shortDescription: 'Manage internal organizational voice communication and call routing across departments, desks, and branches.',
    fullDescription: 'Intercom and Electronic Private Automatic Branch Exchange systems help organizations manage internal communication and, where supported, external call routing.',
    image: '/src/assets/images/intercom_epabx_1791638711246.jpg',
    whatIsIt: 'EPABX (Electronic Private Automatic Branch Exchange) and intercom systems establish private telephony networks within an organization, allowing seamless desk-to-desk calling and shared central line routing.',
    applications: [
      'Corporate corporate offices, IT companies, and multi-floor workspaces',
      'Hospitals, nursing homes, and diagnostic laboratories',
      'Hotels, resorts, and hospitality guest service networks',
      'Educational institutions, colleges, and university administrative wings',
      'Multi-flat residential complexes and security guardroom intercoms',
      'Manufacturing facilities and warehouse dispatch centers'
    ],
    capabilities: [
      'Multi-line EPABX switchboards tailored to organization extension count',
      'Dedicated digital console phone stations for receptionists',
      'Direct internal extension-to-extension dialing without external phone charges',
      'Call forwarding, call transfer, call hold, and group hunting lines',
      'Direct hotline connectivity between guard cabins and residents or executives',
      'Intercom connectivity between reception desks, departments, and floors',
      'Expandable card slots for adding trunk lines and additional extensions'
    ],
    benefits: [
      'Reliable voice communication without reliance on mobile reception',
      'Immediate contact between reception, security checkpoints, and staff',
      'Structured telephone cabling and distribution box organization',
      'Configurable routing for incoming customer and client telephone calls',
      'Professional installation and routine PBX maintenance'
    ],
    relatedServices: ['ip-cctv-systems', 'video-door-phone', 'time-attendance-systems'],
    ctaText: 'Enquire About Intercom Systems'
  },
  {
    id: 'time-attendance',
    slug: 'time-attendance-systems',
    title: 'Time and Attendance Systems',
    shortDescription: 'Accurately record employee working hours, shifts, clock-ins, and clock-outs using biometric and card identification.',
    fullDescription: 'Time and attendance systems help organizations record employee attendance and manage working-time information. Depending on the selected device, attendance may be recorded using fingerprints, facial recognition, cards, PINs or other supported identification methods.',
    image: '/src/assets/images/time_attendance_terminal_1791638835746.jpg',
    whatIsIt: 'Electronic time and attendance devices verify employee identity and log arrival and departure timestamps into a secure digital ledger, replacing manual register books with verifiable records.',
    applications: [
      'Corporate offices and enterprise technology campuses',
      'Factories, manufacturing plants, and industrial shop floors with shift work',
      'Retail chains, supermarkets, and hospitality businesses',
      'Hospitals, healthcare clinics, and emergency staffing desks',
      'Educational institutions and school staff rooms',
      'Construction sites and multi-shift warehouse facilities'
    ],
    capabilities: [
      'Optical biometric fingerprint scanners with high spoof rejection',
      'Contactless facial recognition terminals for sanitary clocking',
      'RFID proximity card and key tag identification options',
      'Numeric keypad PIN authentication modes',
      'Shift-based scheduling, late mark calculations, and overtime tracking where supported',
      'Attendance summary reports exportable to Excel or CSV formats',
      'Standalone operation with onboard memory and network sync via TCP/IP or Wi-Fi'
    ],
    benefits: [
      'Eliminates buddy punching and manual attendance logging errors',
      'Objective records of working hours, breaks, and overtime hours',
      'Streamlines monthly attendance review for payroll administration',
      'Flexible device choices matching staff volume and physical conditions',
      'Professional setup including device mounting and network connectivity'
    ],
    relatedServices: ['access-control-systems', 'intercom-epabx', 'ip-cctv-systems'],
    ctaText: 'Enquire About Attendance Systems'
  },
  {
    id: 'home-automation',
    slug: 'home-automation',
    title: 'Home Automation Systems',
    shortDescription: 'Integrated touch and mobile controls for lighting, climate, security, and compatible household electrical systems.',
    fullDescription: 'Home automation helps occupants manage compatible household systems and devices through integrated controls. Starmax Systems can discuss suitable options according to the property\'s requirements and the selected products.',
    image: '/src/assets/images/home_automation_smart_1791638791810.jpg',
    whatIsIt: 'Home automation integrates compatible lighting circuits, curtains, security modules, and electrical switches into unified control interfaces, such as architectural wall panels or mobile device applications.',
    applications: [
      'Modern residences, luxury apartments, and penthouse suites',
      'Independent villas and bungalows seeking centralized convenience',
      'Home entertainment rooms and private home theatres',
      'Executive home offices with specialized lighting requirements',
      'Elderly or accessibility-focused residential modifications'
    ],
    capabilities: [
      'Smart capacitive touch wall switches and customizable scene panels',
      'Lighting circuit automation and dimmer controls where supported',
      'Integration pathways with compatible motorized curtains and blinds',
      'Coordinated security modes linking video door entry and perimeter cameras',
      'Mobile application controls over local Wi-Fi or supported remote setups',
      'Scheduled timers for automated outdoor security illumination',
      'Pre-wiring consultation and retrofit planning for existing homes'
    ],
    benefits: [
      'Centralized control of common household lighting and security functions',
      'Clean architectural appearance replacing clustered mechanical switchboards',
      'Customized scene settings for evening, away, and welcome modes',
      'Tailored consultation to match your specific home layout',
      'Careful planning and installation by experienced technicians'
    ],
    relatedServices: ['video-door-phone', 'automatic-gates', 'ip-cctv-systems'],
    ctaText: 'Enquire About Home Automation'
  }
];
