# ------------ Stage 1: Build Next.js App ------------
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm run build

# ------------ Stage 2: Serve Static App ------------
FROM node:22-alpine AS runner

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/out ./

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
