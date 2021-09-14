import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';

import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
  let content = (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={todos}
      renderItem={({item}) => (
        <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
      )}
    />
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
