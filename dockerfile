FROM nginx
COPY ./assets/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./out /var/www/cinema
EXPOSE 80