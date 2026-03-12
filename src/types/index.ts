export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type ProductType = "SaaS" | "AI Tool" | "Mobile App" | "Chrome Extension" | "Dev Tool";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type SignalLevel = "Low" | "Medium" | "High";

export interface Competitor {
  name: string;
  url: string;
  snippet: string;
  source: string;
  platform?: "iOS" | "Android" | "Web";
  rating?: number;
  reviewCount?: number;
  category?: string;
  pricingSignal?: string;
}

export interface CompetitorAnalysis {
  name: string;
  domain: string;
  url: string;
  strengths: string[];
  weaknesses: string[];
}

export interface MarketContext {
  theme: string;
  competitorsFound: number;
  marketCondition: string;
  mainPatterns: string[];
  opportunityScore: number;
  marketSize: string;
  growthRate: string;
  signals: string[];
}

export interface Gap {
  title: string;
  currentMarket: string;
  missing: string;
  opportunity: string;
}

export interface StackItem {
  layer: string;
  tech: string;
}

export interface ValidationResult {
  score: number;
  signals: string[];
  risks: string[];
  verdict: string;
}

export interface Idea {
  title: string;
  pitch: string;
  audience: string;
  problem: string;
  gap: string;
  differentiation: string;
  closestCompetitors: string[];
  mvpFeatures: string[];
  mvpRoadmap: string[];
  techStack: StackItem[];
  firstUsers: string[];
  difficulty: DifficultyLevel;
  marketDemand: SignalLevel;
  competitionLevel: SignalLevel;
  monetizationPotential: SignalLevel;
  confidence: number;
}

export interface GenerateRequest {
  prompt: string;
  productType?: string;
  difficulty?: string;
}

export interface GenerateResponse {
  marketContext: MarketContext;
  competitors: Competitor[];
  competitorAnalysis: CompetitorAnalysis[];
  gaps: Gap[];
  ideas: Idea[];
}
