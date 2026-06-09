export type LeadStatus = "新申請" | "聯繫中" | "場勘中" | "已完成";

export type Lead = {
  id: string;
  timestamp: string;
  applicantType: string;
  contactName: string;
  phone: string;
  email: string;
  venueName: string;
  city: string;
  address: string;
  machineType: string;
  placementLocation: string;
  hasPowerOutlet: string;
  additionalNotes: string;
  availableTime: string[];
  status: LeadStatus;
};

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroStatNumber: string;
  heroStatLabel: string;
  casesTitle: string;
  casesSubtitle: string;
  applyTitle: string;
  applySubtitle: string;
  footerText: string;
  formApplicantTypeOptions: string;
  formMachineTypeOptions: string;
  formPlacementLocationOptions: string;
  formPowerOutletOptions: string;
  formAvailableTimeOptions: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  isPublic: boolean;
  sortOrder: number;
  badgeTone?: "primary" | "secondary";
  metricValue?: string;
  metricLabel?: string;
  metricIcon?: string;
  testimonial?: string;
};

export type DashboardStats = {
  totalLeads: number;
  activeLeads: number;
  completedLeads: number;
  cityCounts: { city: string; count: number }[];
  statusCounts: { status: LeadStatus; count: number }[];
};
