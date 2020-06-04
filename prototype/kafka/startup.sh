#!/bin/bash

# clear first
docker-compose down -v

# start
docker-compose up --build --scale consumer=10