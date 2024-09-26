FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json 
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose port 3000 
EXPOSE 3000

# Define environment variables
ENV NODE_ENV=production


CMD ["npm", "run", "dev"]