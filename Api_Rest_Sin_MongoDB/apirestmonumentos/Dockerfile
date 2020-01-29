FROM node:10

# Creamos el directorio del api rest en la imagen
WORKDIR /usr/src/app

# Instalamos todas las dependencias
# Nos aseguramos de copiar tanto package.json y package-lock.json
COPY package*.json ./

RUN npm install
# Si estas generando el codigo para producción deberas:
# RUN npm ci --only=production

# Recursos Bundle del api rest
COPY . .

# Exponemos el puerto 3000 si esta en uso se cambiara
EXPOSE 3000

CMD [ "node", "./bin/www" ]