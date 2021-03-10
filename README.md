*QRVEY APP*
----
  API Rest service for manage tasks.

* **URL Base**
  _https://qrvey.herokuapp.com/_

* **Create Project**

  _Create a new project_

* **URL**

  _/api/Project_

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
