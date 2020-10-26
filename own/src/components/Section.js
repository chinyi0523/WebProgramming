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
            filter:"All"
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
    handleAll = () =>{ this.setState( () =>({ filter: "All" })) }
    handleComplete = () =>{ this.setState( () =>({ filter: "Complete" })) }
    handleActive = () =>{ this.setState( () =>({ filter: "Active" })) }
    handleClear = () =>{
        this.setState(
            (state) =>({todoListData: state.todoListData.filter( i => !i["isCompleted"])})
        )
    }
    render(){
        const _style = {
            border: 'none',padding: '5px',fontSize: '0.8em',fontWeight: 'inherit',
            borderRadius: '5px',cursor: 'pointer'
        }
        const click_style = {
            border: '',borderColor: 'gray',backgroundColor: 'rgb(3, 241, 170)',padding: '5px',
            fontSize: '0.8em',fontWeight: 'inherit',borderRadius: '5px', cursor: 'pointer', 
        }
        let _list;
        if(this.state.filter==="Complete"){
            _list = this.state.todoListData.filter(e=>e["isCompleted"]).map( e => (<NewItem name={e["name"]} id={e["id"]} key={e["id"]} 
            check={this.handleCheck} cross={this.handleCross} isCompleted={e["isCompleted"]}/>)) 
        }
        else if(this.state.filter==="Active"){
            _list = this.state.todoListData.filter(e=>!e["isCompleted"]).map( e => (<NewItem name={e["name"]} id={e["id"]} key={e["id"]} 
            check={this.handleCheck} cross={this.handleCross} isCompleted={e["isCompleted"]}/>)) 
        }
        else{
            _list = this.state.todoListData.map( e => (<NewItem name={e["name"]} id={e["id"]} key={e["id"]} 
            check={this.handleCheck} cross={this.handleCross} isCompleted={e["isCompleted"]}/>)) 
        }
        return (
            <>
            <section className="todo-app__main">
                <input className="todo-app__input" 
                    placeholder="What needs to be done?" 
                    onKeyUp={this.handleEnter}/>
                <ul className="todo-app__list" id = "todo-list">
                    {_list}
                </ul>
            </section>
            <footer className="todo-app__footer" id="todo-footer" style={{display : this.state.todoListData.length===0 ? "none" : "flex"}}>
                <div id="todo-count" className="todo-app__total">
                    {this.state.todoListData.filter(e=> !e["isCompleted"]).length} left, {this.state.todoListData.filter(e=> e["isCompleted"]).length} completed
                </div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.handleAll} style={this.state.filter==="All" ? click_style : _style}>All</button>
                    <button onClick={this.handleActive} style={this.state.filter==="Active" ? click_style : _style}>Active</button>
                    <button onClick={this.handleComplete} style={this.state.filter==="Complete" ? click_style : _style}>Completed</button>
                </ul>
                <div className="todo-app__clean" >
                    <button className="button" onClick={this.handleClear} style={{visibility : this.state.todoListData.filter(e=> e["isCompleted"]).length===0 ? "hidden" : "visible"}}>Clear completed</button>
                </div>
            </footer>
            </>
        );
    }
}
export default section;