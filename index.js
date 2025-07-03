const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR! " : (a/b), "x": (a,b) => a*b, "-": (a, b) => a + b};

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

const countOfMinuses = (str) => str.split("-").length - 1;

const getNumbers = () => {
    const parts = display.textContent.split(/(\d+)/);
    for(let i = 0;i<parts.length-1;i++)
    {
        const part = parts[i].replace(/[+*/]/g, "");
        if(countOfMinuses(part) > 0)
        {
            const nextElement = parts[i+1];
            const toAdd = countOfMinuses(part) % 2 === 0 ? part.replace(/-+/g, "") : part.replace(/-+/g, "-")
            parts[i+1] = toAdd + nextElement;
        }
        else if(part == '.')
        {
            parts[i+1] = parts.slice(i-1, i+2).join('');
            parts.splice(i-1, 2);
        }
    }
    const filtered = parts.filter(part => !isNaN(part) && part != "");
    const [a,b] = filtered.map(el => parseFloat(el));
    return [a,b];
}

const operate = () => {
    let method = getMethod();
    if(!method) return;
    const [a,b] = getNumbers();
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
    if(button in methods && display.textContent.match(/\d+/g).length == 2)
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