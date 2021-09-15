import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Navbar} from './components/Navbar';
import {TodoContext} from './context/todo/todoContext';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';
import {THEME} from './theme';

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
  const [todoId, setTodoId] = useState(null);
  //const [todos, setTodos] = useState([]);

  //   const addTodo = (title: string) => {
  //     const newTodo = {
  //       id: Date.now().toString(),
  //       title: title,
  //     };
  //     //setTodos(todos.concat([newTodo]))
  //     // setTodos((prevTodos)=> {
  //     //   return [
  //     //     ...prevTodos,
  //     //     newTodo
  //     //   ]
  //     // })
  //     setTodos(prev => [
  //       ...prev,
  //       {
  //         id: Date.now().toString(),
  //         title,
  //       },
  //     ]);
  //   };

  //   const removeTodo = id => {
  //     const todo = todos.find(t => t.id === id);
  //     Alert.alert('Delete Element', `Are you shuo delete ${todo.title}`, [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Remove',
  //         style: 'destructive',
  //         onPress: () => {
  //           setTodoId(null);
  //           setTodos(prev => prev.filter(todo => todo.id !== id));
  //         },
  //       },
  //     ]);
  //   };

  //   const updateToDo = (id, title) => {
  //     setTodos(old =>
  //       old.map(todo => {
  //         if (todo.id === id) {
  //           todo.title = title;
  //         }
  //         return todo;
  //       }),
  //     );
  //   };

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
        onSeve={updateTodo}
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
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
