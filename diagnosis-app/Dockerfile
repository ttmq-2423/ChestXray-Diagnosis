# ------------ Stage 1: Build App ------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

# ------------ Stage 2: Production Image ------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
