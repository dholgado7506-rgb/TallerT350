import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { Battery, Info, AlertTriangle } from 'lucide-react-native';
import Bike360 from '../components/Bike360';
import { useNavigation } from '@react-navigation/native';
import { useBike } from '../context/BikeContext';

const Dashboard = () => {
    const navigation = useNavigation<any>();
    const { totalKm, setTotalKm } = useBike();

    const calculateNextMaintenance = (km: string) => {
        const numKm = parseInt(km) || 0;
        if (numKm < 1000) return 1000;
        // Zontes intervals: 1k, 5k, 10k, 15k...
        return (Math.floor(numKm / 5000) + 1) * 5000;
    };

    const nextMaintenance = calculateNextMaintenance(totalKm);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>ZONTES 350T</Text>
                    <Text style={styles.subtitle}>PRO-REPAIR CONSOLE</Text>
                </View>

                <View style={styles.batteryCard}>
                    <View style={styles.batteryInfo}>
                        <Battery color={Colors.primary} size={24} />
                        <View style={styles.batteryTextContainer}>
                            <Text style={styles.label}>VOLTAJE BATERÍA</Text>
                            <Text style={styles.value}>12.6V</Text>
                        </View>
                    </View>
                    <View style={styles.batteryStatus}>
                        <Text style={[styles.statusText, { color: Colors.success }]}>ESTADO ÓPTIMO</Text>
                    </View>
                </View>

                <View style={styles.alertCard}>
                    <AlertTriangle color={Colors.secondary} size={20} />
                    <Text style={styles.alertText}>
                        Recordatorio: Revisar tensión de cadena cada 1.000km.
                    </Text>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>KM TOTALES</Text>
                        <TextInput
                            style={styles.statInput}
                            value={totalKm}
                            onChangeText={setTotalKm}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>PRÓX. REVISIÓN</Text>
                        <Text style={styles.statValue}>{nextMaintenance.toLocaleString()}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>VISUALIZADOR 360º</Text>
                <Bike360 />

                <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('TechnicalManual')}>
                    <Text style={styles.mainButtonText}>VER MANUAL DETALLADO</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    header: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        paddingLeft: Spacing.md,
    },
    title: {
        color: Colors.text,
        fontSize: 28,
        fontFamily: Typography.monoBold,
        letterSpacing: 2,
    },
    subtitle: {
        color: Colors.primary,
        fontSize: 14,
        fontFamily: Typography.mono,
        letterSpacing: 1,
    },
    batteryCard: {
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    batteryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    batteryTextContainer: {
        marginLeft: Spacing.sm,
    },
    label: {
        color: Colors.textDim,
        fontSize: 10,
        fontFamily: Typography.mono,
    },
    value: {
        color: Colors.text,
        fontSize: 20,
        fontFamily: Typography.monoBold,
    },
    batteryStatus: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Typography.monoBold,
    },
    alertCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 109, 0, 0.1)',
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    alertText: {
        color: Colors.text,
        fontSize: 12,
        fontFamily: Typography.inter,
        marginLeft: Spacing.sm,
        flex: 1,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.md,
    },
    statBox: {
        flex: 1,
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
    },
    statLabel: {
        color: Colors.textDim,
        fontSize: 10,
        fontFamily: Typography.mono,
        marginBottom: 4,
    },
    statValue: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: Typography.monoBold,
    },
    statInput: {
        color: Colors.primary,
        fontSize: 20,
        fontFamily: Typography.monoBold,
        padding: 0,
    },
    mainButton: {
        backgroundColor: Colors.primary,
        padding: Spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    mainButtonText: {
        color: Colors.background,
        fontFamily: Typography.monoBold,
        fontSize: 16,
        letterSpacing: 1,
    },
    sectionTitle: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 14,
        marginTop: Spacing.md,
        marginBottom: Spacing.sm,
        letterSpacing: 1,
    }
});

export default Dashboard;
