# Stage 1: Build the React application
# Use a more robust Debian-based Node.js image
FROM --platform=$BUILDPLATFORM node:18-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package dependency files
COPY package.json .
COPY package-lock.json .

# --- Instructions to add the certificate ---
USER root

# On Debian, we must first update the package list, then install the package
RUN apt-get update && apt-get install -y ca-certificates

# Give the 'node' user ownership of the /app directory
RUN chown -R node:node /app

# Copy your certificate into the container
COPY github.crt /usr/local/share/ca-certificates/

# Run the certificate update command
RUN update-ca-certificates
USER node
# --- End of instructions ---

# Install Node.js dependencies
RUN npm install

# Copy all other project files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Create the production image with Nginx
FROM nginx:alpine

# Copy the built React app from the builder stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Expose the correct port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]