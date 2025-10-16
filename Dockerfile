# =============================================================================
# CraftAI - Production-Ready Dockerfile
# Multi-stage build for Vite + React + TypeScript application
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build Stage
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for node-gyp (if needed)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies needed for build)
# Note: package-lock.json already generated with --legacy-peer-deps locally
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
# This runs: tsc -b && vite build
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Production Stage with Nginx
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Install bash for entrypoint script
RUN apk add --no-cache bash

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy public assets (robots.txt, sitemap.xml, etc.)
COPY --from=builder /app/public /usr/share/nginx/html

# Copy entrypoint script for runtime environment variable injection
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set permissions for nginx user (already exists in nginx:alpine)
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Set entrypoint and command
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

# Metadata
LABEL maintainer="CraftAI Team <support@craftai.com>"
LABEL version="1.0"
LABEL description="CraftAI Voice AI Platform - Production Docker Image"
