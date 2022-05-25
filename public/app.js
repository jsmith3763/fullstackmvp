//getting text box
const textBox = document.getElementById("textbox");
const listContainer = document.getElementById("todoContainer");
const updateTextBox = document.getElementById("updateTextBox");
getData();

textBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        createTask();
        getData();
    }
})





function createToDoList(data) {
    listContainer.innerHTML = "";
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
        completeButton.addEventListener("click", (e) => {
            deleteTask(e.target.id);
        })
        newTask.append(updateButton)
        newTask.append(completeButton);
        listContainer.prepend(newTask);
    }
}

async function getData() {
    //const response = await fetch("https://tranquil-hamlet-82276.herokuapp.com/api/todo");
    try {
        const response = await fetch("https://tranquil-hamlet-82276.herokuapp.com/api/todo");
        //const response = await fetch("http://localhost:3000/api/todo");//CHANGE WHEN DEPLOYED
        const data = await response.json();
        //console.log(data)
        createToDoList(data);
    } catch (error) {
        console.error(error)
    }
}

async function createTask() {
    const task = document.getElementById('textbox').value;
    const newTask = {
        task: task
    }
    try {
        const response = await fetch('https://tranquil-hamlet-82276.herokuapp.com/api/todo', {//CHANGE WHEN DEPLOYED
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

async function updateTask(id) {
    const task = document.getElementById('updateTextBox').value;
    const update = document.getElementById(id).value;
    //console.log(update);
    const updateTask = {
        task: task
    }
    try {
        const response = await fetch(`https://tranquil-hamlet-82276.herokuapp.com/api/todo/${update.id}`, {//CHANGE WHEN DEPLOYED
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateTask)
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

async function deleteTask(id) {
    const task = document.getElementById(id);
    task.remove();
    try {
        const response = await fetch(`https://tranquil-hamlet-82276.herokuapp.com/api/todo/${task.id}`, {//CHANGE WHEN DEPLOYED
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}



