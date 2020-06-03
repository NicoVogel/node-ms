#!/bin/sh

if [[ -z "${DEPLOY_ENV}" ]]; then
  export ANGULAR_FORWARD=`location /{
            proxy_pass         http://localhost:4200;
            proxy_redirect     off;
            proxy_set_header   Host $host;
        }`
else
  export ANGULAR_LOCAL=`root /app;`
fi




envsubst '${PORT},${SERVER_NAME},${ANGULAR_FORWARD},${ANGULAR_LOCAL}' < /scripts/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g "daemon off;"
