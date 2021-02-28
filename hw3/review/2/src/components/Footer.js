import React from "react";
export default (props) => {
  const {
    todoLeft,
    onFilterAllClick,
    onFilterActiveClick,
    onFilterCompletedClick,
    onClearCompletedClick,
  } = props;
  return (
    <footer className="todo-app__footer">
      <div className="todo-app__total">{todoLeft} left</div>
      <ul className="todo-app__view-buttons">
          <li>
              <button onClick={onFilterAllClick}>All</button>
          </li>
          <li>
              <button onClick={onFilterActiveClick}>Active</button>
          </li>
          <li>
              <button onClick={onFilterCompletedClick}>Completed</button>
          </li>
      </ul>
      <div className="todo-app__clean">
          <button onClick={onClearCompletedClick}>Clear completed</button>
      </div>
  </footer>
  );
};
