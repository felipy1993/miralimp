import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TestimonialItem {
  id: string;
  name: string;
  text: string;
  rating: number;
  service: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}