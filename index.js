//model
// If the localStorage has a todos array, then use it
// Otherwise use the defult array

let todos;
// Retrieve localStorag
const savedTodos = JSON.parse(localStorage.getItem("todos"));
// Check if its an array
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "get groceries",
      dueDate: "2022 - 06 - 11",
      id: "id1",
    },
    {
      title: "wash car",
      dueDate: "2020 - 05 - 04",
      id: "id2",
    },
    {
      title: "rent a house",
      dueDate: "2023 - 12 - 25",
      id: "id3",
    },
  ];
}
render();
//creates a todo

function createTodo(title, dueDate) {
  const id = "" + new Date().getTime();
  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });
  saveTodo();
}

//delete a todo
function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    //if the id this todo matches the idToDelete, return false
    //else return true

    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodo();
}

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Controller section
function addTodo() {
  let texbox = document.getElementById(`todo-title`);
  let title = texbox.value;
  let datePicker = document.getElementById(`date-picker`);
  let dueDate = datePicker.value;
  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;
  removeTodo(idToDelete);

  render();
}
// View section
function render() {
  // Reset our list
  document.getElementById(`todo-list`).innerHTML = "";
  todos.forEach(function (todo) {
    let element = document.createElement(`div`);
    element.innerHTML = todo.title + " " + todo.dueDate;
    let deleteButton = document.createElement(`button`);
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    deleteButton.style.margin = "30px";
    element.appendChild(deleteButton);
    let todoList = document.getElementById(`todo-list`);
    todoList.appendChild(element);
  });
}
