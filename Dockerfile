# Build stage 1
FROM node:15.2.1-alpine3.10

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /app

# Install core dependencies first to use the docker build cache
COPY package.json yarn.lock lerna.json ./
RUN yarn install

COPY . .
RUN yarn install
RUN yarn run bootstrap
RUN yarn run build

CMD npm run run