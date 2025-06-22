# mongoose-web-api
A mongoose-based web API for manipulating MongoDB databases.




## Setup
1. In Git Bash, install the necessary modules with:\
`npm install`

2. In the project folder, create a file named `.env`. The contents of this file should look like this:
```
MONGO_URI = 
```
Under `MONGO_URI`, put your MongoDB cluster's connection string. This can be found on the MongoDB website.




## HTTP Methods


### `GET`

<details>
  <summary><code>`/api/collections`</code></summary>

  ---
  > #### `GET` Returns a list of collections in the current database.
  - Responses
    - `200`: JSON object
  ---
</details>
<details>
  <summary><code>`/api/sandbox`</code></summary>

  ---
  > #### `GET` Returns a list of documents in the Sandboxes collection.
  - Request body (optional)
    > Accepts a MongoDB query
  - Query parameters (optional)
    > *Prioritizes the request body*\
    > `id`: ID of the document.\
    > `name`: Name of the document.
  ---
</details>
<details>
  <summary><code>`/api/sandbox/:id`</code></summary>

  ---
  > #### `GET` Returns a document in the Sandboxes collection.
  - Route parameters (Required)
    > `id`: ID of the document.
  ---
</details>

---


### `POST`

<details>
  <summary><code>`/api/sandbox`</code></summary>

  ---
  ---
</details>

---


### `PATCH`

<details>
  <summary><code>`/api/sandbox/:id`</code></summary>

  ---
  ---
</details>

---


### `PUT`

<details>
  <summary><code>`/api/switch_database/:database`</code></summary>

  ---
  - Route parameters (Required)
    > `database`: Name of the database to switch to
  - Responses
    - `200`: JSON
  ---
</details>

---


### `DELETE`

<details>
  <summary><code>`/api/sandbox/:id`</code></summary>

  ---
  ---
</details>

---