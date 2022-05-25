//getting text box
const textBox = document.getElementById("textbox");
const listContainer = document.getElementById("todoContainer");



textBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        let str = textBox.value;
        console.log(str);
    }
})

function getData() {
    const response = await fetch("https://tranquil-hamlet-82276.herokuapp.com/api/todo");
    const data = await response.json();
    createToDoList(data);
}

function createToDoList(data) {
    while (listContainer.firstChild) listContainer.removeChild(listContainer.firstChild);
    for (let i = 0; i < data.length; i++) {
        const newTask = document.createElement("div");
        listContainer.appendChild(newTask);
    }
}

getData();