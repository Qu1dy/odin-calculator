const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const methods = {"-": (a, b) => a + b, "+": (a, b) =>  a + b, "/": (a,b) => b === 0 ? "ERROR! " : (a/b), "x": (a,b) => a*b};

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

const handleMinuses = () => {
    const numOfMinuses = [0, 0];
    const nums = ["",""];
    let ind = 0;
    display.textContent.split("").forEach(item => {
        if(item=='-')
        {
            numOfMinuses[ind]++;
            if(nums[ind] != "") ind++;
        }
        else if(!(item in methods))
        {   
            nums[ind] += item;
        }
        else
        {
            ind++
        }
    })
    const signA = numOfMinuses[0]%2 ? '+' : '-';
    const signB = numOfMinuses[1]%2 ? '+' : '-';
    b = parseFloat(signB + nums[1]);
    a = parseFloat(signA + nums[0]);
    return [a,b];
}



const operate = () => {
    let method = getMethod(display.textContent);
    if(!method) return;
    const split = display.textContent.split(method);
    if(method === '-')
    {
        [a,b] = handleMinuses();
        const displayWithoutMinuses = display.textContent.split("-").join("");
        method = getMethod(displayWithoutMinuses);
        if(!method)
        {
            method = "+";
        }
    }
    else
    {
        a = parseFloat(split[0]);
        b = parseFloat(split[1]);
    }

    if(isNaN(a) || isNaN(b))
    {
        return display.textContent = split.join("");
    }
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
    if(button in methods && getMethod(display.textContent) != '-' && button != '-')
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