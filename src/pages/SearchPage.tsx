import { useState } from 'react';
import { useSuppliers } from '../hooks/useSuppliers';
import { SearchInput } from '../components/Search/SearchInput';
import { FilterTabs } from '../components/Search/FilterTabs';
import { SafetyAlert } from '../components/Search/SafetyAlert';
import { ListingCard } from '../components/Search/ListingCard';
import type { Supplier } from '../types';


interface SearchPageProps {
  initialQuery?: string;
}

// Custom mock listings data that matches the user's screenshot exactly
const MOCK_LISTINGS = [
  {
    id: 'excavator-cat',
    name: '2019 Caterpillar 320 Excavator',
    price: '$84,500',
    location: 'Naperville, IL (22 miles)',
    timeLeft: '25d left',
    image: '/excavator.png',
    filterCategory: 'tools',
    buttonText: 'VIEW DETAILS',
    buttonStyle: 'primary',
    // Supplier mapping fields
    category: 'subcontractors_foundations' as const,
    rating: 4.9,
    reviewsCount: 14,
    tags: ['Heavy Machinery', 'Excavation', 'Cat Equipment'],
    description: 'High-performance 2019 Caterpillar 320 Excavator in excellent working condition. Features a 20-foot max digging depth, fuel-efficient engine, and fully enclosed cabin with AC. Complete maintenance logs available. Perfect for heavy earthmoving, demolition, and site excavation work.',
    avatarText: 'CE',
    avatarBg: 'bg-amber-600',
    bgGradient: 'from-amber-50 to-amber-100/50',
    services: ['Excavator Rental', 'Heavy Earthmoving', 'Site Grading'],
    projects: [
      { title: 'Excavator Unit 320', image: '/excavator.png', year: '2019' }
    ],
    team: [
      { name: 'Dave Miller', role: 'Machinery Specialist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 456-1122',
    email: 'rentals@cat-depot.com',
    address: '1220 Industrial Parkway, Naperville, IL 60540',
    reviews: [
      { author: 'BuildRight Group', rating: 5, date: '1 month ago', content: 'Machine ran perfectly for our 2-week excavation job.' }
    ]
  },
  {
    id: 'lumber-structural',
    name: 'Bulk Lot: Structural 4x4 Lumber',
    price: '$1,200',
    location: 'Gary, IN (45 miles)',
    timeLeft: '12d left',
    image: '/lumber.png',
    filterCategory: 'materials',
    buttonText: 'VIEW DETAILS',
    buttonStyle: 'primary',
    // Supplier mapping fields
    category: 'subcontractors_foundations' as const,
    rating: 4.7,
    reviewsCount: 8,
    tags: ['Lumber', 'Framing Materials', 'Structural Wood'],
    description: 'Bulk package of high-quality, kiln-dried structural 4x4 lumber beams. Length: 12 feet each. Ideal for heavy structural framing, post support, and outdoor decking foundation systems. Total quantity: 150 pieces.',
    avatarText: 'SL',
    avatarBg: 'bg-amber-800',
    bgGradient: 'from-amber-50 to-amber-100/50',
    services: ['Structural Lumber Supply', 'Custom Timber Cuts', 'Bulk Material Delivery'],
    projects: [
      { title: 'Lumber Supply Lot 4', image: '/lumber.png', year: '2024' }
    ],
    team: [
      { name: 'Robert Wood', role: 'Material Yard Manager', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 321-9988',
    email: 'materials@garylumber.com',
    address: '400 Industrial Way, Gary, IN 46402',
    reviews: [
      { author: 'ProFrame Inc', rating: 4.8, date: '2 weeks ago', content: 'Straight, clean timber. Highly recommended for framing.' }
    ]
  },
  {
    id: 'scrap-metal-jobsite',
    name: 'Jobsite Scrap Metal (Pickup Only)',
    price: 'FREE',
    location: 'Evanston, IL (8 miles)',
    timeLeft: '4h left',
    image: '/scrap_metal.png',
    filterCategory: 'free',
    buttonText: 'INQUIRE NOW',
    buttonStyle: 'secondary',
    // Supplier mapping fields
    category: 'subcontractors_foundations' as const,
    rating: 4.5,
    reviewsCount: 3,
    tags: ['Scrap Metal', 'Recyclables', 'Jobsite Cleanup'],
    description: 'Assorted steel, iron, and aluminum scrap metal left over from a major structural renovation. Clean pile, easy to load. Must bring your own truck/trailer. First come, first served.',
    avatarText: 'SM',
    avatarBg: 'bg-slate-600',
    bgGradient: 'from-slate-50 to-slate-100/50',
    services: ['Metal Scrap Removal', 'Jobsite Waste Recycling'],
    projects: [
      { title: 'Renovation Leftovers', image: '/scrap_metal.png', year: '2024' }
    ],
    team: [
      { name: 'Gary Steele', role: 'Site Superintendent', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 777-6655',
    email: 'cleanup@evanstonsite.com',
    address: '810 University Place, Evanston, IL 60201',
    reviews: [
      { author: 'EcoRecycle', rating: 5, date: '3 days ago', content: 'Easy pickup, helpful site manager.' }
    ]
  },
  {
    id: 'apex-concrete-search',
    name: 'Apex Concrete & Foundation Corp',
    price: 'Bids from $5,000',
    location: 'Chicago, IL (12 miles)',
    timeLeft: 'Active',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
    filterCategory: 'contractors',
    buttonText: 'VIEW DETAILS',
    buttonStyle: 'primary',
    // Supplier fields
    category: 'subcontractors_foundations' as const,
    rating: 4.9,
    reviewsCount: 74,
    tags: ['Concrete Pouring', 'Piling Foundations', 'Excavation'],
    description: 'Specializing in commercial foundation structures, cast-in-place concrete walls, slab-on-grade, structural concrete, and deep caisson installations.',
    avatarText: 'AC',
    avatarBg: 'bg-amber-600',
    bgGradient: 'from-amber-50 to-amber-100/50',
    services: ['Concrete Foundations', 'Excavation & Piling', 'Reinforced Slab Work'],
    projects: [
      { title: 'Logistics Park Foundations', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2024' }
    ],
    team: [
      { name: 'Mike Stone', role: 'Concrete Foreman', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 234-9988',
    email: 'estimating@apexconcrete.com',
    address: '1400 Industrial Way, Chicago, IL 60601',
    reviews: [
      { author: 'Pinnacle Builders', rating: 5, date: '1 month ago', content: 'Apex delivered our concrete pour on time and within specifications.' }
    ]
  },
  {
    id: 'surety-mutual-search',
    name: 'Surety Mutual Partners',
    price: 'Bonds from $1,000',
    location: 'Chicago, IL (15 miles)',
    timeLeft: 'Active',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    filterCategory: 'contractors',
    buttonText: 'VIEW DETAILS',
    buttonStyle: 'primary',
    // Supplier fields
    category: 'financial_legal' as const,
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Performance Bonds', 'Liability Insurance', 'Risk Management'],
    description: 'Industry-leading surety bonding and comprehensive risk management solutions tailored specifically for general contractors and commercial builders.',
    avatarText: 'SM',
    avatarBg: 'bg-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100/50',
    services: ['Bid & Performance Bonds', 'General Liability Insurance', 'Subcontractor Default Insurance', 'Builder Risk Policies'],
    projects: [
      { title: 'Metro Transit Expansion Bond', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80', year: '2024' }
    ],
    team: [
      { name: 'Sarah Jenkins', role: 'Senior Bonding Agent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' }
    ],
    phone: '+1 (555) 321-4950',
    email: 'bonds@suretymutual.com',
    address: '455 Financial Way, Suite 1200, New York, NY 10005',
    reviews: [
      { author: 'Marcus Builders', rating: 5, date: '2 months ago', content: 'Secured a $10M performance bond within 48 hours. Incredible service.' }
    ]
  }
];

export function SearchPage({ initialQuery = '' }: SearchPageProps) {
  const { setSelectedSupplier } = useSuppliers();
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'materials' | 'contractors' | 'tools' | 'free'>('materials');
  const [showSafetyBanner, setShowSafetyBanner] = useState(true);

  // Filter listings based on query only to show all items together
  const filteredListings = MOCK_LISTINGS.filter((item) => {
    const matchesQuery = query.trim() === '' || 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="flex flex-col h-full bg-background animate-[fadeIn_0.2s_ease-out]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        
        {/* Search Input Bar */}
        <SearchInput value={query} onChange={setQuery} />

        {/* Filter Tabs Bar */}
        <FilterTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Dismissible Safety Alert Banner */}
        {showSafetyBanner && (
          <SafetyAlert onDismiss={() => setShowSafetyBanner(false)} />
        )}

        {/* Listings Grid */}
        <div className="space-y-4 pt-1">
          {filteredListings.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-muted rounded-none bg-card">
              <p className="text-xs font-bold text-foreground">No listings found</p>
              <p className="text-[10px] text-muted-foreground mt-1 max-w-[200px] mx-auto">
                No items match "{query}" in the active category.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item as any}
                  onClickCTA={() => setSelectedSupplier(item as unknown as Supplier)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

