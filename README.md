# kanban
_______________________

## Deployment Link
[click here](https://k4nban.firebaseapp.com)
_______________________

## Postman Documentation
Click this link if you want to see the detail example request and response:
[click here](https://documenter.getpostman.com/view/10570997/SzS2vncz)
_______________________

## REST API Documentation

### Tasks Route:

Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/tasks | GET | token | none | Read All User's Task
/tasks/:id | GET | token | none | Read one User's Task by Id
/tasks | POST | token | title: string, description: string, due_date: date | Create User's Task
/tasks/:id | PUT | token | title: string, description: string, due_date: date, status: boolean | Edit User's Task by Id
/tasks/:id | DELETE | token | none | Delete User's Task by Id

### User Routing:

Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | ---
/users/login | POST | none | email: string, password: string | Login User
/users/register | POST | none | name: string, email: string, password: string | Create New User
/users/googleLogin | POST | none | name: string, email: string, password: string | Create New User with Google OAuth 2.0
