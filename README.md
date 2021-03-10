* *QRVEY APP*
----
  API Rest service for manage tasks.

* **BASE URL**
  _https://qrvey.herokuapp.com/_

* **CREATE PROJECT**

  _Create a new project_

* **URL**

  _/api/Project_

* **Method:**

  `POST`
  
*  **URL Params**

   <_None_> 

* **Data Params**

   **Required:**
 
   `name: [string]` 
   _Name of the new project_

   **Optional:**

   `user=[string]`
   _Id of project owner_

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success: true, data: [newProject] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ success: false, errorMessage: [Error] }`

