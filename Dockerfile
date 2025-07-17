# Stage 1: Build the Next.js application
FROM oven/bun:1-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and bun.lock to leverage Docker cache
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# Ensure your Next.js project has a "build" script defined in package.json
RUN bun run build

# Stage 2: Run the Next.js application
FROM oven/bun:1-alpine AS runner

WORKDIR /app

# Set Node.js environment to production
ENV NODE_ENV production

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# If you're using standalone output for Next.js, uncomment the following line:
# COPY --from=builder /app/.next/standalone ./

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Command to run the Next.js application
# This uses the default Next.js start command with Bun
CMD ["bun", "start"]