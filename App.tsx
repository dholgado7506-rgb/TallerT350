import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/ThemeProvider';
import { BikeProvider } from './src/context/BikeContext';
import TabNavigator from './src/navigation/TabNavigator';
import TechnicalManual from './src/screens/TechnicalManual';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <BikeProvider>
                    <NavigationContainer>
                        <StatusBar style="light" />
                        <Stack.Navigator
                            id="primary-stack"
                            screenOptions={{
                                headerShown: false,
                                animation: 'slide_from_right'
                            }}
                        >
                            <Stack.Screen name="MainTabs" component={TabNavigator} />
                            <Stack.Screen name="TechnicalManual" component={TechnicalManual} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </BikeProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
