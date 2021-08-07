//const math = require("mathjs");

/*Problem variables*/
const sets = ["U", "A", "B", "C"];
const operations = ["un", "in", "di", "ds"];
var string = "(AunB)inC";
var lengthString = string.length;
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
                operationsN[operations[i]] += string.split(j).length - 1;
                operationsN.nTotal += operationsN[operations[i]];
                while (string.includes(j)) {
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
        if (leftCount + rightCount == 2 * operationsN.psOfPaN) {
            return true;
        } else { return false; }
    }
    const checkOperations = () => {
        if (lengthString == 1) {
            return true;
        }
        if (operations.includes(string.slice(0, 2))) {
            return false;
        }
        if (operations.includes(string.slice(lengthString - 2, lengthString))) {
            return false;
        }
        for (let i = 0; i < lengthString - 1; i++) {
            if (sets.includes(string[i]) && sets.includes(string[i + 1])) {
                return false;
            }
        }
        if (lengthString == 4) {
            if (sets.includes(string[0]) && sets.includes(string[lengthString - 1])) {
                return true;
            } else { return false; }
        }
        for (let i = 1; i < lengthString - 1; i++) {
            if (sets.includes(string.slice(i, i + 2))) {
                if (sets.includes(string[i - 1]) || string[i - 1] == "(" || string[i - 1] == ")") {
                } else { return false; }
                if (sets.includes(string[i + 2]) || string[i + 2] == "(" || string[i + 2] == ")") {
                } else { return false; }
            }
        }
        console.log(6)
        return true;
    }
    if (noNumber()) {
        console.log("No number");
        if (withOperations()) {
            console.log("With operations");
            if (checkParentheses()) {
                console.log("Check parentheses");
                if (checkOperations()) {
                    console.log("Check operations");
                    return true;
                } else {
                    string = "Mal ingreso de los parentesis o conjunto";
                    return false;
                }
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
function range(start, end, step) {
    const ans = [];
    if (start < end && step > 0) {
        for (start; start < end; start += step) {
            ans.push(start);
        }
    } else if (start > end && step < 0) {
        for (start; start > end; start += step) {
            ans.push(start);
        }
    }
    return ans;
}
const $sets = {
    U: range(1, 10, 1),
    A: range(1, 5, 1),
    B: range(2, 10, 2),
    C: range(3, 7, 1)
}

    //console.log(df.print());
    //console.log(df["A"].values.slice(0, -1));
    ;//df.addColumn( {"column": "F", "value": [1, 2] });
stringOperations();
function stringOperations() {
    const df = new dfd.DataFrame(
        math.boolean(math.zeros($sets.U.length, 4))._data,
        { columns: sets, index: $sets.U }
    );
    $sets.U.forEach(i => {
        range(0, df.columns.length, 1).forEach(j => {
            if ($sets[sets[j]].includes(i)) {
                df.values[i - 1][j] = true;
            }
        });
    });
    const dataOperations = new dfd.DataFrame(
        math.boolean(math.zeros(operationsN.nTotal = 2, 2))._data,
        { columns: ["position", "state"] }
    );
    console.log(string);
    var count = 0;
    range(1, lengthString, 1).forEach(i => {
        if (operations.includes(string.slice(i, i + 2))) {
            dataOperations.values[count][0] = i;
            count += 1;
        }
    });
    const left = (i) => {
        range(i - 1, -1, -1).forEach(j => {
            df.columns.forEach( k => {
                if (string.slice(j, i) == K) {
                    return string.slice(j, i)
                }
            });
        });
        return false;
    }
    const right = (i) => {
        range(i + 2, lengthString + 1, 1).forEach(j => {
            df.columns.forEach(k => {
                if (lengthString == j) {
                    if (string[-1] == k) {
                        return string[-1];
                    }
                } else if (string.slice(i + 2, j) == k) {
                    return string.slice(i + 2, j);
                }
            });
        });
        return false;
    }
    dataOperations["position"].values[0] = 1;
    console.log(dataOperations.print());
    let nTotalCopy = operationsN.nTotal;
    let psOfPaNCopy = operationsN.psOfPaN;

    /*for (const v in range(1, operationsN.nTotal + 1, 1)) {

    }*/
}