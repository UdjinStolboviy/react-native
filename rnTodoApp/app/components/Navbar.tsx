import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';

export const Navbar = (props: any) => {
  return (
    <View
      style={{
        ...style.navbar,
        ...Platform.select({
          ios: style.navbarIos,
          android: style.navbarAndroid,
        }),
      }}>
      <AppTextBold style={style.text}>{props.title}</AppTextBold>
    </View>
  );
};

const style = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    backgroundColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.GREY_COLOR : '#FFFF',
    fontSize: 20,
  },
});
