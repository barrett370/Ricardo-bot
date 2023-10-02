RUN mkdir /app
WORKDIR /app

ENV TOKEN ""
ENV CLIENT_ID ""


COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install

ENTRYPOINT ["bun", "run", "./src/ricardo.js"]