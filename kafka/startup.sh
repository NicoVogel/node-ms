#!/bin/bash

kafkaBuildDir="kafka-build"

# clone kafka if needed
if [ ! -d "$kafkaBuildDir" ]; then
    echo "kafka is missing, therfore cloneing the repo..."
    git clone --depth=1 --branch=master https://github.com/wurstmeister/kafka-docker $kafkaBuildDir
fi

echo "build kafka..."
docker build --tag localkafka $kafkaBuildDir

echo "start compose..."
docker-compose up
