// models/task.model.js
// The "database" for this assignment: an in-memory list.
// Data lives only in memory - it resets every time the server restarts.

let tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Read chapter 3", done: true },
    { id: 3, title: "Write CRUD API", done: false },
  ];
  let nextId = tasks.length + 1;
  
  export function getAll() {
    return tasks;
  }
  
  export function getById(id) {
    return tasks.find((t) => t.id === id);
  }
  
  export function create({ title }) {
    const newTask = { id: nextId++, title, done: false };
    tasks.push(newTask);
    return newTask;
  }