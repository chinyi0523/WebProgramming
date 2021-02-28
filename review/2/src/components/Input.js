import React from "react";
export default ({ placeholder, onKeyUp }) => {
  return (
    <input
      className="todo-app__input"
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  );
};
