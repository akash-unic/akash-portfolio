import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Akash Kumar",
    role: "Web Developer",
    headline: "I build modern digital experiences.",
    bio: "I'm Akash Kumar, a web developer exploring modern frontend technologies and building responsive web experiences through real-world projects.",
    educationSummary: "BCA, 3rd Semester — Chandigarh University",
    goalsSummary: "Open to full-time junior developer roles, internships, and freelance client engagements.",
    availability: "Available for internships, roles & freelance",
    email: "mrakashkumar77@gmail.com",
    location: "India",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    {
      platform: "GitHub",
      label: "akash-unic",
      url: "https://github.com/akash-unic",
    },
    {
      platform: "LinkedIn",
      label: "Akash Shrivastava",
      url: "https://linkedin.com/in/akash-shrivastava-022101317",
    },
    {
      platform: "Email",
      label: "mrakashkumar77@gmail.com",
      url: "mailto:mrakashkumar77@gmail.com",
    },
  ],
  projects: [
    {
      id: "mikumantra",
      title: "MikuMantra",
      category: "E-Commerce & Digital Storefront",
      tagline: "Modern e-commerce platform and product catalog built with Next.js and MongoDB.",
      summary:
        "A full-featured digital retail web application featuring dynamic product listings, category filtering, cart management, and responsive consumer interfaces.",
      contributionBadge: "Frontend Architecture & UI Implementation",
      verifiedTechStack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "MongoDB",
        "Radix UI",
        "Vercel",
      ],
      liveUrl: "https://mikumantra.com",
      alternateUrl: "https://miku-mantra.vercel.app",
      repositoryUrl: "https://github.com/psdtowui-dot/Miku-Mantra",
      caseStudy: {
        overview:
          "MikuMantra is an active consumer e-commerce storefront designed to showcase dynamic product lines, provide detailed product views, and deliver a frictionless shopping experience on both mobile devices and desktop screens.",
        problemOrGoal:
          "To engineer a modern, SEO-optimized, and lightning-fast storefront capable of rendering dynamic collections, providing instant catalog filtering, and maintaining state across product discovery and cart workflows.",
        myContribution: [
          "Developed and styled responsive page layouts and components using Next.js App Router and Tailwind CSS.",
          "Implemented frontend views for the homepage showcases, product catalog grid, and shopping cart drawers.",
          "Ensured fluid mobile responsiveness, touch-friendly navigation, and clean component state management.",
          "Assisted with deployment and continuous preview builds on Vercel.",
        ],
        implementationApproach: [
          "Component-driven architecture using accessible Radix UI primitives and utility styling.",
          "Server-side rendering (SSR) and automated revalidation for catalog content.",
          "Image optimization and preloading for high-impact hero banners to avoid layout shifts.",
        ],
        verifiedTechnologies: [
          "Next.js 15 (App Router)",
          "React 18",
          "Tailwind CSS",
          "MongoDB",
          "Radix UI Primitives",
          "Vercel Cloud Deployment",
        ],
        challengesAndSolutions: [
          {
            challenge:
              "Preventing visual layout shifts and slow initial renders on mobile when loading large banner assets.",
            solution:
              "Applied preloaded optimized image URLs, prioritized fetch priority, and set explicit aspect-ratio containers.",
          },
          {
            challenge:
              "Maintaining smooth catalog interactions and quick modal/drawer transitions on mobile screens.",
            solution:
              "Used lightweight Radix UI primitives with tailored CSS transitions to keep UI responsive and accessible.",
          },
        ],
        liveUrl: "https://mikumantra.com",
        alternateDeploymentUrl: "https://miku-mantra.vercel.app",
        repositoryUrl: "https://github.com/psdtowui-dot/Miku-Mantra",
        toConfirmNotes: [
          "Live payment gateway credentials and order fulfillment metrics are maintained in private production environment and omitted to preserve confidentiality.",
        ],
      },
    },
    {
      id: "psd2ui",
      title: "PSD2UI",
      category: "Web Development & Design-to-Code Platform",
      tagline: "Design-to-code service platform showcasing frontend conversion and responsive web solutions.",
      summary:
        "A commercial web services platform offering professional design-to-HTML conversion, responsive styling, and custom frontend engineering for businesses and creative agencies.",
      contributionBadge: "Frontend Page Structure & Styling",
      verifiedTechStack: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "CSS Animations",
      ],
      liveUrl: "https://psd2ui.com",
      repositoryUrl: "https://github.com/unic-kamini/psd2ui",
      caseStudy: {
        overview:
          "PSD2UI is a specialized web solutions portal presenting design-to-HTML conversion capabilities, CMS theming, and responsive front-end engineering services with clear service breakdowns and quote order workflows.",
        problemOrGoal:
          "Provide a clear, structured service showcase that clearly demonstrates conversion precision, mobile responsiveness, fast delivery timelines, and straightforward inquiry forms.",
        myContribution: [
          "Developed and updated responsive page templates including home, services, our work, and order inquiry flows.",
          "Refined CSS stylesheets to ensure cross-browser visual consistency and responsive viewport scaling.",
          "Optimized layout hierarchy, typography contrast, and interactive navigation elements across mobile devices.",
          "Maintained and validated clean semantic markup standards.",
        ],
        implementationApproach: [
          "Structured semantic HTML5 markup for clear document outline and search discoverability.",
          "Custom CSS layout grids and responsive media query breakpoints for mobile, tablet, and desktop.",
          "Interactive client portfolio gallery and service comparison cards.",
        ],
        verifiedTechnologies: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Responsive Layouts",
          "CSS Keyframe Animations",
          "PHP Form Handlers",
        ],
        challengesAndSolutions: [
          {
            challenge:
              "Ensuring multi-tier service packages and comparison tables remained readable without horizontal overflow on mobile screens.",
            solution:
              "Refactored complex tabular presentations into stacked mobile summary cards with dedicated action triggers.",
          },
          {
            challenge:
              "Supporting legacy browser rendering while maintaining clean, modern aesthetic styling.",
            solution:
              "Used progressive enhancement techniques, robust fallback fonts, and cross-browser vendor prefixes.",
          },
        ],
        liveUrl: "https://psd2ui.com",
        repositoryUrl: "https://github.com/unic-kamini/psd2ui",
        toConfirmNotes: [
          "Total historic client order volume and revenue metrics are private agency business data and have been excluded to adhere to strict truthfulness.",
        ],
      },
    },
  ],
  skillCategories: [
    {
      id: "frontend",
      title: "Frontend",
      description: "Core foundational technologies for building structured, dynamic, and accessible user interfaces.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      id: "modern-web",
      title: "Modern Web",
      description: "Modern framework tooling and utility-first styling for fast, production-grade applications.",
      skills: ["Next.js", "Tailwind CSS"],
    },
    {
      id: "cms-data",
      title: "CMS & Data",
      description: "Content management solutions and database systems for data-backed web platforms.",
      skills: ["WordPress", "MongoDB"],
    },
    {
      id: "productivity",
      title: "Productivity",
      description: "Business document processing, structured calculation sheets, and operational workflows.",
      skills: ["Microsoft Excel", "Microsoft Word"],
    },
    {
      id: "additional",
      title: "Additional Skill",
      description: "Accurate, rapid keyboard input for streamlined coding, communications, and data entry.",
      skills: ["Typing"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Chandigarh University",
      status: "Semester 3 (Currently Enrolled)",
      details:
        "Focused study in computer science fundamentals, programming logic, data structures, relational databases, and modern web application development.",
    },
    {
      degree: "Higher Secondary (12th)",
      institution: "Completed",
      status: "Completed",
      details: "Completed higher secondary curriculum with a strong analytical and quantitative foundation.",
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Completed",
      status: "Completed",
      details: "Completed secondary education covering foundational academic sciences, mathematics, and communication.",
    },
  ],
  achievements: [
    {
      title: "NCC 'B' Certificate",
      issuer: "National Cadet Corps",
      description:
        "Earned through rigorous training camps, practical drill discipline, military obstacle courses, and demonstrated squad leadership.",
      badge: "Leadership & Drill Standards",
    },
    {
      title: "NCC 'A' Certificate",
      issuer: "National Cadet Corps",
      description:
        "Completed foundational cadet training emphasizing civic discipline, team cooperation, institutional parades, and community service.",
      badge: "Foundational Cadet Discipline",
    },
  ],
};

export const coreTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "WordPress",
  "MongoDB",
] as const;
