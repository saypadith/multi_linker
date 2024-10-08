# Dockerfile

# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code into the container's working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
