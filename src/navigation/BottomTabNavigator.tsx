import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import COLORS from '../constants/Colors';
import { RouteProp,ParamListBase } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const icons = {
  Home: {
    focused: 'home',
    outline: 'home-outline',
  },
  Analytics: {
    focused: 'analytics',
    outline: 'analytics-outline',
  },
};
const tabBarIcon = ({ route, focused } : { route: RouteProp<ParamListBase, string>; focused: boolean; }) => {
  const iconName = icons[route.name as keyof typeof icons][focused ? 'focused' : 'outline'];
  return <Icon name={iconName} size={24} color={focused ? COLORS.income : COLORS.gray[400]} />;
};
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({focused}) => tabBarIcon({route, focused}),
      tabBarActiveTintColor: COLORS.income,
      tabBarInactiveTintColor: COLORS.gray[400],
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
