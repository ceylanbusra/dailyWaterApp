/* eslint-disable react-hooks/exhaustive-deps */
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native-ui-lib';
import {
  deleteIntake,
  getGoal,
  getIntake,
  getIntakeList,
  postIntake,
  setIntake,
} from '../redux/actions/drinkWaterAction';
import moment from 'moment';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    intakeList,
    goal,
    intake,
    setWater,
    deleteWater,
    addWater,
    dailyWaterDeleteStatus,
  } = useSelector(state => state.water);
  const {info} = useSelector(state => state.info);

  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [number, setNumber] = useState('');
  const [item, setItem] = useState(null);
  const [dailyList, setDailyList] = useState(null);
  const [dailyWater, setDailyWater] = useState(0);
  const [step, setStep] = useState(null);
  const [water1, setWater1] = useState(null);

  //Modalın açma kapatma durumlarını kontrol eder.
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setNumber('');
    setWater1(null);
  };

  //Sayfa ilk açıldığında tetiklenen method
  useEffect(() => {
    dispatch(getIntakeList());
    dispatch(getGoal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Bugünün tarihine göre filtreleme işlemi yapar. Bugüne ait kayıtları getirir.
  useEffect(() => {
    const today = moment().startOf('day');
    const filteredItems = intakeList.filter(item => {
      const itemDate = moment(item.createdAt).startOf('day');
      return itemDate.isSame(today);
    });
    setDailyList(filteredItems);
    if (filteredItems.length > 0) {
      Promise.all(filteredItems.map(item => parseFloat(item.amount))).then(
        amounts => {
          const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
          setDailyWater(totalAmount);
        },
      );
    } else {
      setDailyWater(0);
    }
  }, [deleteWater, setWater, intakeList, addWater]);

  //Eğer dailyList varsa ona göre günlük içilen suyu tekrar toplar günceller
  useEffect(() => {
    if (dailyList) {
      Promise.all(dailyList.map(item => parseFloat(item.amount))).then(
        amounts => {
          const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
          setDailyWater(totalAmount);

          dispatch({type: 'CALCULATE_DAILY_WATER', payload: totalAmount});
        },
      );
    }
  }, [dailyList]);

  //Su ekleme metodu
  const handleAddWater = async () => {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const data = {
      amount: water1 ? water1 : 120,
      unit: 'ml',
      createdAt: currentDate,
    };
    setModalVisible(false);
    await dispatch(postIntake(data));
    setWater1(null);
  };

  //Eklenilen suyu siler.
  const deleteWaterFunc = async id => {
    setDeleteModal(!deleteModal);
    await dispatch(deleteIntake(id, item));
    if (dailyWaterDeleteStatus) {
      dispatch(getIntakeList());
    }
  };

  //Suyu güncelleyen method.
  const setDrink = () => {
    const data = {
      amount: number,
      unit: 'ml',
      createdAt: item?.createdAt,
    };

    dispatch(setIntake(item?.id, data));
    setModalVisible(!isModalVisible);
    setNumber('');
  };

  //FlatList renderItem
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>{item.amount}</Text>
        <Text style={styles.title}>{item.unit}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setDeleteModal(true);
            setItem(item);
          }}>
          <Image
            source={require('../assets/delete.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleModal();
            setItem(item);

            dispatch(getIntake(item?.id));
          }}>
          <Image
            source={require('../assets/edit.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.firstContainer}>
        <View style={styles.waterIcon}>
          <Image
            source={require('../assets/water.png')}
            style={{width: 50, height: 50}}
          />
          <View style={styles.info}>
            <Text>Yemek yedikten Hemen Sonra Su İçmeyin.</Text>
          </View>
        </View>
        <CircularProgress
          value={dailyWater}
          radius={80}
          duration={2000}
          progressValueColor={'grey'}
          maxValue={goal.dailyGoal}
          title={goal?.dailyGoal + '  ml'}
          titleFontSize={12}
          titleColor={'grey'}
          // initialValue={dailyWater}
          titleStyle={{fontWeight: 'bold'}}
          // subtitle="dsfsdfsd"
        />
        <Text style={{marginTop: 10}}>Günlük içecek hedefi</Text>
        <View style={styles.addWaterContainer}>
          <TouchableOpacity onPress={handleAddWater}>
            <Text>200 ml Ekle</Text>
            <Image
              source={require('../assets/glass.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setStep(1);
              setModalVisible(true);
            }}>
            <Text>Başka Değer Gir</Text>
            <Image
              source={require('../assets/glass.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        <Text>Bugünün kayıtları</Text>
        {dailyList?.length > 0 ? (
          <FlatList
            data={dailyList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.textInfo}>
              Henüz su eklenmemiş. Lütfen içtiğiniz su miktarını giriniz...
            </Text>
          </View>
        )}
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
          {step === 1 ? (
            <View>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                {' '}
                Su miktarı girin
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={water1 => setWater1(water1)}
                value={water1}
                placeholder="Su miktarını girin"
                keyboardType="default"
              />
              <Button title="Ekle" onPress={handleAddWater} />
            </View>
          ) : (
            <View>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                {' '}
                Su miktarını güncelleyin
              </Text>
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
          )}
        </View>
      </Modal>
      <Modal
        isVisible={deleteModal}
        onBackdropPress={() => {
          setDeleteModal(false);
        }}
        onBackButtonPress={() => {
          setDeleteModal(false);
        }}
        // swipeDirection="down"
        onSwipeComplete={() => setDeleteModal(!deleteModal)}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        // style={localStyles.modal}
        propagateSwipe={true}>
        <View style={styles.modalContent}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
            {' '}
            Silmek istediğinize emin misiniz
          </Text>

          <Button title="Evet " onPress={() => deleteWaterFunc(item?.id)} />
          <Button title="Hayır" onPress={() => setDeleteModal(false)} />
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
  },
  firstContainer: {
    width: '100%',
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
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 2,
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
    borderRadius: 10,
  },
  info: {
    backgroundColor: '#b3e5fc',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginBottom: 14,
  },
  waterIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {fontSize: 18, textAlign: 'center', fontWeight: '600'},
  addWaterContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
