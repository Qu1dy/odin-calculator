const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");


const registerNumbers = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button));
    })
}

const getMethod = () =>
{
    for(let method in methods)
        if(display.innerText.includes(method)) return method;
}

const operate = () => {
    const method = getMethod();
    if(!method) return;
    const split = display.innerText.split(method)
    const a = parseFloat(split[0]);
    const b = parseFloat(split[1]);
    return display.innerText = methods[method](a, b);
}
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => (a/b).toFixed(4) === "Infinity" ? "ERROR!" : (a/b).toFixed(4), "x": (a,b) => a*b, "-": (a, b) => a - b};

const manage = (button) => {
    if(display.innerText === "ERROR!")
    {
        return display.innerText = button.innerText;
    }
    else if(button.innerText === "=") {
        return operate();
    }
    else if(button.id === "clear")
    {
        return display.innerText = "";
    }
    else if(button.id === "delete")
    {
        if(display.innerHTML != "")
            display.innerText = display.innerText.slice(0, -1);
        return;
    }
    else if(button.classList.contains("operator") && getMethod())
    {
        operate();
    }
    display.innerText += button.innerText;
}

registerNumbers();