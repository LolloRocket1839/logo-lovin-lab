export type StudySpaceCategory = 
  | 'bar' 
  | 'biblioteca_nazionale' 
  | 'biblioteche_civiche' 
  | 'edisu' 
  | 'politecnico' 
  | 'unito' 
  | 'campus_diffuso' 
  | 'coworking' 
  | 'parchi' 
  | 'polo900';

export interface StudySpace {
  id: number;
  category: StudySpaceCategory;
  name: string;
  address: string;
  capacity: string;
  hours: string;
  features: string;
  link?: string;
}

export interface DetailedStudySpace {
  id: number;
  name: string;
  category: StudySpaceCategory;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  capacity: string;
  features: string[];
  accessibility: boolean;
  wifi: boolean;
  powerOutlets: boolean;
  quietLevel: 'silenzio' | 'moderato' | 'vivace';
  bookingRequired: boolean;
  bookingLink?: string;
  website?: string;
  image?: string;
  description?: string;
}
