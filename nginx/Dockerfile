FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY start-nginx.sh /start-nginx.sh

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y certbot python3-certbot-nginx netcat-openbsd && \
    chmod +x /start-nginx.sh

CMD ["/start-nginx.sh"]