/**
 * Design system tokens for Akash Kumar Developer Portfolio
 * Creative-Modern theme: Deep charcoal/navy canvas, off-white text, electric violet/blue accents.
 */

export const tokens = {
  colors: {
    canvas: {
      base: "#0a0d14", // Deep charcoal-navy background
      subtle: "#0f1420", // Slightly elevated section
      card: "#131926", // Card surface
      overlay: "#192233", // Elevated popover / hover surface
      contrast: "#f8fafc", // High-contrast light section for editorial emphasis
      contrastSubtle: "#f1f5f9", // Subtle light card surface
    },
    text: {
      primary: "#f8fafc", // Crisp off-white
      secondary: "#94a3b8", // Slate muted secondary
      tertiary: "#64748b", // Subtle tertiary text
      contrastPrimary: "#0f172a", // Deep slate for light surfaces
      contrastSecondary: "#475569", // Slate muted for light surfaces
    },
    accent: {
      violet: "#6366f1", // Electric violet / indigo
      violetHover: "#4f46e5",
      violetLight: "#818cf8",
      blue: "#3b82f6", // Electric blue
      blueHover: "#2563eb",
      emerald: "#10b981", // Available / success indicator
      amber: "#f59e0b", // Achievement / distinction indicator
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.08)",
      medium: "rgba(255, 255, 255, 0.16)",
      accent: "rgba(99, 102, 241, 0.35)",
      contrast: "rgba(15, 23, 42, 0.12)",
    },
  },
  radius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },
  typography: {
    fontSans: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  },
} as const;
