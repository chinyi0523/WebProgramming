const input = document.getElementsByClassName("todo-app__input")[0];
const main = document.getElementsByClassName("todo-app__main")[0];
const list = document.createElement("UL")
const all = document.getElementsByClassName("button")[0]
const active = document.getElementsByClassName("button")[1]
const completed = document.getElementsByClassName("button")[2]
const clear = document.getElementsByClassName("button")[3]
var todoListData = []
var count = 0
input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== '')  {
        const newItem = CreateNewItem(event.target.value,false);
        if(todoListData.length===0){
            list.className = "todo-app__list"
            list.id = "todo-list"
            main.appendChild(list)
        }
        todoListData[todoListData.length] = newItem;
        input.value=""
        CountLeftTask()
    } 
});
list.addEventListener('click', function(event) {
    var element = event.target;
    if(element.nodeName === "LABEL"){
        const _li = element.parentNode.parentNode
        const _id = _li.id
        for (data of todoListData){
            if(data["id"] == _id){
                EditCheckbox(data["isComplete"],data["node"])
                data["isComplete"] = !data["isComplete"]
                CountLeftTask() 
            }
        }
    }
    else if(element.nodeName === "IMG"){
        const _li = element.parentNode
        const is = (element) => element["id"]==_li.id;
        const node = todoListData.find(is)["node"]
        todoListData.splice(todoListData.findIndex(is),1)
        list.removeChild(node)
        CountLeftTask() 
    }
});
all.addEventListener('click',function(){
    for (data of todoListData){
        data["node"].style.display = 'none';
    }
    for (data of todoListData){
        data["node"].style.display = 'flex';
    }
})
active.addEventListener('click',function(){
    const result = todoListData.filter(ele => !ele.isComplete);
    for (data of todoListData){
        data["node"].style.display = 'none';
    }
    for (data of result){
        data["node"].style.display = 'flex';
    }
})
completed.addEventListener('click',function(){
    const result = todoListData.filter(ele => ele.isComplete);
    for (data of todoListData){
        data["node"].style.display = 'none';
    }
    for (data of result){
        data["node"].style.display = 'flex';
    }
})
clear.addEventListener('click',function(){
    const result = todoListData.filter(ele => ele.isComplete); 
    for(data of result){
        const is = (element) => element["id"]==data["id"];
        const node = todoListData.find(is)["node"]
        todoListData.splice(todoListData.findIndex(is),1)
        list.removeChild(node)
    }
})
function EditCheckbox(complete,node){
    if(!complete){
        node.style["textDecoration"] = "line-through";
        node.style["opacity"] = 0.6;
        node.childNodes[0].childNodes[0].checked = true
    }
    else{
        node.style["textDecoration"] = "";
        node.style["opacity"] = 1;
        node.childNodes[0].childNodes[0].checked = false
    }
}
function CountLeftTask(){
    todoCount = document.getElementById("todo-count");
    todoCount.innerHTML = todoListData.filter(ele => !ele.isComplete).length + " left";
}
function CreateNewItem(name,completed){
    const _input = document.createElement("INPUT");
    _input.className = 'input'
    _input.type='checkbox'
    _input.checked = false
    const _label = document.createElement("LABEL");
    _label.className = 'label'
    const _div = document.createElement("DIV")
    _div.className="todo-app__checkbox"
    _div.appendChild(_input)
    _div.appendChild(_label)
    const _h1 = document.createElement("H1");
    _h1.className="todo-app__item-detail"
    _h1.innerHTML=name
    const _img = document.createElement("IMG");
    _img.src="./img/x.png"
    _img.className="todo-app__item-x"
    const _li = document.createElement("LI");
    _li.className="todo-app__item"
    _li.id = count
    _li.appendChild(_div)
    _li.appendChild(_h1)
    _li.appendChild(_img)
    list.appendChild(_li)
    newItem = { node: _li, isComplete: completed , id: count};
    count += 1
    return newItem
}