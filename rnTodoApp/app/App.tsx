/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {TodoState} from './context/todo/TodoState';
import {MainLayout} from './MainLayout';

import {MainScreen} from './screens/MainScreen';
import {ScreenState} from './context/screen/screenState';

const App = () => {
  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
};

export default App;
