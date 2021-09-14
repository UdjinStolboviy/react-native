import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppTextBold} from '../ui/AppTextBold';

export const Navbar = (props: any) => {
  return (
    <View style={style.navbar}>
      <AppTextBold style={style.text}>{props.title}</AppTextBold>
    </View>
  );
};

const style = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#3949ab',
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
