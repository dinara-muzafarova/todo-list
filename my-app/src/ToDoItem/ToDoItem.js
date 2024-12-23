import React from 'react';
import './ToDoItem.css';

const ToDoItem = props => {
    const { index,completed, description, date, category, handleChange } = props;

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <div className='description-wrapper'>
                <p className='todo-description'>{index}. {description}
                </p>
                <p className="todo-date">Дата: {date}</p>
                <p className="todo-category">Категория: {category}</p>
            </div>
            <div className='input-wrapper'>
                <input 
                    type='checkbox' 
                    checked={completed} 
                    onChange={handleChange} 
                />
                <button onClick={props.handleDeleteTask} className='delete-btn'>
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default ToDoItem;