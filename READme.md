##this is a money transfer web application 
this application is made for transferring money from one person to the other 


Process:
created a backend folder and initalized it with package.json and installed express
created a index.js file and imported express into it.
created a routes folder inside backend, created index.js as mainroute handler and installed Router.
in main index.js imported router and forwarded all the incoming requests to main router.
created user.js file and in that created a userrouter and inside routes index.js forwarded the incoming routes of      user routes to the user router.
installed cors and imported in the main index.js and used as middleware because the routes of be and fe are different.
added express.json as middleware because we get json body as input 
installed jsonwebtoken library for generating and verifying the tokens
we created a config.js file and exported a jwtsecret.

user:
created two routes 
1. signup route: we used zod as extra and first layer to check whether any eronous data is coming
    checked whether user exists with the same email id
    if not then we created a user in the database and returned a jwt token
2. signin route: we used zod for the incoming details
    checked with the database with provided username and password
    if yes we returned a jwt token

