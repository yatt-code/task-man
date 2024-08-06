/* 
1. Prepare the ingredients
2. What components are the app going to have?
3. What are the functionalities of the app?
4. How are the components going to interact with each other?
*/

// Select DOM Elements

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const priorityFilter = document.querySelector(".filter-priority");

// Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
priorityFilter.addEventListener("click", filterTodo);



// Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to List
  todoList.appendChild(todoDiv);

  
  // Get Selected Priority
  const prioritySelect = document.querySelector(".filter-priority");
  const selectedPriority = prioritySelect.value; // Get the selected value
  
  // Add Priority Class
  todoDiv.classList.add("normal");
  
  // Add a data attribute to store the priority (for later use)
  todoDiv.dataset.priority = "normal";
  
  // Add Priority to Local Storage
  saveLocalTodos({ text: todoInput.value, priority: "normal" });

  // Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = Array.from(todoList.children);
  todos.forEach(function (todo) {
    if (todo.nodeType === Node.ELEMENT_NODE) {
      const todoPriority = todo.dataset.priority;

      if (e.target.classList.contains("filter-todo")) {
        // Filter by completion status
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            todo.style.display = todo.classList.contains("completed")
              ? "flex"
              : "none";
            break;
          case "uncompleted":
            todo.style.display = todo.classList.contains("completed")
              ? "none"
              : "flex";
            break;
        }
      } else if (e.target.classList.contains("filter-priority")) {
        // Filter by priority
        if (e.target.value === "all" || todoPriority === e.target.value) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
    }
  });
}

function getTodos() {
  // Clear the existing todo list
  todoList.innerHTML = "";

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log("Retrieved todos from local storage:", todos);

  todos.forEach(function (todo) {
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.text;
    newTodo.classList.add("todo-item");
    console.log("Processing todo:", todo);

    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Append to List
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    // Set the priority information:
    if (todo.priority) {
      const priorityClass = todo.priority === "medium" ? "normal" : todo.priority;
      todoDiv.classList.add(priorityClass); // Add priority class to the todo item
      todoDiv.dataset.priority = priorityClass; // Set the priority in data-attribute
    } else {
      todoDiv.classList.add("normal"); // Default priority
      todoDiv.dataset.priority = "normal"; // Default priority
    }
    todoList.appendChild(todoDiv);
    console.log("Appended todoDiv to todoList");
  });
}

// Save todos to local storage

function saveLocalTodos(todo) {
  console.log("Saving todo:", todo);
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo); // Ensure you're pushing the entire todo object
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoIndex = Array.from(todoList.children).indexOf(todo);
  if (todoIndex > -1) {
    // Check if todoIndex is valid before splicing
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Get todos from local storage
document.addEventListener("DOMContentLoaded", getTodos);


/* 
Forked of code-along project by OneCode Camp 
by Yatt-code
*/