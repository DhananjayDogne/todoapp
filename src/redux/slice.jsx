import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: []
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false
            });
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText;
            }
        }
    }
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
