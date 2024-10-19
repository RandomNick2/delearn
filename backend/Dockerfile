FROM node:lts-alpine

WORKDIR /docker

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start:prod"]
