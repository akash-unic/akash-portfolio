# Akash Kumar — Developer Portfolio

A creative-modern, high-performance developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## Profile Overview

* **Developer**: Akash Kumar
* **Role**: Web Developer
* **Education**: Bachelor of Computer Applications (BCA), 3rd Semester — Chandigarh University
* **Target Roles**: Junior Web Developer positions, Frontend Engineering Internships, and Freelance projects
* **Verified Credentials**: NCC 'A' and 'B' Certificates (National Cadet Corps)
* **GitHub**: [https://github.com/akash-unic](https://github.com/akash-unic)
* **LinkedIn**: [https://linkedin.com/in/akash-shrivastava-022101317](https://linkedin.com/in/akash-shrivastava-022101317)
* **Direct Email**: [mrakashkumar77@gmail.com](mailto:mrakashkumar77@gmail.com)

---

## Featured Real-World Projects

1. **MikuMantra** — [https://mikumantra.com](https://mikumantra.com)
   * Alternate Vercel Cloud Mirror: [https://miku-mantra.vercel.app](https://miku-mantra.vercel.app)
   * Repository: [https://github.com/psdtowui-dot/Miku-Mantra](https://github.com/psdtowui-dot/Miku-Mantra)
   * Contribution: Frontend architecture, product catalog layout, cart drawer interactions, and responsive design.
2. **PSD2UI** — [https://psd2ui.com](https://psd2ui.com)
   * Repository: [https://github.com/unic-kamini/psd2ui](https://github.com/unic-kamini/psd2ui)
   * Contribution: Frontend page structure, responsive stylesheet maintenance, and quote order flow.

---

## Technical Stack & Architecture

* **Framework**: Next.js 16 (App Router with Turbopack bundler)
* **Library**: React 19
* **Language**: TypeScript 5 (Strict mode)
* **Styling**: Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
* **Icons**: Handcrafted precision SVGs & Lucide React
* **Accessibility**: Full keyboard tab navigation, skip-to-content link, WCAG AA/AAA contrast ratios, native `prefers-reduced-motion` reset
* **SEO**: Search engine `robots.txt`, dynamic `sitemap.xml`, OpenGraph tags, and semantic JSON-LD structured data

---

## Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js 20+** installed:
```bash
node -v   # Should output v20.x or higher
npm -v    # Should output 10.x or higher
```

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/akash-unic/akash-portfolio.git
cd akash-portfolio
npm install
```

### 3. Local Development Server
Start the local Next.js dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification & Build Commands

Run the full automated verification suite:

```bash
# Type check without emitting files
npx tsc --noEmit

# Run ESLint ruleset
npm run lint

# Build optimized production bundle
npm run build

# Start production server locally
npm run start
```

---

## Deployment to Vercel

This project is pre-configured for zero-configuration deployment on **Vercel**:

1. Push your commits to GitHub on the `main` branch:
   ```bash
   git add .
   git commit -m "feat: release akash kumar developer portfolio"
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) with your GitHub account.
3. Click **Add New... $\rightarrow$ Project** and import `akash-portfolio`.
4. Framework Preset will auto-detect as **Next.js**.
5. Build and Output Settings:
   * Build Command: `next build` (Default)
   * Output Directory: `.next` (Default)
   * Install Command: `npm install` (Default)
6. Click **Deploy**. Vercel will build and assign your live production URL.

---

## License

© 2026 Akash Kumar. All rights reserved.
