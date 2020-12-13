FROM node:12

RUN apt-get update && apt-get install -qq -y nginx

RUN service nginx reload

CMD nginx -g "daemon off;"

WORKDIR /opt/web

COPY web/ /opt/web

RUN cd /opt/web && npm install && npm run build

EXPOSE 80 443 3000