import React, {LegacyRef, forwardRef} from 'react';
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
  children?: React.ReactNode;
};

export const MapsScreen = forwardRef<MapView, MapsScreenProps>(
  ({userLocation, children}, ref) => (
    <MapView
      ref={ref}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} // remove if not using Google Maps
      showsUserLocation
      style={styles.map}
      region={{
        latitude: userLocation.latitude ? userLocation.latitude : 0,
        longitude: userLocation.longitude ? userLocation.longitude : 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      {children}
    </MapView>
  ),
);
