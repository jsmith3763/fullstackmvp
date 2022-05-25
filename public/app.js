//getting text box
const textBox = document.getElementById("textbox");
const listContainer = document.getElementById("todoContainer");

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
        newTask.setAttribute("class", "taskDiv")
        newTask.setAttribute("id", data[i].id);
        newTask.innerText = data[i].task;
        newTask.addEventListener("click", (e) => {
            deleteTask(e.target.id);
        })
        listContainer.prepend(newTask);
    }
}

async function getData() {
    // const response = await fetch("https://tranquil-hamlet-82276.herokuapp.com/api/todo");
    try {
        const response = await fetch("http://localhost:3000/api/todo");//CHANGE WHEN DEPLOYED
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
        const response = await fetch('http://localhost:3000/api/todo', {//CHANGE WHEN DEPLOYED
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
    const task = document.getElementById(id);
    try {

    } catch (error) {
        console.error(error);
    }
}

async function deleteTask(id) {
    const task = document.getElementById(id);
    task.remove();
    try {
        const response = await fetch(`http://localhost:3000/api/todo/${task.id}`, {//CHANGE WHEN DEPLOYED
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}



getData();