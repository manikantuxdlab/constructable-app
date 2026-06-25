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
  category: "financial_legal" | "pre_construction" | "architectural_engineering" | "subcontractors_foundations";
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
  sender: "user" | "supplier";
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

export interface UserProfile {
  email: string;
  name: string;
}
