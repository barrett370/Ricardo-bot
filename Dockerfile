FROM node:alpine

RUN mkdir app
COPY ./src/bin app
COPY ./src/package.json app
COPY ./src/auth.json app
WORKDIR app

RUN npm install 
ENTRYPOINT [ "node", "ricardo-ts.js" ]
