import React, {useReducer, useContext} from 'react';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
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
import {Http} from '../../http';

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const {changeScreen} = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = async title => {
    // const response = await fetch(
    //   'https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos.json',
    //   {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({title}),
    //   },
    // );
    // const data = await response.json();
    try {
      const data = await Http.post(
        'https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos.json',
        {title},
      );
      dispatch({type: ADD_TODO, title: title, id: data.name});
    } catch (error) {
      showError('ERRoR');
    }
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
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos/${id}.json`,
            );
            dispatch({type: REMOVE_TODO, id});
          },
        },
      ],
      {cancelable: false},
    );
  };
  const fetchTodos = async () => {
    try {
      showLoader();
      clearError();

      const data = await Http.get(
        'https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos.json',
      );
      //console.warn(data);
      const todos = Object.keys(data).map(key => ({...data[key], id: key}));
      dispatch({type: FETCH_TODOS, todos});
      hideLoader();
    } catch (error) {
      showError(error);
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-8b5c3-default-rtdb.firebaseio.com/todos/${id}.json`,
      );
      dispatch({type: UPDATE_TODO, id, title});
    } catch (error) {
      showError(error);
      console.log(error);
    }
  };
  const showLoader = () => dispatch({type: SHOW_LODER});
  const hideLoader = () => dispatch({type: HIDE_LODER});
  const showError = error => dispatch({type: SHOW_ERROR, error});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
