let a=[];
let index;
if(JSON.parse(localStorage.getItem("array"))!=null)
a=JSON.parse(localStorage.getItem("array"));
let i=a.length;

function res(){
    document.getElementById("title").value="";
    document.getElementById("tArea").value="";
    document.getElementById("save").hidden="hidden";
    document.getElementById("add").removeAttribute("hidden");
    document.getElementById("add").disabled=true;
    document.getElementById("cancel").hidden="hidden";
    display();
}

function addNote(){
    let date=new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let object={
        titl:document.getElementById("title").value,
        des:document.getElementById("tArea").value,
        dateOfEntry:currentDate,
        arc:true
    };
    a.push(object);
    localStorage.setItem("array",JSON.stringify(a));
    a=JSON.parse(localStorage.getItem("array"));
    display(); 
    res();
}

function enblBtn(){
    // console.log("working");
    if(document.getElementById("title").value!=""&&
    document.getElementById("tArea").value!="")
    document.getElementById("add").disabled=false;
    else
    document.getElementById("add").disabled=true;
}

function display(){
    let result=``;
    if(a.length>0){
        for(let i=0;i<a.length;i++){
            if(a[i].arc)
            result=result+`<div class="cards" id="card${i}">`+
            `<div class="detail">`+
            `    <label for="desc" class="topic">Tittle</label><input type="checkbox" name="card" id="${i}"><br>`+
            `    <label for="title">${a[i].titl}</label><br><br>`+
            `    <label for="desc" class="topic">Description</label><br>`+
            `    <label for="Description">${a[i].des}</label>`+
            `</div>`+
            `<div class="operation">`+
            `    <label for="time">${a[i].dateOfEntry}</label><br>`+
            `    <input type="button" class="Delete" value="Delete" onclick="delCard(${i})"/>`+
            `    <input type="button" value="Edit" onclick="editCard(${i})"/>`+
            `</div>`+
            `</div>`;
        }
        document.getElementById("Notes").innerHTML=result;
    }
    else
    document.getElementById("Notes").innerHTML=`<label class="input1" for="No">Nothing to show here. Add Some Notes.</label>`;
}

display();

function keygen(){
    var val = Math.floor(1000 + Math.random() * 9000);
    return val;
}

function delCard(i){
    let key=keygen();
    let alert1=prompt(`Enter "${key}" to confirm delete.`)
    if(alert1==key){
        a.splice(i,1);
        localStorage.setItem("array",JSON.stringify(a));
        display();
    }
    else
    alert("Incorrect keyword");
}

function editCard(i){
    document.getElementById(`card${i}`).style="display:none";
    document.getElementById("title").value=a[i].titl;
    document.getElementById("tArea").value=a[i].des;
    document.getElementById("add").hidden="hidden";
    document.getElementById("save").removeAttribute("hidden");
    document.getElementById("cancel").removeAttribute("hidden");
    index=i;
}

function saveN(){
    a[index].titl=document.getElementById("title").value;
    a[index].des=document.getElementById("tArea").value;
    localStorage.setItem("array",JSON.stringify(a));
    display();
    res();
}


function check(){
    let a=document.getElementsByName("card");
    let b=[];
    let j=0;
    for(i=0;i<a.length;i++){
        if(a[i].checked==true){
            b[j++]=a[i].id;
        }
    }
    return b;
}

function delNote(){
    let key=keygen();
    let alert1=prompt(`Enter "${key}" to confirm delete.`)
    if(alert1==key){
        let arr=check();
        for(let c=arr.length-1;c>=0;c--){
            console.log(arr[c]);
        a.splice(parseInt(arr[c]),1);}
        localStorage.setItem("array",JSON.stringify(a));
        display();
    }
    else
    alert("Incorrect keyword");

}

function arcNote(){
    let arr=check();
    for(let c=arr.length-1;c>=0;c--){
        console.log(parseInt(arr[c]));
        a[parseInt(arr[c])].arc=false;
        localStorage.setItem("array",JSON.stringify(a));
        display();
    }
}

function disAll(){
    for(let c=0;c<a.length;c++){
        a[c].arc=true;
        localStorage.setItem("array",JSON.stringify(a));
        display();
    }
}