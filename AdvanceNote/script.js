let array = [];
let recycle = [];
let index = 0;
let edIndex;
function getLD(){
    if (JSON.parse(localStorage.getItem("index")) != null)
        index = JSON.parse(localStorage.getItem("index"));
    else
        localStorage.setItem("index", JSON.stringify(index));
    if (JSON.parse(localStorage.getItem("array")) != null)
        array = JSON.parse(localStorage.getItem("array"));
    else
        localStorage.setItem("array",JSON.stringify(array));
    if (JSON.parse(localStorage.getItem("recycle")) != null)
        recycle = JSON.parse(localStorage.getItem("recycle"));
    else
        localStorage.setItem("recycle",JSON.stringify(recycle));
}
getLD();

function setLD(){
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("array",JSON.stringify(array));
    localStorage.setItem("recycle",JSON.stringify(recycle));
}

function res() {
    document.getElementById("title").value = "";
    document.getElementById("tArea").value = "";
    document.getElementById("save").hidden = "hidden";
    document.getElementById("add").removeAttribute("hidden");
    document.getElementById("add").disabled = true;
    document.getElementById("cancel").hidden = "hidden";
    display();
}

function addNote() {
    let date = new Date();
    let currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    let object = {
        id: index++,
        titl: document.getElementById("title").value,
        des: document.getElementById("tArea").value,
        dateOfEntry: currentDate,
        arc: true
    };
    array.push(object);
    setLD();
    display();
    res();
}

function enblBtn() {
    if (document.getElementById("title").value != "" &&
        document.getElementById("tArea").value != "")
        document.getElementById("add").disabled = false;
    else
        document.getElementById("add").disabled = true;
}

function qSort(arr) {
    function sortA(arr, left, right) {
        if (left < right) {
            pi = partition(arr, left, right);
            sortA(arr, left, pi - 1);
            sortA(arr, pi + 1, right)
        }

    }
    function partition(arr, left, right) {
        let i = left;
        let pivort = arr[right];
        for (let j = left; j < right; j++) {
            // console.log(arr[j]);
            if (parseInt(pivort.id) > parseInt(arr[j].id)) {
                swap(arr, i++, j);
            }
        }
        swap(arr, right, i);
        return i;
    }
    function swap(arr, left, right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
    }
    sortA(arr, 0, arr.length - 1);
    return arr;
}

function keygen() {
    var val = Math.floor(1000 + Math.random() * 9000);
    return val;
}

function display() {
    let result = ``;
    if (array.length > 0) {
    array = qSort(array);
        for (let i = 0; i < array.length; i++) {
            if (array[i].arc){
                result = result + `<div class="cards" id="card${array[i].id}">` +
                    `<div class="detail">` +
                    `    <label for="desc" class="topic">Tittle</label><input type="checkbox" name="card" id="${array[i].id}"><br>` +
                    `    <label for="title">${array[i].titl}</label><br><br>` +
                    `    <label for="desc" class="topic">Description</label><br>` +
                    `    <label for="Description">${array[i].des}</label>` +
                    `</div>` +
                    `<div class="operation">` +
                    `    <label for="time">${array[i].dateOfEntry}</label><br>` +
                    `    <input type="button" class="Delete" value="Delete" onclick="delCard(${array[i].id})"/>` +
                    `    <input type="button" value="Edit" onclick="editCard(${array[i].id})"/>` +
                    `</div>` +
                    `</div>`;
            }
        }
        if(result==``)
        document.getElementById("Notes").innerHTML = `<label class="input1" for="No">Nothing to show here. Add Some Notes.</label>`;
        else
        document.getElementById("Notes").innerHTML = result;
    }
    else
        document.getElementById("Notes").innerHTML = `<label class="input1" for="No">Nothing to show here. Add Some Notes.</label>`;
}
display();

// console.log(array)

function delCard(i) {
    let k=recycle.length;
    let key = keygen();
    let alert1 = prompt(`Enter "${key}" to confirm delete.`)
    if (alert1 == key) {
        for (let j = 0; j < array.length; j++) {
            if (parseInt(array[j].id) == parseInt(i)) {
                recycle[k++] = array[j];
                array.splice(j, 1);
            }
            setLD();
            display();
        }
    }
    else
        alert("Incorrect keyword");
}

function editCard(i) {
    document.getElementById(`card${i}`).style = "display:none";
    for (let j = 0; j < array.length; j++) {
        if (array[j].id == i) {
            document.getElementById("title").value = array[j].titl;
            document.getElementById("tArea").value = array[j].des;
            edIndex = j;
        }
    }
    document.getElementById("add").hidden = "hidden";
    document.getElementById("save").removeAttribute("hidden");
    document.getElementById("cancel").removeAttribute("hidden");
}

function saveN() {
    array[edIndex].titl = document.getElementById("title").value;
    array[edIndex].des = document.getElementById("tArea").value;
    setLD();
    display();
    res();
}

function check() {
    let a = document.getElementsByName("card");
    let b = [];
    let j = 0;
    for (i = 0; i < a.length; i++) {
        if (a[i].checked == true) {
            b[j++] = a[i].id;
        }
    }
    return b;
}

function delNote() {
    let k=recycle.length;
    let arr = check();
    if(arr.length>0){
        let key = keygen();
        let alert1 = prompt(`Enter "${key}" to confirm delete.`)
        if (alert1 == key) {
            for (let c = arr.length - 1; c >= 0; c--) {
                for (let j = 0; j < array.length; j++) {
                    if (parseInt(array[j].id) == parseInt(arr[c])) {
                        recycle[k++] = array[j];
                        array.splice(j, 1);
                        break;
                    }
                }
            }
            setLD();
            display();
        }
        else
            alert("Incorrect keyword");

    }
    else
    alert("select card then try again");
    
}

function arcNote() {
    let arr = check();
    for (let c = arr.length - 1; c >= 0; c--) {
        for (let j = 0; j < array.length; j++) {
            if (parseInt(array[j].id) == parseInt(arr[c])) {
                // console.log(parseInt(arr[c]));
                // console.log(parseInt(arr[c]));
                array[j].arc = false;
            }
        }
        setLD();
        display();
    }
}

function disAll() {
    for (let c = 0; c < array.length; c++) {
        array[c].arc = true;
    }
    setLD();
    display();
}

function backup() {
    let l=recycle.length;
    if(l>0){
        for (let c = 0; c < l ; c++) {
            array.push(recycle[0]);
            recycle.shift();
        }
        setLD();
        display();
    }
}