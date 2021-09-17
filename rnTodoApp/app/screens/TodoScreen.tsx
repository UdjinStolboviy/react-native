import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {THEME} from '../theme';
import {AppCart} from '../ui/AppCarts';
import {AppTextBold} from '../ui/AppTextBold';
import {EditModal} from './EditModal';
import {AppButton} from '../ui/AppButton';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from '../context/screen/screenContext';

export const TodoScreen = () => {
  const {todos, updateTodo, removeTodo} = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find(t => t.id === todoId);

  const saveHandler = title => {
    updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
        onSeve={saveHandler}
      />
      <AppCart style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <Icon name="at" size={18} color="#fff" />
        </AppButton>
      </AppCart>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}>
            <Icon name="chevron-left" size={18} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}>
            <Icon name="archive" size={18} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  title: {
    fontSize: 20,
  },
});
