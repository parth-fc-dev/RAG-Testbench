# Page Components Structure Guide

This document explains the page components organization for easy management and scalability.

## Directory Structure

```
src/
├── app/                      # Next.js App Router (route definitions)
│   ├── page.tsx             # Home route - imports HomePage from /pageComponents
│   ├── about/
│   │   └── page.tsx         # About route - imports AboutPage from /pageComponents
│   ├── services/
│   │   └── page.tsx         # Services route - imports ServicesPage from /pageComponents
│   ├── contact/
│   │   └── page.tsx         # Contact route - imports ContactPage from /pageComponents
│   └── ...
├── pageComponents/           # Page components (business logic & UI)
│   ├── HomePage.tsx         # Home page component
│   ├── AboutPage.tsx        # About page component
│   ├── ServicesPage.tsx     # Services page component
│   ├── ContactPage.tsx      # Contact page component
│   └── index.ts             # Barrel export for easy imports
├── components/               # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── index.ts
└── ...
```

## How It Works

### App Router (`src/app/`)

- Defines the URL routes using Next.js App Router conventions
- Each route file (`page.tsx`) is minimal and only imports the page component
- This keeps routes organized and decoupled from implementation

### Page Components Folder (`src/pageComponents/`)

- Contains the actual page component implementations
- Follows naming convention: `PageName + "Page"` suffix (e.g., `HomePage.tsx`)
- Exported via `index.ts` for clean imports: `import { HomePage } from "@/pageComponents"`
- Easy to locate, update, and test page logic

## Adding a New Page

### Step 1: Create the page component

Create a new file in `src/pageComponents/` (e.g., `BlogPage.tsx`):

```typescript
// src/pageComponents/BlogPage.tsx
import { Header, Button } from "@/components";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white p-24">
        <h1 className="text-4xl font-bold text-black mb-6">Blog</h1>
        {/* Your blog content here */}
      </main>
    </>
  );
}
```

### Step 2: Export from index.ts

Add the export to `src/pageComponents/index.ts`:

```typescript
export { default as BlogPage } from "./BlogPage";
```

### Step 3: Create the route

Create `src/app/blog/page.tsx`:

```typescript
import { BlogPage } from "@/pageComponents";

export default BlogPage;
```

That's it! Your new page is now accessible at `/blog`.

## Benefits

✅ **Separation of Concerns** - Routes (app) separate from components (pageComponents)
✅ **Easy to Scale** - Add new pages without cluttering route files
✅ **Better Organization** - All page logic in one dedicated folder
✅ **Maintainability** - Find and update pages quickly
✅ **Consistency** - Follows predictable naming patterns
✅ **Clean Imports** - Use barrel export for consistent imports across the app
✅ **No Router Conflicts** - Avoids Next.js pages/ vs app/ router conflicts

## Best Practices

- Keep route files (`src/app/*/page.tsx`) minimal and only as imports
- All page logic goes in `src/pageComponents/`
- Use consistent naming: `PageNamePage.tsx`
- Export all pages from `src/pageComponents/index.ts`
- Group related pages using subfolders if needed
- Use `"use client"` directive in pageComponent files if needed (not in routes)
