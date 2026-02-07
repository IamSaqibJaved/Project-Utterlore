# UtterLore CMS Server

NestJS Backend API for the UtterLore CMS. Provides generic APIs for managing page content, schemas, media, and settings.

## Features

- **Generic Page API**: CRUD operations for any page content
- **Schema API**: Serve page schemas to admin and frontend
- **Media API**: File upload and management
- **Settings API**: CMS configuration management
- **Swagger Documentation**: Auto-generated API docs
- **CORS Support**: Configured for frontend and admin access

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd cms/server
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3002
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
API_PREFIX=api
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

### Running

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

Base URL: `http://localhost:3002/api`

### Pages

| Method | Endpoint                             | Description          |
| ------ | ------------------------------------ | -------------------- |
| GET    | `/pages`                             | Get all pages        |
| GET    | `/pages/:id`                         | Get page by ID       |
| GET    | `/pages/by-slug?slug=/about`         | Get page by URL slug |
| POST   | `/pages`                             | Create new page      |
| PUT    | `/pages/:id`                         | Update page          |
| DELETE | `/pages/:id`                         | Delete page          |
| GET    | `/pages/:pageId/sections/:sectionId` | Get specific section |
| PATCH  | `/pages/:pageId/sections/:sectionId` | Update section       |
| PUT    | `/pages/:pageId/sections/reorder`    | Reorder sections     |

### Schemas

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/schemas`                     | Get all page schemas    |
| GET    | `/schemas/:id`                 | Get schema by ID        |
| GET    | `/schemas/by-slug?slug=/about` | Get schema by page slug |
| POST   | `/schemas`                     | Create new schema       |
| PUT    | `/schemas/:id`                 | Update schema           |
| DELETE | `/schemas/:id`                 | Delete schema           |

### Media

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/media`                 | Get all media files   |
| GET    | `/media/:id`             | Get file by ID        |
| GET    | `/media/stats`           | Get media statistics  |
| POST   | `/media/upload`          | Upload single file    |
| POST   | `/media/upload/multiple` | Upload multiple files |
| PUT    | `/media/:id`             | Update file metadata  |
| DELETE | `/media/:id`             | Delete file           |
| GET    | `/media/folders/list`    | Get all folders       |
| POST   | `/media/folders`         | Create folder         |
| DELETE | `/media/folders/:path`   | Delete folder         |

### Settings

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/settings`       | Get CMS settings  |
| PUT    | `/settings`       | Update settings   |
| POST   | `/settings/reset` | Reset to defaults |

## Swagger Documentation

Access the interactive API documentation at:
`http://localhost:3002/docs`

## Project Structure

```
src/
├── common/
│   ├── dto/           # Data Transfer Objects
│   └── types/         # TypeScript type definitions
├── modules/
│   ├── pages/         # Page content management
│   ├── schemas/       # Page schema definitions
│   ├── media/         # Media file management
│   └── settings/      # CMS settings
├── app.module.ts      # Main application module
└── main.ts            # Application entry point
```

## Integration with Admin & Frontend

### Admin (port 3001)

The admin dashboard connects to this API to:

- Load page schemas for form generation
- Save/load page content
- Manage media files
- Configure CMS settings

### Frontend (port 3000)

The frontend connects to fetch:

- Page content by slug
- Media files
- Site settings

## Future Enhancements

- [ ] Database persistence with Prisma
- [ ] Authentication & authorization
- [ ] Content versioning
- [ ] Scheduled publishing
- [ ] Webhooks for content changes
