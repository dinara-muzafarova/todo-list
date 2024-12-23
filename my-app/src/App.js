import React, { Component } from 'react';
import './App.css';
import ToDoItem from './ToDoItem/ToDoItem';
import todosData from './todosData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: todosData,
      newTaskDescription: "",
      newTaskDate: "",
      newTaskCategory: "",
      searchText: "",    
      filterCategory: "", 
      filterDate: "",      
      filterStatus: "all" 
    };
  }

  handleChange = id => {
    const index = this.state.todoItems.map(item => item.id).indexOf(id);
    this.setState(state => {
      let { todoItems } = state;
      todoItems[index].completed = true;
      return { todoItems };
    });
  };

  handleInputChange = event => {
    this.setState({ newTaskDescription: event.target.value });
  };

  handleDateChange = event => {
    this.setState({ newTaskDate: event.target.value });
  };

  handleCategoryChange = event => {
    this.setState({ newTaskCategory: event.target.value });
  };

  handleAddTask = () => {
    const { newTaskDescription, newTaskDate, newTaskCategory } = this.state;
    if (newTaskDescription.trim()) {
      const newTask = {
        id: Date.now(),
        description: newTaskDescription,
        date: newTaskDate,
        category: newTaskCategory,
        completed: false
      };

      this.setState(state => ({
        todoItems: [newTask, ...state.todoItems],
        newTaskDescription: "",
        newTaskDate: "",
        newTaskCategory: ""
      }));
    }
  };

  handleSearchChange = event => {
    this.setState({ searchText: event.target.value });
  };

  handleFilterCategoryChange = event => {
    this.setState({ filterCategory: event.target.value });
  };

  handleFilterDateChange = event => {
    this.setState({ filterDate: event.target.value });
  };

  handleStatusFilterChange = event => {
    this.setState({ filterStatus: event.target.value });
  };

  handleDeleteTask = id => {
    this.setState(state => ({
      todoItems: state.todoItems.filter(item=> item.id !==id)
    }))
  }

  render() {
    const { todoItems, newTaskDescription, newTaskDate, newTaskCategory, searchText, filterCategory, filterDate, filterStatus } = this.state;
    
    // Фильтрация задач по тексту поиска, категории и дате
    const filteredTasks = todoItems.filter(task => {
      const matchesSearchText = task.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = filterCategory ? task.category === filterCategory : true;
      const matchesDate = filterDate ? task.date === filterDate : true;
      const mathesStatus = 
        filterStatus === 'all' ? true : filterStatus === 'completed' ? task.completed : !task.completed;
      return matchesSearchText && matchesCategory && matchesDate && mathesStatus;
    });

    const totalTasks = todoItems.length;
    const completedTasksCount = todoItems.filter(task => task.completed).length;
    const activeTasksCount = totalTasks - completedTasksCount;

    const finalTasks = filteredTasks.map((item,index) => (
      <ToDoItem
        key={item.id}
        id = {item.id}
        index = {index+1}
        description={item.description}
        date={item.date}
        category={item.category}
        completed={item.completed}
        handleChange={() => this.handleChange(item.id)}
        handleDeleteTask={() => this.handleDeleteTask(item.id)}
      />
    ));

    return (
      <div className="App">
        <h1>Список задач:</h1>

        <div className="add-task">
          <input
            className="inp"
            type="text"
            placeholder="Введите новую задачу"
            value={newTaskDescription}
            onChange={this.handleInputChange}
          />
          <input 
            type="date" 
            value={newTaskDate} 
            onChange={this.handleDateChange} 
          />
          <input 
            className="category-input"
            type="text"
            placeholder="Категория" 
            value={newTaskCategory} 
            onChange={this.handleCategoryChange} 
          />
          <button onClick={this.handleAddTask} className="btn">
            Добавить задачу
          </button>
        </div>
        <div className="search-wrapper">
          <h2>Поиск</h2>
          <input
            type="text"
            placeholder="Поиск задач..."
            value={searchText}
            onChange={this.handleSearchChange}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Фильтр по категории"
            value={filterCategory}
            onChange={this.handleFilterCategoryChange}
            className="filter-input"
          />
          <select value = {filterStatus} onChange={this.handleStatusFilterChange} className='filter-input'>
            <option value = 'all'>все задачи</option>
            <option value = 'completed'>выполненные</option>
            <option value = 'incomplete'>невыполненные</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={this.handleFilterDateChange}
            
          />
        </div>

        <div className="tasks-container">
          <h2>Задачи: {totalTasks - completedTasksCount}</h2>
          {finalTasks}
        </div>
      </div>
    );
  }
}

export default App;