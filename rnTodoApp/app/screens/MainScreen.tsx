import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';

import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {ScreenContext} from '../context/screen/screenContext';
import {TodoContext} from '../context/todo/todoContext';
import {THEME} from '../theme';

export const MainScreen = () => {
  const {addTodo, todos, removeTodo} = useContext(TodoContext);
  const {changeScreen} = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener('change', update);
    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  let content = (
    <View style={{width: deviceWidth}}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.imege}
          source={require('../assets/img/no-items.png')}
        />
        {/* <Image
          style={styles.imege}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc8tWN8DSniPWOaB5gf6hsaN8_teZv_3lExvqQ0GkJ97RNjP-Gie5LseAyOOsTYX_stsc&usqp=CAU',
          }}
        /> */}
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  imege: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
