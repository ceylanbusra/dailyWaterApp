import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Colors,
  RadioButton,
  Slider,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {getGoal} from '../redux/actions/drinkWaterAction';
import {useDispatch, useSelector} from 'react-redux';

const InfoScreen = ({navigation}) => {
  const {goal} = useSelector(state => state.water);
  const {weightStatus, femalestatus, heightStatus} = useSelector(
    state => state.info,
  );
  const [step, setStep] = useState(null);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [female, setFemale] = useState('Seçiniz');
  const [weight, setWeight] = useState(0);
  //Sayfa ilk açıldığında tetiklenen method
  useEffect(() => {
    dispatch(getGoal());
    console.log('sdfdf', goal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCloseIntro = props => {
    dispatch({type: 'INFO_SCREEN_STATUS', payload: false});
    navigation.navigate('Home');
  };
  return (
    <View flex bg-white padding-10 center>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView flex>
        <ScrollView>
          <View style={styles.waterIcon}>
            <Image
              source={require('../assets/water.png')}
              style={{width: 50, height: 50}}
            />
            <View style={styles.info}>
              <Text>
                Uygulamayı kullanabilmek için Lütfen aşağıdaki bilgileri
                doldurun
              </Text>
            </View>
          </View>
          <View style={styles.waterIcon}>
            <Image
              source={require('../assets/water.png')}
              style={{width: 50, height: 50}}
            />
            <View style={styles.info}>
              <Text>
                Uygulamanın birimi ml'dir. Litre girerken 1000 ile çarparak
                giriniz.
              </Text>
            </View>
          </View>
          <View style={styles.waterIcon}>
            <Image
              source={require('../assets/water.png')}
              style={{width: 50, height: 50}}
            />
            <View style={styles.info}>
              <Text>
                Uygulamada günlük olarak girdiğiniz her miktar
                listelenmektedir.Dilediğiniz gibi miktarı silebilir ya da
                güncelleyebilirsiniz.
              </Text>
            </View>
          </View>

          <Text style={{fontSize: 20, fontWeight: '600', paddingLeft: 10}}>
            GENEL BİLGİLER
          </Text>
          <View style={styles.itemContainer}>
            <Text>Tüketim Hedefi (Günlük)</Text>
            <TouchableOpacity
              onPress={() => {
                setStep(1);
                setModal(true);
              }}>
              <Text style={styles.itemText}>{goal.dailyGoal}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <Text>Cinsiyet</Text>
            <TouchableOpacity
              onPress={() => {
                setStep(2);
                setModal(true);
              }}>
              <Text style={styles.itemText}>{female}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <Text>Ağırlık</Text>
            <TouchableOpacity
              onPress={() => {
                setStep(3);
                setModal(true);
              }}>
              <Text style={styles.itemText}>{weight}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCloseIntro}>
            <Text>DEVAM ET</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          isVisible={modal}
          onBackdropPress={() => {
            setModal(false);
          }}
          onBackButtonPress={() => {
            setModal(false);
          }}
          // swipeDirection="down"
          onSwipeComplete={() => setModal(!modal)}
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
                  Günlük ml cinsinden hedef su
                </Text>

                <Slider
                  value={goal?.dailyGoal}
                  minimumValue={20}
                  maximumValue={80000}
                  onValueChange={() => console.log('value changed')}
                />
              </View>
            ) : step === 2 ? (
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                  Cinsiyetinizi Seçiniz
                </Text>

                <RadioButton
                  value={'Kadın'}
                  label={'Kadın'}
                  color={Colors.green30}
                  onPress={() => {
                    setFemale('Kadın');
                    setModal(false);
                    dispatch({type: 'INFO_SCREEN_FEMALE', payload: 'Kadın'});
                  }}
                  selected={() => setFemale('Kadın')}
                  labelStyle={styles.labelStyle}
                  contentOnLeft
                />
                <RadioButton
                  value={'Erkek'}
                  label={'Erkek'}
                  color={Colors.green30}
                  onPress={() => {
                    setFemale('Erkek');
                    setModal(false);
                    dispatch({type: 'INFO_SCREEN_FEMALE', payload: 'Erkek'});
                  }}
                  selected={() => setFemale('Erkek')}
                  contentOnLeft
                  labelStyle={styles.labelStyle}
                />
              </View>
            ) : step === 3 ? (
              <View>
                <TextInput
                  onChangeText={weight => {
                    setWeight(weight);
                    dispatch({type: 'INFO_SCREEN_WEIGHT', payload: weight});
                  }}
                  value={weight}
                  placeholder="Kilonuzu girin"
                  keyboardType="default"
                  style={styles.textInputStyle}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModal(false)}>
                  <Text>ONAYLA</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  itemText: {
    color: 'blue',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  textInputStyle: {
    width: '100%',
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
  },
  waterIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    backgroundColor: '#b3e5fc',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    margin: 8,
    marginBottom: 14,
    marginTop: 10,
  },
  button: {
    width: '90%',
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.blue60,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
});
