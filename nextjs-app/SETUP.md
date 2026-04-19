# Next.js TypeScript Application with Tailwind CSS and Docker

A modern, production-ready Next.js application built with TypeScript, styled with Tailwind CSS, and containerized with Docker.

## 🚀 Features

- **Next.js 15+** with App Router for file-based routing
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling
- **Docker & Docker Compose** for containerization
- **Multi-page routing** with example pages (Home, About, Services, Contact)
- **ESLint** for code quality
- **Server Components** and client-side forms
- **Responsive Design** with mobile-first approach

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/ (for future components)
├── public/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.js
```

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerized development)

### Installation & Running

1. **Navigate to the project directory:**

   ```bash
   cd nextjs-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📦 Docker Deployment

### Build and Run with Docker Compose

1. **Build and start the container:**

   ```bash
   docker-compose up --build
   ```

2. **Access the application:**

   ```
   http://localhost:3000
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

1. **Build the image:**

   ```bash
   docker build -t nextjs-app:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 nextjs-app:latest
   ```

## 📄 Pages

- **Home** (`/`) - Landing page with navigation and features overview
- **About** (`/about`) - Information about the project
- **Services** (`/services`) - Grid of available services
- **Contact** (`/contact`) - Contact form with form handling

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Tailwind utility classes are used throughout the components for:

- Responsive design (mobile-first)
- Dark mode support (ready to enable)
- Consistent spacing and typography
- Interactive states and transitions

## 📚 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐳 Docker Details

### Dockerfile Architecture

The Dockerfile uses a **multi-stage build**:

1. **Builder stage**: Compiles the Next.js application
2. **Production stage**: Runs the optimized application with minimal image size

### Security Features

- Non-root user (`nextjs`) runs the application
- Minimal Alpine Linux base image
- Health check configured in docker-compose
- Unused files excluded via `.dockerignore`

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Next.js and deploys

### Docker Registry

1. Build and tag the image:

   ```bash
   docker build -t your-registry/nextjs-app:latest .
   ```

2. Push to registry:

   ```bash
   docker push your-registry/nextjs-app:latest
   ```

3. Deploy using your container orchestration platform

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For Docker, update the `environment` section in `docker-compose.yml`.

## 📝 TypeScript Configuration

- Strict mode enabled
- ES2020 target
- Module resolution: node
- Path aliases: `@/*` for `src/` directory

## 🤝 Next Steps

1. Add more pages as needed
2. Create reusable components in `src/components/`
3. Add API routes for backend functionality
4. Integrate a database
5. Add authentication if needed
6. Deploy to your preferred platform

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is open source and available for educational and commercial use.

---

**Happy coding!** 🎉
