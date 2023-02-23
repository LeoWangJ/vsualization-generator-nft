
# deploy stage
FROM nginx:stable-alpine as deploy-stage



WORKDIR /var/www/app
COPY  dist/ .
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]