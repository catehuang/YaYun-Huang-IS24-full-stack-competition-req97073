## How to run this program?
* Install packages for app
  - Change to backend folder, and install node package (npm install)
  - Move back to the main folder, and install node package and required libraries (npm install && yarn install) 
* Run programs
  - Change to backend folder to run server (node server.js). The server will run on port 3000
  - Move back to main folder to run frontend (npm start). The frontend will run in port 3001
  
  
## Functions
* List all products stored in a file (db.json)
* Unauthorized users can add new products after filling in all required information (except the product Id)
* Unauthorized users can edit product related information except the product Id
* Can search for a specific Scrum Master and see all products related to the Scrum Master and a total number of related products
* Can search for a specific developer and see all products related to the developer and a total number of related products


## URLs
* The endpoint of API is http://localhost:3000/api
* The URL for Swagger documentation is http://localhost:3000/api/api-docs
* The landing/home page is http://localhost:3001
