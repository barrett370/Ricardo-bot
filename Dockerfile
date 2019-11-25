FROM node:alpine

COPY ./src/bin .
COPY ./src/package.json .
COPY ./src/package-lock.json .
COPY ./src/auth.json .


RUN npm install
ENTRYPOINT [ "node", "ricardo-ts.js" ]