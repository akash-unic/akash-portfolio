export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problemOrGoal: string;
  myContribution: string[];
  implementationApproach: string[];
  verifiedTechnologies: string[];
  challengesAndSolutions: ChallengeSolution[];
  liveUrl: string;
  alternateDeploymentUrl?: string;
  repositoryUrl?: string;
  toConfirmNotes?: string[];
}

export interface DetailedProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  contributionBadge: string;
  verifiedTechStack: string[];
  liveUrl: string;
  alternateUrl?: string;
  repositoryUrl?: string;
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  status: string;
  details: string;
}

export interface AchievementItem {
  title: string;
  issuer: string;
  description: string;
  badge: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    headline: string;
    bio: string;
    educationSummary: string;
    goalsSummary: string;
    availability: string;
    email: string;
    location: string;
  };
  navigation: NavItem[];
  socials: SocialLink[];
  projects: DetailedProject[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  achievements: AchievementItem[];
}
