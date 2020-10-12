/* functions */

function click_input(item){
    const arr = item.parentElement.parentElement.children;
    const node = arr[1];
    if(todo_list_arr[parseInt(item.id)].isComplete === false){
        node.style["textDecoration"] = "line-through";
        node.style["opacity"] = 0.5;
        todo_list_arr[parseInt(item.id)].isComplete = true;
    }
    else{
        node.style["textDecoration"] = "";
        node.style["opacity"] = 1;
        todo_list_arr[parseInt(item.id)].isComplete = false;
    }
    show_list();
    update_cnt();
}

function delete_item_by_x(item_x){
    const node = item_x.parentElement;
    const id = parseInt(item_x.parentElement.children[0].children[0].id);
    const parent = node.parentElement;
    parent.removeChild(node);
    todo_list_arr[id].isComplete = true;
    todo_list_arr[id].isDeleted = true;
    update_cnt();
    show_clr_com();
}

function clear_border(){
    but_all.setAttribute("style", "border: none; border-radius: none;");
    but_act.setAttribute("style", "border: none; border-radius: none;");
    but_com.setAttribute("style", "border: none; border-radius: none;");
}

function update_cnt(){
    var todo_count = document.getElementById("todo-count");
    var cnt_pre = parseInt(todo_count.innerText);
    var cnt = todo_list_arr.filter(e => !e.isComplete).length;
    todo_count.innerHTML = cnt;
    if(cnt_pre === 0 && cnt === 1) todo_footer.setAttribute("style", "display: ;");
    else if(!todo_list_arr.some(e => !e.isDeleted)) todo_footer.setAttribute("style", "display: none;");
}

function show_list(){
    todo_list.innerHTML = "";
    if(state === "all"){
        for(let i = 0; i < todo_list_arr.length; i++){
            if(todo_list_arr[i].isDeleted === false) todo_list.appendChild(todo_list_arr[i].node);
        }
    }
    else if(state === "active"){
        var todo_list_arr_active = todo_list_arr.filter(e => !e.isComplete);
        for(let i = 0; i < todo_list_arr_active.length; i++){
            if(todo_list_arr_active[i].isDeleted === false) todo_list.appendChild(todo_list_arr_active[i].node);
        }
    }
    else if(state === "complete"){
        var todo_list_arr_complete = todo_list_arr.filter(e => e.isComplete);
        for(let i = 0; i < todo_list_arr_complete.length; i++){
            if(todo_list_arr_complete[i].isDeleted === false) todo_list.appendChild(todo_list_arr_complete[i].node);
        }
    }
    else{
        console.log("state error");
    }

    show_clr_com();
}

function show_clr_com(){
    if(todo_list_arr.some(e => (e.isComplete && !e.isDeleted))){
        but_clr.setAttribute("style", "color: black;");
    }
    else{
        but_clr.setAttribute("style", "color: white;");
    }
}

/* 
<li class="todo-app__item">
    <div class="todo-app__checkbox">
        <input id="0" type="checkbox">
        <label for="0"></label>
    </div>
    <h1 class="todo-app__item-detail">todo1</h1>
    <img src="./img/x.png" class="todo-app__item-x">
</li>
 */

var createTodoItem = (index, name) => {
    // create checkbox
    let checkbox_input = document.createElement("input");
    checkbox_input.setAttribute("type", "checkbox");
    checkbox_input.setAttribute("id", index.toString());
    checkbox_input.setAttribute("onclick", "click_input(this);");
    let checkbox_label = document.createElement("label");
    checkbox_label.setAttribute("for", index.toString());

    let check_box = document.createElement("div");
    check_box.setAttribute("class", "todo-app__checkbox");
    check_box.appendChild(checkbox_input);
    check_box.appendChild(checkbox_label);

    // create item-detail
    let item_detail = document.createElement("h1");
    item_detail.setAttribute("class", "todo-app__item-detail");
    item_detail.innerText = name;

    // create item-x
    let item_x = document.createElement("img");
    item_x.setAttribute("src", "./img/x.png");
    item_x.setAttribute("class", "todo-app__item-x");
    item_x.setAttribute("onclick", "delete_item_by_x(this);");

    // create todo-item
    let todo_item = document.createElement("li");
    todo_item.setAttribute("class", "todo-app__item");
    todo_item.appendChild(check_box);
    todo_item.appendChild(item_detail);
    todo_item.appendChild(item_x);

    return todo_item;
};

/* Start */

window.addEventListener("load", () => {
    todo_footer.setAttribute("style", "display: none;");
    but_clr.setAttribute("style", "color: white;");
});

var todo_list_arr = [];
var state = "all";

var root = document.getElementById("root");
var todo_list = document.getElementById("todo-list");
var todo_footer = document.getElementById("todo-footer");
const todo_input = document.getElementById("todo-input");
todo_input.addEventListener("keyup", event => {
    if (event.keyCode === 13 && event.target.value !== ""){
        const item_node = createTodoItem(todo_list_arr.length, event.target.value);
        var new_item = { node: item_node, isComplete: false, isDeleted: false };
        todo_list_arr.push(new_item);
        todo_input.value = "";
        show_list();
        update_cnt();

    }
});

var but_all = document.getElementById("but_all");
var but_act = document.getElementById("but_act");
var but_com = document.getElementById("but_com");
but_all.addEventListener("click", () => {
    state = "all";
    clear_border();
    but_all.setAttribute("style", "border: #cccccc solid 1px; border-radius: 5px;");
    show_list();
});
but_act.addEventListener("click", () => {
    state = "active";
    clear_border();
    but_act.setAttribute("style", "border: #cccccc solid 1px; border-radius: 5px;");
    show_list();
});
but_com.addEventListener("click", () => {
    state = "complete";
    clear_border();
    but_com.setAttribute("style", "border: #cccccc solid 1px; border-radius: 5px;");
    show_list();
});

var but_clr = document.getElementById("but_clr");
but_clr.addEventListener("click", () => {
    for(let i = 0; i < todo_list_arr.length; i++){
        if(todo_list_arr[i].isComplete === true) todo_list_arr[i].isDeleted = true;
    }
    show_list();
    update_cnt();
});
