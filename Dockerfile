FROM node:alpine

COPY ./src .

RUN npm install
ENTRYPOINT [ "node", "ricardo.js" ]