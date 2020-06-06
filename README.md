# Microservice Communication evalutaion

This project aim to compare multiple aspects which are related to nodejs microservice communication.
The main project can be found inside the `lan` folder, while the prototypes are located inside `prototype`. 

## LAN Party Application

### Prerequisit

Before starting, you need to eigther create a `.env` file within the `lan` folder or change the following environment variable inside the `docker-compose.yml` file.

Set the domain name of the server as value for `SERVER_NAME` inside `.env` or `docker-compose.yml`.
If you do not have a domain, use `localhost`.

### Startup

To start the application navigate into the `lan` folder and use `docker-compose up` to startup the project.

### URL's

Everythin is accassible through nginx.
Thus the following urls are available.

> domain equals the provided `SERVER_NAME` value

|url|service|
|---|---|
|domain|angular website|
|domain/api/account|account service rest endpoint|
|domain/api/event|event service rest endpoint|
|domain/api/billing|billing service rest endpoint|
|mgnt.domain/metric|grafana ui|
|mgnt.domain/mongo:8080|mongo instance (used to connect with compass)|
|mgnt.domain/rabbitmq|rabbitmq management ui|

User and password overview for the management services (can be configered via `docker-compose.yml`)

|service|user|password|
|---|---|---|
|grafana|admin|admin|
|rabbitmq|guest|guest|
|mongodb for account|account|account|
|mongodb for event|event|event|
|mongodb for billing|billing|billing|

### Debug options

Each service and the angular app feature a live reload support.
This can be enabled via `docker-compose.yml`.

For the services (e.g. account, event, billing) uncomment the environment variable `NODE_ENV` and the volume mount.

Example:

```yml
event:
    build: event
    environment: 
      NODE_ENV: development
    volumes:
      - ./event/src:/app/src
```

For the angular app uncomment the environment variable `DEPLOY_ENV` for nginx.

Example:

```yml
nginx:
    build: nginx
    ports: 
      - 80:80
      - 8080:8080
    depends_on:
      - grafana
    environment: 
      PORT: 80
      MONGO_PORT: 8080
      DEPLOY_ENV: development
      SERVER_NAME: ${SERVER_NAME}
```

And also navigat into the angular code (`lan/nginx/app`) and execute: 

```bash
npm run install
npm run debug
```

### Mongo Databases

There is only one mongodb instance, but it contains several databases, in fact one for each service.
The database users are created within the `lan/mongo-init.js` which is mounted into mongo.

Database names for each service:
|db|service|
|node-ms-account| account|
|node-ms-event| event|
|node-ms-billing| billing|

Mongodb is also accessible via `mgnt.domain/mongo`.
It is archived by using nginx upstream module.
Thus, it uses the port 8080. 

### Nginx

Normaly nginx does not support environment variables in its configuration.
Therfore, a entrypoint script overrides placeholders within the nginx.config.

The scripts are located at `lan/nginx/scripts`.

### Endpoint definitions

A gerneral overview is available within the `lan/shared` folder.
The file `messages.ts` contains all rabbitmq events and there data structure and `rest.ts` shows the endpoints and there required data to use them.

### Blank Service

There is a blank micro service located at `lan/_blankService`.
It contains all neccessary components and is ready to use. 

## Dev Container

To abstract the development environment and ensure the same developer experience on each machine Dev Container is used. The extension is called
`Remote - Containers`. There is a good explanation for the extension in the vs code docs: 
[Developing inside a Container](https://code.visualstudio.com/docs/remote/containers)

Reqiements to startup the project:

- Docker *running*
- VS Code *running*
- Remote - Containers extension

Steps:

1. Open the cloned repo in VS Code
2. Select `Remote-Container: Reopen in Container` in the VS Code action bar

This will build the Dockerfile and show all files in your VS Code as soon as the build is finished. Now the dev environment is setup.
