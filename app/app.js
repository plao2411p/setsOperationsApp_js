/*Problem variables*/
const sets = ["U", "A", "B", "C"];
const operations = ["un", "in", "di", "ds"];
var string;
var lengthString;
/*ending on N means Number*/
const operationsN = {
    un: 0,
    in: 0,
    di: 0,
    ds: 0,
    nTotal: 0,
    psOfPaN: 0 // Pairs of parentheses N
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
        var leftCount = 0;
        var rightCount = 0;
        operationsN.psOfPaN = string.split("(").length + string.split(")").length - 2;
        if (operationsN.psOfPaN == 0 && operationsN.nTotal == 1) {
            return true;
        } else if (operationsN.psOfPaN % 2 == 0) {
            operationsN.psOfPaN /= 2;
            if (operationsN.psOfPaN + 1 != operationsN.nTotal) {
                return false;
            }
        } else {
            return false;
        }
        if (string[0] == "(") {
            if (sets.includes(string[1]) || string[1] == "(") {
                rightCount += 1;
            } else {
                return false;
            }
        }
        if (string[1] == "(") {
            if (string[0] == "(") {
                rightCount += 1;
            } else {
                return false;
            }
        }
        if (string[lengthString - 1] == ")") {
            if (sets.includes(string[lengthString - 2]) || string[lengthString - 2] == ")") {
                leftCount += 1;
            } else {
                return false;
            }
        }
        if (string[lengthString - 2] == ")") {
            if (string[lengthString - 1] == ")") {
                leftCount += 1;
            }
        }
        for (let i = 2; i < lengthString - 2; i++) {
            if (string[i] == "(") {
                if (string[i + 1] == "(" || sets.includes(string[i + 1])) {
                } else { return false; }
                if (string[i - 1] == "(" || operations.includes(string.slice(i - 2, i))) {
                } else { return false; }
                rightCount += 1;
            } else if (string[i] == ")") {
                if (string[i - 1] == ")" || sets.includes(string[i - 1])) {
                } else { return false; }
                if (string[i + 1] == ")" || operations.includes(string.slice(i + 1, i + 3))) {
                } else { return false; }
                leftCount += 1
            }
        }
        console.log("le " + leftCount, "ri " + rightCount)
        if (leftCount + rightCount == 2 * operationsN.psOfPaN) {
            return true;
        } else { return false; }
    }

    const checkOperations = () => {
        if (lengthString == 1) {
            return true;
        }
    }

    if (noNumber()) {
        if (withOperations()) {
            if (checkParentheses()) {
                return true;    
            } else {
                string = "Mal ingreso de los parentesis o conjunto";
                return false;
            }
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