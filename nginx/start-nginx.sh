#!/bin/sh

while ! nc -z app 3000; do   
  echo "Waiting for the App service..."
  sleep 1
done

echo "App service is up. Starting Nginx..."
nginx -g 'daemon off;' &

# Wait for Nginx to start
sleep 5

echo "Running certbot..."
certbot --nginx -n --agree-tos --email <email-cloudflare> -d #hostname cloudflare

# Keep the container running
tail -f /dev/null
