const buttons = document.querySelectorAll("button");
const equationText = document.querySelector(".equation-text");


const registerNumbers = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button));
    })
}

const manage = (button) => {
    console.log("called");
}

registerNumbers();