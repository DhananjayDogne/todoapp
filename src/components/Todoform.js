import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, editTodo } from '../redux/slice';

//icons 
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";

const TodoApp = () => {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editModeId, setEditModeId] = useState(null);
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleEdit = (todoId, newText) => {
    dispatch(editTodo({
      id: todoId,
      newText: newText.trim(),
    }));
    setEditModeId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Todo App</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="flex p-2 bg-blue-500 text-white  rounded-md hover:bg-blue-600 transition"
        >
          <IoMdAdd className='m-auto' /> <h1>Add Todo</h1>
        </button>
      </div>
      <ul className="w-1/2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 bg-white border-b border-gray-200 rounded-md shadow-sm mb-2 transition transform hover:scale-105"
          >
            {editModeId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onBlur={() => handleEdit(todo.id, editText)}
                onKeyDown={e => e.key === 'Enter' && handleEdit(todo.id, editText)}
                autoFocus
                className="flex-1 p-1 border border-gray-300 rounded-md"
              />
            ) : (
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.text}
              </span>
            )}
            <div className='flex'>
              {editModeId !== todo.id && (
                <button
                  onClick={() => {
                    setEditModeId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="flex ml-2 p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  <MdEdit className="m-auto "/> 
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="ml-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <MdDelete/>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
