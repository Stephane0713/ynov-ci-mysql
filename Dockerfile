FROM mysql:latest

LABEL key=stephaned2205@gmail.com

COPY ./sql/*.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
