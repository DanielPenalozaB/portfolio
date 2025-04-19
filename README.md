# Next.js + TypeScript + Docker Portfolio Project

This repository contains a Next.js + TypeScript portfolio project configured with Docker for both development and production environments, with deployment support for Coolify.

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Docker Configuration](#docker-configuration)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [Coolify Integration](#coolify-integration)
- [Environment Variables](#environment-variables)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Project Structure

The project includes the following Docker-related files:

- `.dockerignore` - Files and directories to exclude from Docker builds
- `Dockerfile.dev` - Docker configuration for local development
- `Dockerfile` - Production-optimized Docker configuration
- `docker-compose.yml` - Container orchestration for development
- `docker-compose.prod.yml` - Container orchestration for production
- `.env.template` - Template for environment variables
- `coolify.json` - Configuration for Coolify deployment

## Environment Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development outside Docker)
- [Git](https://git-scm.com/)

### Initial Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-portfolio.git
   cd your-portfolio
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.template .env.local
   ```

3. Customize environment variables in `.env.local` as needed.

## Docker Configuration

### Development Environment

The development setup uses `Dockerfile.dev` and `docker-compose.yml` to create a container that supports hot reloading during development.

Key features:
- Volume mounts for live code updates
- Development-specific environment variables
- Development server with hot reloading
- Health check to ensure service availability

### Production Environment

The production setup uses a multi-stage build process defined in `Dockerfile` to create a small, secure, and optimized container.

Key features:
- Multi-stage build for optimized image size
- Next.js standalone output for improved performance
- Non-root user for improved security
- Production-specific environment variables
- Health checks to ensure service availability

## Development Workflow

### Starting the Development Environment

```bash
# Build and start the development container
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d

# View logs while running in detached mode
docker-compose logs -f
```

Your Next.js application will be available at [http://localhost:3000](http://localhost:3000).

### Stopping the Development Environment

```bash
# Stop the container (preserves the container)
docker-compose stop

# Stop and remove the container
docker-compose down
```

### Working with the Development Container

```bash
# Run a command in the running container
docker-compose exec nextjs-app npm install some-package

# Open a shell in the running container
docker-compose exec nextjs-app sh
```

## Production Deployment

### Testing Production Build Locally

```bash
# Build and run the production container
docker-compose -f docker-compose.prod.yml up --build

# Run in detached mode
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

```bash
# Build the production image
docker build -t nextjs-portfolio:latest .

# Run the production container
docker run -p 3000:3000 --env-file .env.production nextjs-portfolio:latest
```

## Coolify Integration

### Setting Up Coolify Deployment

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Docker configuration for Next.js portfolio"
   git push
   ```

2. In your Coolify dashboard:
   - Create a new service
   - Select "Docker" as the deployment option
   - Connect to your GitHub repository
   - Configure environment variables
   - Set up port mapping (3000:3000)

3. Deploy the application through the Coolify dashboard.

### Configuration File

The `coolify.json` file contains the configuration for Coolify, including:
- Source repository and branch
- Dockerfile location
- Environment variables
- Port mappings
- Health check configuration

## Environment Variables

### Core Variables

- `NODE_ENV`: Environment mode (`development` or `production`)
- `PORT`: Port for the Next.js server (default: 3000)
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry (set to 1)

### Custom Variables

Add your application-specific environment variables to:
- `.env.local` for local development
- Docker Compose files for container development
- Coolify environment variables for deployment

## Best Practices

This project implements the following Docker and deployment best practices:

### Docker Best Practices

1. **Multi-stage builds**: The production Dockerfile uses multiple build stages to minimize image size.
2. **Non-root user**: The production container runs as a non-root user for security.
3. **Alpine-based images**: Using lightweight Node.js Alpine images reduces image size.
4. **Layer optimization**: Dockerfile commands are ordered to maximize cache utilization.
5. **Output tracing**: Next.js output tracing reduces the final image size.
6. **Health checks**: Container health checks ensure application availability.
7. **Environment separation**: Different configurations for development and production.

### Next.js Best Practices

1. **Standalone output**: Using the standalone output mode improves deployment efficiency.
2. **Environment variables**: Properly segregated for different environments.
3. **TypeScript integration**: Type safety throughout the application.

## Troubleshooting

### Common Issues

#### Container can't access local files

Ensure your volume mounts in `docker-compose.yml` are correctly configured:

```yaml
volumes:
  - .:/app
  - /app/node_modules
  - /app/.next
```

#### Health check fails

If the health check fails, check:
1. The application is running on the expected port
2. The application is responding to requests
3. The health check URL is accessible

```bash
# View container logs
docker-compose logs nextjs-app

# Check health check status
docker inspect --format "{{json .State.Health }}" nextjs-portfolio-dev
```

#### Port conflicts

If port 3000 is already in use:

```bash
# Change the port mapping in docker-compose.yml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

#### Build failures

For build failures, check:
1. All required files are included in the Docker context
2. Dependencies are correctly specified
3. Node.js version compatibility

```bash
# View detailed build logs
docker-compose build --no-cache
```

For additional help, consult the [Docker documentation](https://docs.docker.com/) or [Next.js documentation](https://nextjs.org/docs).