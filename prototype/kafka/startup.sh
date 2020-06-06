#!/bin/bash

echo "KAFKA_ADVERTISED_HOST_NAME=$(dig +short myip.opendns.com @resolver1.opendns.com)" > .env & wait
echo "created .env file" 
cat .env

# clear first
docker-compose down -v

# start
docker-compose up --build --scale consumer=10