# Dockerizar_un_api_con_Node.js
Repositorio que trata sobre como Dockerizar un api rest de Node.js con MongoDB y sin MongoDB
Guia para la asignuatura:
* Sistemas de Gestión Empresarial

Proyectos para dockerizar de Node.js.


***

## Dockerizar un api rest Node.js sin MongoDB
En este caso vamos a dockerizar un api rest sobre monumentos la cual tiene implementada seguridad por roles

docker build -t dani/node-api-rest .
docker run --name apirestnode -p 9000:3000 -d dani/node-api-rest