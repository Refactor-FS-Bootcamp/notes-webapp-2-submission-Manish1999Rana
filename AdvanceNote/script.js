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
    document.getElementById("cancel").hidden="hidden";
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
        dateOfEntry:currentDate
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
            result=result+`<div class="cards" id="card${i}">`+
            `<div class="detail">`+
            `    <label for="desc" class="topic">Tittle</label><input type="checkbox" name="card" id="note${i}"><br>`+
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
}

function delCard(i){
    let key=keygen();
    let alert1=prompt(`Enter ${key} to confirm delete.`)
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

function delNote(){
    let key=keygen();
    let alert1=prompt(`Enter ${key} to confirm delete.`)
    if(alert1==key){
        
        a.splice(i,1);
        localStorage.setItem("array",JSON.stringify(a));
        display();
    }
    else
    alert("Incorrect keyword");

}