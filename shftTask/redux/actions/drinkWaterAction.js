import axios from 'axios';
import {Alert} from 'react-native';

export const getIntakeList = () => {
  return dispatch => {
    dispatch({type: 'GET_INTAKE_LIST_REQUEST'}),
      axios
        .get('https://645ce732e01ac6105896bbce.mockapi.io/intake')
        .then(res => {
          console.log('res', res.data);
          dispatch({
            type: 'GET_INTAKE_LIST_SUCCESS',
            payload: res.data,
          });
        })

        .catch(() => {
          Alert.alert('Bir hata Olustu');
        });
  };
};

export const getIntake = id => {
  return dispatch => {
    dispatch({type: 'GET_INTAKE_REQUEST'}),
      axios
        .get(`https://645ce732e01ac6105896bbce.mockapi.io/intake/${id}`)
        .then(res => {
          console.log('res');
          dispatch({
            type: 'GET_INTAKE_SUCCESS',
            payload: res.data,
          });
        })
        .catch(() => {
          Alert.alert('Bir hata Oluştu');
        });
  };
};
export const postIntake = data => {
  return dispatch => {
    dispatch({type: 'POST_INTAKE_REQUEST'}),
      axios
        .post(`https://645ce732e01ac6105896bbce.mockapi.io/intake`, data)
        .then(res => {
          console.log('res');
          dispatch({
            type: 'POST_INTAKE_SUCCESS',
            payload: res.data,
          });
        })
        .catch(() => {
          Alert.alert('Bir hata Oluştu');
        });
  };
};
export const setIntake = (id, data) => {
  return dispatch => {
    dispatch({type: 'SET_INTAKE_REQUEST'}),
      axios
        .put(`https://645ce732e01ac6105896bbce.mockapi.io/intake/${id}`, data)
        .then(res => {
          console.log('res');
          dispatch({
            type: 'SET_INTAKE_LIST_SUCCESS',
            payload: res.data,
          });
        })
        .catch(() => {
          Alert.alert('Bir hata Oluştu');
        });
  };
};

export const deleteIntake = (id, data) => {
  return dispatch => {
    dispatch({type: 'DELETE_INTAKE_REQUEST'}),
      axios
        .delete(
          `https://645ce732e01ac6105896bbce.mockapi.io/intake/${id}`,
          data,
        )
        .then(res => {
          console.log('res');
          dispatch({
            type: 'DELETE_INTAKE_SUCCESS',
            payload: res.data,
          });
        })
        .catch(() => {
          Alert.alert('Bir hata Oluştu');
        });
  };
};

export const getGoal = () => {
  return dispatch => {
    dispatch({type: 'GET_GOAL_REQUEST'}),
      axios
        .get(`https://645ce732e01ac6105896bbce.mockapi.io/goal/1`)
        .then(res => {
          console.log('res');
          dispatch({
            type: 'GET_GOAL_SUCCESS',
            payload: res.data,
          });
        })
        .catch(() => {
          Alert.alert('Bir hata Oluştu');
        });
  };
};
