FROM node

COPY ./src .

CMD npm install
CMD node bot.js