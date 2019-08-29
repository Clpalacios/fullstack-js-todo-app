FROM node:12.9.0-alpine

# Create app directory
RUN mkdir -p /src/app/server/node
WORKDIR /src/app/server/node

# Install backend (node) app dependencies
COPY package*.json ./

RUN npm install
# if building code for production
# npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]