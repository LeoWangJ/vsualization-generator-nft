FROM nginx:stable-alpine as deploy-stage

WORKDIR /var

WORKDIR /var/www

RUN ls /var/www

RUN chmod -R 777 .

COPY dist app

RUN ls /var/www/app

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/app

EXPOSE 80

CMD ["nginx","-g","daemon off;"]