# Build Stage 1
# This stage installs dev dependencies and builds the app from the src code.
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Build Stage 2
# This stage installs prod dependencies, copies the build app from Stage 1, and runs the app.
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "."]