# Utilizamos la imagen oficial de Nginx como base
FROM nginx

# Crear directorio para logs y dar permisos
RUN mkdir -p /var/log/nginx && chown -R nginx:nginx /var/log/nginx

# Copiamos el archivo de configuración personalizado al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Copiamos los certificados directamente en las carpetas correspondientes
COPY ./etc/ssl/certs/cert.pem /etc/ssl/certs/
COPY ./etc/ssl/private/key.pem /etc/ssl/private/

# Exponemos los puertos en los que Nginx escuchará
EXPOSE 443

# Comando para iniciar Nginx en primer plano al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]
