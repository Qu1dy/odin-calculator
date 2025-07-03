const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR! " : (a/b), "x": (a,b) => a*b, "-": (a, b) => a - b};

const registerButtons = () => {
    buttons.forEach(button => {
        button.addEventListener("click", () => manage(button.textContent));
    });
};

const registerKeyboardInputs = () => {
    document.addEventListener("keydown", (e) => manage(e.key))
};

const getMethod = (str) =>
{
    for(const method in methods)
        if(str.includes(method)) return method;
};

const countOfMinuses = (str) => str.split("-").length - 1;

const getNumbers = (method) => {
    const parts = display.textContent.split(/(\d+)/);
    parts.forEach(part => {
        if(countOfMinuses(part) > 0)
            parts[parts.indexOf(part+1)] = countOfMinuses(part) % 2 === 0 ? part.replace(/-+/g, "") : part.replace(/-+/g, "-")
    });
    return [a,b, method];
}

const operate = () => {
    let method = getMethod(display.textContent);
    let a,b;
    if(!method) return;
    if(method == "-")
    {
        method = "+";
    }
    [a,b, method] = getNumbers(method);
    const ans = methods[method](a, b);
    return display.textContent = isNaN(ans) ? "ERROR!" : `${parseFloat(ans.toFixed(3))}`;
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

    if(button === "." && (display.textContent.includes(".") || display.textContent == "")) 
        return;
    if(button in methods && getMethod(display.textContent) != '-' && button != "-")
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