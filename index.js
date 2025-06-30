const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR!" : (a/b), "x": (a,b) => a*b, "-": (a, b) => a - b};


const registerButtons = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button));
    })
}

const getMethod = () =>
{
    for(const method in methods)
        if(display.textContent.includes(method)) return method;
}

const operate = () => {
    const method = getMethod();
    if(!method) return;
    const split = display.textContent.split(method)
    const a = parseFloat(split[0]);
    const b = parseFloat(split[1]);
    return display.textContent = methods[method](a, b).toFixed(3).replace(/\.000$/, '');
}


const manage = (button) => {
    if(display.textContent === "ERROR!")
    {
        return display.textContent = button.textContent;
    }
    else if(button.textContent === "=") {
        return operate();
    }
    else if(button.id === "clear")
    {
        return display.textContent = "";
    }
    else if(button.id === "delete")
    {
        if(display.innerHTML != "")
            display.textContent = display.textContent.slice(0, -1);
        return;
    }
    else if(button.textContent == "." && display.textContent.includes(".")) {
        return;
    }
    else if(button.classList.contains("operator") && getMethod())
    {
        operate();
    }
    display.textContent += button.textContent;
}

registerButtons();