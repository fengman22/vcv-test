FROM node:12-alpine

WORKDIR /home/app

COPY ./package*.json ./tsconfig.json ./
COPY ./src ./src
RUN npm install --production
