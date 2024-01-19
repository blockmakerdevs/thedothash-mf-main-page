# Utilizamos la imagen oficial de Nginx como base
FROM nginx

# Copiamos el archivo de configuración personalizado al contenedor
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./etc/ssl/certs/cert.pem /etc/ssl/certs/cert.pem
COPY ./etc/ssl/private/key.pem /etc/ssl/private/key.pem

EXPOSE 80 443

# Comando para iniciar Nginx en primer plano al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]
