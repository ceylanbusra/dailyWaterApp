import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';
const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Home');
  }, 3000);
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={{justifyContent: 'center', alignItems: 'center'}}
        source={require('../assets/splash.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.8,
  },
});
