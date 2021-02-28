import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Task from "../components/Task";
import FooterButton from "../components/FooterButton";

class TodoApp extends Component {

    constructor(props){
        super(props);
        this.state = {id: 0, data: [], viewMode: "all"};
    }

    pressEnter = (event) => {
        const taskStr = event.target.value;
        if(event.key === "Enter" && taskStr !== ''){
            const newItem = {id:this.state.id, text: taskStr, isCompleted: false};
            this.setState(state => ({
                id: state.id + 1,
                data: [...state.data, newItem]
            }));
            event.target.value = '';
        }
    }

    completeTask = function(id){
        const idx = this.state.data.findIndex(e => e.id === id);
        var newData = this.state.data;
        const obj = newData[idx];
        const newItem = {id: obj.id, text: obj.text, isCompleted: !obj.isCompleted};
        newData[idx] = newItem;
        this.setState({ data: newData});
    }

    removeTask = function(id){
        const newData = this.state.data.filter(e => e.id !== id);
        this.setState({ data: newData });
    }

    FooterVisible = function(){
        return this.state.data.length === 0 ? {display: "none"} : {display: ""};
    }

    ClearCompleteVisible = function(){
        return this.state.data.filter(e => e.isCompleted).length > 0 ? {visibility: ""} : {visibility: "hidden"};
    }

    ClearComplete = ()=>{
        const newData = this.state.data.filter(e => e.isCompleted === false);
        this.setState({ data: newData });
    }

    onFooterButtonClick = (event) => {
        this.setState({ viewMode: event.target.name})
    }

    viewFilter = (e) => {
        if(this.state.viewMode === "all"){ return true; }
        else if(this.state.viewMode === "active"){ return (e.isCompleted === false); }
        else if(this.state.viewMode === "completed"){ return (e.isCompleted === true); }
    }

    render() {
        // console.log(this.state.data);
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <Input keyup={this.pressEnter}/>
                    <ul className="todo-app__list" id="todo-list">
                        {this.state.data.filter(this.viewFilter).map((item)=>
                            <Task key={item.id.toString()} id={item.id} text={item.text}
                                  onTaskComplete={()=>this.completeTask(item.id)}
                                  isCompleted={this.state.data.find(e => e.id === item.id).isCompleted}
                                  delTask={()=>this.removeTask(item.id)}/> 
                        )}
                    </ul>
                </section>
                <footer className="todo-app__footer" id="todo-footer" style={this.FooterVisible()}>
                    <div className="todo-app__total">{this.state.data.filter(e => e.isCompleted === false).length} left</div>
                    <ul className="todo-app__view-buttons">
                        <FooterButton id="all" currentMode={this.state.viewMode} onClick={this.onFooterButtonClick}/>
                        <FooterButton id="active" currentMode={this.state.viewMode} onClick={this.onFooterButtonClick}/>
                        <FooterButton id="completed" currentMode={this.state.viewMode} onClick={this.onFooterButtonClick}/>
                    </ul>
                    <div className="todo-app__clean">
                        <button id="button_clear_completed" style={this.ClearCompleteVisible()} onClick={this.ClearComplete}>Clear completed</button>
                    </div>
                </footer>
            </>
        );
    }
}

export default TodoApp;
