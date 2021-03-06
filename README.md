 # Basic description
RESTful API that interacts with a PostgreSQL database. Implemented in NodeJS with typescript, restify, and the sequelize ORM. Edited in Visual Studio Code.  
  
If a "PORT" environment variable has not been defined then the application currently defaults to port 15100 (see ./src/server.ts).  
  
To start via the terminal navigate to the source code directory and run the following commands (after install "rebuild" will be run automatically)...  
`$ export DATABASE_URL="postgresql://user@ip:port/database" (For the docker container, I had user=postgres, ip=0.0.0.0, port=5432, and database=postgres)
`$ npm install`  
`$ npm run (re)build`  
`$ npm run start` 

 # Example HTTP requests via cURL (be sure to update as needed)
 ## Product API
 ### Create a product
`curl -i -s -H "Content-Type: application/json" -X POST -d '{"lookupCode":"lookupcode4","count":175}' https://uarkregservnodejsapi.herokuapp.com/api/product/`  
 ### Update an existing product by record ID
`curl -i -s -H "Content-Type: application/json" -X PUT -d '{"id":"bee20aed-5245-46a7-b19c-9ef6abd4ca5c","lookupCode":"lookupcode4","count":200}' https://uarkregservnodejsapi.herokuapp.com/api/product/bee20aed-5245-46a7-b19c-9ef6abd4ca5c`  
 ### Delete an existing product by record ID
`curl -i -s -X DELETE https://uarkregservnodejsapi.herokuapp.com/api/product/bee20aed-5245-46a7-b19c-9ef6abd4ca5c`  
 ### Delete all existing products
`curl -i -s -X DELETE https://uarkregservnodejsapi.herokuapp.com/api/product`  
 ### Get all products
 `curl -i -s -X GET https://uarkregservnodejsapi.herokuapp.com/api/product`
 ### Get a product by record ID
 `curl -i -s -X GET https://uarkregservnodejsapi.herokuapp.com/api/product/3879320d-146d`
 ### Get a product by lookup code
 `curl -i -s -X GET https://uarkregservnodejsapi.herokuapp.com/api/product/bylookupcode/lookupcode1`
 
 ## Employee API
 ### Create an employee
 `curl -i -s -H "Content-Type: application/json" -X POST -d '{"lastName": "Holt", "firstName": "Steve", "active": "0", "classification": "Jock", "password": "bigyeet101"}' https://uarkregservnodejsapi.herokuapp.com/api/employee` 
 ### Update an existing employee by UUID
 `curl -i -s -H "Content-Type: application/json" -X PUT -d '{"id": "84b6818c-1a4d-47ad-8868-15189960e297", "lastName": "Ever", "firstName": "Greatest", "active": "1", "classification": "Assistant to the Regional Manager", "password": "bigyeet101"}' https://uarkregservenodejsapi.herokuapp.com/api/employee/84b6818c-1a4d-47ad-8868-15189960e297-4a81-a91e-f1b9e909ed0d`
 ### Delete all existing employees
 `curl -i -s -X DELETE https://uarkregservenodejsapi.herokuapp.com/api/employee`
 ### Get all employees
 `curl -i -s -X GET https://uarkregservenodejsapi.herokuapp.com/api/employee`
 ### Get an employee by UUID
 `curl -i -s -X GET https://uarkregservenodejsapi.herokuapp.com/api/employee/15a5cb61-5651-47ba-80d7-cdd61f38716e`
 ### Get an employee by employee_id 
 `curl -i -s -X GET https://uarkregservenodejsapi.herokuapp.com/api/employee/byemployeeid/12345`
