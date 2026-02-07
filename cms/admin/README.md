# UtterLore CMS Admin

A custom headless CMS built with Next.js 15, TypeScript, and shadcn/ui components. This CMS provides full control over frontend content and layout data.

## Features

- **Schema-Driven Design**: Pages and forms are auto-generated from schema definitions
- **Section-Based Editing**: Enable/disable and reorder page sections
- **Rich Field Types**: Text, textarea, rich text, images, arrays, objects, and more
- **Clean Admin UI**: Built with shadcn/ui (Radix UI primitives) and Tailwind CSS
- **Mock Data Layer**: Easily replaceable with real API/database

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd cms/admin
npm install
```

### Development

```bash
npm run dev
```

The CMS admin will run on [http://localhost:3001](http://localhost:3001)

## Project Structure

```
cms/admin/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── layout.tsx         # Root layout with AdminLayout
│   ├── pages/             # Page editors
│   │   ├── landing/       # Landing page editor
│   │   └── about/         # About page editor
│   ├── content-types/     # Content type management
│   ├── media/             # Media library
│   └── settings/          # CMS settings
├── components/
│   ├── forms/             # Schema-driven form components
│   │   ├── FormRenderer.tsx   # Renders forms from field definitions
│   │   └── PageEditor.tsx     # Full page editor with sections
│   ├── layout/            # Layout components
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── ui/                # shadcn/ui components
├── schemas/               # Page schema definitions
│   ├── index.ts           # Schema registry
│   ├── landing.ts         # Landing page schema
│   └── about.ts           # About page schema
├── types/                 # TypeScript type definitions
│   ├── schema.ts          # Schema & field types
│   └── content.ts         # Content data types
├── data/                  # Mock data storage
│   └── mockData.ts        # Initial content data
├── store/                 # State management (Zustand)
│   └── index.ts           # Page content & UI stores
└── lib/                   # Utilities
    ├── utils.ts           # Helper functions
    └── dataService.ts     # Data abstraction layer
```

## Schema-Driven Architecture

### Page Schema

Each page is defined by a schema that specifies:

- Page metadata (name, slug, description)
- Sections with field definitions
- Settings for reordering and toggling

```typescript
const landingPageSchema: PageSchema = {
  id: "landing-page",
  name: "Landing Page",
  slug: "/",
  sections: [
    {
      id: "hero",
      name: "Hero Section",
      fields: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        // ...
      ],
    },
  ],
};
```

### Field Types

| Type       | Description             |
| ---------- | ----------------------- |
| `text`     | Single line text input  |
| `textarea` | Multi-line text         |
| `richtext` | Rich text editor        |
| `number`   | Numeric input           |
| `boolean`  | Toggle switch           |
| `select`   | Dropdown selection      |
| `image`    | Single image picker     |
| `images`   | Multiple images         |
| `color`    | Color picker            |
| `url`      | URL input               |
| `array`    | List of items           |
| `object`   | Nested object           |
| `group`    | Collapsible field group |

## Adding New Pages

1. Create a schema in `schemas/`:

```typescript
// schemas/newpage.ts
export const newPageSchema: PageSchema = {
  id: "new-page",
  name: "New Page",
  slug: "/new",
  sections: [
    /* ... */
  ],
};
```

2. Register in `schemas/index.ts`:

```typescript
import { newPageSchema } from "./newpage";
export const pageSchemas = [landingPageSchema, aboutPageSchema, newPageSchema];
```

3. Add mock data in `data/mockData.ts`

4. Create editor page in `app/pages/newpage/page.tsx`

5. Add navigation in `schemas/index.ts` navigationConfig

## Data Layer

The CMS uses a `DataService` abstraction that currently works with mock JSON data. To integrate with a real API:

1. Implement the `DataService` interface in `lib/dataService.ts`
2. Connect to your database/API
3. Export the new service as `dataService`

```typescript
// Example API implementation
class APIDataService implements DataService {
  async getPageContent(pageId: string) {
    const response = await fetch(`/api/pages/${pageId}`);
    return response.json();
  }
  // ...
}
```

## Frontend Integration

Export page content as JSON for the frontend:

```typescript
import { dataService } from "@/lib/dataService";

// Get frontend-ready JSON
const json = await dataService.exportPageContent("landing-page");
```

The exported JSON can be consumed by the frontend application via:

- API endpoints
- Static JSON files
- Database queries

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## License

Private - UtterLore
