# Personal Website

A modern, responsive personal website built with Next.js 15, TypeScript, and Tailwind CSS. This website features a clean design with multiple sections including About, Projects, Blog, and Games.

## Features

- **About Page**: Personal introduction, skills, and contact information
- **Projects Page**: Showcase of development projects with filtering
- **Blog Page**: Blog posts with search and category filtering
- **Games Page**: Interactive games and projects with difficulty levels
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional design with smooth transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx          # Home/About page
│   ├── projects/         # Projects page
│   ├── blog/            # Blog page
│   ├── games/           # Games page
│   ├── layout.tsx       # Root layout with navigation
│   └── globals.css      # Global styles
├── components/           # Reusable components
│   └── Navigation.tsx   # Main navigation component
```

## Customization

### Personal Information

Update the following files with your information:

1. **Navigation**: Edit `src/components/Navigation.tsx` to change your name
2. **About Page**: Modify `src/app/page.tsx` with your personal details
3. **Projects**: Update the projects array in `src/app/projects/page.tsx`
4. **Blog Posts**: Customize the blog posts in `src/app/blog/page.tsx`
5. **Games**: Modify the games in `src/app/games/page.tsx`

### Styling

The website uses Tailwind CSS for styling. You can customize:

- Colors: Modify the color scheme in the Tailwind config
- Typography: Update font sizes and weights
- Layout: Adjust spacing and grid layouts
- Components: Customize individual component styles

### Adding New Pages

To add new pages:

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Update the navigation in `src/components/Navigation.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The website can be deployed to any static hosting platform:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the website, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
