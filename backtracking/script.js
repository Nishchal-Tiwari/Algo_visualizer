const id = i => document.getElementById(i);
const cl = c => document.getElementsByClassName(c);
const table = id('maze')
const app = id('app')
const int = i => parseInt(i)
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rows = cl('r');
const allowDrop = (e) => e.preventDefault();
const drag = (e) => e.dataTransfer.setData("Text", e.target.id);
const drop = e => {
    var data = e.dataTransfer.getData("Text");
    e.target.appendChild(document.getElementById(data));
    e.preventDefault();
}

const arr = (i, j) => rows[i].getElementsByClassName('c')[j]




// for (i of rows) {
//     const colmn = i.getElementsByClassName('c')
//     for (j of colmn)
//         console.log(j)
// }

const makeArray = (r, c) => {

    table.innerHTML = ""
    for (var i = 0; i < r; i++) {
        var tr = document.createElement('tr');
        tr.className = 'r';
        for (var j = 0; j < c; j++) {
            var td = document.createElement('td');
            td.className = 'c';
            td.style.height = (app.offsetHeight / r) - 2 + 'px';
            td.style.width = td.style.height;
            td.ondrop = drop;
            td.ondragover = allowDrop;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}
const mb = (r, n, p) => {
    for (var i = 0; i < r; i++) {
        var t = rows[i].getElementsByClassName('c')
        for (var j = 0; j < n; j++) {
            if (Math.random() < p)
                t[j].style.backgroundColor = 'red';
        }
    }
}
const cb = (r, n, p) => {
    for (var i = 0; i < r; i++) {

        for (var j = 0; j < n; j++) {
            if (Math.random() < p)
                arr(i, j).style.backgroundColor = 'white';
        }
    }
}




var r_n = 0;
var c_n = 0;
const m = id('ro')
const n = id('col')

m.addEventListener('keyup', () => {
    r_n = int(m.value);

    makeArray(r_n, c_n);
})
n.addEventListener('keyup', () => {
    c_n = int(n.value);
    makeArray(r_n, c_n);
})


const nqueen = async(i) => {

    if (i >= rows.length)
        return true;

    for (var j = 0; j < rows.length; j++) {
        arr(i, j).style.backgroundColor = 'red';
        if (await isSafe(i, j)) {

            arr(i, j).style.backgroundColor = 'black';
            await sleep(200);
            if (await nqueen(i + 1))
                return true;
            arr(i, j).style.backgroundColor = 'white';

        }
        arr(i, j).style.backgroundColor = 'white';

    }
    return false;
}
const isSafe = async(col, row) => {
    for (var i = 0; i < col; i++) {
        var temp = arr(i, row).style.backgroundColor;
        arr(i, row).style.backgroundColor = 'blue';
        await sleep(200);
        arr(i, row).style.backgroundColor = temp;
        if (arr(i, row).style.backgroundColor.localeCompare('black') == 0) {

            return false;
        }
    }

    for (i = col, j = row; i >= 0 && j >= 0; i--, j--) {
        var temp = arr(i, j).style.backgroundColor;
        arr(i, j).style.backgroundColor = 'blue';
        await sleep(100);
        arr(i, j).style.backgroundColor = temp;
        if (arr(i, j).style.backgroundColor.localeCompare('black') == 0)
            return false;
    }


    for (i = col, j = row; i >= 0 && j < rows.length; i--, j++) {
        var temp = arr(i, j).style.backgroundColor;
        arr(i, j).style.backgroundColor = 'blue';
        await sleep(100);
        arr(i, j).style.backgroundColor = temp;
        if (arr(i, j).style.backgroundColor.localeCompare('black') == 0)
            return false;
    }
    return true;
}
const gm = (i, j) => {
    mb(i, j, 0.3);
    for (var i = 0; i < 5; i++)
        cb(i, j, 0.2);
    for (var i = 0; i < 2; i++)
        mb(i, j, 0.2)
    for (var i = 0; i < 5; i++)
        cb(i, j, 0.1);
}

const findCheeze = async(i, j) => {

    console.log(i, j)
    if (i < 0 || j < 0 || i >= rows.length || j >= rows.length)
        return false;
    if ((arr(i, j).style.backgroundColor.localeCompare('cyan') == 0) || (arr(i, j).style.backgroundColor.localeCompare('red') == 0))
        return false;
    console.log(arr(i, j).children.cheese);
    if (arr(i, j).children.cheese != null) {
        arr(i, j).style.backgroundColor = 'violet';
        return true;
    }
    arr(i, j).style.backgroundColor = 'cyan';
    await sleep(100);
    if (await findCheeze(i - 1, j)) {
        arr(i, j).style.backgroundColor = 'orange';
        await sleep(100);
        return true;

    }
    if (await findCheeze(i, j + 1)) {
        arr(i, j).style.backgroundColor = 'orange';
        await sleep(100);
        return true;
    }
    if (await findCheeze(i + 1, j)) {
        arr(i, j).style.backgroundColor = 'orange';
        await sleep(100);
        return true;
    }
    if (await findCheeze(i, j - 1)) {
        arr(i, j).style.backgroundColor = 'orange';
        await sleep(100);
        return true;
    }
    arr(i, j).style.backgroundColor = 'white';
    return false;

}



//   BFS     

const bfs = async(m, n) => {
    var ar = [];
    ar.push({ i: m, j: n });
    arr(m, n).style.backgroundColor = 'cyan';
    while (ar.length != 0) {
        console.log(ar)
        sleep(100);
        var k = ar.shift();
        arr(k.i, k.j).style.backgroundColor = 'cyan';

        if (await check(k.i + 1, k.j)) {
            arr(k.i + 1, k.j).style.backgroundColor = 'yellow';
            ar.push({ i: k.i + 1, j: k.j })
        }
        if (await check(k.i - 1, k.j)) {
            arr(k.i - 1, k.j).style.backgroundColor = 'yellow';
            ar.push({ i: k.i - 1, j: k.j })
        }
        if (await check(k.i, k.j - 1)) {
            arr(k.i, k.j - 1).style.backgroundColor = 'yellow';
            ar.push({ i: k.i, j: k.j - 1 })
        }
        if (await check(k.i, k.j + 1)) {
            arr(k.i, k.j + 1).style.backgroundColor = 'yellow';

            ar.push({ i: k.i, j: k.j + 1 })
        }
    }
}



const check = async(i, j) => {


    if (i < 0 || j < 0 || i >= rows.length || j >= rows.length)
        return false;
    var temp = arr(i, j).style.backgroundColor;
    arr(i, j).style.backgroundColor = 'red';
    await sleep(40)
    arr(i, j).style.backgroundColor = temp
    if ((arr(i, j).style.backgroundColor.localeCompare('cyan') == 0) || (arr(i, j).style.backgroundColor.localeCompare('yellow') == 0))
        return false;


    return true;
}