import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import CircularProgress from 'react-native-circular-progress-indicator';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getIntakeList} from '../redux/actions/drinkWaterAction';
var control = false;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const intakeList = useSelector(state => state.water);
  const [modal, setModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [intakeListData, setIntakeListData] = useState(null);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (control === false) {
      dispatch(getIntakeList());
      console.log('intake list:', intakeList);
      control = true;
    }
  }, [intakeList]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.firstContainer}>
        <View>
          <CircularProgress
            value={50}
            radius={120}
            duration={2000}
            progressValueColor={'grey'}
            maxValue={200}
            title={'Günlük içecek hedefi'}
            titleFontSize={15}
            titleColor={'grey'}
            titleStyle={{fontWeight: 'bold'}}
          />
        </View>
        <View>
          {/* <FlatList
            data={intakeList}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          /> */}
        </View>
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

    justifyContent: 'center',
    alignItems: 'center',
  },

  secondContainer: {
    width: '100%',
    height: '50%',
  },
});
