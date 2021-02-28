import React from "react";

export default ({keyup}) => {
    //    const {text} = props // expected to be { text: "" }
    return (
        <input className="todo-app__input" id="todo-input" placeholder="What needs to be done?" onKeyUp={keyup}/>
    );
};
