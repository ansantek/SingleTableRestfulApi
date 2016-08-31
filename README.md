# Single Table Restful API

This application is a simple restful API for accessing a single table in a MySQL database,
suitable for use during development and testing.
The application is initiated by the command "node bin/app" issued while located in the project root directory.
The application is configured via a configuration file, SingleTableRestfulApi.cfg located 
in the project root directory.

The application implements the following api endpoints on port 3002:

Method | Endpoint | Description  
-------- | ------------ | ------
get | /SingleTable | Get all records from the target table  
get | /SingleTable/:id | Get record who keyField==:id  
get | /SingleTable/:offset/:limit | Get the range of records specified  
post | /SingleTable | Add record to table
put | /SingleTable/:id | Update record in table
delete | /SingleTable/:id | Delete specified record from table

The application is configured via the configuration file: SingleTableRestfulAPI.cfg.
The configuration file is a JSON string as follows:

{  
    "host":"mysql_server",  
    "database":"database_name",  
    "user":"username",  
    "password":"userpassword",  
    "tableName":"sometablename",  
    "keyFieldName":"somefieldname"  
}  

