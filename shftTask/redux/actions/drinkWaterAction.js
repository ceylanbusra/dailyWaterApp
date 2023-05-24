import axios from 'axios';
import {Alert} from 'react-native';

export const getIntake = (data, page) => {
  return dispatch => {
    dispatch({type: 'GET_INTAKE_REQUEST'}),
      axios
        .get(`https://645ce732e01ac6105896bbce.mockapi.io/`)
        .then(res => {
          console.log('res');
        })
        .catch(err => {
          Alert.alert(
            'Aradığınız içerik maalesef bulunamadı.Lütfen farklı şekilde aramayı deneyiniz..',
          );
        });
  };
};
