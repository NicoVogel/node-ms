FROM node:12-alpine3.11 as builder

# set build arg BUILD_NUMBER as envvar for webpack build
ARG BUILD_NUMBER
ENV BUILD_NUMBER $BUILD_NUMBER

WORKDIR /ng-app
COPY . .
RUN npm clean-install && npm run build


FROM nginx:1.19-alpine

USER root
COPY nginx/* /scripts/

RUN chmod +x scripts/docker_entrypoint.sh

ENV PORT=8080 \
  SERVER_NAME=localhost

COPY --from=builder /ng-app/dist/app /app

RUN chmod 777 /app && \
  chmod 777 /etc/nginx/nginx.conf

ENTRYPOINT "/scripts/docker_entrypoint.sh"
