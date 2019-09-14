FROM node:12.9.0-alpine

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# Install backend (node) app dependencies
COPY package*.json ./

RUN npm install
# if building code for production
# npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]

# Run container as an unprivileged user
USER node