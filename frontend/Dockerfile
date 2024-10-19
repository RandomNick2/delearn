# Dockerfile

# Stage 1: Build Vue app
FROM node:lts-alpine AS build
WORKDIR /docker/frontend

# Copy only the essential files for install and build
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the project files
COPY . .

# Build the Vue app
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine AS production

# Copy built files from the build stage to the Nginx directory
RUN ls 
COPY --from=build /docker/frontend/dist /usr/share/nginx/html
# Nginx config (if needed)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
