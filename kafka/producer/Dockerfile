FROM node:alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install

FROM node:alpine

WORKDIR /usr/src/app
COPY . .
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

CMD [ "npm", "start" ]