import React from "react";
import cross from "../img/x.png";
const NewItem = (props) =>  {
    return(
       <li className="todo-app__item" id={props.id} style={{
        textDecoration: props.isCompleted ? 'line-through' : 'none',
      }}>
           <div className="todo-app__checkbox">
               <input className = 'input' type='checkbox' readOnly checked={props.isCompleted ? true : false} onClick={props.check} ></input>
               <label className = 'label' onClick={props.check}></label>
           </div>
           <h1 className="todo-app__item-detail" style={{opacity:props.isCompleted ? 0.6:1}}> {props.name} </h1>
           <img className="todo-app__item-x" src={cross} alt="delete" onClick={props.cross}></img>
       </li>
   )
}

class section extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:0,
            todoListData:[],
            filter:"default"
        }
    }
    handleInc = () => this.setState(state => ({ id: state.id + 1 }))
    handleEnter = (event) => {
        if (event.keyCode === 13 && event.target.value !== '')  {
            this.addNewDataToArray(event.target.value)
            this.handleInc()
            event.target.value = ''
        } 
    } 
    addNewDataToArray = (name) => this.setState(
        state => ({
            todoListData: [...state.todoListData,{
                "id":this.state.id,
                "isCompleted":false,
                "display":true,
                "name":name,
            }]
        }))
    handleCheck = (event) => {
        const li=event.target.parentNode.parentNode
        let items = [...this.state.todoListData];
        const idx = items.findIndex((e) => Number(e["id"])===Number(li.id))
        let item = {...items[idx]};
        item['isCompleted'] = !item['isCompleted'];
        items[idx] = item
        this.setState(
            ()=>({todoListData:items})
        )
    }
    handleCross = (event) =>{
        const _li=event.target.parentNode
        this.setState(
            (state) =>(
                {
                    todoListData: state.todoListData.filter((_, i) => i !== state.todoListData.findIndex((e) => Number(e["id"])===Number(_li.id)))
            })
        )
    }
    handleAll = () =>{
        let Data = [...this.state.todoListData];
        for (let d of Data){
            d["display"] = true;
        }
        this.setState(
            () =>({todoListData: Data})
        )
    }
    handleComplete = () =>{
        const result = this.state.todoListData.filter(ele => ele.isCompleted);
        let Data = [...this.state.todoListData];
        for (let d of Data){ d["display"] = false; }
        for (let d of result){ d["display"] = true; }
        this.setState(
            () =>({todoListData: Data})
        )
    }
    handleActive = () =>{
        const result = this.state.todoListData.filter(ele => !ele.isCompleted);
        let Data = [...this.state.todoListData];
        for (let d of Data){ d["display"] = false; }
        for (let d of result){ d["display"] = true; }
        this.setState( 
            () =>({todoListData: Data})
        )
    }
    handleClear = () =>{
        this.setState(
            (state) =>({todoListData: state.todoListData.filter( i => !i["isCompleted"])})
        )
    }
    render(){
        return (
            <>
            <section className="todo-app__main">
                <input className="todo-app__input" 
                    placeholder="What needs to be done?" 
                    onKeyUp={this.handleEnter}/>
                <ul className="todo-app__list" id = "todo-list">
                    {this.state.todoListData.filter(e=>e["display"]).map( e => (<NewItem name={e["name"]} id={e["id"]} key={e["id"]} 
                    check={this.handleCheck} cross={this.handleCross} isCompleted={e["isCompleted"]}/>))}
                </ul>
            </section>
            <footer className="todo-app__footer" id="todo-footer">
                <div id="todo-count" className="todo-app__total">
                    {this.state.todoListData.filter(e=> !e["isCompleted"]).length} left
                </div>
                <ul className="todo-app__view-buttons">
                    <button className="button" onClick={this.handleAll}>All</button>
                    <button className="button" onClick={this.handleActive}>Active</button>
                    <button className="button" onClick={this.handleComplete}>Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button className="button" onClick={this.handleClear}>Clear completed</button>
                </div>
            </footer>
            </>
        );
    }
}
export default section;