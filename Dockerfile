FROM node:alpine as bob

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm i -g typescript
RUN tsc 

FROM node:alpine

ENV TOKEN ""
ENV CLIENT_ID ""

RUN mkdir /app
RUN mkdir /app/resources
WORKDIR /app
COPY --from=bob /app/bin .
COPY ./src/resources ./resources
COPY package.json .
COPY package-lock.json .
RUN npm ci 

ENTRYPOINT [ "node", "ricardo.js" ]
