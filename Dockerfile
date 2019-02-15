FROM postgres
COPY RegisterAPIDataDefinition/Product.sql /docker-entrypoint-initdb.d/Product.sql
EXPOSE 5432
