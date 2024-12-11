# Use Node.js to build the Vue.js application
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy the rest of the files and build the Vue.js app
COPY . .
RUN npm run build

# Use a lightweight Node.js image to serve the Vue app
FROM node:20-slim

WORKDIR /app

# Copy necessary files from the builder
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Install serve, a simple static file server for Node.js
RUN npm install -g serve

# Expose port 4000 (or any port you prefer)
EXPOSE 4000

# Use serve to serve the app
CMD ["serve", "-s", "dist", "-l", "4000"]
