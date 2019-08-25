FROM node:12.9.0-alpine

RUN mkdir -p /src/app
WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p logs

CMD [ "node", "index.js" ]

# Run container as an unprivileged user
USER node