export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  tags: string[];
  description: string;
  postedAt: string;
  isFeatured?: boolean;
  isSaved?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  followers: number;
  isFollowed?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  profileStrength: number;
  isVerified: boolean;
}

export type Screen = 'home' | 'search' | 'job-details' | 'profile' | 'auth' | 'kyc' | 'notifications' | 'saved' | 'cv-manager';
