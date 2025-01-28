# Dockerfile
# Base stage for shared configurations
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Builder stage for production
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]