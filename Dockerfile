FROM node:latest

# Install UFW
RUN apt-get update && apt-get install -y ufw curl

# Allow connections on specific ports (within the container)
RUN ufw allow 80
RUN ufw allow 443

# Set the working directory
WORKDIR /app

# Remove node_modules if it exists
RUN rm -rf node_modules

# Install pm2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install pm2-logrotate
RUN pm2 install pm2-logrotate

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Install dependencies using Bun
RUN bun install

# Copy the rest of your application files to the working directory
COPY . .

# Use pm2-runtime to start the application
CMD ["pm2-runtime", "start", "--name=bma-api", "bun", "--", "run", "production"]
