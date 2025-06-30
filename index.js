const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR!" : (a/b), "x": (a,b) => a*b, "-": (a, b) => a - b};

const registerButtons = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button.textContent));
    });
};

const registerKeyboardInputs = () => {
    document.addEventListener("keydown", (e) => manage(e.key))
};

const getMethod = () =>
{
    for(const method in methods)
        if(display.textContent.includes(method)) return method;
};

const operate = () => {
    const method = getMethod();
    if(!method) return;
    const split = display.textContent.split(method);
    const a = parseFloat(split[0]);
    const b = parseFloat(split[1]);
    const ans = methods[method](a, b);
    return display.textContent = isNaN(ans) ? "ERROR!" : `${ans.toFixed(3).replace(/\.000$/, '')}`;
};


const handleError = (button) => {
    if(!isNaN(button))
        return display.textContent = button;
    else
        return display.textContent = "";
}

const manage = (button) => { 
    if(display.textContent === "ERROR!") 
    {
        return handleError(button);
    }
    
    if(button === "=" || button === "Enter")
        return operate();

    if(button === "CLR")
        return display.textContent = "";

    if(button === "DEL" || button === "Backspace")
    {
        if(display.textContent != "")
            display.textContent = display.textContent.slice(0, -1);
        return;
    }

    if(button === "." && display.textContent.includes(".")) 
    
        return;
    if(button in methods && getMethod())
    {
        operate();
        if(display.textContent === "ERROR!") 
        {
            return handleError(button);
        }
    }

    if(button in methods || !isNaN(button) || button === '.')
    {
        display.textContent += button;
    }
};

registerButtons();
registerKeyboardInputs();