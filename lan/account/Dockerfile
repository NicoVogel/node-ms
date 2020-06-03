FROM node:12-alpine3.11

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# interactive
RUN npm install -g nodemon
CMD [ "nodemon", "./dist/index.js" ]

#operation
# CMD [ "npm", "start" ]