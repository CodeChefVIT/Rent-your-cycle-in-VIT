
POST Request - "https://cycle-rent-vit.herokuapp.com/user/login"

payload:

	**Example -** 

	{
	username:"user"
	password:"password"
	}
	
	
	**Output**
	{
	"success": true,
	"message": "Logged In Successful",
	"id": "62b9e18a7a208375398f2aa5",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjllMThhN2EyMDgzNzUzOThmMmFhNSIsInJvbGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJhYmNkdXNlciIsImlhdCI6MTY1NjM0OTk3OSwiZXhwIjoxNjU2MzUzNTc5fQ.oKtHRYpQhRdQ"

	}
 
<br/><br/>
POST Request - "https://cycle-rent-vit.herokuapp.com/user/register"

payload:
	
	**Example - **
	
	{
		name:"name"
		username:"username"
		password:"password"
		confirmPassword:"confirmPassword"
		email:"email"
	}


	**Output - **
	{

	"success": true,

	"message": "Account Created Successfully",

	"id": "62b9e18a7a208375398f2aa5",

	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjllMThhN2EyMDgzNzUzOThmMmFhNSIsInJvbGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJhYmNkdXNlciIsImlhdCI6MTY1NjM0OTA2NiwiZXhwIjoxNjU2MzUyNjY2fQ.gRL04UciGs6BWu"

	}	