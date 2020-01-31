import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#009688"  barStyle="light-content"/>
      <Routes />
    </>
  );
}