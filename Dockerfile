FROM nginx:stable-alpine as deploy-stage

WORKDIR /var/www/app

COPY /var/www/dist /var/www/app

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]