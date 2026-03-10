# 🚊 Live-Line API
A Node.js, Express, and MongoDB backend API for the app Live-Line where users can create accounts and save their favorite locations 

## Routes 

### 👤 User Routes 
| Method 	| Endpoint       	| Description             	| CRUD Operation 	|
|--------	|----------------	|-------------------------	|----------------	|
| POST   	| /api/users     	| Create new user account 	| Create         	|
| GET    	| /api/users     	| Get all users           	| Read           	|
| GET    	| /api/users/:id 	| Get user by ID          	| Read           	|
| PUT    	| /api/users/:id 	| Update user profile     	| Update         	|
| DELETE 	| /api/users/:id 	| Delete user account     	| Delete         	|


### ⭐️ Favorites Routes 
| Method 	| Endpoint       	| Description             	| CRUD Operation 	|
|--------	|----------------	|-------------------------	|----------------	|
| POST   	| /api/favorites    	| Creates a new favorite location	| Create         	|
| GET    	| /api/favorites     	| Get all the user's favorite locations        	| Read           	|
| GET    	| /api/favorites/:id 	| Get location by ID          	| Read           	|
| PUT    	| /api/favorites/:id 	| Update favorite location information     	| Update         	|
| DELETE 	| /api/favorites/:id 	| Delete favorite location    	| Delete         	|


[Live-Line's front-end](https://github.com/WendolynQuartey/Live-Line_frontend)

#### Resources
- Transitland API