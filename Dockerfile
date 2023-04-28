# Stage 1 - build
FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm build 

# Stage 2 - production
FROM node:lts-alpine as final

COPY --from=builder /app/.output ./

ENTRYPOINT ["node", "server/index.mjs"]