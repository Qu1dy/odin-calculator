const addButton = document.querySelector("#add");
const substractButton = document.querySelector("#substract");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const numbers = document.querySelectorAll(".number");

const registerNumbers = () => {
    numbers.forEach(number => {
        number.addEventListener("click", manage);
    })
}

const manage = () => {
    console.log("called");
}

registerNumbers();