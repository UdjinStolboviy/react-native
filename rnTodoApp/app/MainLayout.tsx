import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Navbar} from './components/Navbar';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';
import {THEME} from './theme';
import {ScreenContext} from './context/screen/screenContext';

export const MainLayout = () => {
  const {todoId} = useContext(ScreenContext);
  //const [todoId, setTodoId] = useState(null);
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

  // let content = <MainScreen />;
  // if (todoId) {
  //   content = <TodoScreen />;
  // }

  return (
    <View style={styles.wrap}>
      <Navbar title="ToDo App" />
      <View style={styles.conteiner}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  wrap: {
    flex: 1,
  },
});
