# Utilizamos la imagen oficial de Nginx como base
FROM nginx

# Copiamos el archivo de configuración personalizado al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto en el que Nginx escuchará
EXPOSE 80

# Comando para iniciar Nginx en primer plano al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]
