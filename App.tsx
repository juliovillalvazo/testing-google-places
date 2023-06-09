import {Text, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import MapsScreen from './MapsScreen';
import * as Location from 'expo-location';
import {PlaceInput} from './components/PlaceInput';

export default () => {
  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    await Location.getCurrentPositionAsync({});
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <MapsScreen />
      <PlaceInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
