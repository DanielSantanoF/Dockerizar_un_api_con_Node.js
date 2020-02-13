# Dockerizar_un_api_con_Node.js
Repositorio que trata sobre como Dockerizar un api rest de Node.js con MongoDB y sin MongoDB
Guia para la asignuatura:
* Sistemas de Gestión Empresarial

Proyectos para dockerizar de Node.js.


***

## Dockerizar un api rest Node.js sin MongoDB
En este caso vamos a dockerizar un api rest sobre monumentos la cual tiene implementada seguridad por roles

Va a ser necesario generar el Dockerfile y el .dockerignore necesarios para poder generar la imagen de Docker ambos archivos generados en la raiz del proyecto

El Dockerfile a generar quedara de la siguiente manera:
```Dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]
```

Usamos como imagen base para este Dockerfile la imagen de node en su version 10 (node:10)

El .dockerignore a generar quedara de la siguiente manera:
```
node_modules
npm-debug.log
```

El .dockerignore es esencial dado que no deberemos pasar la carpeta nodemodules a la imagen si no que al crear el Dockerfile indicamos que ejecutase npm install para poder instalar las dependencias necesarias para el api rest

A continuación desde una consola situada en la raiz del proyecto ejecutaremos el comando necesario para generar la imagen de Docker:
```
docker build -t <username>/node-api-rest .
```

Una vez generada la imagen de Docker podemos proceder a crear y ejecutar un contenedor de Docker para comprobar que todo funciona correctamente con el siguiente comando:
```
docker run --name <containername> -p 9000:3000 -d <username>/node-api-rest
```

En este caso hemos enlazado el puerto expuesto del contenedor el 3000 indicado en el Dockerfile al 9000 de nuestro ordenador pero el de nuestro ordenador podria ser cambiado a cualquier otro disponible si el 9000 se encuentra ocupado

***

## Dockerizar un api rest Node.js con MongoDB
El proceso es el mismo solo varia el hecho de que al usar mongo deberemos tener la base de datos mongo o bien en otro contenedor o bien en remoto en algun servicio de hosting de base de datos

En el caso del api con Mongo para este ejercicio voy a usar una base de datos remota por lo que sera necesario indicar en las Variables de entorno necesarias en un archivo .env para el Api Rest la url de la base de datos

La insercion de datos de ejemplo se encuentra en el app.js la linea `require('./example_data');` si se comenta esta linea se deshabilita la insercion de datos de ejemplo

Se podria usar un servicio como:

* [mLab](https://mlab.com/)

Una vez obtenida la url de tu base de datos deberas añadirla al archivo .env y seguir los mismos pasos que si fuera un api sin mongo es decir:

* Generar el Dockerfile
* Generar el .dockerignore
* Crear la imagen de Docker
* Crear el contenedor de Docker

***


## Dockerizar un api rest Node.js con MongoDB Usando Docker-compose.yml y contenedor con Mongodb
En este caso usaremos un Dockerfile y un docker-compose.yml desde el cual crearemos el contenedor de base de datos de mongo que usaremos como base de datos del api

La insercion de datos de ejemplo se encuentra en el app.js la linea `require('./example_data');` si se comenta esta linea se deshabilita la insercion de datos de ejemplo

```Dockerfile
FROM node:10

LABEL "sts.salesianostriana.dam"="SALESIANOS TRIANA SAN PEDRO 2DAM"
LABEL maintainer="danielsantanof99@gmail.com"
LABEL version="1.0"


RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json ./
RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]
```

Una vez generado el Dockerfile para la creación de la imagen de Node.js procederemos a crear el docker-compose.yml para generar los dos contenedores y tener nuestra api de Node.js funcional usando un contenedor que va a ser su base de datos con mongodb

```
version: '2'
services:
    web:
        build: .
        command: npm run start-dev
        depends_on:
            - db
        ports:
            - "9000:3000"
        environment: 
            - MONGODB_URI=mongodb://db:27017/trianaweather
        volumes: 
            - .:/opt/app
            - /opt/app/node_modules
    db:
        image: mongo
        expose: 
            - "27017"
        volumes: 
            - mongodata:/data/db

volumes: 
    mongodata:
```

A continuacion haremos un docker-compose build para comprobar que la creación de Docker funciona como se espera
```
docker-compose build
```

Una vez comprobado que todo funciona generaremos los contenedores para tener nuestra api rest funcionando con el comando
```
docker-compose up -d
```

Tras generar los contenedores podremos hacer uso de nuestra api rest en la ruta `localhost:9000` en este caso debido a que ese es el puerto que hemos indicado en el docker-compose.yml 