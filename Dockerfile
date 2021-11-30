FROM node:alpine as bob

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm i -g typescript
RUN tsc 

FROM node:alpine

RUN mkdir /app
COPY --from=bob /app/bin /app
COPY ./src/resources/img /app/resources
COPY package.json /app
COPY package-lock.json /app
WORKDIR /app
RUN npm ci 

ENTRYPOINT [ "node", "ricardo.js" ]
