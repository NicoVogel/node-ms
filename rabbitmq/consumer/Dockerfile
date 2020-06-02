FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && ls -al

COPY . .


CMD [ "npm", "start" ]
