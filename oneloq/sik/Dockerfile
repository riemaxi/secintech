# Start from the official image containing the alpine Linux and Node js as a parent image.
FROM node:alpine

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
ADD *.json ./
ADD *.js ./

# Run the command inside your image filesystem.
RUN npm install

# Initialise the database.
RUN node initialize.js

# Copy the rest of your app's source code from your host to your image filesystem.
ADD . .

# Describe which port the container will listen on at runtime.

# Run the specified command within the container./
CMD [ "node", "reception.js" ]
