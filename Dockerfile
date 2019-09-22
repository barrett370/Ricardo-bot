FROM node

COPY ./src .

CMD npm install
CMD node ricardo.js