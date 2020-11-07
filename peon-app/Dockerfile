FROM nginx:1.17

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY build/ /usr/share/nginx/html/

ENTRYPOINT ["/bin/bash", "-c", "nginx -g \"daemon off;\""]