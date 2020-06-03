#!/bin/sh

envsubst '${PORT},${SERVER_NAME},${EXPIRES}' < /scripts/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g "daemon off;"
