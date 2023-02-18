let a=[];
let recycle=[];
let index;
let  count=0;
if(JSON.parse(localStorage.getItem("index"))!=null)
count=JSON.parse(localStorage.getItem("index"));
else
localStorage.setItem("index",JSON.stringify(count));
if(JSON.parse(localStorage.getItem("array"))!=null)
a=JSON.parse(localStorage.getItem("array"));
if(JSON.parse(localStorage.getItem("recycle"))!=null)
recycle=JSON.parse(localStorage.getItem("recycle"));
let i=a.length;
let k=recycle.length;

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
        id:count++,
        titl:document.getElementById("title").value,
        des:document.getElementById("tArea").value,
        dateOfEntry:currentDate,
        arc:true
    };
    a.push(object);
    localStorage.setItem("array",JSON.stringify(a));
    localStorage.setItem("index",JSON.stringify(count));
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

function qSort(arr){
    function sortA(arr,left,right){
        if(left<right){
            pi=partition(arr,left,right);
            sortA(arr,left,pi-1);
            sortA(arr,pi+1,right)
        }

    }
    function partition(arr,left,right){
        let i=left;
        let pivort=arr[right];
        for(let j=left;j<right;j++){
            console.log(arr[j]);
            if(parseInt(pivort.id)>parseInt(arr[j].id)){
                swap(arr,i++,j);
            }
        }
        swap(arr,right,i);
        return i;
    }
    function swap(arr,left,right){
        let temp=arr[left];
        arr[left]=arr[right];
        arr[right]=temp;
    }
    sortA(arr,0,arr.length-1);
    return arr;
}

function display(){
    let result=``;
    a=qSort(a);
    if(a.length>0){
        // a.sort((x,y)=>x.id-y.id);
        for(let i=0;i<a.length;i++){
            if(a[i].arc)
            result=result+`<div class="cards" id="card${a[i].id}">`+
            `<div class="detail">`+
            `    <label for="desc" class="topic">Tittle</label><input type="checkbox" name="card" id="${a[i].id}"><br>`+
            `    <label for="title">${a[i].titl}</label><br><br>`+
            `    <label for="desc" class="topic">Description</label><br>`+
            `    <label for="Description">${a[i].des}</label>`+
            `</div>`+
            `<div class="operation">`+
            `    <label for="time">${a[i].dateOfEntry}</label><br>`+
            `    <input type="button" class="Delete" value="Delete" onclick="delCard(${a[i].id})"/>`+
            `    <input type="button" value="Edit" onclick="editCard(${a[i].id})"/>`+
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
        for(let j=0;j<a.length;j++){
            if(parseInt(a[j].id)==parseInt(i)){
                recycle[k++]=a[j];
                a.splice(j,1);
            }
            localStorage.setItem("array",JSON.stringify(a));
            localStorage.setItem("recycle",JSON.stringify(recycle));
            display();
        }
    }
    else
    alert("Incorrect keyword");
}

function editCard(i){
    document.getElementById(`card${i}`).style="display:none";
    for(let j=0;j<a.length;j++){
        if(a[j].id==i){
            document.getElementById("title").value=a[j].titl;
            document.getElementById("tArea").value=a[j].des;
            index=j;
        }
    }
    document.getElementById("add").hidden="hidden";
    document.getElementById("save").removeAttribute("hidden");
    document.getElementById("cancel").removeAttribute("hidden");
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
            for(let j=0;j<a.length;j++){
                if(parseInt(a[j].id)==parseInt(arr[c])){
                    recycle[k++]=a[j];
                    a.splice(j,1);
                }
            }
        }
        localStorage.setItem("array",JSON.stringify(a));
        localStorage.setItem("recycle",JSON.stringify(recycle));
        display();
    }
    else
    alert("Incorrect keyword");

}

function arcNote(){
    let arr=check();
    for(let c=arr.length-1;c>=0;c--){
        for(let j=0;j<a.length;j++){
            if(parseInt(a[j].id)==parseInt(arr[c])){
                
                console.log(parseInt(arr[c]));
                console.log(parseInt(arr[c]));
                a[j].arc=false;
            }
        }
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
function backup(){
    for(let c=0;c<recycle.length;c++){
        a.push(recycle[c]);
        recycle.shift();
        localStorage.setItem("array",JSON.stringify(a));
        localStorage.setItem("recycle",JSON.stringify(recycle));
    }
    display();
}