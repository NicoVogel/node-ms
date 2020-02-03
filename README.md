# Microservice Communication evalutaion

This project aim to compare multiple aspects which are related to nodejs microservice communication. To speedup the developement time project
generation is used. All microservices as well as gatways are generated with yoeman and the generater 
[rznode](https://github.com/odedlevy02/rznode)

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
