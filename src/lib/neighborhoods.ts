export interface NeighborhoodData {
  slug: string;
  name: string;
  type: 'neighborhood' | 'suburb';
  description: string;
  homeType: string;
  commonIssues: string[];
  zip?: string;
}

export const NEIGHBORHOOD_DATA: NeighborhoodData[] = [
  {
    slug: 'the-heights',
    name: 'The Heights',
    type: 'neighborhood',
    description: 'Historic Houston Heights bungalows and craftsman homes often need specialized repair knowledge — original hardwood, older plumbing, and wood-frame construction.',
    homeType: 'Historic bungalows & craftsman homes (1920s–1950s)',
    commonIssues: ['Original hardwood floor repair', 'Older plumbing updates', 'Wood-frame door & window repair', 'Porch restoration', 'Period-accurate trim work'],
    zip: '77008',
  },
  {
    slug: 'montrose',
    name: 'Montrose',
    type: 'neighborhood',
    description: 'Montrose\'s mix of mid-century homes, renovated bungalows, and modern townhomes keeps our techs busy with everything from vintage fixture repairs to new smart home installs.',
    homeType: 'Mid-century & renovated homes, townhomes',
    commonIssues: ['TV mounting & smart home setup', 'Bathroom tile repair', 'Fence & gate repair', 'Interior painting', 'Ceiling fan installation'],
    zip: '77006',
  },
  {
    slug: 'river-oaks',
    name: 'River Oaks',
    type: 'neighborhood',
    description: 'River Oaks estates and luxury homes demand the highest standard of workmanship. Our senior technicians handle high-end finishes, detailed carpentry, and premium installations.',
    homeType: 'Large estate & luxury homes',
    commonIssues: ['High-end carpentry & millwork', 'Custom cabinet repair', 'Premium fixture installation', 'Pre-sale home repairs', 'Detailed painting & finishing'],
    zip: '77019',
  },
  {
    slug: 'west-university',
    name: 'West University',
    type: 'neighborhood',
    description: 'West U\'s well-maintained homes and active HOAs mean repairs need to be done right and look right. Our techs understand the neighborhood standards.',
    homeType: 'Traditional brick & newer construction',
    commonIssues: ['Drywall repair & painting', 'Exterior caulking & sealing', 'Deck maintenance', 'Fence repair', 'Pre-inspection punch lists'],
    zip: '77005',
  },
  {
    slug: 'memorial',
    name: 'Memorial',
    type: 'neighborhood',
    description: 'Memorial\'s larger homes and wooded lots bring unique maintenance needs — from storm damage repair to pool deck upkeep and large fence projects.',
    homeType: 'Large homes on wooded lots (1960s–1990s)',
    commonIssues: ['Storm & wind damage repair', 'Pressure washing', 'Large fence & gate projects', 'Deck repair & staining', 'Gutter cleaning'],
    zip: '77024',
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    type: 'suburb',
    description: 'Sugar Land\'s master-planned communities have high HOA standards. We know the rules and deliver work that keeps you compliant and your neighbors happy.',
    homeType: 'Master-planned community homes (1990s–2010s)',
    commonIssues: ['HOA-compliant exterior repairs', 'Fence & gate repair', 'Flooring installation', 'TV mounting', 'Seasonal maintenance'],
    zip: '77478',
  },
  {
    slug: 'katy',
    name: 'Katy',
    type: 'suburb',
    description: 'Katy\'s newer subdivisions face the same humidity and foundation challenges as the rest of Houston — plus the unique wear of homes in high-growth areas.',
    homeType: 'New-construction subdivisions (2000s–present)',
    commonIssues: ['Drywall cracks from foundation movement', 'Door & window adjustments', 'Fence repair after storms', 'Pressure washing', 'Fixture upgrades'],
    zip: '77450',
  },
  {
    slug: 'pearland',
    name: 'Pearland',
    type: 'suburb',
    description: 'One of Houston\'s fastest-growing suburbs, Pearland homes range from established brick ranches to brand-new construction — all needing reliable local handyman service.',
    homeType: 'Brick ranches & newer construction',
    commonIssues: ['Plumbing repairs', 'Ceiling fan installation', 'Drywall repair', 'Flooring', 'Exterior pressure washing'],
    zip: '77584',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    type: 'suburb',
    description: 'The Woodlands\' tree-lined communities and premium homes expect premium service. We match that standard on every job.',
    homeType: 'Upscale planned community homes',
    commonIssues: ['Tree debris & storm damage repair', 'Deck restoration', 'High-end fixture installation', 'Gutter cleaning', 'Pressure washing'],
    zip: '77380',
  },
  {
    slug: 'spring',
    name: 'Spring',
    type: 'suburb',
    description: 'Spring\'s mix of older established neighborhoods and newer developments means our techs handle everything from vintage-era repairs to modern smart home installs.',
    homeType: 'Established & newer suburban homes',
    commonIssues: ['General repairs', 'Flooring', 'Plumbing', 'Painting', 'Fence repair'],
    zip: '77373',
  },
  {
    slug: 'humble',
    name: 'Humble',
    type: 'suburb',
    description: 'Humble homeowners get the same licensed, insured, and guaranteed service as anywhere in the Houston metro — no travel fee within our standard service area.',
    homeType: 'Suburban homes & ranches',
    commonIssues: ['General repairs', 'Carpentry', 'Pressure washing', 'Fence repair', 'TV mounting'],
    zip: '77338',
  },
  {
    slug: 'pasadena',
    name: 'Pasadena',
    type: 'suburb',
    description: 'Pasadena\'s working-class neighborhoods and older homes often need trusted, affordable repairs done right — that\'s exactly what we deliver.',
    homeType: 'Older suburban homes (1950s–1980s)',
    commonIssues: ['Plumbing repairs', 'Electrical updates', 'Drywall', 'Door & window repair', 'Pressure washing'],
    zip: '77502',
  },
  {
    slug: 'friendswood',
    name: 'Friendswood',
    type: 'suburb',
    description: 'Friendswood\'s family-oriented community deserves reliable, professional handyman service — licensed, on time, and backed by a 1-year guarantee.',
    homeType: 'Family suburban homes',
    commonIssues: ['Fence repair', 'Flooring', 'TV mounting', 'Ceiling fans', 'General maintenance'],
    zip: '77546',
  },
  {
    slug: 'galleria',
    name: 'Galleria',
    type: 'neighborhood',
    description: 'The Galleria area\'s condos, townhomes, and high-rises need skilled technicians comfortable with condo rules, building management, and urban home repairs.',
    homeType: 'Condos, townhomes & urban residences',
    commonIssues: ['TV mounting & cable management', 'Furniture assembly', 'Minor plumbing', 'Painting', 'Smart home installation'],
    zip: '77056',
  },
  {
    slug: 'midtown',
    name: 'Midtown',
    type: 'neighborhood',
    description: 'Midtown\'s urban townhomes and lofts need tech-savvy handymen as comfortable with smart home installs as with classic repairs.',
    homeType: 'Urban townhomes, lofts & condos',
    commonIssues: ['TV mounting', 'Smart home setup', 'Furniture assembly', 'Minor electrical', 'Painting'],
    zip: '77004',
  },
];

export function getNeighborhood(slug: string) {
  return NEIGHBORHOOD_DATA.find((n) => n.slug === slug);
}
