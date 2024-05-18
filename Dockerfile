# Base image
FROM node:18.8-alpine as base

# Builder stage
FROM base as builder
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn build

# Runtime stage
FROM base as runtime

# Environment variables
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
