# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy your application code to the container
COPY . .

# Expose a port if your application listens on a specific port
# EXPOSE 8080

# Specify the command to run your Node.js application
CMD [ "node", "run_node.js" ]
