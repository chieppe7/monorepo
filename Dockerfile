
FROM node:22-bookworm-slim

WORKDIR /app

COPY . .

RUN npm ci

RUN mkdir -p /tmp/vite-cache

EXPOSE 5173

CMD ["sh", "scripts/dev-hostless.sh"]
