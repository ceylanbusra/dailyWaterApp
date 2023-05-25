import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen';
import HomeScreen from '../screens/homeScreen';

const Stack = createNativeStackNavigator();
const RootRouter = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
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
          component={HomeScreen}
        />
        {/* <Stack.Screen name="Detail" component={Detail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootRouter;
