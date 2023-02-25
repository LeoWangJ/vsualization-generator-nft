FROM nginx:stable-alpine as deploy-stage

RUN ls 

RUN chmod -R 777 .

COPY dist app/

COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]