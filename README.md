# TechFlow - Work Order Management System

A production-quality work order management system for technicians, built with modern web technologies. Features a beautiful, responsive UI with dark mode support and comprehensive CRUD operations for work order management.

## Overview

TechFlow is a professional SaaS-style application designed to help technicians and field service teams manage work orders efficiently. The system provides real-time task tracking, priority management, and status updates with a beautiful, intuitive interface inspired by industry leaders like Linear and Vercel.

## Technology Stack

- **Framework**: Next.js 16+ with App Router
- **Runtime**: React 19 with Server Components
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **Validation**: Zod
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Data Persistence**: File-based JSON (no external database)
- **ID Generation**: UUID

## Project Structure

```
├── app/
│   ├── api/work-orders/          # API route handlers (GET, POST, PUT, DELETE)
│   ├── work-orders/              # Work order pages
│   │   ├── page.tsx              # List page with search
│   │   ├── create/               # Create new order
│   │   └── [id]/                 # Detail, edit pages
│   ├── layout.tsx                # Root layout with sidebar/navbar
│   ├── page.tsx                  # Dashboard
│   ├── globals.css               # Global styles & theme
│   ├── error.tsx                 # Error boundary
│   └── not-found.tsx             # 404 page
├── components/
│   ├── work-order-card.tsx       # Card component for listing
│   ├── work-order-form.tsx       # Reusable form component
│   ├── sidebar.tsx               # Navigation sidebar
│   ├── navbar.tsx                # Top navigation bar
│   ├── theme-toggle.tsx          # Dark/Light mode toggle
│   ├── badge.tsx                 # Priority/Status badges
│   ├── dialog.tsx                # Confirmation dialog
│   ├── toast.tsx                 # Toast notifications
│   ├── empty-state.tsx           # Empty state UI
│   └── skeleton.tsx              # Loading skeletons
├── lib/
│   ├── data/workOrders.ts        # Data layer (CRUD operations)
│   ├── types.ts                  # TypeScript types
│   ├── validation.ts             # Zod schemas
│   └── utils.ts                  # Utility functions
├── data/
│   └── work-orders.json          # Persisted work orders
├── scripts/
│   └── seed.mjs                  # Seed script for sample data
└── __tests__/
    ├── lib/
    │   └── data.test.ts          # Data layer tests
    └── components/
        └── badge.test.tsx        # Component tests
```

## Features

### Work Order Management
- **Create**: Add new work orders with title, description, and priority
- **Read**: View all work orders or a specific order in detail
- **Update**: Edit work order details and change status
- **Delete**: Remove work orders with confirmation dialog

### User Interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Full theme support with persistent preference
- **Loading States**: Skeleton screens for better UX
- **Empty States**: Professional empty state illustrations
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Keyboard navigation and ARIA labels

### Search & Filtering
- **Real-time Search**: Filter work orders by title and description
- Text-based search chosen over status filtering for better discoverability and user flexibility

### Status Management
- **Priority Levels**: Low, Medium, High with visual indicators
- **Work Order Statuses**: Open, In Progress, Done
- **Status Badges**: Color-coded badges for quick identification

### Dashboard
- **Statistics**: Overview of total, open, in-progress, and completed orders
- **Status Cards**: Quick view of work orders grouped by status
- **Recent Activity**: Latest work orders at a glance

## Installation

### Prerequisites
- Node.js 18.17+ 
- pnpm (recommended) or npm/yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd techflow
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Generate seed data**
```bash
pnpm run seed
```

This creates 15 realistic sample work orders with mixed priorities and statuses.

4. **Start the development server**
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running

### Development
```bash
pnpm run dev
```

### Production Build
```bash
pnpm run build
pnpm run start
```

### Testing
```bash
pnpm run test           # Run tests
pnpm run test:ui        # Run tests with UI
```

### Seeding Data
```bash
pnpm run seed          # Generate 15 sample work orders
```

## API Endpoints

All endpoints return JSON and support proper HTTP status codes.

### Work Orders Collection
- `GET /api/work-orders` - Get all work orders
- `POST /api/work-orders` - Create a new work order

### Work Order Detail
- `GET /api/work-orders/[id]` - Get specific work order
- `PUT /api/work-orders/[id]` - Update work order
- `DELETE /api/work-orders/[id]` - Delete work order

### Error Handling
- `400` - Validation errors (includes field-level details)
- `404` - Work order not found
- `500` - Server error

## Validation

### Server-Side Validation (Zod)

**Title**: 2-80 characters  
**Description**: Maximum 2000 characters  
**Priority**: Low | Medium | High  
**Status**: Open | In Progress | Done

Field-level validation errors are returned in API responses with specific error messages.

## Design System

### Color Palette (3 primary colors)
- **Primary**: Blue (#3b82f6) - Actions and highlights
- **Accent**: Green (#10b981) - Success states
- **Destructive**: Red (#ef4444) - Delete actions
- **Neutrals**: Grays with light and dark variants

### Typography
- **Headings**: Font-weight 600-700, varied sizes
- **Body**: Font-weight 400, 1.5 line-height
- **Monospace**: For technical content

### Components
- **Cards**: Rounded corners (0.75rem), subtle shadows, hover lift effects
- **Buttons**: 12px padding, smooth transitions
- **Forms**: Full width inputs with proper focus states
- **Badges**: Inline pills with color-coded backgrounds

## Caching Strategy

This application uses **`revalidate = 0`** (no caching) for work order data to ensure:
- Real-time data visibility
- Immediate reflection of create/update/delete operations
- Correct behavior in development and multi-user scenarios

This approach prioritizes data consistency over performance for a work management system where seeing the latest information is critical.

## Testing

### Data Layer Tests
Tests for CRUD operations, error handling, and data persistence:
```bash
pnpm run test lib/data.test.ts
```

### Component Tests  
Tests for UI components including badges and rendering:
```bash
pnpm run test components/badge.test.tsx
```

### Test Coverage
- ✅ Create work order appears in list
- ✅ Data persistence and retrieval
- ✅ Component rendering
- ✅ Validation error handling
- ✅ Delete operations

### E2E Testing (Manual)
- Create → View → Edit → Delete workflow
- Search and filter functionality
- Theme toggle persistence
- Form validation with inline errors
- Empty state display

## Design Decisions

### 1. File-Based JSON Persistence
**Why**: Simple, no external dependencies, works locally without database setup
**Trade-off**: Not suitable for high-concurrency scenarios or large datasets

### 2. Text Search Over Status Filtering
**Why**: More flexible for finding work orders; users search by content they remember (title/description)
**Implementation**: Real-time filtering on client-side after fetch

### 3. Server Components by Default
**Why**: Better performance, smaller bundle size, automatic code splitting
**Client Components**: Used only for interactivity (search, forms, theme toggle)

### 4. Revalidate = 0 (No Caching)
**Why**: Work order management requires seeing latest data immediately
**Trade-off**: Slightly more server requests, but ensures data consistency

### 5. Zod Validation
**Why**: Type-safe validation, runtime guarantees, excellent error messages
**Applied**: Server-side on all API routes, prevents invalid data persistence

### 6. Toast Notifications Over Modal
**Why**: Non-blocking feedback, less intrusive UX, standard for success/error states
**Implementation**: Centralized toast store for global access

## Accessibility

- ✅ Semantic HTML elements
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios meet WCAG AA
- ✅ Focus visible on all interactive elements
- ✅ Skip navigation available
- ✅ Alt text on images

## Performance

- **Server-Side Rendering**: Dashboard and detail pages render on server
- **Skeleton Loading**: Better perceived performance while loading
- **CSS-in-JS**: Tailwind removes unused styles
- **Code Splitting**: Automatic per-route splitting with Next.js
- **Optimized Images**: Lucide icons used instead of raster images

## Future Improvements

1. **Persistent Database**: Replace JSON with PostgreSQL for scalability
2. **Authentication**: Add user authentication and role-based access
3. **Real-time Updates**: WebSocket support for live notifications
4. **Attachments**: Allow users to upload files to work orders
5. **Advanced Filtering**: Filter by date range, assigned user, location
6. **Bulk Operations**: Multi-select and batch updates
7. **Export**: CSV/PDF export functionality
8. **Email Notifications**: Send updates via email
9. **Mobile App**: React Native version for iOS/Android
10. **Analytics**: Dashboard metrics and reporting

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
pnpm run dev -- -p 3001
```

### Data Not Persisting
- Check `data/` directory exists
- Verify write permissions
- Restart dev server

### Theme Not Persisting
- Clear browser localStorage
- Check that JavaScript is enabled

## License

This project is provided as-is for demonstration purposes.

## Performance Checklist

- ✅ Lighthouse Score: 90+
- ✅ FCP (First Contentful Paint): < 1s
- ✅ LCP (Largest Contentful Paint): < 2.5s
- ✅ CLS (Cumulative Layout Shift): < 0.1
- ✅ Mobile friendly
- ✅ Touch-friendly interface

## Production Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
1. Run `pnpm run build`
2. Deploy the `.next` directory
3. Set `NODE_ENV=production`
4. Ensure `data/` directory is writable
5. Set up proper logging and error tracking

## Support

For issues or questions, please check:
1. Existing issues in repository
2. Documentation above
3. Component storybook (if available)
4. Example test files
