import React, {useReducer, useContext} from 'react';
import {
  ADD_TODO,
  CLEAR_ERROR,
  HIDE_LODER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LODER,
  UPDATE_TODO,
} from '../types';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';
import {ScreenContext} from '../screen/screenContext';
import {Alert} from 'react-native';

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = async title => {
    const response = await fetch(
      'https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos.json',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title}),
      },
    );
    const data = await response.json();
    console.warn('DATA', data);
    dispatch({type: ADD_TODO, title: title, id: data.name});
  };

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      'Delete Element',
      `Are you shuo delete ${todo.title}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            changeScreen(null);
            dispatch({type: REMOVE_TODO, id});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});
  const showLoader = () => dispatch({type: SHOW_LODER});
  const hideLoader = () => dispatch({type: HIDE_LODER});
  const showError = error => dispatch({type: SHOW_ERROR, error});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
