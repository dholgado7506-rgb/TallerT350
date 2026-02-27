import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, QrCode, MessageSquare, Wrench } from 'lucide-react-native';
import { Colors, Typography } from '../constants/theme';

import Dashboard from '../screens/Dashboard';
import Scanner from '../screens/Scanner';
import AISupport from '../screens/AISupport';
import Maintenance from '../screens/Maintenance';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            id="main-tabs"
            screenOptions={{
                headerShown: false,
                tabBarPosition: 'top',
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: 1,
                    height: 70,
                    paddingTop: 25,
                    paddingBottom: 5,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textDim,
                tabBarLabelStyle: {
                    fontFamily: Typography.mono,
                    fontSize: 10,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => <LayoutDashboard color={focused ? Colors.primary : Colors.textDim} size={20} />,
                    tabBarLabel: '360º',
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={Scanner}
                options={{
                    tabBarIcon: ({ focused }) => <QrCode color={focused ? Colors.secondary : Colors.textDim} size={20} />,
                    tabBarLabel: 'SCAN',
                }}
            />
            <Tab.Screen
                name="AI Support"
                component={AISupport}
                options={{
                    tabBarIcon: ({ focused }) => <MessageSquare color={focused ? Colors.accent : Colors.textDim} size={20} />,
                    tabBarLabel: 'IA',
                }}
            />
            <Tab.Screen
                name="Maintenance"
                component={Maintenance}
                options={{
                    tabBarIcon: ({ focused }) => <Wrench color={focused ? Colors.success : Colors.textDim} size={20} />,
                    tabBarLabel: 'LIBRO',
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
