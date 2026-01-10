# VIZA - Project Context for AI Assistants

after all no command is dont try to run any command 
> **Purpose:** This document provides complete context for AI assistants working on the Viza project. Read this first before making any changes.

---

## 📋 PROJECT OVERVIEW

**Name:** Viza Digital  
**Type:** Tech Blog / Magazine Platform  
**Size:** Small-Medium (Full-stack application)  
**Status:** Development → Preparing for production deployment

### What is Viza?
A modern tech blog platform with a bold, magazine-style design. It publishes articles about technology, SaaS, and learning resources with a focus on AI, development roadmaps, and business strategy.

---

## 🏗️ ARCHITECTURE

```
/Viza
├── /client          # Frontend (Next.js 15)
│   ├── /app         # App Router pages
│   ├── /components  # React components
│   ├── /services    # API client (axios)
│   ├── /utils       # Helper functions
│   └── /types.ts    # TypeScript types
│
├── /server          # Backend (Fastify)
│   ├── /src
│   │   ├── /routes      # API endpoints
│   │   ├── /plugins     # Fastify plugins
│   │   ├── /lib         # Core libraries (auth, db)
│   │   ├── /scripts     # Seed scripts
│   │   └── /utils       # Helper functions
│   └── /prisma          # Database schema
│
└── /prompts         # AI context files (this folder)
```

---

## 🛠️ TECH STACK

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.3 | React framework (App Router) |
| React | 19.0.0 | UI library |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 3.4.4 | Styling |
| Axios | 1.7.9 | HTTP client |
| Lucide React | 0.469.0 | Icons |
| React Markdown | 10.1.0 | Markdown rendering |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Fastify | 5.6.2 | Server framework |
| Prisma | 7.2.0 | ORM |
| PostgreSQL | - | Database |
| better-auth | 1.4.9 | Authentication |
| TypeScript | 5.9.3 | Type safety |
| Zod | 4.2.1 | Validation |

### Infrastructure (Planned)
| Service | Purpose |
|---------|---------|
| DigitalOcean Droplet | Single server (client + server + DB) |
| PostgreSQL | Database on same Droplet |
| Nginx | Reverse proxy |
| PM2 | Process manager |
| Let's Encrypt | SSL certificates |

---

## 📊 DATABASE SCHEMA

### Models

```prisma
model User {
  id            String
  name          String
  email         String @unique
  emailVerified Boolean
  image         String?
  sessions      Session[]
  accounts      Account[]
  comments      Comment[]
}

model Post {
  id            String @id @default(cuid())
  slug          String @unique
  title         String
  excerpt       String?
  content       String?       # Markdown content
  category      PostCategory  # Enum: TECH_NEWS, LEARNING, ROAD_MAPS, SAAS
  authorName    String
  authorAvatar  String?
  image         String?       # External URL (not uploaded)
  readingTime   String?
  isFeatured    Boolean @default(false)
  isTrending    Boolean @default(false)
  publishedAt   DateTime?
  comments      Comment[]
}

model Comment {
  id        String
  content   String
  postId    String
  authorId  String
}

enum PostCategory {
  TECH_NEWS
  LEARNING
  ROAD_MAPS
  SAAS
}
```

### Category Mapping
| Enum Value | Display Name |
|------------|--------------|
| TECH_NEWS | "Tech news" |
| LEARNING | "Learning" |
| ROAD_MAPS | "Road maps" |
| SAAS | "SaaS" |

Use `/client/utils/category-mapper.ts` or `/server/src/utils/category-mapper.ts` for conversions.

---

## 🔌 API ENDPOINTS

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:slug` | Get single post by slug |
| POST | `/api/posts` | Create post (requires auth or bypass key) |
| PUT | `/api/posts/:slug` | Update post |
| DELETE | `/api/posts/:slug` | Delete post |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| ALL | `/api/auth/*` | better-auth routes |

### Admin Bypass
For development/seeding, use header: `x-admin-bypass: <key>`

---

## 🎨 DESIGN SYSTEM

### Visual Style
- **Theme:** Bold, magazine-style, editorial design
- **Colors:** Black/white base with dark mode support
- **Typography:** Heavy uppercase headings, clean body text
- **Images:** Full color (no grayscale filters)
- **Animations:** Smooth transitions, hover effects, news ticker

### CSS Variables
```css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --border-color: #000000;
  --accent-color: #f7f7f7;
}

.dark {
  --bg-color: #0a0a0a;
  --text-color: #ffffff;
  --border-color: #333333;
  --accent-color: #1a1a1a;
}
```

### Key CSS Classes
- `.magazine-border-b/t/l/r` - 1px borders
- `.giant-header` - Large responsive headlines
- `.ticker-container` - News ticker animation
- `.animate-ticker` - Scrolling animation

---

## 📁 KEY FILES

### Configuration
- `/server/prisma/schema.prisma` - Database schema
- `/server/package.json` - Server dependencies
- `/client/package.json` - Client dependencies
- `/client/tailwind.config.js` - Tailwind configuration

### Core Components
- `/client/components/Navbar.tsx` - Navigation
- `/client/components/HeroGrid.tsx` - Homepage hero section
- `/client/components/PostCard.tsx` - Article cards
- `/client/components/CategorySilo.tsx` - Category sections
- `/client/components/Sidebar.tsx` - Sidebar with popular posts
- `/client/components/Footer.tsx` - Footer

### Pages
- `/client/app/page.tsx` - Homepage
- `/client/app/article/[slug]/page.tsx` - Article detail
- `/client/app/admin/page.tsx` - Admin panel
- `/client/app/contact/page.tsx` - Contact page

### Services
- `/client/services/api.ts` - API client functions
- `/client/services/auth-client.ts` - Auth client

---

## 🔧 COMMON COMMANDS

### Development
```bash
# Start client (from /client)
npm run dev

# Start server (from /server)
npm run dev

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### Database Seeding
```bash
# From /server directory
npx tsx src/scripts/seed-finance-article.ts
npx tsx src/scripts/seed-digital-asset-article.ts
npx tsx src/scripts/seed-inflation-article.ts
npx tsx src/scripts/seed-ces-article.ts
```

### Building for Production
```bash
# Client
cd client && npm run build

# Server
cd server && npm run build
```

---

## 📝 CONTENT STRATEGY

### Categories
1. **Tech news** - Latest technology updates, industry news
2. **Learning** - Educational content, tutorials, guides
3. **Road maps** - Career paths, learning roadmaps, skill progression
4. **SaaS** - Software as a Service, tools, business

### Article Structure
- Slug: URL-friendly identifier
- Title: Compelling headline
- Excerpt: 1-2 sentence summary
- Content: Full article in Markdown
- Image: External URL (Unsplash, etc.)
- Reading Time: Estimated read time
- Author: Name and avatar URL

### Monetization (Planned)
- Affiliate links within articles
- Digital products (ebooks, courses)
- Newsletter subscriptions

---

## ⚠️ CURRENT ISSUES / TODO

### Blocking Issues
1. **Enum Migration Pending** - PostCategory enum migration needs to be applied
2. **Data Re-seeding** - Posts need to be re-seeded with enum values

### Technical Debt
- [ ] Add health check endpoint for monitoring
- [ ] Remove pino-pretty for production builds
- [ ] Add proper error boundaries in React
- [ ] Implement comment functionality (schema exists, UI pending)
- [ ] Add search functionality
- [ ] Add pagination for posts

### Deployment Preparation
- [ ] Create production environment template
- [ ] Test production builds locally
- [ ] Configure CORS for production domain
- [ ] Set up database backups strategy

---

## 🤖 AI BEHAVIOR RULES

> **IMPORTANT:** These rules define how the AI should respond to different types of requests. Follow them strictly.

---

### ⚡ CORE PRINCIPLE

**Think before you code.** Not every problem needs immediate code. Understanding comes first.

---

### 📋 REQUEST TYPE DETECTION

Before responding, categorize the request:

| Request Type | Keywords/Patterns | Action |
|--------------|-------------------|--------|
| **Architecture** | "how should I structure", "best way to organize", "design pattern for" | EXPLAIN ONLY |
| **System Design** | "how to build", "approach for", "strategy for", "how would you" | EXPLAIN ONLY |
| **Problem Solving** | "how do I handle", "what's the best way", "how to think about" | EXPLAIN ONLY |
| **Comparison** | "should I use A or B", "difference between", "pros and cons" | EXPLAIN ONLY |
| **Implementation** | "create", "build", "add", "implement", "make", "write code for" | WRITE CODE |
| **Bug Fix** | "fix", "error", "not working", "broken", "debug" | WRITE CODE |
| **Refactor** | "refactor", "improve", "optimize", "clean up" | WRITE CODE |

---

### 🚫 WHEN NOT TO WRITE CODE

If the request is about:
- Backend logic design
- System architecture
- Database design
- API design
- Problem-solving approach
- Tradeoffs and decisions
- Best practices inquiry

**AND** no code is explicitly requested...

**→ DO NOT WRITE CODE**

Instead, provide:

1. **Explain the Approach**
   - What is the recommended solution?
   - Why this approach over alternatives?

2. **Describe the Architecture**
   - Use ASCII diagrams when helpful
   - Show data flow and relationships
   - Identify components and their responsibilities

3. **List Implementation Steps**
   - Break down into numbered steps
   - Each step should be actionable
   - Include file paths where relevant

4. **Mention Tradeoffs**
   - What are the pros/cons?
   - When would you choose differently?
   - What are the limitations?

5. **Cover Edge Cases**
   - What could go wrong?
   - How to handle errors?
   - What about scaling?

6. **Suggest Best Practices**
   - Industry standards
   - Security considerations
   - Performance tips

---

### ✅ WHEN TO WRITE CODE

Write code when the user:
- Explicitly says "create", "build", "implement", "add", "write"
- Asks to fix a specific bug
- Requests refactoring of existing code
- Says "go ahead" or "do it" after an explanation
- Provides a clear implementation task

**Examples that NEED code:**
- "Create a new component for X"
- "Add pagination to the posts page"
- "Fix the login error"
- "Implement the search feature"
- "Write a seed script for Y"

---

### 📝 RESPONSE TEMPLATES

#### For Architecture/Design Questions:

```markdown
## Approach

[Brief explanation of the recommended approach]

## Architecture

[ASCII diagram or description]

## Implementation Steps

1. Step one...
2. Step two...
3. Step three...

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| Option A | ... | ... |
| Option B | ... | ... |

## Edge Cases to Consider

- Case 1...
- Case 2...

## Best Practices

- Practice 1...
- Practice 2...

---

Would you like me to implement this? (Yes/No)
```

#### For Implementation Requests:

```markdown
[Brief explanation of what will be done]

[CODE BLOCK]

[Explanation of key decisions made]

[Next steps if any]
```

---

### 🎨 CODE STYLE GUIDELINES

When writing code, follow these conventions:

**TypeScript/JavaScript:**
- Use TypeScript for all new files
- Prefer `const` over `let`
- Use arrow functions for components
- Destructure props and state
- Handle loading and error states always

**React/Next.js:**
- Use functional components with hooks
- Keep components small and focused
- Colocate related logic
- Use proper TypeScript types
- Prefer composition over inheritance

**Styling:**
- Use Tailwind CSS exclusively
- No inline styles
- Follow existing class patterns
- Mobile-first responsive design

**Naming:**
- Components: PascalCase (`PostCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: SCREAMING_SNAKE_CASE
- CSS classes: kebab-case

**File Organization:**
- One component per file
- Group by feature, not type
- Keep related files close

---

### 💬 COMMUNICATION STYLE

- Be concise but complete
- Use tables for comparisons
- Use code blocks for technical terms
- Acknowledge when you're uncertain
- Ask clarifying questions when needed
- Summarize long explanations at the end

---

### 🔄 COMMIT MESSAGE STYLE

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code restructuring
- docs: Documentation
- style: Formatting
- test: Tests
- chore: Maintenance

Examples:
feat(posts): add category filtering
fix(auth): resolve session expiry issue
refactor(api): simplify post fetching logic
docs(readme): update deployment instructions
```

---

## 🌐 ENVIRONMENT VARIABLES

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Server (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/viza
CLIENT_URL=http://localhost:3000
PORT=8000
ADMIN_BYPASS_KEY=your-secret-key
```

### Production (template)
```
# Server
DATABASE_URL=postgresql://user:password@localhost:5432/viza_prod
CLIENT_URL=https://yourdomain.com
NODE_ENV=production
PORT=8000

# Client
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 📞 QUICK REFERENCE

### Ports
- Client: 3000
- Server: 8000
- PostgreSQL: 5432

### Important Paths
- Prisma Schema: `/server/prisma/schema.prisma`
- API Routes: `/server/src/routes/`
- React Pages: `/client/app/`
- Components: `/client/components/`

### Admin Access
- URL: `/admin?key=YOUR_BYPASS_KEY`
- Manage posts: Create, edit, delete articles

---

## 📅 LAST UPDATED

**Date:** 2026-01-06  
**By:** AI Assistant  
**Changes:** Initial comprehensive context document

---

> **Note to AI:** Always check this document first. If something is unclear or outdated, ask the user for clarification before proceeding.
