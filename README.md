endpoints for front-end:

GET “/api/auth/linkedin” : log in to linkedin
GET “/api/users/currentUser” : check if there is a user logged in
POST “/api/users” : user signup/add user, returns 201 status, else, if there is already a user with that email, return 409 status
POST “/api/auth/local” : login, returns 200 status
GET “/api/auth/logout” : logout, returns 200 status