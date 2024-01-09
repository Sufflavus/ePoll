## REST API docs

Documentation of used API

------------------------------------------------------------------------------------------

#### Listing existing polls

<details>
 <summary><code>GET</code> <code><b>/polls</b></code> <code>(List all existing polls)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                         |
> |---------------|-----------------------------------|----------------------------------|
> | `200`         | `application/json`                | JSON                             |

##### Response Example

> ```
> {
>     "polls": [
>         {
>             "id": 1,
>             "title": "What is your favorite drink?"
>         },
>         {
>             "id": 2,
>             "title": "Is this a cool question?"
>         }
>     ]
> }
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/polls/{id}</b></code> <code>(Get a poll by {id})</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | int            | Poll's id                           |

##### Responses

> | http code     | content-type                      | response                                        |
> |---------------|-----------------------------------|-------------------------------------------------|
> | `200`         | `application/json`                | JSON object                                     |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`        |

##### Response Example

> ```
> {
>     "id": 2,
>     "title": "Is this a cool question?",
>     "options": [
>         {
>             "id": 1,
>             "title": "Yes",
>             "votes": 0
>         },
>         {
>             "id": 2,
>             "title": "No",
>             "votes": 0
>         },
>         {
>             "id": 3,
>             "title": "Cool, another option",
>             "votes": 0
>         }
>     ]
> }
> ```

##### Comments

If a poll was not found, the response is ampty string

</details>

------------------------------------------------------------------------------------------

#### Creating new poll and voting

<details>
 <summary><code>POST</code> <code><b>/polls/add</b></code> <code>(Create new poll)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                 |
> |-----------|-----------|-------------------------|---------------------------------------------|
> | None      |  required | object (JSON)           | New poll                                    |


##### Responses

> | http code     | content-type                      | response                                  |
> |---------------|-----------------------------------|-------------------------------------------|
> | `200`         | `application/json`                | Added poll (JSON object)                  |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`  |

##### Example of POST Body

> ```
> {
>     "title": "Test qestion?",
>     "options":[
>         "Option 1?",
>         "Option 2?"
>     ]
> }
> ```

##### Response Example

> ```
> {
>     "id": 3,
>     "title": "Test qestion?",
>     "options": [
>         {
>             "id": 1,
>             "title": "Option 1?",
>             "votes": 0
>         },
>         {
>             "id": 2,
>             "title": "Option 2?",
>             "votes": 0
>         }
>    ]
> }
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/polls/{id}/vote/{option}</b></code> <code>(Create new poll)</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                 |
> |-----------|-----------|-------------------------|---------------------------------------------|
> | `id`      |  required | int                     | Id of the poll to vote in                   |
> | `option`  |  required | int                     | Id of the option to vote for                |


##### Responses

> | http code     | content-type                      | response                                  |
> |---------------|-----------------------------------|-------------------------------------------|
> | `200`         | `application/json; charset=utf-8` | Updated poll (JSON)                       |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`  |

##### Response Example

> ```
> {
>     "id": 2,
>     "title": "Is this a cool question?",
>     "options": [
>         {
>             "id": 1,
>             "title": "Yes",
>             "votes": 0
>         },
>         {
>             "id": 2,
>             "title": "No",
>             "votes": 1
>         },
>         {
>             "id": 3,
>             "title": "Cool, another option",
>             "votes": 0
>         }
>    ]
> }
> ```

</details>

------------------------------------------------------------------------------------------