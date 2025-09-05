# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json .
RUN npm install

# Copy the application code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Create a lightweight production image with Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]