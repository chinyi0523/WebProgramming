var todo_list_all = []
var todo_list_item_classname=["todo-app__checkbox","todo-item-input","todo-app__item-x"]
var input = document.getElementById("input")
var todo_list = document.getElementById("list")
var footer = document.getElementById("footer")
var all = document.getElementById("all")
var active = document.getElementById("active")
var completed = document.getElementById("completed")
var detail = document.getElementById("detail");
var clear = document.getElementById("clear")
const not_c = (element)=>element.isfinish===false;
const compl = (element)=>element.isfinish===true;

all.addEventListener("click",e=>{
    status = "all";
    display();
})
active.addEventListener("click",e=>{
    status = "active";
    display();
})
completed.addEventListener("click",e=>{
    status = "completed";
    display();
})
clear.addEventListener("click",e=>{
    if(todo_list_all.some(compl)){
        for(var i = todo_list_all.filter(compl).length-1 ;i>=0;i--){
            todo_list_all.splice(todo_list_all.indexOf(todo_list_all.filter(compl)[i]),1);
        }
        display();
    }
    else    return;
})
input.value="";
var status = "all";

var a_item = function(str){
    this.isfinish = false;
    this.item =document.createElement("div")
    this.item.className ="todo-app__item";
    this.item.appendChild(document.createElement("div"))
    this.item.appendChild(document.createElement("p"))
    this.item.appendChild(document.createElement("img"))
    for (var l =0;l<this.item.childElementCount;++l){
        this.item.children[l].className = todo_list_item_classname[l];
    }
    this.item.input = this.item.getElementsByClassName("todo-item-input")[0]
    this.item.cancel = this.item.getElementsByClassName("todo-app__item-x")[0]
    this.item.input.innerHTML =str;
    this.item.children[2].setAttribute("src","img/x.png")
    this.item.checkbox = document.createElement("input")
    this.item.checkbox.setAttribute("type","checkbox");
    this.item.children[0].appendChild(this.item.checkbox);
    this.item.children[0].appendChild(document.createElement("label"));
    this.item.children[0].children[1].addEventListener("click",event=>{console.log("fuck");isfinished(this)})
    this.item.cancel.addEventListener("click",e=>{remove_item(this)})
    this.item.detail = str;
}
function remove_item(obj){
    todo_list.removeChild(obj.item)
    var index = todo_list_all.indexOf(obj);
    todo_list_all.splice(index,1);
    display();
    delete obj;
}

function isfinished(obj){
    if(obj.isfinish){
        obj.isfinish=false;
        obj.item.checkbox.checked = false;
        obj.item.input.innerHTML = obj.item.detail
        //obj.item.input.setAttribute("style","color:black")
        display();
    }
    else{
        obj.isfinish=true;
        obj.item.checkbox.checked = true;
        obj.item.input.innerHTML = "<s>"+obj.item.detail+"</s>"
        //obj.item.input.setAttribute("style","color:gray")
        display();
    }
}

window.onload = function() {footer.setAttribute("style","display:none")}
window.addEventListener("keypress",e=>{if(e.key==="Enter")todo_list_add()})

function todo_list_add(){
    if(input.value==="")
        return;
    a_new_todo = new a_item(input.value);
    todo_list_all.push(a_new_todo);
    input.value = "";
    todo_list.appendChild(a_new_todo.item)
    display()
}

function display(){
    if(todo_list_all.length === 0){
        footer.setAttribute("style","display:none")
    }
    else footer.setAttribute("style","display:flex")
    todo_list.innerHTML=""
    if(status ==="all"){
        for(var i =0;i<todo_list_all.length;++i){
            todo_list.appendChild(todo_list_all[i].item)
        }
    }
    else if(status === "completed"){
        for(var i =0;i<todo_list_all.filter(compl).length;i++){
            todo_list.appendChild(todo_list_all.filter(compl)[i].item)
        }
    }
    else if(status === "active"){
        for(var i =0;i<todo_list_all.filter(not_c).length;i++){
            todo_list.appendChild(todo_list_all.filter(not_c)[i].item)
        }
    }
    border();
    detail.innerHTML = todo_list_all.filter(not_c).length+" left";
}

function border(){
    all.style.border="none";
    active.style.border="none";
    completed.style.border="none";
    if(status==="all")  all.style.border = "1px solid black"
    else if(status==="active")  active.style.border = "1px solid black"
    else completed.style.border = "1px solid black"
}

