FROM node:lts-alpine

WORKDIR /docker

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


