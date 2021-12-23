FROM node:14-alpine

WORKDIR /app

COPY ./package*.json ./
COPY ./prisma ./prisma/

RUN npm ci --silent

COPY . .

RUN npm run build && npm prune --production 

CMD [ "npm", "run", "start:prod" ]