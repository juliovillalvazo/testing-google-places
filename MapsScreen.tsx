import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {StyleSheet, Platform} from 'react-native';
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

type MapsScreenProps = {
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  };
};

export const MapsScreen: React.FC<MapsScreenProps> = ({userLocation}) => (
  <MapView
    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} // remove if not using Google Maps
    showsUserLocation
    followsUserLocation
    style={styles.map}
    region={{
      latitude: userLocation.latitude ? userLocation.latitude : 0,
      longitude: userLocation.longitude ? userLocation.longitude : 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  />
);
