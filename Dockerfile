FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "preview"]
