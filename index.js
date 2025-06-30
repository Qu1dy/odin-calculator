const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR!" : (a/b), "x": (a,b) => a*b, "-": (a, b) => a - b};

const registerButtons = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button.textContent));
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
    return display.textContent = methods[method](a, b).toFixed(3).replace(/\.0$/, '');
}


const manage = (button) => {
    if(display.textContent === "ERROR!")
        return display.textContent = button;
    else if(button === "=")
        return operate();
    else if(button === "CLR")
        return display.textContent = "";
    else if(button === "DEL")
    {
        if(display.textContent != "")
            display.textContent = display.textContent.slice(0, -1);
        return;
    }
    else if(button == "." && display.textContent.includes(".")) 
        return;
    else if(button in methods && getMethod())
        operate();
    display.textContent += button;
}

registerButtons();