import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';
import {THEME} from '../theme';

export const EditModal = ({visible, onCancel, value, onSeve}) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error', 'Min simbol 3');
    } else {
      onSeve(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={style.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={style.input}
          placeholder="Name ToDo"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={60}
        />
        <View style={style.button}>
          <Button
            title="Cancele"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Seve" onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  button: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
