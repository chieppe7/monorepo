FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

COPY front-end ./front-end
COPY back-end ./back-end
COPY shared ./shared

RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]