# Utiliza una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila los archivos de producción de React
RUN npm run build

# Expone el puerto 3000 para acceder a la aplicación desde fuera del contenedor
EXPOSE 3000

# Define el comando predeterminado para ejecutar la aplicación dentro del contenedor
CMD ["npm", "start"]