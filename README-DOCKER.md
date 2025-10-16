# 🐳 CraftAI - Docker Deployment Guide

Complete guide for containerizing and deploying the CraftAI Voice AI Platform using Docker.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Docker Commands](#docker-commands)
- [Troubleshooting](#troubleshooting)
- [Cloud Deployment](#cloud-deployment)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher (comes with Docker Desktop)
- **Git**: For cloning the repository

**Check your Docker installation:**
```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start

Get CraftAI running in Docker with these simple steps:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/craftai.git
cd craftai
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual Bolna API credentials
nano .env  # or use your preferred editor
```

### 3. Run with Docker Compose

**For Development (with hot reload):**
```bash
docker-compose up craftai-dev
```
Access at: http://localhost:5173

**For Production (optimized build):**
```bash
docker-compose up craftai-prod
```
Access at: http://localhost:8080

---

## 💻 Development Setup

### Development Mode Features
- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Source Maps**: Easy debugging
- **Fast Rebuilds**: Vite's lightning-fast dev server
- **Volume Mounting**: Edit code on your host machine

### Start Development Server
```bash
# Start in foreground
docker-compose up craftai-dev

# Start in background (detached mode)
docker-compose up -d craftai-dev

# View logs
docker-compose logs -f craftai-dev

# Stop
docker-compose down
```

### Install New Dependencies
```bash
# Access the container shell
docker-compose exec craftai-dev sh

# Install package
npm install package-name

# Exit
exit
```

---

## 🏭 Production Deployment

### Production Build Features
- **Multi-stage Build**: Minimal image size (~25MB)
- **Nginx Web Server**: High-performance static file serving
- **Security Headers**: CSP, X-Frame-Options, etc.
- **Gzip Compression**: Faster page loads
- **Health Checks**: Container health monitoring
- **Non-root User**: Enhanced security

### Build Production Image
```bash
# Build the image
docker build -t craftai:latest .

# Check image size
docker images craftai:latest
```

### Run Production Container

**Using Docker Run:**
```bash
docker run -d \
  --name craftai-prod \
  -p 8080:80 \
  --env-file .env \
  --restart unless-stopped \
  craftai:latest
```

**Using Docker Compose:**
```bash
# Build and start
docker-compose up --build craftai-prod

# Start in detached mode
docker-compose up -d craftai-prod

# View logs
docker-compose logs -f craftai-prod
```

### Health Check
```bash
# Check container health
docker ps

# Test health endpoint
curl http://localhost:8080/health
```

---

## 🔐 Environment Variables

### Required Variables

Create a `.env` file in the project root with these variables:

```env
# Bolna API Key (required)
VITE_BOLNA_API_KEY=bn-your-actual-api-key-here

# Agent IDs (required)
VITE_BOLNA_AGENT_PRIYA=your-priya-agent-uuid
VITE_BOLNA_AGENT_TRIPTI=your-tripti-agent-uuid
VITE_BOLNA_AGENT_ARUN=your-arun-agent-uuid

# Phone Configuration (required)
VITE_BOLNA_FROM_PHONE=+919876543007
```

### How Environment Variables Work

1. **Build Time**: Variables are embedded during `npm run build`
2. **Runtime Injection**: `docker-entrypoint.sh` replaces placeholders at container startup
3. **Security**: Variables never exposed in client-side code

### Passing Environment Variables

**Method 1: .env file (Recommended)**
```bash
docker run --env-file .env craftai:latest
```

**Method 2: Individual -e flags**
```bash
docker run \
  -e VITE_BOLNA_API_KEY=your-key \
  -e VITE_BOLNA_AGENT_PRIYA=agent-id \
  craftai:latest
```

**Method 3: Docker Compose**
```yaml
environment:
  - VITE_BOLNA_API_KEY=${VITE_BOLNA_API_KEY}
```

---

## 🛠️ Docker Commands

### Building

```bash
# Build development image
docker build --target builder -t craftai:dev .

# Build production image
docker build -t craftai:prod .

# Build with custom tag
docker build -t craftai:v1.0.0 .

# Build with no cache
docker build --no-cache -t craftai:latest .
```

### Running

```bash
# Run container
docker run -p 8080:80 craftai:latest

# Run with custom name
docker run --name my-craftai -p 8080:80 craftai:latest

# Run in detached mode
docker run -d -p 8080:80 craftai:latest

# Run with restart policy
docker run -d --restart unless-stopped craftai:latest
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View logs
docker logs craftai-prod
docker logs -f craftai-prod  # Follow logs

# Access container shell
docker exec -it craftai-prod sh

# Stop container
docker stop craftai-prod

# Start container
docker start craftai-prod

# Restart container
docker restart craftai-prod

# Remove container
docker rm craftai-prod
docker rm -f craftai-prod  # Force remove
```

### Images

```bash
# List images
docker images

# Remove image
docker rmi craftai:latest

# Prune unused images
docker image prune

# Export image
docker save craftai:latest | gzip > craftai-latest.tar.gz

# Import image
docker load < craftai-latest.tar.gz
```

### Docker Compose

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs
docker-compose logs -f craftai-prod

# Restart service
docker-compose restart craftai-prod

# Execute command in container
docker-compose exec craftai-prod sh
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Container fails to start
```bash
# Check logs
docker logs craftai-prod

# Check container status
docker ps -a

# Inspect container
docker inspect craftai-prod
```

#### Issue: Environment variables not working
```bash
# Verify .env file exists
ls -la .env

# Check environment variables in container
docker exec craftai-prod env | grep VITE_

# Re-run with explicit variables
docker run -e VITE_BOLNA_API_KEY=your-key craftai:latest
```

#### Issue: Port already in use
```bash
# Find process using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Use different port
docker run -p 9090:80 craftai:latest
```

#### Issue: Build fails
```bash
# Clean build cache
docker builder prune

# Build with no cache
docker build --no-cache -t craftai:latest .

# Check Docker disk space
docker system df
```

#### Issue: Image size too large
```bash
# Check image layers
docker history craftai:latest

# Use multi-stage build (already implemented)
docker build -t craftai:latest .

# Prune dangling images
docker image prune
```

### Performance Tips

1. **Use .dockerignore**: Already configured to exclude unnecessary files
2. **Layer Caching**: Keep frequently changing files at the bottom of Dockerfile
3. **Multi-stage Builds**: Production image only includes built assets
4. **Nginx Optimization**: Configured with gzip and caching headers

---

## ☁️ Cloud Deployment

### AWS ECS / Fargate

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag craftai:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/craftai:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/craftai:latest

# Create ECS task definition with environment variables from AWS Secrets Manager
```

### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/craftai

# Deploy to Cloud Run
gcloud run deploy craftai \
  --image gcr.io/PROJECT_ID/craftai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VITE_BOLNA_API_KEY=your-key
```

### Azure Container Instances

```bash
# Login to Azure
az login

# Create container group
az container create \
  --resource-group myResourceGroup \
  --name craftai \
  --image craftai:latest \
  --dns-name-label craftai \
  --ports 80 \
  --environment-variables \
    VITE_BOLNA_API_KEY=your-key \
    VITE_BOLNA_AGENT_PRIYA=agent-id
```

### Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag craftai:latest yourusername/craftai:latest

# Push to Docker Hub
docker push yourusername/craftai:latest

# Pull from Docker Hub (on deployment server)
docker pull yourusername/craftai:latest
docker run -p 8080:80 --env-file .env yourusername/craftai:latest
```

### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: craftai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: craftai
  template:
    metadata:
      labels:
        app: craftai
    spec:
      containers:
      - name: craftai
        image: craftai:latest
        ports:
        - containerPort: 80
        env:
        - name: VITE_BOLNA_API_KEY
          valueFrom:
            secretKeyRef:
              name: craftai-secrets
              key: bolna-api-key
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 30
```

Apply with:
```bash
kubectl apply -f deployment.yaml
```

---

## 📊 Image Size Comparison

| Stage | Image Size | Description |
|-------|-----------|-------------|
| Development | ~1.2 GB | Includes Node.js and dev dependencies |
| Production | ~25 MB | Only Nginx + built static files |

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Non-root user in production container
- Security headers (CSP, X-Frame-Options)
- Multi-stage builds (minimal attack surface)
- .dockerignore (prevents secret leakage)
- Health checks for monitoring

🔐 **Recommendations:**
- Rotate API keys regularly
- Use secrets management in production
- Enable HTTPS with SSL/TLS certificates
- Implement rate limiting
- Regular security updates

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Bolna API Documentation](https://bolna.ai/docs)

---

## 🤝 Support

Need help? Contact the CraftAI team:
- **Email**: support@craftai.com
- **Website**: https://app.craftai.tech

---

**Made with ❤️ by the CraftAI Team**
