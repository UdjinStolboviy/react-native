// eslint-disable-next-line prettier/prettier
import { ADD_TODO, CLEAR_ERROR, HIDE_LODER, REMOVE_TODO, SHOW_ERROR, SHOW_LODER, UPDATE_TODO, FETCH_TODOS } from '../types';

const handlers = {
    [ADD_TODO]: (state, { title, id }) => ({
        ...state,
        todos: [...state.todos, { id, title: title }],
    }),
    [REMOVE_TODO]: (state, { id }) => ({
        ...state,
        todos: state.todos.filter(todo => todo.id !== id),
    }),
    [UPDATE_TODO]: (state, { title, id }) => ({
        ...state,
        todos: state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }
            return todo;
        }),
    }),
    [SHOW_LODER]: state => ({ ...state, loading: true }),
    [HIDE_LODER]: state => ({ ...state, loading: false }),
    [CLEAR_ERROR]: state => ({ ...state, error: null }),
    [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
    [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
    DEFAULT: state => state,
};

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};
