"use strict";
/*Html elements to intetact*/
const button = document.getElementById("Button");
const inPut = document.getElementById("InPut");
const outPut = document.getElementById("OutPut");
const table = document.getAnimations("table");
const conjuntos = document.getElementById("conjuntos");

/*Problem variables*/
const sets = ["U", "A", "B", "C"];
const operations = ["un", "in", "di", "ds"];
/*ending on N means Number*/
const operationsN = {
    un: 0,
    in: 0,
    di: 0,
    ds: 0,
    nTotal: 0,
    psOfPaN: 0 // Pairs of parentheses N
}
const $sets = {
    U: range(1, 10, 1),
    A: range(1, 5, 1),
    B: range(2, 10, 2),
    C: range(3, 7, 1)
}
for (const i in $sets) {
    conjuntos.innerHTML += 
    "<li>" + 
    i + " = " + "[" + $sets[i] + "]" 
    + 
    "</li>";    
}

button.onclick = () => {
    var string = inPut.value.toUpperCase().trim();
    var bool;
    for (let i in operationsN) {
        operationsN[i] = 0;
    }
    inPut.value = "";
    var recipe = stringDepure(string);
    bool = recipe[0];
    string = recipe[1];
    if (bool) {
        string = stringOperations(string);
        outPut.innerHTML = string;
        
    } else {
        outPut.innerHTML = string;
    }

}

/*String process*/

function stringDepure(string) {
    var string = string;
    const lengthString = string.length;

    const noNumber = () => {
        for (let i = 0; i < 10; i++) {
            if (string.includes(i)) {
                return false;
            }
        }
        return true;
    }
    const withOperations = () => {
        if (lengthString === 1) {
            for (let i in sets) {
                if (string.includes(sets[i])) {
                    operationsN.nTotal += 1;
                    return true;
                }
            }
        }
        if (lengthString == 6 && string[0] === "(" && string[5] === ")") {
            string = string.replace("(", " ");
            string = string.replace(")", " ");
            string = string.trim();
        }
        if (lengthString >= 4) {
            operations.forEach(i => {
                let j = i.toUpperCase();
                operationsN[i] += string.split(j).length - 1;
                operationsN.nTotal += operationsN[i];
                while (string.includes(j)) {
                    string = string.replace(j, i);
                }
            });
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
        if (lengthString === 1) {
            return true;
        }
        var leftCount = 0;
        var rightCount = 0;
        operationsN.psOfPaN = string.split("(").length + string.split(")").length - 2;
        if (operationsN.psOfPaN === 0 && operationsN.nTotal === 1) {
            return true;
        } else if (operationsN.psOfPaN % 2 === 0) {
            operationsN.psOfPaN /= 2;
            if (operationsN.psOfPaN + 1 != operationsN.nTotal) {
                return false;
            }
        } else {
            return false;
        }
        if (string[0] === "(") {
            if (sets.includes(string[1]) || string[1] === "(") {
                rightCount += 1;
            } else {
                return false;
            }
        }
        if (string[1] === "(") {
            if (string[0] === "(") {
                rightCount += 1;
            } else {
                return false;
            }
        }
        if (string[lengthString - 1] === ")") {
            if (sets.includes(string[lengthString - 2]) || string[lengthString - 2] === ")") {
                leftCount += 1;
            } else {
                return false;
            }
        }
        if (string[lengthString - 2] === ")") {
            if (string[lengthString - 1] === ")") {
                leftCount += 1;
            }
        }
        for (let i = 2; i < lengthString - 2; i++) {
            if (string[i] === "(") {
                if (string[i + 1] === "(" || sets.includes(string[i + 1])) {
                } else { return false; }
                if (string[i - 1] === "(" || operations.includes(string.slice(i - 2, i))) {
                } else { return false; }
                rightCount += 1;
            } else if (string[i] === ")") {
                if (string[i - 1] === ")" || sets.includes(string[i - 1])) {
                } else { return false; }
                if (string[i + 1] === ")" || operations.includes(string.slice(i + 1, i + 3))) {
                } else { return false; }
                leftCount += 1
            }
        }
        if (leftCount + rightCount === 2 * operationsN.psOfPaN) {
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
                if (sets.includes(string[i - 1]) || string[i - 1] === "(" || string[i - 1] === ")") {
                } else { return false; }
                if (sets.includes(string[i + 2]) || string[i + 2] === "(" || string[i + 2] === ")") {
                } else { return false; }
            }
        }
        return true;
    }
    if (noNumber()) {
        if (withOperations()) {
            if (checkParentheses()) {
                if (checkOperations()) {
                    return [true, string];
                } else {
                    return [false, "Mal ingreso de los parentesis o conjunto"];
                }
            } else {
                return [false, "Mal ingreso de los parentesis o conjunto"];
            }
        } else {
            return [false, "No ingresó una operación valida"];
        }
    } else {
        return [false, "La operación no puede contener números"];
    }
}
/* Operation process*/
function range(start, end, step) {
    const ans = [];
    if ((start < end) && (step === undefined)) {
        step = 1;
    }
    if ((start > end) && (step === undefined)) {
        step = -1;
    }
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

function stringOperations(string) {
    var string = string;
    const lengthString = string.length;
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
        math.boolean(math.zeros(operationsN.nTotal, 2))._data,
        { columns: ["position", "state"] }
    );
    var count = 0;
    range(1, lengthString, 1).forEach(i => {
        if (operations.includes(string.slice(i, i + 2))) {
            dataOperations.values[count][0] = i;
            count += 1;
        }
    });
    const $left = (i) => {
        for (let j  = i - 1; j > -1; j-- ) {
            for (let k in df.columns) {
                if (string.slice(j, i) == df.columns[k]) {                
                    return df.columns[k];
                }
            }
        }
        return false;
    }
    const $right = (i) => {
        for (let j  = i + 2; j < lengthString +1 ; j++) {
            for (let k in df.columns) {
                if (lengthString === j) {
                    if (string[lengthString - 1] == df.columns[k]) {
                        return df.columns[k];
                    }
                }
                if (string.slice(i + 2, j + 1) == df.columns[k]) {
                    return df.columns[k];
                }
            }
        }
        return false;
    }
    const operator = (i, o, d) => {
        var i = i;
        var o = o;
        var d = d;
        var result = [];
        var p = [];
        var q = [];
        df.index.forEach( j => {
            j -= 1;
            p.push(df.values[j][df.columns.indexOf(i)]);
            q.push  (df.values[j][df.columns.indexOf(d)]);
        });
        df.index.forEach(j => {
            j -= 1;
            if (o === "un") {
                if (p[j] || q[j]) {
                    result.push(true);
                } else { result.push(false); }
            } else if (o === "in") {
                if (p[j] && q[j]) {
                    result.push(true);
                } else { result.push(false); }
            } else if (o === "di") {
                if (p[j] && !(q[j])) {
                    result.push(true);
                } else { result.push(false); }
            } else if (o === "ds") {
                if ((p[j] || q[j]) && !(p[j] && q[j])) {
                    result.push(true);
                } else { result.push(false); }
            }
        });
        return result;
    }
    
    var nTotalCopy = operationsN.nTotal;
    var psOfPaNCopy = operationsN.psOfPaN;
    /*operationsN.nTotal + 1*/
    range(1, operationsN.nTotal + 1, 1).forEach( v => {
        dataOperations.index.forEach( l => {
            var i = dataOperations.values[l][0];
            if (dataOperations.values[l][1] == false) {
                var left = $left(i);
                var right = $right(i);
                var op = string.slice(i, i + 2);
                if (left != false && right != false) {
                    var ans = operator(left, op, right);
                    if (nTotalCopy === 1 && psOfPaNCopy == 0) {
                        dataOperations.values[l][1] = true;
                        df.addColumn( {"column": left + op + right, "value": ans });
                        nTotalCopy -= 1;
                        psOfPaNCopy -= 1;
                    } else if (psOfPaNCopy > 0) {
                        dataOperations.values[l][1] = true;
                        df.addColumn( {"column": "(" + left + op + right + ")", "value": ans });
                        nTotalCopy -= 1;
                        psOfPaNCopy -= 1;
                    } else {
                        dataOperations.values[l][1] = true;
                        df.addColumn( {"column": left + op + right, "value": ans });
                        nTotalCopy -= 1;
                        psOfPaNCopy -= 1;
                    }
                }
            }
        });
    });
    count = [];
    df.index.forEach( i => {
        i -= 1;
        if (df.values[i][df.columns.length - 1]) {
            count.push(i + 1);
        }
    });
    df.plot("table").table(
        { 
        header_style: 
            {align: "center",
            fill: { color: ['black'] },
            font: { family: "Arial", size: 10, color: "white" }}, 
        cell_style: 
            {align: ["center"],
            line: { color: "black", width: 1 }},
        responsive: true
        });
    return string + " = [" + count + "]";
}