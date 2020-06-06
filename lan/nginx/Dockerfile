
# build angular
FROM node:12-alpine3.11 as builder

WORKDIR /ng-app

## install packages
COPY ./app/package*.json ./
RUN npm install

## build app
COPY ./app/ ./
RUN npm run build

# setup nginx
FROM nginx:1.19-alpine

USER root
ENV PORT=8080 \
  SERVER_NAME=localhost


## provide startup scripts
COPY ./scripts/ /scripts/
RUN chmod +x scripts/docker_entrypoint.sh

## add build app
COPY --from=builder /ng-app/dist/app /app

## make app and config editable
RUN chmod 777 /app && \
  chmod 777 /etc/nginx/nginx.conf

ENTRYPOINT "/scripts/docker_entrypoint.sh"
