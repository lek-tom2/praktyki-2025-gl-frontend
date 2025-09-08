# Stage 1: Build the React application
# Use a Node.js base image for building the frontend.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to cache dependencies
COPY package.json .
COPY package-lock.json .

# Install Node.js dependencies
RUN npm install

# Copy all other project files into the container
COPY . .

# Build the React application for production
# This command generates the static files and output in the `.next` directory.
RUN npm run build

# Stage 2: Create a lightweight production image with Nginx
# Use a lightweight Nginx base image to serve the static files.
FROM nginx:alpine

# Copy the built React app from the builder stage
# IMPORTANT: Next.js outputs its production build to the `.next` folder, not `build`.
COPY --from=builder /app/.next /usr/share/nginx/html

# Expose the port Nginx will be listening on
EXPOSE 80

# The command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
