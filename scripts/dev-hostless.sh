#!/bin/sh

set -e

echo "Iniciando backend..."

HOST=0.0.0.0 PORT=3333 \
npm run dev --workspace=back-end &

BACKEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

echo "Iniciando frontend..."

npm run dev --workspace=front-end -- \
  --host 0.0.0.0 \
  --port "${PORT:-5173}" \
  --strictPort