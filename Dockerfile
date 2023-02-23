
# deploy stage
FROM nginx:stable-alpine as deploy-stage

WORKDIR /data/www


EXPOSE 80
CMD ["nginx","-g","daemon off;"]