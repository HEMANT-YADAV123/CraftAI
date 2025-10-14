# CraftAI - Voice AI Platform Frontend

This document provides guidelines for AI assistants (like Claude) working on the CraftAI frontend codebase.

---

## Philosophy

- **KISS & DRY**: Follow "Keep It Simple, Stupid" and "Don't Repeat Yourself" principles for all code
- **Production-Ready**: This is a production application - make minimal, necessary changes
- **Best Practices**: Write clean, well-documented code with no dead code or duplication
- **Type Safety**: Leverage TypeScript's strict mode for maximum type safety
- **User Experience**: Prioritize responsive design, accessibility, and performance

---

## Project Overview

**CraftAI** is a Voice AI platform designed for lending institutions to automate lead generation, EMI reminders, and debt collection through intelligent voice agents.

### Technology Stack
- **Frontend Framework**: React 19.1.1 with functional components and hooks
- **Language**: TypeScript 5.9.3 (strict mode enabled)
- **Build Tool**: Vite 7.1.7 (fast builds and HMR)
- **UI Library**: shadcn/ui (built on Radix UI primitives)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion (motion/react)
- **Icons**: Lucide React
- **API**: Bolna Voice AI for outbound calling

### Project Type
- This is a **frontend-only** project
- No backend code in this repository
- Integrates with external Bolna Voice AI API

---

## Workflow

### Before Starting Any Task
1. **Read README.md** - Always understand the overall architecture first
2. **Plan First** - For major features or bug fixes, research and discuss with the user before implementing
3. **Use npm Scripts** - Always use defined npm scripts (no custom bash scripts)
4. **Type Check** - Run TypeScript type checking after making code changes
5. **Test Locally** - Always test in the browser before considering work complete

### Development Workflow
```bash
# Start development server
npm run dev

# Type check without building
npx tsc --noEmit

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Code Style

### TypeScript Guidelines
- **Strict Mode**: Enabled - no implicit `any` types
- **Type Inference**: Prefer type inference over explicit typing when obvious
- **Interfaces**: Use interfaces for component props and data structures
- **No Enums**: Use union types or const objects instead
- **Generic Types**: Use when appropriate for reusable components

```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  count?: number;
}

export function Component({ title, count = 0 }: ComponentProps) {
  // Implementation
}

// ❌ Bad
export function Component(props: any) {
  // No type safety
}
```

### React Guidelines
- **Functional Components Only**: No class components
- **Hooks**: Use hooks for state and side effects
- **React.memo**: Use sparingly - only when profiling shows performance benefit
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Prop Destructuring**: Always destructure props in function parameters

### Naming Conventions
- **Components**: PascalCase (e.g., `HomePage`, `DemoPage`, `CallPulse`)
- **Files**: PascalCase for component files (e.g., `HomePage.tsx`)
- **Functions**: camelCase (e.g., `makeCall`, `formatDuration`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)

### ESLint Configuration
The project uses ESLint with:
- `@eslint/js` - JavaScript recommended rules
- `typescript-eslint` - TypeScript-specific rules
- `eslint-plugin-react-hooks` - React hooks rules
- `eslint-plugin-react-refresh` - React refresh rules

**Always respect these** - run `npm run lint` before committing.

---

## Project Structure

```
CraftAI/
├── src/
│   ├── assets/images/       # All images (logos, agent avatars, partners)
│   ├── component/
│   │   ├── ui/              # shadcn/ui components (40+ components)
│   │   ├── AnalyticsAnimation.tsx
│   │   ├── CallPulse.tsx
│   │   ├── DemoPage.tsx
│   │   ├── HomePage.tsx
│   │   └── Navigation.tsx
│   ├── App.tsx              # Root component
│   ├── App.css
│   ├── main.tsx             # Entry point
│   └── index.css
├── .env                     # Environment variables (NEVER commit!)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Environment Configuration

### Environment Variables
All environment variables **must** start with `VITE_` prefix.

Create a `.env` file in project root:

```env
# Bolna API Configuration
VITE_BOLNA_API_KEY=your_api_key_here
VITE_BOLNA_AGENT_PRIYA=priya-agent-uuid
VITE_BOLNA_AGENT_TRIPTI=tripti-agent-uuid
VITE_BOLNA_AGENT_ARUN=arun-agent-uuid
VITE_BOLNA_FROM_PHONE=+919876543007
```

### Accessing Environment Variables
```typescript
// ✅ Correct
const apiKey = import.meta.env.VITE_BOLNA_API_KEY;

// ❌ Wrong - doesn't work in Vite
const apiKey = process.env.VITE_BOLNA_API_KEY;
```

### Security
- **NEVER** commit `.env` file (in .gitignore)
- **NEVER** hardcode API keys in source code
- **NEVER** log sensitive data to console

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Type check without output
npx tsc --noEmit
```

---

## Git Workflow

### Branch Naming
- Features: `feature/agent-selection`
- Bug fixes: `fix/call-duration-bug`
- Improvements: `improve/button-styling`

### Commit Messages
- Use imperative mood: "Add", "Fix", "Update", "Remove"
- Be specific: "Fix call duration timer reset bug"
- Reference issues: "Fix call status animation (#42)"

### Pre-commit Checklist
- [ ] Run `npm run lint` - no errors
- [ ] Run `npx tsc --noEmit` - no type errors
- [ ] Test in browser - works as expected
- [ ] Check responsive design - works on all screen sizes
- [ ] Remove console.logs and debug code

---

## API Integration

### Bolna Voice AI API

**Base URL**: `https://api.bolna.ai`

```typescript
const response = await fetch("https://api.bolna.ai/call", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_BOLNA_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    agent_id: agentId,
    recipient_phone_number: phoneNumber,
    from_phone_number: fromPhone,
    user_data: { /* custom data */ }
  })
});
```

### Error Handling
Handle these scenarios:
- **Network Errors**: Connection failures, timeouts
- **401**: Invalid or expired API key
- **400**: Invalid phone number format
- **429**: Rate limit exceeded
- **500**: Server error

---

## Component Guidelines

### Component Structure
```typescript
import { useState } from "react";
import { Button } from "./ui/button";

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState("");

  const handleClick = () => {
    onAction?.();
  };

  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
}
```

### Using shadcn/ui
```typescript
// ✅ Good - Use existing components
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// ❌ Bad - Don't create custom
<button>...</button>
```

### Styling with Tailwind
```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6">
  <Button className="bg-primary">Click</Button>
</div>

// ❌ Bad - No inline styles
<div style={{ display: 'flex' }}>
  <button style={{ background: '#8B5CF6' }}>Click</button>
</div>
```

---

## State Management

### Local State
```typescript
const [phoneNumber, setPhoneNumber] = useState("");
const [callStatus, setCallStatus] = useState<CallStatus>("idle");
```

### Side Effects
```typescript
useEffect(() => {
  if (callStatus === "connected") {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }
}, [callStatus]);
```

**No global state library** - state is kept local or lifted to parent.

---

## Performance

### Optimization
1. **Lazy Loading**: Use `React.lazy()` for code splitting
2. **React.memo**: Only when profiling shows benefit
3. **useCallback**: Memoize callbacks
4. **useMemo**: Memoize expensive calculations

### Image Optimization
- Use **WebP** format
- Lazy load images below the fold
- Compress images before adding

### Bundle Size
Current: ~330KB (gzipped) - keep it optimized

---

## Responsive Design

### Mobile-First
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Auto-adjusts for screen sizes */}
</div>
```

### Breakpoints
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

---

## Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
- Ensure `.env` is in project root
- Variables must start with `VITE_`
- Restart dev server after changes

### TypeScript errors
```bash
npx tsc --version
npx tsc --noEmit
```

### API calls failing
- Verify `VITE_BOLNA_API_KEY` in `.env`
- Check agent UUIDs in Bolna dashboard
- Ensure phone numbers have country code
- Check browser console for CORS errors

---

## Working Directory

- **Project Root**: `h:\PROJECTS\CraftAI`
- **Source**: `h:\PROJECTS\CraftAI\src`
- **Build Output**: `h:\PROJECTS\CraftAI\dist`

---

## Important Reminders

### Security
- ❌ NEVER commit `.env`
- ❌ NEVER hardcode API keys
- ✅ Always use `import.meta.env`

### Code Quality
- ✅ Run `npm run lint` before commit
- ✅ Run `npx tsc --noEmit` to check types
- ✅ Test on multiple screen sizes
- ✅ Remove console.logs

### Best Practices
- ✅ Use functional components only
- ✅ Keep components small and focused
- ✅ Use shadcn/ui for consistency
- ✅ Follow Tailwind CSS conventions

---

## Resources

- **README.md** - Project documentation
- **React** - https://react.dev/
- **TypeScript** - https://www.typescriptlang.org/
- **Vite** - https://vite.dev/
- **Tailwind** - https://tailwindcss.com/
- **shadcn/ui** - https://ui.shadcn.com/
- **Bolna API** - https://bolna.ai/docs

---

## TODOs

<!-- Add project-specific TODOs here -->

---

**Last Updated**: 2025-01-13
**Project Version**: 0.0.0
**Maintained By**: CraftAI Team