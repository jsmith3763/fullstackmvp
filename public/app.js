//getting text box
const textBox = document.getElementById("textbox");
const listContainer = document.getElementById("todoContainer");
const completedContainer = document.getElementById("completedContainer");
const seeCompleted = document.getElementById("seeCompleted");
const quoteDiv = document.getElementById("quoteContainer");
const pictureDiv = document.getElementById("coffeContainer");
const localUrl = "http://localhost:3000/api/todo/";
const localUrlCompleted = "http://localhost:3000/api/completed/";
const deployedUrlTodo = "https://tranquil-hamlet-82276.herokuapp.com/api/todo/";
const deployedUrlCompleted = "https://tranquil-hamlet-82276.herokuapp.com/api/completed/";


//Event listeners for buttons
textBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        createTask();
        getTaskData();
        textBox.value = "";
    }
})

function deleteButtonEvent(elem) {
    elem.addEventListener("click", (e) => {
        deleteCompletedTask(elem.id);
    })
}

function completeButtonEvent(elem) {
    elem.addEventListener("click", (e) => {
        getOneTask(elem.id);
        deleteTask(elem.id);
    })
}

function updateButtonEvent(elem, taskElem) {
    elem.addEventListener("click", (e) => {
        const updateTextBox = document.createElement("input");
        updateTextBox.id = "updateTextBox";
        updateTextBox.placeholder = "Update task.."
        taskElem.append(updateTextBox);
        updateTextBox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                updateTask(elem.id);
                getTaskData();
            }
        })
    })
}

function seeCompletedEvent(elem) {
    elem.addEventListener("click", (e) => {
        getCompletedTaskData();
    })
}

function seeCurrentEvent(elem) {
    elem.addEventListener("click", (e) => {
        getTaskData();
    })
}


//Pulling from todo table and creating todolist
function createToDoList(data) {
    listContainer.innerHTML = "";
    completedContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const newTask = document.createElement("div");
        const completeButton = document.createElement("button")
        const updateButton = document.createElement("button")
        completeButton.className = "completebutton";
        completeButton.id = data[i].id;
        completeButton.innerText = "Complete";
        updateButton.className = "updatebutton";
        updateButton.id = data[i].id;
        updateButton.innerText = "Update";
        newTask.className = "taskDiv";
        newTask.id = data[i].id;
        newTask.innerText = data[i].task;
        completeButtonEvent(completeButton);
        updateButtonEvent(updateButton, newTask);
        newTask.append(updateButton)
        newTask.append(completeButton);
        listContainer.prepend(newTask);
    }
    const seeCompletedButton = document.createElement("button");
    seeCompletedButton.id = "seeCompleted";
    seeCompletedButton.innerText = "See Completed";
    seeCompletedEvent(seeCompletedButton);
    listContainer.append(seeCompletedButton);
}

//Pulling from completed table and creating completedList
function createCompletedList(data) {
    listContainer.innerHTML = "";
    completedContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const completedTask = document.createElement("div");
        const deleteButton = document.createElement("button")
        deleteButton.className = "completebutton";
        deleteButton.id = data[i].id;
        deleteButton.innerText = "Delete";
        completedTask.className = "taskDiv";
        completedTask.id = data[i].id;
        completedTask.innerText = data[i].task;
        deleteButtonEvent(deleteButton);

        completedTask.append(deleteButton);
        completedContainer.prepend(completedTask);
    }
    const seeCurrentButton = document.createElement("button");
    seeCurrentButton.id = "seeCompleted";
    seeCurrentButton.innerText = "See Current Tasks";
    seeCurrentEvent(seeCurrentButton);
    completedContainer.append(seeCurrentButton);
}

//Get all
async function getTaskData() {
    try {
        const response = await fetch(deployedUrlTodo);
        const data = await response.json();
        createToDoList(data);
    } catch (error) {
        console.error(error)
    }
}

//get one
async function getOneTask(id) {
    try {
        const response = await fetch(`${deployedUrlTodo}${id}`);
        const data = await response.json();
        addToCompletedTable(data);
    } catch (error) {
        console.error(error);
    }
}

//add to completed table
async function addToCompletedTable(data) {
    const task = data[0].task;
    const newTask = {
        task: task
    }
    try {
        const response = await fetch(deployedUrlCompleted, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        const data = await response.json()
    } catch (error) {
        console.error(error);
    }
}



//Create one
async function createTask() {
    const task = document.getElementById('textbox').value;
    const newTask = {
        task: task
    }
    try {
        const response = await fetch(deployedUrlTodo, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

//Update one
async function updateTask(id) {
    console.log(id)
    const task = document.getElementById('updateTextBox').value;
    const update = document.getElementById(id)
    const updateTask = {
        task: task
    }
    try {
        const response = await fetch(`${deployedUrlTodo}${update.id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateTask)
        })
        const data = await response.json()
        task.value = "";
    } catch (error) {
        console.error(error);
    }
}

//delete task from todo table
async function deleteTask(id) {
    const task = document.getElementById(id);
    task.remove();
    try {
        const response = await fetch(`${deployedUrlTodo}${task.id}`, {
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

//delete one from completed table
async function deleteCompletedTask(id) {
    const task = document.getElementById(id);
    task.remove();
    try {
        const response = await fetch(`${deployedUrlCompleted}${task.id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

//Get all
async function getCompletedTaskData() {
    try {
        const response = await fetch(deployedUrlCompleted);
        const data = await response.json();
        createCompletedList(data);
    } catch (error) {
        console.error(error)
    }
}

async function getRandomQuote() {
    try {
        const response = await fetch("https://zenquotes.io/api/random ");
        const data = await response.json();
        quoteDiv.innerText = data[0].q + ' -' + data[0].a;
    } catch (error) {
        console.error(error);
    }
}

const timeH = document.getElementById("timerContainer");
let timeSecond = 30;

const countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond <= 0 || timeSecond < 1) {
        endTime();
        clearInterval(countDown);
    }
}, 1000);

function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
}

function endTime() {
    timeH.innerHTML = 'TAKE A BREAK'
}


getTaskData();
getRandomQuote();

