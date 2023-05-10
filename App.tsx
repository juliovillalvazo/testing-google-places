import {Text, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import MapsScreen from './MapsScreen';
import * as Location from 'expo-location';

export default () => {
  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    await Location.getCurrentPositionAsync({});
  };
  useEffect(() => {
    getLocation();
  }, []);
  return <MapsScreen />;
};

const styles = StyleSheet.create({});
