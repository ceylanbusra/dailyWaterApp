import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen';
import HomeScreen from '../screens/homeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DetailScreen from '../screens/detailScreen';
import ProfileScreen from '../screens/profileScreen';
import {Image} from 'react-native';
import InfoScreen from '../screens/infoScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootRouter = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerTitleStyle: {},
            headerLeft: () => <></>,
            headerTitleAlign: 'center',
          }}
          name="Home"
          component={MyTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = require('../assets/home.png');
          } else if (route.name === 'Details') {
            iconName = require('../assets/details.png');
          } else if (route.name === 'Profile') {
            iconName = require('../assets/account.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              size={size}
              color={color}
              style={{width: 25, height: 25}}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default RootRouter;
