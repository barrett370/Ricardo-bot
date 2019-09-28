FROM node

COPY ./src .

RUN npm install
ENTRYPOINT [ "node", "ricardo.js" ]