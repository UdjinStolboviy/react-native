import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {THEME} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState('');
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    } else {
      Alert.alert('Название дела не может быть пустым');
    }
  };

  const addButton = (
    <Icon.Button name="check" backgroundColor="#3b5998" onPress={pressHandler}>
      add
    </Icon.Button>
  );

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
        placeholder="Ведите название дела"
        autoCorrect={false}
        autoCapitalize="none"
        //keyboardType="number-pad"
      />
      <View style={styles.buttonAdd}>
        {addButton}
        {/* <Button title="Add" onPress={pressHandler} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  buttonAdd: {
    width: '25%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#2ed',
  },
});
