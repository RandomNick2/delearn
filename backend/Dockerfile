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

# Сборка проекта
RUN yarn build

# Stage 2: Запуск приложения
FROM node:lts-alpine

WORKDIR /docker/backend

# Копируем только необходимые файлы для работы приложения
COPY --from=build /docker/backend/dist ./dist
COPY --from=build /docker/backend/package.json ./
COPY --from=build /docker/backend/yarn.lock ./

# Устанавливаем только производственные зависимости
RUN yarn install --production=true

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start:prod"]
