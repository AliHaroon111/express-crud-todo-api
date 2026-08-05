# Task API — CRUD To-Do List

A small Express.js API that manages an in-memory to-do list: create, read, update, and delete tasks.
Built for FlyRank Internship — Backend Track — Week 2 — Assignment A1.

## What this is

- A REST API with full CRUD on a to-do list, stored in memory (no database).
- Built with Node.js + Express (ESM modules), following an **MVC structure**:
  - `models/` — the in-memory task "database"
  - `controllers/` — business logic and validation for each endpoint
  - `routes/` — maps paths + HTTP methods to controllers
  - `app.js` — wires everything together
  - `server.js` — starts the server
- Interactive API docs via **Swagger UI** at `/docs`.

## How to install & run

```bash
npm install
npm start
```

The server starts on **http://localhost:3000**. Swagger UI is at **http://localhost:3000/docs**.

## Endpoints

| CRUD | Method | Path | Description |
|---|---|---|---|
| — | GET | `/` | API info |
| — | GET | `/health` | Health check |
| Read | GET | `/tasks` | List all tasks (supports `?done=`, `?search=`, `?limit=&offset=`) |
| Read | GET | `/tasks/:id` | Get a single task (404 if not found) |
| Create | POST | `/tasks` | Create a task from `{ "title": "..." }` (400 if title missing/empty) |
| Update | PUT | `/tasks/:id` | Update a task's title and/or done (400 invalid body, 404 unknown id) |
| Delete | DELETE | `/tasks/:id` | Delete a task (204 on success, 404 unknown id) |
| Extra | GET | `/stats` | `{ total, done, open }` counts |
| Extra | POST | `/reset` | Restores the 3 seed tasks |

## Example request

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

![alt text](image.png)

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
...

{"id":4,"title":"Buy milk","done":false}
```

## Swagger UI

![alt text](image-1.png)

## The mortality experiment

I created two new tasks via POST /tasks, then stopped the server with ---> Ctrl+C and ran
npm start again. 
GET /tasks showed only the original 3 seed tasks — the two I added
were gone. This happens because the task list lives only in a JavaScript variable in
memory, when the Node process exits, that variable and everything in it is destroyd,
and the next `npm start` runs the file fresh from its hardcoded seed data.

Experiment:
  - When i run the Get /tasks i see the Seeded task
  After that i created a new one AND again see the Get task List the new one is their.
  However i refresh the page the new one there 
  But when i `RESTART` the server the new created task was Gone!. Only the seeded will be there.
  - Get the Task by ID 
  - Update the Task by ID
  - Delete the Task by ID

## AI vs me (Stage 7 — bonus)


  1. My full prompt to the AI assistant
    Build a REST API in Node.js with Express for managing a to-do list.

  Requirements:

  Tasks have an id, a title, and a done boolean.
  Store tasks in memory, pre-filled with 3 example tasks.
  Endpoints:
  GET / -> returns basic API info as JSON
  GET /health -> returns { status: "ok" }
  GET /tasks -> list all tasks
  GET /tasks/:id -> get one task, 404 if not found
  POST /tasks -> create a task from a JSON body with a title, 400 if title is missing
  PUT /tasks/:id -> update a task's title and/or done, 404 if not found
  DELETE /tasks/:id -> delete a task, 404 if not found
  Use proper HTTP status codes for success and errors.
  Add Swagger UI documentation for the API.
  Organize the code in a clean, maintainable way (MVC style).
  


  **2. What the AI did better**

  It scaffolded the whole MVC structure and every endpoint correctly in one shot, including
  Swagger UI — using `swagger-jsdoc` to generate the spec from route comments instead of a
  hand-written `openapi.json`, which is less to maintain by hand. It also used plain object
  destructuring (`Object.assign(task, updates)`) for PUT, which is more compact than my
  explicit field-by-field update.

  **3. What it got wrong or silently ignored**

  Running my own Stage 4 checkpoint curls against it:
  - `DELETE /tasks/:id` returns `200` with a message body, not `204` with an empty body —
    the spec I gave said "use proper status codes" but didn't name 204 explicitly, and the
    AI defaulted to 200 everywhere instead.
  - `PUT /tasks/:id` with an empty body `{}` returns `200` and just echoes the task
    unchanged, instead of `400`. My prompt said "400 if title is missing" but only in the
    context of POST — I never said PUT should also reject an empty update, so it didn't.
  - No trimming/whitespace validation on `title` — a title of `"   "` would pass validation
    in the AI's version but fail in mine.
  - No filtering, search, or pagination on `GET /tasks` — I never mentioned these, so it
    didn't add them.

  **4. What my prompt forgot to specify**

  - Module system (ESM vs CommonJS) — the AI defaulted to CommonJS (`require`/`module.exports`),
    while I built mine in ESM (`import`/`export`).
  - What "clean, maintainable, MVC style" specifically means in file-naming terms — the AI
    used `taskModel.js`/`taskController.js`/`taskRoutes.js` while I used
    `task.model.js`/`task.controller.js`/`task.routes.js`. Functionally identical, purely
    a naming-convention gap I left open.
  - Exact status code for DELETE (204 vs 200) and whether PUT should validate an empty body —
    both silently decided by the AI in ways that differ from the assignment's actual spec.
  - Whether I wanted a hand-written `openapi.json` or a generated one — the AI chose to
    generate it from `swagger-jsdoc` since I didn't say either way.

  **5. What changed for the rematch**

  I added three lines to the original prompt: "DELETE must return 204 with no body," "PUT
  with an empty body should return 400," and "use ESM import/export syntax." Regenerating
  with those added, the AI's DELETE and PUT responses matched the assignment spec exactly,
  confirming the gaps were entirely due to missing detail in my first prompt, not the AI's
  capability.

## Notes

- Data is in-memory only — restarting the server resets it to the 3 seed tasks.
- No database is used yet — that's next week.