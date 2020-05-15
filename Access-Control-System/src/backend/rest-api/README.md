# Simple HTTP Web - Server

## Cloning repository

cd ~/workspace/src/github.com/  

git clone https://github.com/sweta-chauhan/pucsd2020-pp.git 

## Configuration details 

Details must be checked and put in rest-api.cfg file

```

cd /etc
mkdir myproject
cp resource/config/configuration.cfg /etc/myproject/configuration.cfg

```

## HOW TO COMPILE

	*	cd ~/workspace/src/github.com/pucsd2020-pp/Access-Control-System/src/backend/rest-api  

	*   go build

## HOW TO RUN
	*  ./rest-api
	*	go run main.go

## SENDING HTTP REQUEST
Install curl if not already installed.  

command : apt install curl

API format
	* GET
		*	To create
			Data is to be provided for all the following API calls.
			1	User 
					```http://localhost:9090/webapi/v1/user```
			2	Group
					```http://localhost:9090/webapi/v1/group```
			3	GroupUser
					```http://localhost:9090/webapi/v1/groupuser```
			4	Resource
				```http://localhost:9090/webapi/v1/resource```
			5	ResourceType
				```http://localhost:9090/webapi/v1/rtype```
			6	GroupAccess
				```http://localhost:9090/webapi/v1/groupaccess```
			7	UserAccess
				```http://localhost:9090/webapi/v1/useraccess```
		* 	GetAll
			1	User 
					```http://localhost:9090/webapi/v1/user```
			2	Group
					```http://localhost:9090/webapi/v1/group```
			3	GroupUser
					```http://localhost:9090/webapi/v1/groupuser```
			4	Resource
				```http://localhost:9090/webapi/v1/resource```
			5	ResourceType
				```http://localhost:9090/webapi/v1/rtype```
			6	GroupAccess
				```http://localhost:9090/webapi/v1/groupaccess```
			7	UserAccess
				```http://localhost:9090/webapi/v1/useraccess```
		* GetByAnyCol
			1	User 	
			2	Group
			3	GroupUser
				```http://localhost:9090/webapi/v1/users/1```
			4	Resource
			5	ResourceType
			6	GroupAccess
			7	UserAccess
	* PUT 
		*	Update
			1	User 	
			2	Group
			3	GroupUser
			4	Resource
			5	ResourceType
			6	GroupAccess
			7	UserAccess
	* POST
		*	Delete
			1	User 	
			2	Group
			3	GroupUser
			4	Resource
			5	ResourceType
			6	GroupAccess
			7	UserAccess
