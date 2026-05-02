//script.js
let tasks = JSON.parse
    (localStorage.getItem('tasks')) || [];

document.addEventListener
    ("DOMContentLoaded", function () {
        renderTasks();
    });

// Function to render tasks on the board
function renderTasks() {
    const columns =
        ['todo', 'in-progress', 'done'];

    columns.forEach(columnId => {
        const column =
            document.getElementById(columnId);
        column.querySelector('.task-container').
            innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement =
                    createTaskElement(task.content, task.id);
                column.querySelector('.task-container').
                    appendChild(taskElement);
            }
        });
    });
}

// Function to create a task element
function createTaskElement(content, id) {
    const taskId = id
    const task = document.createElement("div");
    task.id = taskId;
    task.className = "task";
    task.draggable = true;
    task.innerHTML =
        `${content}
    <span class="delete-btn" 
        onclick="deleteTask('${taskId}')">
        ❌
    </span>`;
    task.addEventListener("dragstart", drag);
    return task;
}


// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.
        filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

// Drag and drop functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.
        setData("text/plain", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    console.log(columnId)
    const data = event.
        dataTransfer.getData("text/plain");
    const draggedElement =
        document.getElementById(data);
    console.log(draggedElement)
    if (draggedElement) {
        const taskStatus = columnId;
        updateTaskStatus(data, taskStatus);
        event.target.querySelector('.task-container').
            appendChild(draggedElement);
    }
}

// Function to capitalize input text
function capitalizeInput(input) {
    input.value = input.value.toUpperCase();
}

// Function to add a new task
function addTask(columnId) {
    const taskInput =
        document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: taskContent,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

// Function to update task status 
// when moved to another column
function updateTaskStatus(taskId, newStatus) {
    console.log(newStatus)
    tasks = tasks.map(task => {
        console.log(task)
        console.log(taskId)
        if (task.id === taskId) {
            console.log("inside if")
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

// Function to update local 
// storage with current tasks
function updateLocalStorage() {
    console.log("task update")
    localStorage.setItem
        ('tasks', JSON.stringify(tasks));
}

//Passworteingabe
// Elemente für das Login-Dialog
const dialog = document.getElementById("loginDialog");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const statusText = document.getElementById("status");

// Dialog beim Laden öffnen
document.addEventListener("DOMContentLoaded", function () {
  renderTasks();

  if (dialog) {
    dialog.showModal();
  }
});

// Passwort anzeigen oder verbergen
if (toggleBtn && passwordInput && statusText) {
  toggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.textContent = "Verbergen";
      statusText.textContent = "Das Passwort ist sichtbar.";
    } else {
      passwordInput.type = "password";
      toggleBtn.textContent = "Anzeigen";
      statusText.textContent = "Das Passwort ist verborgen.";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length > 0) {
      statusText.textContent = "Es wurde ein Passwort eingegeben.";
    } else {
      statusText.textContent = "Bitte gib dein Passwort ein.";
    }
  });
}

// Login prüfen
if (loginForm && passwordInput && statusText && dialog) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const richtigesPasswort = "test123";

    if (passwordInput.value === richtigesPasswort) {
      dialog.close();
    } else {
      statusText.textContent = "Falsches Passwort.";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });
}