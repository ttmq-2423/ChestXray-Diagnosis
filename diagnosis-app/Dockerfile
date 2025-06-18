# ------------ Stage 1: Build Next.js App ------------
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# ------------ Stage 2: Run Production App ------------
FROM node:22-alpine AS runner

# Install pnpm first
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
