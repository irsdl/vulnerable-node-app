# Use an official Node.js runtime as a parent image
FROM node:20

# Set up proxy arguments (if needed)
ARG http_proxy
ARG https_proxy
ARG HTTP_PROXY
ARG HTTPS_PROXY

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies, including devDependencies
RUN npm install

# Ensure nodemon is installed globally
RUN npm install -g nodemon

# Copy the wait-for-it.sh script
COPY lib/wait-for-it.sh /usr/src/wait/wait-for-it.sh
RUN chmod u+x /usr/src/wait/wait-for-it.sh

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["/usr/src/wait/wait-for-it.sh", "mongo:27017", "--", "npm", "start"]
