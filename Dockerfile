FROM node:alpine

COPY ./src/bin .

RUN npm install
ENTRYPOINT [ "node", "ricardo-ts.js" ]