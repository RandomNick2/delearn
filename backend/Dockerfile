# Stage 1: Build the NestJS app
FROM node:lts-alpine AS build

WORKDIR /docker/backend

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем остальные файлы
COPY . .

# Генерируем Prisma Client
RUN yarn prisma generate


CMD ["yarn", "start:dev"]
