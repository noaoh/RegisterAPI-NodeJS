FROM postgres
COPY RegisterAPIDataDefinition/Init.sql docker-entrypoint-initdb.d/Init.sql
EXPOSE 5432
