import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import List from "../components/List";
import Footer from "../components/Footer";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: {},
      todoLeft: 0,
      filter: [true, false],
    };
    this.maxId = 0;
    this.onFilterAllClick = this.onFilterClick.bind(this, [true, false]);
    this.onFilterActiveClick = this.onFilterClick.bind(this, [false]);
    this.onFilterCompletedClick = this.onFilterClick.bind(this, [true]);
  }

  onInputKeyUp = event => {
    if (event.keyCode === 13 && event.target.value !== "") {
      const text = event.target.value;
      event.target.value = '';
      this.setState(state => {
        let { todoList, todoLeft } = JSON.parse(JSON.stringify(state));
        todoList[this.maxId] = {
          text: text,
          completed: false,
        };
        todoLeft++;
        return {
          todoList: todoList,
          todoLeft: todoLeft,
        };
      });
      this.maxId++;
    }
  };

  onCheckboxClick = id => {
    this.setState(state => {
      let { todoList, todoLeft } = JSON.parse(JSON.stringify(state));
      todoList[id].completed = !todoList[id].completed;
      todoLeft += todoList[id].completed ? -1 : 1;
      return {
        todoList: todoList,
        todoLeft: todoLeft,
      };
    });
  };

  onXClick = id => {
    this.setState(state => {
      let { todoList, todoLeft } = JSON.parse(JSON.stringify(state));
      todoLeft -= !todoList[id].completed;
      delete todoList[id];
      return {
        todoList: todoList,
        todoLeft: todoLeft,
      };
    });
  };

  onFilterClick = filter => {
    this.setState({ filter: filter });
  };

  onClearCompletedClick = () => {
    this.setState(state => {
      let { todoList } = JSON.parse(JSON.stringify(state));
      for (let id of Object.keys(todoList)) {
        if (todoList[id].completed) {
          delete todoList[id];
        }
      }
      return { todoList: todoList };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header text="todos"/>
        <section className="todo-app__main">
          <Input
            placeholder="What needs to be done?"
            onKeyUp={this.onInputKeyUp}
          />
          <List
            todoList={this.state.todoList}
            filter={this.state.filter}
            onCheckboxClick={this.onCheckboxClick}
            onXClick={this.onXClick}
          />
        </section>
        <Footer
          todoLeft={this.state.todoLeft}
          onFilterAllClick={this.onFilterAllClick}
          onFilterActiveClick={this.onFilterActiveClick}
          onFilterCompletedClick={this.onFilterCompletedClick}
          onClearCompletedClick={this.onClearCompletedClick}
        />
      </React.Fragment>
    );
  }
}