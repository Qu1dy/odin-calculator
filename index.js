const buttons = document.querySelectorAll("button");
const equationText = document.querySelector(".equation-text");


const registerNumbers = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button));
    })
}

const getMethod = () =>
{
    for(let method in methods)
        if(equationText.innerText.includes(method)) return method;
}

const operate = () => {
    const method = getMethod();
    if(!method) return;
    const split = equationText.innerText.split(method)
    const a = parseInt(split[0]);
    const b = parseInt(split[1]);
    return equationText.innerText = methods[method](a, b);
}
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => (a/b).toFixed(4), "x": (a,b) => a*b, "-": (a, b) => a - b};

const manage = (button) => {
    if(button.innerText === "=") {
        return operate();
    }
    else if(button.id === "clear")
    {
        return equationText.innerText = "";
    }
    else if(button.classList.contains("operator") && getMethod())
    {
        operate();

    }
    equationText.innerText += button.innerText;
}

registerNumbers();