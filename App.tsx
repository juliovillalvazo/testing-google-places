import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Keyboard, Platform} from 'react-native';
import {MapsScreen} from './MapsScreen';
import * as Location from 'expo-location';
import {PlaceInput} from './components/PlaceInput';
import {TouchableWithoutFeedback} from 'react-native';
import * as polyline from '@mapbox/polyline';
import axios from 'axios';
import MapView, {Marker, Polyline} from 'react-native-maps';

export default () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [route, setRoute] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const mapRef = useRef<MapView>(null);
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

      const points = result.data.routes[0].overview_polyline.points;

      if (points) {
        const latLonArr = polyline
          .decode(points)
          .map(point => ({latitude: point[0], longitude: point[1]}));

        setRoute(latLonArr);
        mapRef.current?.fitToCoordinates(
          latLonArr,
          Platform.OS === 'ios'
            ? {edgePadding: {top: 40, bottom: 40, left: 40, right: 40}}
            : {},
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(mapRef);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <MapsScreen userLocation={userLocation} ref={mapRef}>
          {route.length > 0 ? (
            <>
              <Polyline coordinates={route} strokeWidth={10} />
              <Marker coordinate={route[route.length - 1]} />
            </>
          ) : null}
        </MapsScreen>
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
