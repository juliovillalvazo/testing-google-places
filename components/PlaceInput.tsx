import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export const PlaceInput = () => {
  const [predictions, setPredictions] = useState<any[]>([]);

  const getPlaces = async (input: string) => {
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCl8qDuGbCkYzEMU_vyYgNbMCtsS2bKako&input=${input}&location=37.76999%2C-122.44696&radius=500`,
    );
    setPredictions(data.predictions);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="black"
        onChangeText={getPlaces}
        style={styles.placeInput}
        placeholder="Where to..."
      />
      {predictions.length >= 1 &&
        predictions.map((prediction, i) => (
          <View
            key={prediction.place_id}
            style={[
              styles.resultContainer,
              i === predictions.length - 1 && styles.lastResult,
            ]}>
            <Text style={styles.mainText}>
              {prediction.structured_formatting.main_text}
            </Text>
            <Text style={styles.secondaryText}>
              {prediction.structured_formatting.secondary_text}
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    width: '70%',
  },
  placeInput: {
    height: 40,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 8,
  },
  lastResult: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  mainText: {
    fontWeight: 'bold',
  },
  secondaryText: {
    color: 'grey',
  },
});
