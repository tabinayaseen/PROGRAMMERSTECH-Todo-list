const taskList = document.getElementById('task-list');

const taskForm = document.getElementById('task-form');

const taskInput = document.getElementById('task-input');

const addTaskBtn = document.getElementById('add-task-btn');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item list-group-item';
        taskItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="btn btn-warning" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        saveTasksToLocalStorage();
    }
}

function editTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.text = prompt('Edit task:', task.text);
        renderTasks();
        saveTasksToLocalStorage();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
       tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

addTaskBtn.addEventListener('click', addTask);
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

loadTasksFromLocalStorage();