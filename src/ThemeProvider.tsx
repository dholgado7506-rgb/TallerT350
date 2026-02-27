import React, { createContext, useContext } from 'react';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { RobotoMono_400Regular, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from './constants/theme';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    let [fontsLoaded] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Bold': Inter_700Bold,
        'RobotoMono-Regular': RobotoMono_400Regular,
        'RobotoMono-Bold': RobotoMono_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <ThemeContext.Provider value={{}}>
            {children}
        </ThemeContext.Provider>
    );
};
