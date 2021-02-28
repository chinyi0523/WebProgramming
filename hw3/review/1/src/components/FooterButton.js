import React, {Component} from "react";

class FooterButton extends Component {
    constructor(props){
        super(props);
    }

    currentClass = function(){
        return (this.props.currentMode === this.props.id)?"view_buttons-onclick":"";
    }

    render(){
        var text = this.props.id;
        const buttonID = "button_" + text;
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return (
            <li><button name={this.props.id} id={buttonID} className={this.currentClass()} onClick={this.props.onClick}>{text}</button></li>
        );
    }
}

export default FooterButton;