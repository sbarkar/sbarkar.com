![Sergej Barkar CV](https://barkar.ch/preview.png)

# Sergej Barkar - Personal CV Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsbarkar%2Fbarkar.ch)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)

A minimalist, print-friendly CV website showcasing my professional experience, projects, and skills. Built with modern web technologies and optimized for performance.

🌐 **Live Site:** [barkar.ch](https://barkar.ch)

## 🚀 Features

- **Single Config File**: All content managed through [`src/data/resume-data.tsx`](./src/data/resume-data.tsx)
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Performance Optimized**:
  - Server-side rendering with Next.js App Router
  - Optimized image handling with AVIF/WebP support
  - Bundle size optimization with package imports
  - Privacy-focused analytics with Plausible
- **Print-Friendly**: Optimized CSS for clean PDF exports
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Command Menu**: Quick navigation with `⌘J` / `Ctrl+J`
- **SEO Optimized**: Full meta tags, OpenGraph, Twitter Cards, sitemap
- **Accessibility**: Built with Radix UI primitives

## 🛠️ Tech Stack

### Core

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)

### Dependencies

- **UI Components**: Radix UI (Avatar, Dialog, Slot)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Command Menu**: cmdk
- **Drawer**: vaul

### Development & Analytics

- **Linting**: ESLint 9 with Next.js config
- **Formatting**: Prettier 3.6 with Tailwind CSS plugin
- **Package Manager**: Yarn 1.22.22
- **Analytics**: Plausible Analytics via CDN script (privacy-focused)

## 📦 Getting Started Locally

### Prerequisites

- Node.js 20 or higher
- Yarn 1.22.22

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sbarkar/barkar.ch.git
   cd barkar.ch
   ```

2. **Install dependencies:**

   ```bash
   yarn install --frozen-lockfile
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Edit your content:**
   Modify [`src/data/resume-data.tsx`](./src/data/resume-data.tsx) to customize the CV with your information

### Available Scripts

```bash
yarn dev      # Start development server on localhost:3000
yarn build    # Create production build
yarn start    # Start production server
yarn lint     # Run ESLint
```

## 🐳 Docker Deployment

Build and run the application using Docker:

```bash
# Build the container
docker compose build

# Run the container
docker compose up -d

# Stop the container
docker compose down
```

The application will be available at http://localhost:3000

## 📁 Project Structure

```
barkar.ch/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Main CV page
│   │   ├── globals.css        # Global styles
│   │   ├── favicon.ico        # Site favicon
│   │   └── apple-icon.png     # Apple touch icon
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui primitives
│   │   ├── icons/            # Custom icon components
│   │   ├── command-menu.tsx  # Command palette
│   │   ├── project-card.tsx  # Project display card
│   │   └── print-drawer.tsx  # Print functionality
│   ├── data/
│   │   └── resume-data.tsx   # CV content (single source of truth)
│   ├── images/
│   │   └── logos/            # Company/project logos
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                    # Static assets
│   ├── preview.png           # OpenGraph image
│   ├── sitemap.xml           # SEO sitemap
│   ├── robots.txt            # Search engine directives
│   └── manifest.json         # PWA manifest
├── .github/
│   ├── workflows/            # CI/CD pipelines
│   └── copilot-instructions.md  # AI agent instructions
└── docs/                     # Documentation
```

## 🎨 Customization Guide

### Updating Your Information

Edit [`src/data/resume-data.tsx`](./src/data/resume-data.tsx):

```typescript
export const RESUME_DATA = {
  name: "Your Name",
  initials: "YN",
  location: "Your Location",
  about: "Your tagline",
  summary: "Your professional summary",
  avatarUrl: "https://your-avatar-url.com/image.jpg",
  personalWebsiteUrl: "https://yoursite.com",
  contact: {
    email: "you@example.com",
    tel: "+1234567890",
    social: [
      /* your social links */
    ],
  },
  work: [
    /* your work experience */
  ],
  education: [
    /* your education */
  ],
  skills: [
    /* your skills */
  ],
  projects: [
    /* your projects */
  ],
  // ...
};
```

### Adding a New Project

```typescript
{
  title: "Project Name",
  techStack: ["Next.js", "TypeScript", "PostgreSQL"],
  description: "Brief project description",
  link: {
    label: "github.com",
    href: "https://github.com/username/repo",
  },
}
```

### Modifying Styles

- **Global styles**: Edit `src/app/globals.css`
- **Theme colors**: Modify CSS variables in `@theme` block
- **Component styles**: Use Tailwind classes inline or extend in `tailwind.config.js`

## 🔧 Troubleshooting

### Build Issues

**Google Fonts Error**: If you encounter font loading errors in CI/CD:

- The build uses Google Fonts which may be blocked in some environments
- Consider using local font files or system fonts as fallback

**Type Errors**: Ensure TypeScript is up to date:

```bash
yarn add -D typescript@latest
```

### Development Issues

**Port Already in Use**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**CSS Not Updating**: Restart the dev server to clear Tailwind cache:

```bash
# Stop the server and restart
yarn dev
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure build settings (auto-detected)
4. Deploy!

Configuration is managed in [`vercel.json`](./vercel.json).

### Self-Hosting

Build and run the production server:

```bash
yarn build
yarn start
```

Or use Docker:

```bash
docker compose up -d
```

## 🔄 Automated Maintenance

This repository uses automated workflows to keep dependencies up-to-date:

### Dependabot Auto-Merge

- **Daily dependency updates**: Dependabot checks for updates every day
- **Automatic merging**: PRs are auto-approved and merged after CI passes
- **Grouped updates**: Minor and patch updates are grouped to reduce PR volume
- **Quality assurance**: All updates validated by CI (build + lint) before merge

This ensures the project always uses the latest secure and stable dependencies without manual intervention.

For detailed setup instructions and configuration, see:

- [Dependabot Auto-Merge Setup Guide](./docs/DEPENDABOT_AUTOMERGE_SETUP.md)
- [GitHub Automation README](./.github/README.md)

### CI/CD Pipelines

- **CI Workflow** (`ci.yml`): Runs on every PR - builds, type-checks, and lints
- **Deploy Workflow** (`deploy.yml`): Deploys to GitHub Pages on main branch updates
- **Auto-Merge Workflow** (`dependabot-automerge.yml`): Handles Dependabot PR automation

All workflows use Yarn with frozen lockfiles for deterministic builds.

## 🤝 Contributing

This is a personal CV website, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure:

- Code follows existing style (run `yarn lint`)
- All changes are tested locally
- PR description clearly explains the changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original CV template inspiration from [Bartosz Jarocki](https://github.com/BartoszJarocki/cv)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Built with ❤️ by Sergej Barkar**

🌐 [barkar.ch](https://barkar.ch) • 💼 [LinkedIn](https://www.linkedin.com/in/sbarkar/) • 🐦 [Twitter](https://twitter.com/sbarkar_) • 💻 [GitHub](https://github.com/sbarkar)
