import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

const HomeScreen = () => {
  const [modal, setModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.firstContainer}>
        <Text>xfdfgsdfg</Text>
      </View>
      <View style={styles.secondContainer}>
        <Text>fgsdfg</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  progressCircleWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  firstContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey',
  },

  secondContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
