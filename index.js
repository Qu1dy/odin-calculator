const buttons = document.querySelectorAll("button");
const equationText = document.querySelector(".equation-text");


const registerNumbers = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button));
    })
}

const operate = () => {
    for(let method in methods)
        {
            if(!equationText.innerText.includes(method)) continue;
            let split = equationText.innerText.split(method)
            let a = parseInt(split[0]);
            let b = parseInt(split[1]);
            return equationText.innerText = methods[method](a, b);
        }
}
const methods = {"+": (a, b) =>  a + b, "-": (a, b) => a - b, ":": (a,b) => a/b, "x": (a,b) => a*b};

const manage = (button) => {
    equationText.innerText += button.innerText;
    if(button.innerText === "=") {
        operate();
    }
}

registerNumbers();