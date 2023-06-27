import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Keyboard, Platform} from 'react-native';
import {MapsScreen} from './MapsScreen';
import * as Location from 'expo-location';
import {PlaceInput} from './components/PlaceInput';
import {TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

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

  const showDirectionsOnMap = async (placeId: string) => {
    try {
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?destination=place_id:${placeId}&origin=${userLocation.latitude},${userLocation.longitude}&key=AIzaSyCl8qDuGbCkYzEMU_vyYgNbMCtsS2bKako`,
      );
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <MapsScreen userLocation={userLocation} />
        <PlaceInput
          userLocation={userLocation}
          showDirectionsOnMap={showDirectionsOnMap}
        />
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
