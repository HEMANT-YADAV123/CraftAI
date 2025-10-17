# CraftAI - Voice AI Platform for Lending

<div align="center">

**AI-Powered Voice Agents for Lead Generation, EMI Reminders, and Debt Collection**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## Overview

CraftAI is a Voice AI platform for lending institutions to automate operations with intelligent voice agents, ML-driven strategies, and real-time analytics.

### Key Metrics
- **500K+ Calls Completed** - Proven at scale
- **3x Higher On-Time Payments** - Measurable ROI
- **100% Compliant** - FDCPA, TCPA compliant
- **70% Cost Reduction** - Operational efficiency

---

## Tech Stack

- **React 19.1.1** - Modern UI with hooks and functional components
- **TypeScript 5.9.3** - Strict type safety
- **Vite 7.1.7** - Fast build tool and dev server
- **shadcn/ui** - High-quality UI components on Radix UI
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Bolna Voice AI API** - Voice agent backend

---

## Project Structure

```
CraftAI/
├── src/
│   ├── assets/images/       # Logos, avatars, partner images
│   ├── component/
│   │   ├── ui/              # shadcn/ui components (40+)
│   │   ├── AboutUs.tsx      # Team page
│   │   ├── AnalyticsAnimation.tsx
│   │   ├── CallPulse.tsx
│   │   ├── ContactUs.tsx    # Contact form
│   │   ├── DemoPage.tsx     # Live demo interface
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx     # Landing page
│   │   └── Navigation.tsx   # Responsive nav with mobile menu
│   ├── services/
│   │   └── emailService.ts  # EmailJS integration for contact form
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .dockerignore
├── .env.example             # Environment template
├── .gitignore
├── docker-compose.yml
├── Dockerfile               # Multi-stage production build
├── nginx.conf               # Nginx config for production
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Bolna API account ([Sign up](https://bolna.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/craftai.git
   cd craftai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development**
   ```bash
   npm run dev
   # Open http://localhost:5173
   ```

---

## Build Commands

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

### Docker Build

#### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

#### Development (with hot reload)

```bash
# Start development container
docker-compose up craftai-dev

# Access at http://localhost:5173
```

#### Production

```bash
# Build and start production container
docker-compose up --build craftai-prod

# Access at http://localhost:8080

# Or build image manually
docker build -t craftai:latest .

# Run container
docker run -d \
  -p 8080:80 \
  -e VITE_BOLNA_API_KEY=your_key \
  -e VITE_BOLNA_AGENT_PRIYA=priya_id \
  -e VITE_BOLNA_AGENT_TRIPTI=tripti_id \
  -e VITE_BOLNA_AGENT_ARUN=arun_id \
  -e VITE_EMAILJS_SERVICE_ID=service_id \
  -e VITE_EMAILJS_TEMPLATE_ID=template_id \
  -e VITE_EMAILJS_PUBLIC_KEY=public_key \
  --name craftai \
  --restart unless-stopped \
  craftai:latest
```

#### Docker Multi-Stage Build

The Dockerfile uses a **2-stage build** for optimal production:

1. **Builder Stage** (`node:20-alpine`)
   - Installs dependencies
   - Runs TypeScript compilation + Vite build
   - Outputs static files to `dist/`

2. **Production Stage** (`nginx:alpine`)
   - Copies built assets from builder
   - Serves with Nginx
   - Runtime env injection via entrypoint
   - **Final size: ~50MB** (vs ~1GB+ with Node)

#### Docker Commands

```bash
# View logs
docker-compose logs -f craftai-prod

# Stop services
docker-compose down

# Rebuild
docker-compose up --build craftai-prod

# Access shell
docker exec -it craftai-prod sh

# Check health
docker ps --filter name=craftai-prod
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BOLNA_API_KEY` | Bolna API authentication key | ✅ |
| `VITE_BOLNA_AGENT_PRIYA` | Lead generation agent UUID | ✅ |
| `VITE_BOLNA_AGENT_TRIPTI` | EMI reminder agent UUID | ✅ |
| `VITE_BOLNA_AGENT_ARUN` | Debt collection agent UUID | ✅ |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | ✅ |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | ✅ |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | ✅ |

### Setup

Create `.env` file in project root:

```env
# Bolna API Configuration
VITE_BOLNA_API_KEY=your_api_key_here
VITE_BOLNA_AGENT_PRIYA=priya_agent_uuid
VITE_BOLNA_AGENT_TRIPTI=tripti_agent_uuid
VITE_BOLNA_AGENT_ARUN=arun_agent_uuid

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Security Note**: Never commit `.env` to version control. Use `.env.example` as template.

---

## Features

### AI Voice Agents

| Agent | Role | Description |
|-------|------|-------------|
| **Priya** | Lead Generation | Calls leads and gauges interest |
| **Tripti** | EMI Reminder | Reminds customers of upcoming payments |
| **Arun** | Debt Collection | Professional recovery and negotiation |

### Capabilities

- **Real-Time Analytics** - Live metrics, call duration, success rates
- **Context-Aware AI** - Adapts based on customer history
- **Omnichannel** - Voice, WhatsApp, SMS, RCS, email
- **Compliance** - FDCPA and TCPA compliant
- **ML Scoring** - Intent and ability-to-pay predictions

### UI/UX

- Fully responsive design (mobile-first)
- Mobile navigation with hamburger menu
- Interactive contact form with country selector
- Real-time animations with Framer Motion
- shadcn/ui components for consistency

---

## API Integration

### Bolna Voice AI

**Endpoint**: `https://api.bolna.ai/call`

**Example Request**:
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

**Error Handling**:
- `401` - Invalid API key
- `400` - Invalid phone number
- `429` - Rate limit exceeded
- `500` - Server error

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard: **Project Settings → Environment Variables**

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Docker Production

```bash
# Build image
docker build -t craftai:prod .

# Push to registry
docker tag craftai:prod your-registry/craftai:latest
docker push your-registry/craftai:latest

# Deploy (example: AWS ECS, GCP Cloud Run, Azure ACI)
```

For cloud deployments, use platform-specific secrets management:
- **AWS**: Secrets Manager / Parameter Store
- **GCP**: Secret Manager
- **Azure**: Key Vault
- **Kubernetes**: Secrets

---

## Code Standards

### TypeScript
- Strict mode enabled
- No implicit `any`
- Interfaces for props and data structures

### React
- Functional components only
- Hooks for state management
- Prop destructuring

### Naming Conventions
- **Components**: `PascalCase` (e.g., `HomePage`, `CallPulse`)
- **Files**: `PascalCase.tsx` for components
- **Functions**: `camelCase` (e.g., `makeCall`, `formatDuration`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)

### ESLint
```bash
npm run lint
```

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
npx tsc --noEmit
```

### API calls failing
- Verify API key in `.env`
- Check agent UUIDs in Bolna dashboard
- Ensure phone numbers include country code
- Check browser console for errors

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Note**: IE11 not supported.

---

## License

Proprietary and confidential. Unauthorized copying or distribution prohibited.

**Copyright © 2025 CraftAI. All rights reserved.**

---

## Contact

- **Website**: [craftai.com](https://app.craftai.tech)
- **Email**: support@craftai.com
- **Company**: Novura Labs Private Limited
- **Address**: Kokarya Business Center, Jayanagar, Bengaluru - 560041

---

<div align="center">

**Built with ❤️ in India 2025**

[⬆ Back to Top](#craftai---voice-ai-platform-for-lending)

</div>
