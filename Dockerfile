FROM node:16-alpine3.16 AS builder

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --frozen-lockfile

FROM node:16-alpine3.16

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules

COPY *.json /app/
COPY yarn.lock /app/yarn.lock
COPY src /app/src/
COPY public /app/public/

RUN yarn build
