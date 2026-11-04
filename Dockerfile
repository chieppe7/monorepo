FROM node:22-bookworm-slim

WORKDIR /app

COPY . .

RUN npm ci

# Criar diretórios temporários durante o build
RUN mkdir -p \
    /app/node_modules/.vite-temp \
    /app/node_modules/.vite \
    /tmp/vite \
    /tmp/vite-cache

# Garantir permissões de escrita
RUN chmod -R 777 /app/node_modules/.vite-temp \
    /app/node_modules/.vite \
    /tmp/vite \
    /tmp/vite-cache

ENV TMPDIR=/tmp
ENV VITE_CACHE_DIR=/tmp/vite-cache

EXPOSE 5173

CMD ["sh", "scripts/dev-hostless.sh"]