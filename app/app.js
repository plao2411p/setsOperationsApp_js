/*Problem variables*/
const sets = ["U", "A", "B", "C"];
const operations = ["un", "in", "di", "ds"];
var string;
var lengthString;
/*ending on N means Number*/
const operationsN = {
    un : 0,
    in : 0,
    di : 0,
    ds : 0,
    nTotal : 0,
    psOfPaN : 0 // Pairs of parentheses N
}

/*Html elements to intetact*/
const button = document.getElementById("Button");
const inPut = document.getElementById("InPut");
const outPut = document.getElementById("OutPut");

button.onclick = () => {
    for (let i in operationsN) {
        operationsN[i] = 0;
    }
    lengthString = 0;
    string = inPut.value.toUpperCase().trim();
    lengthString = string.length;
    inPut.value = "";
    console.log("Before: " + string);
    if (stringDepure()) {
        console.log(string, operationsN);
        outPut.innerHTML = string;
    } else {
        outPut.innerHTML = string;
    }
    
}

/*String process*/

function stringDepure() {
    
    const noNumber = () => {
        for (let i = 0; i < 10; i++) {
            if (string.includes(i)) {
                return false;
            }
        }
        return true;
    }
    const withOperations = () => {
        if (lengthString == 1) {
            for (let i in sets) {
                if (string.includes(sets[i])) {
                    operationsN.nTotal += 1;
                    return true;
                }
            }
        }
        if (lengthString == 6 && string[0] == "(" && string[5] == ")") {
            string = string.replace("(", " ");
            string = string.replace(")", " ");
            string = string.trim();
        }
        if (lengthString >= 4) {
            for (let i in operations) {
                let j = operations[i].toUpperCase();
                if (string.includes(j)) {
                    operationsN[operations[i]] += string.split(j).length - 1;
                    operationsN.nTotal += operationsN[operations[i]];
                    string = string.replace(j, operations[i]);
                }
            }
            if (operationsN.nTotal != 0) {
                return true
            } else {
                return false
            }

        } else {
            return false
        }
    }
    const checkParentheses = () => {
        if (lengthString == 1) {
            return true;
        }
    }
    const checkOperations = () =>{
        if (lengthString == 1) {
            return true;
        }
    }

    if (noNumber()) {
        if (withOperations()) {
            return true
        } else {
            string = "No ingresó una operación valida";
            return false
        }
    } else {
        string = "La operación no puede contener números";
        return false
    }
}
/* Operation process*/
function stringOperations() {
    /*Cuerpo de la función*/
}





/**
button.addEventListener("click", () => {
    outPut.innerHTML = inPut.value;
    inPut.onfocus = () => {
        inPut.value = "";
    }

});
const impre = () => {
    let v = { name: "Pedro", age: 20 };
    console.log(v);
}
impre();
/* commit Object : propierties and methods
const person = {
    name: "",
    age: "",
    id: "",
    metodo: function () {
        return this.name + "" + this.id;
    }
};
person.name = "Casa";
console.log(person.name);
**/