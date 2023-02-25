FROM nginx:stable-alpine as deploy-stage

WORKDIR /var/www/app

RUN ls /var/www/

RUN chmod -R 777 /var/www/

COPY dist /var/www/app/

COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]