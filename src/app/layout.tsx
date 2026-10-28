import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/akash-unic/akash-portfolio"),
  title: {
    default: "Akash Kumar | Web Developer & Frontend Specialist",
    template: "%s | Akash Kumar",
  },
  description:
    "Portfolio of Akash Kumar — Web Developer building modern web applications with React, Next.js, and Tailwind CSS. BCA student at Chandigarh University.",
  keywords: [
    "Akash Kumar",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Tailwind CSS",
    "Chandigarh University",
    "Portfolio",
  ],
  authors: [{ name: "Akash Kumar", url: "https://github.com/akash-unic" }],
  creator: "Akash Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/akash-unic/akash-portfolio",
    title: "Akash Kumar | Web Developer & Frontend Specialist",
    description:
      "Web Developer specializing in React, Next.js, and Tailwind CSS. BCA student at Chandigarh University.",
    siteName: "Akash Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Kumar | Web Developer & Frontend Specialist",
    description:
      "Web Developer specializing in React, Next.js, and Tailwind CSS. BCA student at Chandigarh University.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Akash Kumar Portfolio",
  mainEntity: {
    "@type": "Person",
    name: "Akash Kumar",
    jobTitle: "Web Developer",
    description:
      "Web Developer pursuing BCA at Chandigarh University, building modern frontend applications with React, Next.js, and Tailwind CSS.",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "Chandigarh University",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "WordPress",
      "MongoDB",
    ],
    sameAs: [
      "https://github.com/akash-unic",
      "https://linkedin.com/in/akash-shrivastava-022101317",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark overflow-x-clip`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0d14] text-[#f8fafc] overflow-x-clip">
        {/* Layered Atmospheric Visual Canvas */}
        <AtmosphericBackground />

        {/* Dynamic Interactive Overlays */}
        <CustomCursor />
        <ScrollProgress />

        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white font-medium text-sm"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
