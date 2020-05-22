FROM node:10

WORKDIR /app

RUN npm install mindflayer

CMD ["node", "afk-bot.js"]

