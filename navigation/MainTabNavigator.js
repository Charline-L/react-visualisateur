import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MusicScreen from '../screens/MusicScreen';
import ARScreen from '../screens/ARScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: '1 - Explications',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="🤔"
        />
    ),
};

const MusicStack = createStackNavigator({
    Music: MusicScreen,
});

MusicStack.navigationOptions = {
    tabBarLabel: '2 - Musique',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="🎶"
        />
    ),
};

const ARStack = createStackNavigator({
    AR: ARScreen,
});


ARStack.navigationOptions = {
    tabBarLabel: "3 - Réalité augmenté",
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="👀"
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    MusicStack,
    ARStack,
});
