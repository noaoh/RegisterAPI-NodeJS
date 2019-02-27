FROM postgres
COPY RegisterAPIDataDefinition/Product.sql/ docker-entrypoint-initdb.d/Product.sql
COPY RegisterAPIDataDefinition/Employee.sql/ docker-entrypoint-initdb.d/Employee.sql
EXPOSE 5432
