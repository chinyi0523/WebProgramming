import React from "react";
import itemX from "../img/x.png";
export default ({ todoList, filter, onCheckboxClick, onXClick }) => {
  return (
    <ul className="todo-app__list">
      {
        Object.keys(todoList).map(key => {
          const item = todoList[key];
          return filter.includes(item.completed) && (
            <li className="todo-app__item" key={key}>
              <div className="todo-app__checkbox">
                <input id={key} type="checkbox" onClick={() => {
                  return onCheckboxClick(key);
                }}/>
                <label htmlFor={key} style={item.completed ? {
                  background: "#26ca299b",
                } : {}}/>
              </div>
              <h1
                className="todo-app__item-detail"
                style={item.completed ? {
                  textDecoration: "line-through",
                  opacity: 0.5,
                } : {}}
              >
                {item.text}
              </h1>
              <img className="todo-app__item-x" src={itemX} onClick={() => {
                return onXClick(key);
              }}/>
            </li>
          );
        })
      }
    </ul>
  );
};
