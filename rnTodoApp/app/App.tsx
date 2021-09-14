/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {Navbar} from './components/Navbar';

import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';

const App = () => {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([{id: '1', title: 'Hello World'}]);
  const addTodo = (title: string) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title,
    };
    //setTodos(todos.concat([newTodo]))
    // setTodos((prevTodos)=> {
    //   return [
    //     ...prevTodos,
    //     newTodo
    //   ]
    // })
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
    Alert.alert('Delete Element', `Are you shuo delete ${todo.title}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setTodoId(null);
          setTodos(prev => prev.filter(todo => todo.id !== id));
        },
      },
    ]);
  };

  const updateToDo = (id, title) => {
    setTodos(old =>
      old.map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      }),
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={id => {
        setTodoId(id);
      }}
    />
  );
  if (todoId) {
    const selectedToDo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        onSeve={updateToDo}
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedToDo}
      />
    );
  }

  return (
    <View>
      <Navbar title="ToDo App" />
      <View style={styles.conteiner}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

export default App;
