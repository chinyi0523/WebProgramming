const input = document.getElementsByClassName("todo-app__input")[0];
const main = document.getElementsByClassName("todo-app__main")[0];
const list = document.createElement("UL")
var todoListData = []

input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== '')  {
        const newItem = CreateNewItem(event.target.value);
        if(todoListData.length===0){
            list.className = "todo-app__list"
            list.id = "todo-list"
            main.appendChild(list)
            // console.log(list)
            // console.log(main.childNodes)
        }
        todoListData[todoListData.length] = newItem;
        input.value=""
        todoCount = document.getElementById("todo-count");
        todoCount.innerHTML
        = todoListData.filter(ele => !ele.isComplete).length + " left";
    }
    
});

function CreateNewItem(name){
    const _input = document.createElement("INPUT");
    _input.type='checkbox'
    _input.id="0"
    const _label = document.createElement("LABEL");
    _label.for="0"
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
    _li.appendChild(_div)
    _li.appendChild(_h1)
    _li.appendChild(_img)

    list.appendChild(_li)
    newItem = { node: _li, isComplete: false };
    return newItem
}