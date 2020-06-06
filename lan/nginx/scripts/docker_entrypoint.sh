#!/bin/sh

if [[ -z "${DEPLOY_ENV}" ]]; then
  export ANGULAR_LOCAL="root /app;"
  read -r -d '' REDIRECT_INDEX << EOM
  location / {
            try_files \$uri \$uri/ /index.html;
            add_header Cache-Control "public";
        }
EOM
  export REDIRECT_INDEX
else
  read -r -d '' ANGULAR_FORWARD << EOM
location /{
            proxy_pass         http://172.17.0.1:4200;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_redirect     off;
            proxy_set_header   Host \$host;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade \$http_upgrade;
            proxy_set_header   Connection "Upgrade";
        }
EOM
  export ANGULAR_FORWARD
fi


envsubst '${PORT},${SERVER_NAME},${ANGULAR_FORWARD},${ANGULAR_LOCAL}, ${REDIRECT_INDEX}, ${MONGO_PORT}' < /scripts/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g "daemon off;"
