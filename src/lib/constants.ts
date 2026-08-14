export const BUSINESS = {
  name: 'Houston Handy Pros',
  phone: '(832) 215-0668',
  phoneHref: 'tel:+18322150668',
  email: 'hello@houstonhandypros.com',
  address: 'Houston, TX 77002',
  hours: 'Mon–Sat 7am–7pm',
  hoursSunday: 'Sunday: Closed',
  insurance: '$1M general liability',
  tagline: 'The last handyman Houston homeowners call.',
  founded: 2015,
  jobsCompleted: 3200,
  rating: 4.9,
  reviewCount: 847,
  serviceRadius: '40-mile radius of downtown Houston',
  guarantee: '1-year workmanship guarantee',
  offer: '15% off your first job',
};

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  longDescription: string;
  houstonNote: string;
  priceRange: string;
  jobs: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    id: 'carpentry',
    title: 'Carpentry & Woodwork',
    shortTitle: 'Carpentry',
    icon: 'Hammer',
    description: 'Custom trim, doors, cabinets, and finish carpentry that holds up in Houston humidity.',
    longDescription:
      'From a sticking Heights bungalow door to custom millwork in River Oaks, our carpenters treat wood like a Houston climate problem — because it is. We cut, fit, and finish so the work still looks right after a Gulf summer.',
    houstonNote:
      'Houston humidity swells doors, loosens trim, and accelerates wood rot on decks and fascia. We use moisture-aware joinery and exterior-grade materials on anything that sees weather.',
    priceRange: '$150–$500',
    jobs: [
      'Door installation & repair ($200–$500)',
      'Cabinet repair & installation',
      'Crown molding & trim',
      'Deck board replacement ($40–$90/board)',
      'Custom shelving & built-ins',
    ],
    image: '/images/services/carpentry.jpg',
  },
  {
    id: 'plumbing',
    title: 'Plumbing Repairs',
    shortTitle: 'Plumbing',
    icon: 'Wrench',
    description: 'Leaks, faucets, toilets, and drain work — fixed cleanly before they become water damage.',
    longDescription:
      'A dripping faucet in a 1920s Heights kitchen is a different job than a toilet in a Katy new-build. We handle the everyday plumbing that does not need a full plumber truck — and we tell you honestly when it does.',
    houstonNote:
      'Clay soil and older galvanized lines make small leaks expensive fast. We stop the water, protect finishes, and flag anything that needs a licensed plumber before it floods a slab.',
    priceRange: '$125–$400',
    jobs: [
      'Faucet replacement ($125–$250)',
      'Toilet repair & replacement ($200–$400)',
      'Leak detection & repair',
      'Drain clearing',
      'Shut-off valve replacement',
    ],
    image: '/images/services/plumbing.jpg',
  },
  {
    id: 'electrical',
    title: 'Electrical (Minor)',
    shortTitle: 'Electrical',
    icon: 'Zap',
    description: 'Outlets, fixtures, ceiling fans, and switches installed safely and up to code.',
    longDescription:
      'We handle fixture-level electrical: fans, lights, GFCI outlets, doorbells, and switches. Clean installs, labeled work, and no “we’ll figure it out on site” surprises.',
    houstonNote:
      'Houston summers punish undersized fans and cheap fixtures. We spec humidity-rated fans and GFCI protection where moisture and outdoor living rooms demand it.',
    priceRange: '$95–$250',
    jobs: [
      'Outlet & switch replacement',
      'Ceiling fan installation ($125–$250)',
      'Light fixture installation ($65–$100)',
      'GFCI outlet installation',
      'Doorbell & smart switch repair',
    ],
    image: '/images/services/electrical.jpg',
  },
  {
    id: 'drywall',
    title: 'Drywall & Painting',
    shortTitle: 'Drywall',
    icon: 'PaintBucket',
    description: 'Invisible patches, texture matching, and interior paint that looks like it was never damaged.',
    longDescription:
      'Houston homes crack. That is the soil talking. We patch, texture-match, and paint so the repair disappears — then we tell you if the crack is cosmetic or a foundation conversation.',
    houstonNote:
      'Expansive clay soil swells and shrinks all year. Diagonal cracks at door corners and ceiling gaps are common. We repair the finish and are honest when a structural look is next.',
    priceRange: '$150–$500',
    jobs: [
      'Drywall patch under 4 sq ft ($150–$350)',
      'Texture matching',
      'Interior painting',
      'Popcorn ceiling removal',
      'Caulking & sealing',
    ],
    image: '/images/services/drywall.jpg',
  },
  {
    id: 'flooring',
    title: 'Flooring Installation',
    shortTitle: 'Flooring',
    icon: 'Grid3X3',
    description: 'Hardwood, tile, LVP, and carpet repair or installation with clean transitions.',
    longDescription:
      'We install and repair the floors Houston actually lives on: LVP that handles humidity, tile that survives kids and dogs, and hardwood patches that match the rest of the room.',
    houstonNote:
      'Moisture and slab movement are the two reasons floors fail here. We check the subfloor, respect expansion gaps, and will not install product that cannot survive a Houston August.',
    priceRange: '$200–$800',
    jobs: [
      'Hardwood repair & refinishing',
      'Tile installation & repair ($440 avg)',
      'LVP / laminate installation',
      'Carpet repair',
      'Subfloor repair',
    ],
    image: '/images/services/flooring.jpg',
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing',
    shortTitle: 'Pressure Wash',
    icon: 'Droplets',
    description: 'Driveways, fences, decks, and brick brought back from Houston mildew and pollen.',
    longDescription:
      'A Houston driveway can look ten years older after one spring. We wash concrete, cedar, and brick at the right pressure so you get clean — not etched or fuzzy wood.',
    houstonNote:
      'Mildew, pollen, and iron-stained irrigation water are local specialties. We treat organic growth, not just blast it, so the green does not return in two weeks.',
    priceRange: '$150–$400',
    jobs: [
      'Driveway & sidewalk washing',
      'Deck & patio cleaning',
      'Fence washing',
      'House exterior washing',
      'Concrete stain removal',
    ],
    image: '/images/services/pressure-washing.jpg',
  },
  {
    id: 'fence',
    title: 'Fence & Gate Repair',
    shortTitle: 'Fence & Gate',
    icon: 'Shield',
    description: 'Storm-downed boards, leaning posts, and gates that actually latch again.',
    longDescription:
      'If you live in Houston, you have replaced a fence section. We repair cedar and metal, reset posts, and rebuild gates so they swing true after the next derecho.',
    houstonNote:
      'April–October storms take down whole runs of privacy fence. We can assess, prioritize street-facing sections, and match existing cedar so the patch does not advertise itself.',
    priceRange: '$150–$500',
    jobs: [
      'Fence board replacement ($40–$90/board + materials)',
      'Post repair & replacement',
      'Gate alignment & hardware ($150–$400/section)',
      'Fence staining & sealing',
      'New fence sections',
    ],
    image: '/images/services/fence.jpg',
  },
  {
    id: 'assembly',
    title: 'Furniture Assembly',
    shortTitle: 'Assembly',
    icon: 'Package',
    description: 'IKEA, office furniture, gym equipment, and outdoor sets — built square and solid.',
    longDescription:
      'We assemble what you bought, haul the cardboard, and leave the piece level. No missing-cam Sunday nights. No wobbly desks.',
    houstonNote:
      'Patio and outdoor furniture in Houston rusts and loosens faster. We assemble with outdoor-rated hardware when the kit is not up to the climate.',
    priceRange: '$80–$250',
    jobs: [
      'IKEA & flat-pack assembly',
      'Office furniture setup',
      'Outdoor furniture assembly',
      'Gym equipment assembly',
      'Bed frame assembly',
    ],
    image: '/images/services/assembly.jpg',
  },
  {
    id: 'tv-mounting',
    title: 'TV Mounting & Smart Home',
    shortTitle: 'TV & Smart Home',
    icon: 'Monitor',
    description: 'Centered mounts, hidden cords, and smart devices that work on the first try.',
    longDescription:
      'We mount TVs on studs or proper anchors, conceal cords, and install the doorbells, thermostats, and sound bars that make a room feel finished.',
    houstonNote:
      'Brick, plaster, and condo rules are common across the Galleria and Midtown. We bring the right anchors and work inside building guidelines.',
    priceRange: '$150–$300',
    jobs: [
      'TV wall mounting ($150–$300)',
      'In-wall cord concealment',
      'Smart thermostat installation',
      'Doorbell camera installation',
      'Sound bar mounting',
    ],
    image: '/images/services/tv-mounting.jpg',
  },
  {
    id: 'maintenance',
    title: 'Seasonal Maintenance',
    shortTitle: 'Maintenance',
    icon: 'Calendar',
    description: 'Quarterly checkups that catch Houston problems before they become invoices.',
    longDescription:
      'Filters, caulk, weatherstripping, gutters, detectors — the unglamorous list that keeps a Houston house from quietly failing. Plans start at $70/month.',
    houstonNote:
      'Fifty-plus inches of rain and year-round humidity mean caulk and wood fail on a schedule. A spring and fall visit is cheaper than one roof leak through drywall.',
    priceRange: 'Plans from $70/mo',
    jobs: [
      'AC filter replacement',
      'Weatherstripping ($95–$265)',
      'Gutter cleaning',
      'Smoke detector testing',
      'Seasonal caulking & sealing',
    ],
    image: '/images/services/maintenance.jpg',
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    shortTitle: 'Commercial',
    icon: 'Building2',
    description: 'Offices, retail, and multi-family — one crew, one invoice, one account manager.',
    longDescription:
      'Property managers and owners get a single number for punch lists, make-readies, and the “tenant just called” jobs. We show up in uniform, document the work, and keep units turning.',
    houstonNote:
      'Houston multi-family turns fast. We handle make-ready punch lists across units so you are not juggling three trades for a Friday move-in.',
    priceRange: 'Custom quote ($65+/hr)',
    jobs: [
      'Office repairs & maintenance',
      'Retail fixture installation',
      'Property management support',
      'Multi-unit make-readies',
      'ADA compliance work',
    ],
    image: '/images/services/commercial.jpg',
  },
];

export const NEIGHBORHOODS = [
  'The Heights', 'Montrose', 'River Oaks', 'West University', 'Bellaire',
  'Memorial', 'Meyerland', 'Pearland', 'Sugar Land', 'Katy',
  'The Woodlands', 'Spring', 'Humble', 'Pasadena', 'Friendswood',
  'Missouri City', 'Stafford', 'Galleria', 'Midtown', 'EaDo',
  'Garden Oaks', 'Oak Forest', 'Timbergrove', 'Tanglewood', 'Briargrove',
];

export const SUBURBS = [
  { name: 'Sugar Land', distance: '22 miles SW', fee: 'No travel fee' },
  { name: 'Katy', distance: '30 miles W', fee: 'No travel fee' },
  { name: 'Pearland', distance: '20 miles S', fee: 'No travel fee' },
  { name: 'The Woodlands', distance: '28 miles N', fee: 'No travel fee' },
  { name: 'Spring', distance: '23 miles N', fee: 'No travel fee' },
  { name: 'Humble', distance: '20 miles NE', fee: 'No travel fee' },
  { name: 'Pasadena', distance: '15 miles E', fee: 'No travel fee' },
  { name: 'Friendswood', distance: '25 miles SE', fee: 'No travel fee' },
  { name: 'Missouri City', distance: '18 miles SW', fee: 'No travel fee' },
  { name: 'Stafford', distance: '22 miles SW', fee: 'No travel fee' },
  { name: 'Cypress', distance: '25 miles NW', fee: 'No travel fee' },
  { name: 'League City', distance: '30 miles SE', fee: 'No travel fee' },
];

export const FAQS = [
  {
    q: 'Are you licensed and insured?',
    a: 'Texas does not require a statewide handyman license for general home repair, and we do not advertise one. We carry $1M in general liability, and every technician is background-checked. If a job needs a licensed plumber, electrician, or a city permit, we tell you before work starts.',
  },
  {
    q: 'How quickly can you come out?',
    a: 'Most jobs book within 24–48 hours. If something is leaking, unsafe, or blocking a move-in, call us — we hold same-day slots for urgent work across the Houston metro.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'Standard estimates are free. Larger projects that need a site visit carry a $49 scoping fee, credited in full when you book.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'All major cards, Apple Pay, Google Pay, Venmo, and check. Jobs over $300 require a 50% deposit. You approve the price before we start.',
  },
  {
    q: 'Do you guarantee your work?',
    a: 'Every labor job includes a 1-year workmanship guarantee. If our repair fails within a year, we come back and make it right at no charge.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Houston and the metro within 40 miles of downtown — including The Heights, Montrose, River Oaks, Sugar Land, Katy, Pearland, The Woodlands, Spring, and surrounding cities. No travel fee inside that radius.',
  },
  {
    q: 'Does a handyman need a license in Houston?',
    a: 'No statewide handyman license exists in Texas. Most carpentry, drywall, painting, and fixture jobs also do not need a Houston permit. Electrical panel work, gas, HVAC, and major plumbing do require a licensed trade. We stay on the right side of that line.',
  },
  {
    q: 'Can you help after a Houston storm?',
    a: 'Yes. We repair blown-down fence sections, damaged fascia, and interior drywall from roof leaks. If you have a punch list after a storm, we assess it in one visit and start with what is keeping water out.',
  },
];

export const REVIEWS = [
  {
    name: 'Sarah M.',
    neighborhood: 'The Heights',
    rating: 5,
    text: 'Marcus fixed our leaky faucet and noticed the disposal was about to go. Saved us a flood. On time, clean, and the quote was exactly what we paid.',
    service: 'Plumbing Repair',
    date: '2 weeks ago',
  },
  {
    name: 'David R.',
    neighborhood: 'Sugar Land',
    rating: 5,
    text: 'Mounted three TVs and hid every cord. Looks like a custom install. Professional from the first text to the walkthrough.',
    service: 'TV Mounting',
    date: '1 month ago',
  },
  {
    name: 'Jennifer T.',
    neighborhood: 'Katy',
    rating: 5,
    text: 'I manage three properties. Houston Handy Pros has done 12 jobs for me. They show up, document the work, and I do not have to babysit.',
    service: 'Commercial Services',
    date: '3 weeks ago',
  },
  {
    name: 'Michael K.',
    neighborhood: 'Montrose',
    rating: 5,
    text: 'Storm took out a whole fence run. They matched the cedar, reset two posts, and finished in a day. Fair price. No runaround.',
    service: 'Fence Repair',
    date: '1 week ago',
  },
  {
    name: 'Amanda L.',
    neighborhood: 'West University',
    rating: 5,
    text: 'The drywall patch is invisible. Texture match was perfect. I had two other quotes that wanted to paint the whole wall.',
    service: 'Drywall & Painting',
    date: '2 months ago',
  },
  {
    name: 'Carlos V.',
    neighborhood: 'Pearland',
    rating: 5,
    text: 'The quarterly maintenance plan is the best $130 I spend. They catch small things before they become Saturday emergencies.',
    service: 'Maintenance Plan',
    date: '3 months ago',
  },
];

export const GALLERY = [
  {
    id: 1,
    title: 'Kitchen faucet replacement',
    category: 'Plumbing',
    location: 'River Oaks',
    image: '/images/gallery/kitchen-faucet.jpg',
  },
  {
    id: 2,
    title: 'Storm-damaged fence rebuild',
    category: 'Fence',
    location: 'Katy',
    image: '/images/gallery/fence-repair.jpg',
  },
  {
    id: 3,
    title: 'Drywall patch & texture match',
    category: 'Drywall',
    location: 'The Heights',
    image: '/images/gallery/drywall.jpg',
  },
  {
    id: 4,
    title: 'LVP flooring install',
    category: 'Flooring',
    location: 'Sugar Land',
    image: '/images/gallery/flooring.jpg',
  },
  {
    id: 5,
    title: 'Driveway & brick wash',
    category: 'Pressure Washing',
    location: 'Pearland',
    image: '/images/gallery/driveway.jpg',
  },
  {
    id: 6,
    title: 'TV mount & cord concealment',
    category: 'TV Mounting',
    location: 'Montrose',
    image: '/images/gallery/tv.jpg',
  },
  {
    id: 7,
    title: 'Crown molding & trim',
    category: 'Carpentry',
    location: 'West University',
    image: '/images/services/carpentry.jpg',
  },
  {
    id: 8,
    title: 'Ceiling fan installation',
    category: 'Electrical',
    location: 'Garden Oaks',
    image: '/images/services/electrical.jpg',
  },
  {
    id: 9,
    title: 'Bedroom furniture assembly',
    category: 'Assembly',
    location: 'Midtown',
    image: '/images/services/assembly.jpg',
  },
  {
    id: 10,
    title: 'Seasonal home checkup',
    category: 'Maintenance',
    location: 'Memorial',
    image: '/images/services/maintenance.jpg',
  },
  {
    id: 11,
    title: 'Office door & wall repair',
    category: 'Commercial',
    location: 'Galleria',
    image: '/images/services/commercial.jpg',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Essential',
    price: '$70',
    period: '/month',
    description: 'Foundational care for homes up to 2,500 sq ft',
    features: [
      '2 maintenance visits per year',
      'AC filter replacement (each visit)',
      'Smoke & CO detector testing',
      'Sink, faucet & drain inspection',
      'Dryer vent check',
      'PDF maintenance report with photos',
      '10% off all additional services',
    ],
    cta: 'Start Essential Plan',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$130',
    period: '/month',
    description: 'Most popular — full seasonal coverage',
    features: [
      '4 visits per year (quarterly)',
      'All Essential features',
      'Caulk maintenance (doors, windows, showers)',
      'Door & gate lubrication',
      'Gutter cleaning (1x/year)',
      'Priority same-week scheduling',
      '15% off all additional services',
      'Dedicated technician',
    ],
    cta: 'Start Pro Plan',
    popular: true,
  },
  {
    name: 'Property Manager',
    price: 'Custom',
    period: '',
    description: 'Multi-unit & commercial properties',
    features: [
      'Volume pricing across all units',
      'Multiple property management',
      'Dedicated account manager',
      '20% off all services',
      'Priority emergency response',
      'Monthly maintenance reporting',
    ],
    cta: 'Get Custom Quote',
    popular: false,
  },
];

export const COMMON_JOBS = [
  { job: 'TV mounting (standard, drywall)', price: '$150–$300' },
  { job: 'Toilet repair or replacement', price: '$200–$400' },
  { job: 'Faucet replacement', price: '$125–$250' },
  { job: 'Ceiling fan installation (existing wiring)', price: '$125–$250' },
  { job: 'Drywall patch (under 4 sq ft)', price: '$150–$350' },
  { job: 'Interior door replacement', price: '$200–$500' },
  { job: 'Outlet / switch replacement', price: '$95–$150' },
  { job: 'Furniture assembly (avg)', price: '$80–$200' },
  { job: 'Weatherstripping (per door)', price: '$95–$150' },
  { job: 'Caulking (bathroom / kitchen)', price: '$100–$200' },
  { job: 'Fence board replacement (per board)', price: '$40–$90 + materials' },
  { job: 'Light fixture installation', price: '$65–$100' },
];

export const NAV_LINKS = [
  { href: '/services', label: 'Services', hasDropdown: true },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/service-area', label: 'Areas' },
  { href: '/contact', label: 'Contact' },
];
