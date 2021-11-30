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
COPY --from=bob /app/bin /app
COPY ./src/resources/img /app/resources
COPY ./src/resources/quotes.json /app/resources/quotes.json
COPY package.json /app
COPY package-lock.json /app
WORKDIR /app
RUN npm ci 

ENTRYPOINT [ "node", "ricardo.js" ]
