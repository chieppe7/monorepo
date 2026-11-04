
#!/bin/sh

set -e

echo "Iniciando backend AdonisJS..."

HOST=0.0.0.0 PORT=3333 \
npm run dev:hostless --workspace=back-end &

BACKEND_PID=$!

cleanup() {
  echo "Encerrando backend..."
  kill "$BACKEND_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

echo "Iniciando frontend Vite..."

npm run dev --workspace=front-end -- \
  --host 0.0.0.0 \
  --port "${PORT:-5173}" \
  --strictPort \
  --configLoader runner
