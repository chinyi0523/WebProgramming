import React, {Component} from "react";
import Ximg from "../img/x.png"

class Task extends Component {

    constructor(props){
        super(props);
        this.state = {isCompleted: this.props.isCompleted};
    }

    getStyle = function(){
        if(this.props.isCompleted){ return {textDecoration: "line-through", opacity: 0.5}; }
        else{ return null; }
    }

    render() {
        return (
            <li className="todo-app__item" style={this.getStyle()}>
                <div className="todo-app__checkbox">
                    <input id={this.props.id} type="checkbox" onClick={this.props.onTaskComplete} defaultChecked={this.state.isCompleted}/>
                    <label htmlFor={this.props.id}/>
                </div>
                <h1 className="todo-app__item-detail">{this.props.text}</h1>
                <img className="todo-app__item-x" src={Ximg} alt="" onClick={this.props.delTask}/>
            </li>
        );
    }
}

export default Task;