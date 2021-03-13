*QRVEY APP*
----
  API Rest service for managing tasks.
  
  **Run**
    ***dev*** `npm run start:dev`<br />
    ***prod*** `npm run start` <br />
    ***test*** `npm run test` <br />
    ***docker-compose*** `docker-compose up --build`

* **URL Base**
  _For consume these services, you need to put in request headers the next bearer token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODczMTY2NjcsImlzcyI6ImxldmVsdXBzb2Z0LmNvbSIsImF1ZCI6ImxldmVsdXBzb2Z0LmNvbSJ9.7EDT9dnLAgcFXRsKmgcPw8BVieDUJFJuGvJ9t4JfwAI_
  _https://qrvey.herokuapp.com/_

* **Create Project**

  _Create a new project_

* **URL**

  _/api/project_

* **Method:**

  `POST`
  
*  **URL Params**

   _None_

* **Data Params**

   **Required:**
 
   `{
    "name": [string:required],
    "user": [string:required]
    }`

   **Optional:**
   
   _None_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: [newProject] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
 ----
 
 * **Get Projects**

  _Get a list of projects by user id_

* **URL**

  _/api/project/[uid]  _

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `[uid]: string` 
   _User id_

* **Data Params**

   _None_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: [project[]] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
----

 * **Add tasks**

  _Add a list of task to one project_

* **URL**

  _/api/project/[pid]/add-tasks_

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `[pid]: string` 
   _Project id_

* **Data Params**

  `[{
    "name": [string], 
    "duration": [number],
    "hours": [number], 
    "minutes": [number], 
    "seconds": [number], 
    "status": [string] //only ['CREATED', 'ENDED', 'PAUSED', 'STARTED'] are allowed
    }]`
    
   _Array of objects_
   _Note: You can set either duration (in seconds) nor hours, minutes and seconds. If you set both, the fields hours, minutes and seconds have priority, otherwise, app throws      an error_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
----

 * **Edit project**

  _Edit an specific project_

* **URL**

  _/api/project/[pid]_

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `[pid]: string` 
   _Project id_

* **Data Params**

  `{
    "active": [boolean],
    "name": [string],
    "user": [string]
    }`
    
   _Note:You can skip the fields you don't want to modify_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
----

* **Get tasks**

  _Get a list of tasks by user id_

* **URL**

  _/api/task/[uid]_

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `[uid]: string` 
   _User id_

* **Data Params**
    
   _None_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `"success": true,
    "data": [
        {"_id": [string],
        "status": [string],
        "createAt": [Date],
        "user": {
            "name": [string],
            "lastName": [string]
        },
        "name": [string],
        "duration": [number],
        "project": [string]
        }]`
        
     _Note: Duration field is in seconds and project field is the name of task's project_
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
----

* **Create a task**

  _Create a new task_

* **URL**

  _/api/task_

* **Method:**

  `POST`
  
*  **URL Params**
    _None_

* **Data Params**

  `{
    "name": [string], 
    "duration": [number],
    "hours": [number], 
    "minutes": [number], 
    "seconds": [number],
    "project": [string]
    }`
    
   _Note: You can set either duration (in seconds) nor hours, minutes and seconds. If you set both, the fields hours, minutes and seconds have priority, otherwise, app throws      an error. <br />The field project is the project id_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: newTask }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
----

* **Task traking services**

  _Manage time tasks_

* **URL**

  _/api/task/[tid]/start-task <br />Start a task_

  _/api/task/[tid]/pause-task <br />Pause a task_
  
  _/api/task/[tid]/stop-task <br />Stop a task_

  _/api/task/[tid]/restart-task <br />Restart a task_

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `[tid]: string` 
   _Task id_

* **Data Params**

  _None_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: taskData }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
    
 ----
 
 * **Edit a task**

  _Create a new task_

* **URL**

  _/api/task/[tid]_

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `[tid]: string` 
   _Task id_

* **Data Params**

  `{
    "name": [string], 
    "duration": [number],
    "hours": [number], 
    "minutes": [number], 
    "seconds": [number],
    "project": [string],
    "status": [string] //only ['CREATED', 'ENDED', 'PAUSED', 'STARTED'] are allowed
    }`
    
   _Note: You can set either duration (in seconds) nor hours, minutes and seconds. If you set both, the fields hours, minutes and seconds have priority, otherwise, app throws      an error. <br />The field project is the project id_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: updatedTask }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
    
----

* **Create a user**

  _Create a new user_

* **URL**

  _/api/user_

* **Method:**

  `POST`
  
*  **URL Params**
    _None_

* **Data Params**

  `{
    "name": [string:required],
    "lastName": [string:required],
    "username": [string:required],
    "password": [string:required]
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: newUser }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
    
----

* **Edit a user**

  _Edit a user_

* **URL**

  _/api/user/[uid]_

* **Method:**

  `PUT`
  
*  **URL Params**
    
   **Required**
   `[uid]: string`
   _User id_

* **Data Params**

  `{
    "name": [string:required],
    "lastName": [string:required],
    "username": [string:required],
    "password": [string:required],
    "active": [boolean]
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: updatedUser }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
    
----

* **Get users**

  _Get a list of users_

* **URL**

  _/api/user_

* **Method:**

  `GET`
  
*  **URL Params**
    
   _None_

* **Data Params**
  _None_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "success": true,
    "data": [
        {
          "_id": [string],
          "name": [string],
          "username": [string],
          "lastName": [string],
          "projects": [
              {
                  "_id": [string],
                  "name": [string],
                  "tasks": [
                      {
                          "_id": [string],
                          "status": [string],
                          "active": [boolean],
                          "name": [string],
                          "project": [string],
                          "createAt": [Date],
                          "duration": [number],
                          "timerecords": [string]
                      },
                  ],
                  "duration": [number]
              }
          ],
          "duration": [number]
      }
  ]
}`

    _Note: duration fields are in seconds. Timerecords is an array of all task's time records in the system_
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`
