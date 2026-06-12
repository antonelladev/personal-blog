#  Personal Blog Application

Welcome to my personal blog project! This is a modern, responsive, and aesthetically pleasing web application designed to serve as a personal space, digital journal, and portfolio. 

The project was originally designed in Figma, and the interface has been carefully implemented into code using a robust and scalable frontend development architecture.

##  Technical Stack & Features

- **Fast Build Tooling:** Powered by **Vite** for an ultra-fast development environment and optimized production builds.
- **Monorepo Architecture:** Structured using **pnpm workspaces** (`pnpm-workspace.yaml`) for clean dependency management and modular organization.
- **Modern Styling:** Integrated with **PostCSS** and a custom theme configuration inspired by modern design systems (`default_shadcn_theme.css`), ensuring a beautiful, desaturated soft-pastel palette.
- **Clean Layout:** A fixed dynamic sidebar featuring profile details, integrated social media links, and custom routing pages (Anime List, Movies, Shows, Wish List, Journal), paired with a fluid main chronological feed for posts.

## 📂 Project Structure

```text
personal-blog/
├── guidelines/            # Documentation and design guidelines
├── src/                  # Application source code (components, pages, assets)
├── index.html            # Main HTML entry point
├── package.json          # Project dependencies and scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── postcss.config.mjs    # PostCSS styles pipeline configuration
└── vite.config.ts        # Vite configuration with TypeScript support
