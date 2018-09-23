// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on todo-data, waitinglist, etc.
// ===============================================================================

const todos = require('../data/todos.js');

// Sample todo is a dummy todo for validation purposes
const sampleTodo = require('../data/sample-todo.json');



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // API Requests for /api/todos
  // Below code controls what happens when a request is made to /api/todos

  // GET Request
  // Responds with all the currently reserved todos
  app.get('/api/todos', function (req, res) {
    res.json(todos);
  });

  // POST Request
  // Adds a new todo to our data collection
  // Responds with success: true or false if successful
  app.post('/api/todos', function (req, res) {

    // Checks to make sure every property on the req.body is also on sampleTodo
    // If it's not, returns with success: false and exits the function
    for (let key in req.body) {
      if (!sampleTodo.hasOwnProperty(key)) {
        return res.json({
          success: false
        });
      }
    }

    // Checks to make sure every property on the sampleTodo is also on req.body
    // If it's not, returns with success: false and exits the function
    for (let key in sampleTodo) {
      if (!req.body.hasOwnProperty(key)) {
        return res.json({
          success: false
        });
      }
    }

    const confirmation = { success: true };

    // ensrue boolean values
    req.body.completed = req.body.completed === 'true';

    // ADD THE TODO
    todos.push(req.body);

    // Send back a confirmation the POST was successfully processed to end the response
    res.json(confirmation);
  });

  // API Requests for /api/todos/:index
  // Below code controls what happens when a request is made to /api/todos/:index

  // example: GET /api/todo/0
  // GET Request
  // Responds with just the requested todo at the referenced index
  app.get('/api/todos/:index', function (req, res) {
    res.json(todos[req.params.index]);
  });

  // PUT Request
  // Replaces the todo at the referenced index with the one provided
  // Responds with success: true or false if successful
  app.put('/api/todos/:index', function (req, res) {

    // Using the same validation as our POST route to check if the included data is valid
    // Checks to make sure every property on the req.body is also on sampleTodo
    // If it's not, returns with success: false and exits the function
    for (let key in req.body) {
      if (!sampleTodo.hasOwnProperty(key)) {
        return res.json({
          success: false
        });
      }
    }

    // Checks to make sure every property on the sampleTodo is also on req.body
    // If it's not, returns with success: false and exits the function
    for (let key in sampleTodo) {
      if (!req.body.hasOwnProperty(key)) {
        return res.json({
          success: false
        });
      }
    }

    // ensrue boolean values
    req.body.completed = req.body.completed === 'true';

    // Replace the referenced todo with the one provided in the body
    todos.splice(req.params.index, 1, req.body);
    res.json({
      success: true
    });
  });

  // DELETE Request
  // Removes the todo at the referenced index
  // If there are todos on the waiting list, moves them to the reserved todos list
  // Responds with success: true or false if successful
  app.delete('/api/todos/:index', function (req, res) {

    // Remove the referenced todo from the todos
    todos.splice(req.params.index, 1);

    // Respond that this operation was successfully completed
    res.json({
      success: true
    });
  });
}