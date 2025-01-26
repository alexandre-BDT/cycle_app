FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npm install -g ts-node

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]