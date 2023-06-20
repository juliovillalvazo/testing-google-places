import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Keyboard, Platform} from 'react-native';
import {MapsScreen} from './MapsScreen';
import * as Location from 'expo-location';
import {PlaceInput} from './components/PlaceInput';
import {TouchableWithoutFeedback} from 'react-native';

export default () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const {coords} = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <MapsScreen userLocation={userLocation} />
        <PlaceInput />
      </View>
    </TouchableWithoutFeedback>
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
