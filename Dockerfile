FROM nginx:stable-alpine as deploy-stage

WORKDIR /var/www/app

COPY ../dist .

COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]