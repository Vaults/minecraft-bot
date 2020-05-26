FROM node:10

WORKDIR /app

COPY . .

RUN npm install

CMD ["npx", "ts-node", "afk-bot.ts"]

