//getting text box
const textBox = document.getElementById("textbox");

textBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const str = textBox.value;
        console.log(str);
    }
})