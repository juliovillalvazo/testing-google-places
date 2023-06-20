import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';

import Constants from 'expo-constants';
import axios from 'axios';

export const PlaceInput = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getData = setTimeout(() => {
      load && getPlaces(input);
    }, 1000);
    return () => clearTimeout(getData);
  }, [input, load]);

  const getPlaces = async (input: string) => {
    try {
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCl8qDuGbCkYzEMU_vyYgNbMCtsS2bKako&input=${input}&location=37.76999%2C-122.44696&radius=500`,
      );
      setPredictions(data.predictions);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetDestination = (prediction: any) => {
    Keyboard.dismiss();
    setInput(prediction.structured_formatting.main_text);
    setLoad(false);
    setPredictions([]);
  };

  const handleChangeText = (value: string) => {
    setLoad(true);
    setInput(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="black"
        onChangeText={handleChangeText}
        style={styles.placeInput}
        value={input}
        keyboardAppearance="default"
        placeholder="Where to..."
      />
      {predictions.length >= 1 &&
        predictions.map((prediction, i) => (
          <Pressable
            key={prediction.place_id}
            onPress={() => handleSetDestination(prediction)}>
            {({pressed}) => (
              <View
                style={[
                  styles.resultContainer,
                  i === predictions.length - 1 && styles.lastResult,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.mainText}>
                  {prediction.structured_formatting.main_text}
                </Text>
                <Text style={styles.secondaryText}>
                  {prediction.structured_formatting.secondary_text}
                </Text>
              </View>
            )}
          </Pressable>
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
  pressed: {
    backgroundColor: '#bbb',
  },
});
