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
```
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

Se podria usar un servicio como:

* [mLab](https://mlab.com/)

Una vez obtenida la url de tu base de datos deberas añadirla al archivo .env y seguir los mismos pasos que si fuera un api sin mongo es decir:

* Generar el Dockerfile
* Generar el .dockerignore
* Crear la imagen de Docker
* Crear el contenedor de Docker