/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import CircularProgress from 'react-native-circular-progress-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteIntake,
  getGoal,
  getIntake,
  getIntakeList,
  postIntake,
  setIntake,
} from '../redux/actions/drinkWaterAction';
import moment from 'moment';

var control = false;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const {intakeList, goal, intake} = useSelector(state => state.water);
  const [isModalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [item, setItem] = useState(null);
  const [dailyList, setDailyList] = useState(null);
  const [dailyWater, setDailyWater] = useState(0);

  //Modalın açma kapatma durumlarını kontrol eder.
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setNumber('');
    console.log('setItem:', item);
  };

  //Sayfa ilk açıldığında tetiklenen method
  useEffect(() => {
    if (control === false) {
      dispatch(getIntakeList());
      dispatch(getGoal());

      console.log('intake list:', intakeList);
      control = true;
    }
    console.log('GOAL:', goal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intakeList, goal, intake]);

  //Bugünün tarihine göre filtreleme işlemi yapar. Bugüne ait kayıtları getirir.
  useEffect(() => {
    const today = moment().startOf('day');
    const filteredItems = intakeList.filter(item => {
      const itemDate = moment(item.createdAt).startOf('day');
      return itemDate.isSame(today);
    });
    setDailyList(filteredItems);
    dailyList?.map(item => {
      setDailyWater(item?.amount + dailyWater);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intakeList]);

  //FlatList renderItem
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>{item.amount}</Text>
        <Text style={styles.title}>{item.unit}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => deleteWater(item?.id)}>
          <Text style={{marginHorizontal: 10}}>Sil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
            setItem(item);
            console.log('setITem:', item);
            dispatch(getIntake(item?.id));
          }}>
          <Text style={styles.title}>Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  //Su ekleme metodu
  const handleAddWater = () => {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    console.log('aaa');
    const data = {
      amount: 103,
      unit: 'ml',
      createdAt: currentDate,
    };
    dispatch(postIntake(data));
    dispatch(getIntakeList());
  };

  //Eklenilen suyu siler.
  const deleteWater = id => {
    console.log('delete');
    dispatch(deleteIntake(id, item));
  };
  //Suyu güncelleyen method.
  const setDrink = () => {
    const data = {
      amount: number,
      unit: 'ml',
      createdAt: item?.createdAt,
    };
    console.log('DATA:', data);
    dispatch(setIntake(item?.id, data));
    setModalVisible(!isModalVisible);
    setNumber('');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.firstContainer}>
        <CircularProgress
          value={dailyWater}
          radius={80}
          duration={2000}
          progressValueColor={'grey'}
          maxValue={goal.dailyGoal}
          title={goal?.dailyGoal + '  ml'}
          titleFontSize={12}
          titleColor={'grey'}
          titleStyle={{fontWeight: 'bold'}}
        />

        <Text style={{marginTop: 10}}>Günlük içecek hedefi</Text>
        {/* <MaterialIcons name={'dds'} size={20} color={'red'} /> */}
        <TouchableOpacity onPress={handleAddWater}>
          <Text>Su ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <Text>Bugünün kayıtları</Text>
        <FlatList
          data={dailyList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        // swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        // style={localStyles.modal}
        propagateSwipe={true}>
        <View style={styles.modalContent}>
          <Text>İçtiğiniz su miktarını güncelleyin</Text>
          <Text>Önceki girilen su miktarı: {intake.amount} </Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number}
            placeholder="Su miktarını girin"
            keyboardType="default"
          />
          <Button title="Güncelle" onPress={setDrink} />
        </View>
      </Modal>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondContainer: {
    width: '100%',
    flex: 1,
  },
  list: {
    width: '100%',
    flex: 1,
  },
  item: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  CircularProgressStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
