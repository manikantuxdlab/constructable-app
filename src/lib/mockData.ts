export interface Project {
  title: string;
  image: string;
  year: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: 'financial_legal' | 'pre_construction' | 'architectural_engineering' | 'subcontractors_foundations';
  rating: number;
  reviewsCount: number;
  tags: string[];
  description: string;
  avatarText: string;
  avatarBg: string;
  bgGradient: string;
  services: string[];
  projects: Project[];
  team: TeamMember[];
  phone: string;
  email: string;
  address: string;
  reviews: Review[];
}

export interface Message {
  id: string;
  sender: 'user' | 'supplier';
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierAvatarBg: string;
  supplierAvatarText: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
  messages: Message[];
}

export interface JobListing {
  id: string;
  title: string;
  category: string;
  budget: string;
  description: string;
  location: string;
  postedDate: string;
  proposalsCount: number;
}

export const CATEGORIES_MAP = {
  financial_legal: {
    id: 'financial_legal',
    title: 'FINANCIAL & LEGAL',
    subtitle: 'Bonds, Insurance, Contracts',
    iconName: 'landmark',
    description: 'Procure construction bonds, workers comp, professional liability, and contract review services.',
  },
  pre_construction: {
    id: 'pre_construction',
    title: 'PRE-CONSTRUCTION TESTING',
    subtitle: 'Geotech, Soil Lab, Surveys',
    iconName: 'microscope',
    description: 'Ensure site safety and compliance with soil boring, seismic testing, and site surveys.',
  },
  architectural_engineering: {
    id: 'architectural_engineering',
    title: 'ARCHITECTURAL & ENGINEERING',
    subtitle: 'Structural, MEP, Design-Build',
    iconName: 'drafting-compass',
    description: 'Connect with certified architects and structural, mechanical, electrical, and plumbing engineering firms.',
  },
  subcontractors_foundations: {
    id: 'subcontractors_foundations',
    title: 'SUBCONTRACTORS & FOUNDATIONS',
    subtitle: 'Concrete, Piling, Excavation',
    iconName: 'home',
    description: 'Hire specialized contractors for site excavation, foundation laying, and structural framing work.',
  },
};

export const MOCK_SUPPLIERS: Supplier[] = [
  // 1. FINANCIAL & LEGAL
  {
    id: 'surety-mutual',
    name: 'Surety Mutual Partners',
    category: 'financial_legal',
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Performance Bonds', 'Liability Insurance', 'Risk Management'],
    description: 'Industry-leading surety bonding and comprehensive risk management solutions tailored specifically for general contractors and commercial builders.',
    avatarText: 'SM',
    avatarBg: 'bg-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100/50',
    services: ['Bid & Performance Bonds', 'General Liability Insurance', 'Subcontractor Default Insurance', 'Builder Risk Policies'],
    projects: [
      { title: 'Metro Transit Expansion Bond', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2024' },
      { title: 'Airport Terminal 2 Insurance', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', year: '2023' }
    ],
    team: [
      { name: 'Sarah Jenkins', role: 'Senior Bonding Agent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
      { name: 'David Vance', role: 'Risk Advisor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 321-4950',
    email: 'bonds@suretymutual.com',
    address: '455 Financial Way, Suite 1200, New York, NY 10005',
    reviews: [
      { author: 'Marcus Builders', rating: 5, date: '2 months ago', content: 'Secured a $10M performance bond within 48 hours. Incredible service.' },
      { author: 'BuildCo Group', rating: 4.8, date: '5 months ago', content: 'Very competitive rates on builder risk policies.' }
    ]
  },
  {
    id: 'ironclad-legal',
    name: 'Ironclad Construction Law',
    category: 'financial_legal',
    rating: 4.8,
    reviewsCount: 22,
    tags: ['Contracts', 'Dispute Resolution', 'Lien Filings'],
    description: 'Providing robust contract review, mechanics lien defense, and regulatory compliance counsel for multi-million dollar construction ventures.',
    avatarText: 'IC',
    avatarBg: 'bg-indigo-600',
    bgGradient: 'from-indigo-50 to-indigo-100/50',
    services: ['AIA Contract Drafting', 'Mechanics Lien Disputes', 'Bidding Litigation', 'Labor Law Compliance'],
    projects: [
      { title: 'Highrise Center Arbitration', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', year: '2024' }
    ],
    team: [
      { name: 'Arthur Pendelton', role: 'Managing Partner', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 789-0112',
    email: 'info@ironcladlaw.com',
    address: '90 Main Street, Suite 404, Boston, MA 02108',
    reviews: [
      { author: 'G&S General Contractors', rating: 5, date: '1 month ago', content: 'Arthur review of our joint venture agreement saved us from severe liability.' }
    ]
  },

  // 2. PRE-CONSTRUCTION TESTING
  {
    id: 'apex-geotech',
    name: 'Apex Geotechnical Services',
    category: 'pre_construction',
    rating: 4.9,
    reviewsCount: 41,
    tags: ['Soil Boring', 'Seismic Analysis', 'Lab Analysis'],
    description: 'Expert geotechnical drilling, compaction testing, and subsurface soil classification for high-density commercial developments.',
    avatarText: 'AG',
    avatarBg: 'bg-amber-600',
    bgGradient: 'from-amber-50 to-amber-100/50',
    services: ['Core Soil Boring', 'Compaction/Proctor Testing', 'Seismic Site Class Determination', 'Foundation Load Recommendations'],
    projects: [
      { title: 'Westside Logistics Park Geotech', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2024' },
      { title: 'Harbor Condos Pile Design', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', year: '2023' }
    ],
    team: [
      { name: 'Dr. Evelyn Carter', role: 'Principal Geotechnical Engineer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
      { name: 'Marcus Brody', role: 'Field Operations Manager', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 432-8811',
    email: 'projects@apexgeotech.com',
    address: '888 Industrial Pkwy, Houston, TX 77001',
    reviews: [
      { author: 'Vortex Development', rating: 5, date: '3 weeks ago', content: 'Detailed reports and quick turnaround on our soil testing. Highly recommend.' }
    ]
  },
  {
    id: 'horizon-surveys',
    name: 'Horizon Land Surveys',
    category: 'pre_construction',
    rating: 4.7,
    reviewsCount: 29,
    tags: ['Topographical Survey', 'Boundary Surveys', '3D Laser Scanning'],
    description: 'High-precision surveying using robotic total stations, drone photogrammetry, and terrestrial LiDAR scanner networks.',
    avatarText: 'HS',
    avatarBg: 'bg-orange-500',
    bgGradient: 'from-orange-50 to-orange-100/50',
    services: ['ALTA/NSPS Land Title Surveys', 'Boundary & Topographical Mapping', 'Utility Location & Mapping', 'Construction Stakeout'],
    projects: [
      { title: 'Downtown Civic Center Boundary', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', year: '2024' }
    ],
    team: [
      { name: 'Toby Miller', role: 'Licensed Land Surveyor', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 877-3344',
    email: 'info@horizonsurveys.com',
    address: '102 Meridian Circle, Denver, CO 80202',
    reviews: [
      { author: 'Apex Commercial', rating: 4.6, date: '1 month ago', content: 'Great communication and spot-on drone topo map for our hilly site.' }
    ]
  },

  // 3. ARCHITECTURAL & ENGINEERING
  {
    id: 'integra-engineering',
    name: 'Integra Structural & Engineering',
    category: 'architectural_engineering',
    rating: 4.9,
    reviewsCount: 52,
    tags: ['Structural Design', 'MEP Coordination', 'Seismic Retrofitting'],
    description: 'Providing innovative and cost-effective architectural, structural, and MEP engineering drawings for residential, institutional, and industrial complexes.',
    avatarText: 'IE',
    avatarBg: 'bg-sky-600',
    bgGradient: 'from-sky-50 to-sky-100/50',
    services: ['Structural Analysis & Blueprinting', 'HVAC, Electrical & Plumbing Systems', 'Seismic Retrofits & Upgrades', 'BIM Revit Modeling'],
    projects: [
      { title: 'The Luminary Office Complex', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', year: '2024' },
      { title: 'Oak Valley High School Annex', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2023' }
    ],
    team: [
      { name: 'Diana Chen, PE', role: 'Chief Structural Engineer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80' },
      { name: 'Liam Foster, AIA', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 909-2211',
    email: 'intake@integraengineering.com',
    address: '77 Broad St, Floor 14, Seattle, WA 98101',
    reviews: [
      { author: 'Novus Homes', rating: 5, date: '1 month ago', content: 'Integra drafts were clear, detailed, and easily approved by the city building department.' }
    ]
  },

  // 4. SUBCONTRACTORS & FOUNDATIONS
  {
    id: 'apex-concrete',
    name: 'Apex Concrete & Foundation Corp',
    category: 'subcontractors_foundations',
    rating: 4.9,
    reviewsCount: 74,
    tags: ['Concrete Pouring', 'Piling Foundations', 'Excavation'],
    description: 'Specializing in commercial foundation structures, cast-in-place concrete walls, slab-on-grade, structural concrete, and deep caisson installations.',
    avatarText: 'AC',
    avatarBg: 'bg-amber-600',
    bgGradient: 'from-amber-50 to-amber-100/50',
    services: ['Slab-on-Grade Concrete', 'Concrete Core Drills', 'Retaining Walls', 'Commercial Foundation Piling'],
    projects: [
      { title: 'Northside Plaza Foundations', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2024' },
      { title: 'Suburban Office Park Retaining Wall', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', year: '2023' }
    ],
    team: [
      { name: 'Robert Kovac', role: 'Superintendent', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
      { name: 'Jose Martinez', role: 'Finishing Foreman', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 234-9000',
    email: 'rob@apexconcrete.com',
    address: '150 Cement Rd, Chicago, IL 60601',
    reviews: [
      { author: 'Pinnacle Contracting', rating: 5, date: '3 days ago', content: 'Kovac and his crew completed a 40,000 sq ft warehouse slab-on-grade ahead of schedule.' },
      { author: 'J&L Homes LLC', rating: 4.8, date: '1 month ago', content: 'Strong work ethic, perfect concrete finish on the driveway.' }
    ]
  },
  {
    id: 'titan-piling',
    name: 'Titan Piling & Shoring Specialists',
    category: 'subcontractors_foundations',
    rating: 4.8,
    reviewsCount: 33,
    tags: ['Sheet Piling', 'Shoring Walls', 'Caissons'],
    description: 'Expert structural shoring and deep foundation pile driving services for residential basements and commercial infrastructure.',
    avatarText: 'TP',
    avatarBg: 'bg-zinc-700',
    bgGradient: 'from-zinc-50 to-zinc-100/50',
    services: ['Steel H-Pile Installation', 'Secant & Tangent Shoring Walls', 'Drilled Shaft Caissons', 'Soil Grouting'],
    projects: [
      { title: 'Riverside High-Rise Shoring', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', year: '2024' }
    ],
    team: [
      { name: 'Jack Donaldson', role: 'Operations Chief', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 998-1122',
    email: 'estimates@titanpiling.com',
    address: '404 Hammer St, Detroit, MI 48201',
    reviews: [
      { author: 'Metropolitan Redevelopment', rating: 4.9, date: '2 weeks ago', content: 'Flawless sheet piling execution right next to the riverbed. Incredible safety record.' }
    ]
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-apex-concrete',
    supplierId: 'apex-concrete',
    supplierName: 'Apex Concrete & Foundation Corp',
    supplierAvatarBg: 'bg-amber-600',
    supplierAvatarText: 'AC',
    lastMessage: 'Sure, we can deliver the concrete batch by Friday morning.',
    lastTimestamp: '10:45 AM',
    unread: true,
    messages: [
      { id: '1', sender: 'user', text: 'Hi Robert, are you available for a 40-yard pour this week?', timestamp: 'Yesterday' },
      { id: '2', sender: 'supplier', text: 'What strength concrete do you need for the foundation?', timestamp: 'Yesterday' },
      { id: '3', sender: 'user', text: 'We need 4,000 PSI concrete mix with fiber mesh.', timestamp: '10:30 AM' },
      { id: '4', sender: 'supplier', text: 'Sure, we can deliver the concrete batch by Friday morning.', timestamp: '10:45 AM' }
    ]
  },
  {
    id: 'chat-surety-mutual',
    supplierId: 'surety-mutual',
    supplierName: 'Surety Mutual Partners',
    supplierAvatarBg: 'bg-emerald-600',
    supplierAvatarText: 'SM',
    lastMessage: 'The application is being reviewed by underwriting. We should have it ready by tonight.',
    lastTimestamp: 'Yesterday',
    unread: false,
    messages: [
      { id: '1', sender: 'user', text: 'Hello Jenkins, did you receive our subcontractor default indemnity files?', timestamp: '2 days ago' },
      { id: '2', sender: 'supplier', text: 'Yes, everything looks order. The application is being reviewed by underwriting. We should have it ready by tonight.', timestamp: 'Yesterday' }
    ]
  }
];

export const SEED_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Topographical Survey for Residential Subdivision',
    category: 'PRE-CONSTRUCTION TESTING',
    budget: '$5,000 - $8,000',
    description: 'Looking for a licensed land surveyor to complete a full ALTA/NSPS boundary and topographical survey on a 15-acre sloped parcel.',
    location: 'Denver, CO',
    postedDate: 'June 22, 2026',
    proposalsCount: 3
  },
  {
    id: 'job-2',
    title: 'Commercial General Liability and Bid Bond Renewal',
    category: 'FINANCIAL & LEGAL',
    budget: '$15,000',
    description: 'General Contractor looking to renew professional indemnity bonds and liability insurance portfolio for the 2026-2027 fiscal year.',
    location: 'Boston, MA',
    postedDate: 'June 20, 2026',
    proposalsCount: 2
  }
];
