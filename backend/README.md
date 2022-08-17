POST Request - "https://cycle-rent-vit.herokuapp.com/user/login"

payload:

    **Example -**

    {
    username:"user",
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
    name:"user",
    username:"username",
    password:"password",
    confirmPassword:"confirmPassword",
    regno:"regno",
    block:"A",
    room_no:"310",
    phone:"1234567890",
    wa_num:"1234567890"
    }

    **Output - **

    {
    "success": true,
    "message": "Account Created Successfully",
    "id": "62b9e18a7a208375398f2aa5",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjllMThhN2EyMDgzNzUzOThmMmFhNSIsInJvbGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJhYmNkdXNlciIsImlhdCI6MTY1NjM0OTA2NiwiZXhwIjoxNjU2MzUyNjY2fQ.gRL04UciGs6BWu"
    }

GET Request - "https://cycle-rent-vit.herokuapp.com/bike/getBikes"

    **Output - **


    {
    	"success": true,
    	"data": [
    		{
    			"_id": "62fc72e9b320c36430bbc195",
    			"modelName": "Hercules",
    			"company": "Hero",
    			"owner": "Akash",
    			"imageUrl": "shorturl.at/bginQ",
    			"bookstatus": false,
    			"__v": 0
    		}
    	]
    }

POST Request - "https://cycle-rent-vit.herokuapp.com/bike/uploadbikedata"

payload:

    **Example - **
    {
    modelName:"Avenger"
    company:"Special"
    owner:"Aman"
    image: form-data image/type
    }

    **Output - **

    {
    "success": true,
    "message": "Bike Data Added Successfully"
    }
