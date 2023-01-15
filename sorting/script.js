const id = i => document.getElementById(i);
const cl = c => document.getElementsByClassName(c);
const ele = d => document.createElement(d);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sleep = time => new Promise(r => setTimeout(r, time));
const int = i => parseInt(i)
const bh = i => parseInt(bars[i].style.height) // bar height
const speed = () => int(speed_slider.value)
const speed_slider = id('speed')
var curr_speed = 20; // default speed
const swap = (i, j) => {
    var temp = bars[i].style.height
    bars[i].style.height = bars[j].style.height
    bars[j].style.height = temp
}


speed_slider.addEventListener('change', () => {
    curr_speed = speed();
})


const addbar = n => {
    graphs.innerHTML = "";
    for (var i = 0; i < n; i++) {
        const bar = ele('div')
        bar.className = 'bars'
        bar.style.height = randomInt(100, 400) + 'px';
        graphs.appendChild(bar)
    }
    for (i of bars)
        i.style.width = graphs.offsetWidth / bars.length - 2 + "px"
}

const graphs = id('graph')
const bars = cl('bars')
const bar_num = id('bar_number');
//event listeners
bar_num.addEventListener('keyup', () => {
    id('mainapp').classList.remove('gradient-border')
    addbar(parseInt(bar_num.value))
    stop()
})
var disturb = false;
var j = 0;
const fun = async i => {
    for (j = 21; j != 20; j++) {
        await sleep(200);
        addbar(i)
        if(j==20)
            break
    }
}
fun(50)
const stop = () => j = 20;

// selection sort
const ss = async() => {
        for (var i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = 'cyan'
            for (var j = i + 1; j < bars.length; j++) {
                bars[j].style.backgroundColor = 'gold'
                await sleep(curr_speed)
                bars[j].style.backgroundColor = 'black'
                if (int(bars[j].style.height) < int(bars[i].style.height)) {
                    var temp = bars[i].style.height
                    bars[i].style.height = bars[j].style.height
                    bars[j].style.height = temp
                }

            }
            bars[i].style.backgroundColor = 'lightgreen'
        }
    }
    // bubble sort
const bs = async() => {

        for (var i = 0; i < bars.length; i++) {

            for (var j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.backgroundColor = 'gold';
                await sleep(curr_speed);
                bars[j].style.backgroundColor = 'black'
                if (int(bars[j].style.height) > int(bars[j + 1].style.height)) {

                    var temp = bars[j + 1].style.height
                    bars[j + 1].style.height = bars[j].style.height
                    bars[j].style.height = temp
                    bars[j].style.backgroundColor = 'black';

                }
                if (j == bars.length - i - 2)
                    bars[j + 1].style.backgroundColor = 'lightgreen';

            }
        }
        bars[0].style.backgroundColor = 'lightgreen';
    }
    // insertion sort
const is = async() => {
    for (var i = 1; i < bars.length; i++) {
        var j = i;
        bars[i].style.backgroundColor = 'red';
        while (j > 0 && int(bars[j].style.height) < int(bars[j - 1].style.height)) {
            var temp = bars[j - 1].style.height
            bars[j - 1].style.height = bars[j].style.height
            bars[j].style.height = temp
            bars[j - 1].style.backgroundColor = 'lightgreen';
            j--;

            await sleep(curr_speed)

        }
        bars[i].style.backgroundColor = 'black';
        if (i == bars.length - 1)
            bars[i].style.backgroundColor = 'lightgreen';

    }
}


// merge sort 
const ms = () => {
    mergeSort(0, bars.length - 1);
    bars[Math.floor(bars.length / 2)].style.backgroundColor = 'lightgreen';
};
const mergeSort = async(i, j) => {
    if (i >= j)
        return;
    var mid = Math.floor(i + (j - i) / 2);

    bars[mid].style.backgroundColor = 'red';
    await mergeSort(i, mid);
    await mergeSort(mid + 1, j);
    await merge(i, mid, j);

}
const merge = async(i, mid, j) => {

    var arr1 = [];
    var arr2 = [];

    for (var m = i; m <= mid; m++) {
        arr1.push(bh(m))
        bars[m].style.backgroundColor = 'yellow';
        await sleep(curr_speed)
    }
    for (var m = mid + 1; m <= j; m++) {
        arr2.push(bh(m))
        bars[m].style.backgroundColor = 'pink';
        await sleep(50)
    }

    var m = 0;
    var n = 0;
    var k = i;
    while (m < arr1.length && n < arr2.length) {

        if (arr1[m] < arr2[n]) {
            bars[k].style.backgroundColor = 'lightgreen';
            bars[k++].style.height = arr1[m++] + 'px';


        } else {
            bars[k].style.backgroundColor = 'lightgreen';
            bars[k++].style.height = arr2[n++] + 'px';
        }
        await sleep(curr_speed)
    }
    while (m < arr1.length) {

        bars[k].style.backgroundColor = 'lightgreen';
        bars[k++].style.height = arr1[m++] + 'px';
        await sleep(curr_speed)
    }
    while (n < arr2.length) {

        bars[k].style.backgroundColor = 'lightgreen';
        bars[k++].style.height = arr2[n++] + 'px';
        await sleep(curr_speed)
    }
}

// quick sort


const qs = () => {
    quickSort(0, bars.length - 1);
}
const quickSort = async(i, j) => {
    if (i >= j)
        return;

    var p = await partition(i, j); // acc to last element

    if (p != i)
        bars[p].style.backgroundColor = 'lightgreen';
    await quickSort(i, p - 1);
    await quickSort(p + 1, j);


}
const partition = async(s, e) => {
    bars[s].style.backgroundColor = 'red';
    var pivot = bh(s);
    var i = s;
    var j = e;

    for (var k = s; k <= e; k++) {

        bars[k].style.backgroundColor = 'purple';
    }
    await sleep(200);
    for (var k = s; k <= e; k++) {

        bars[k].style.backgroundColor = 'black';
    }

    while (i < j) {
        while (i < j && bh(i) <= pivot) {
            bars[i].style.backgroundColor = 'red';
            await sleep(curr_speed);
            bars[i].style.backgroundColor = 'black';
            i++;


        }

        while (bh(j) > pivot) {
            bars[j].style.backgroundColor = 'pink';
            await sleep(curr_speed);
            bars[j].style.backgroundColor = 'black';
            j--;

        }
        await sleep(curr_speed);
        if (i < j)
            swap(i, j);





    }
    swap(s, j);

    return j;
}