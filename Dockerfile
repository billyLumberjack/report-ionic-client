# Web build: Ionic 7 / Angular 17 built with the Angular CLI on Node 20 (see
# .nvmrc), then the static output is served by nginx. The native iOS/Android
# shells (Capacitor) are built separately on a host with the native SDKs — they
# are not part of this image.

FROM node:20 AS build
WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .

# Produce the production web build in ./www.
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/www /usr/share/nginx/html
