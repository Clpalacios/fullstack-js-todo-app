FROM node:12.9.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /src/app/client
WORKDIR /src/app/client

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install node modules
RUN npm install

# Copy application files
COPY . .

# Run
CMD [ "npm", "start" ]