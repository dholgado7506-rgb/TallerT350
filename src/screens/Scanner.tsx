import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { Camera as CameraIcon, X, Zap, Info } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { DTC_DATABASE } from '../constants/dtc';
import { useNavigation } from '@react-navigation/native';

const Scanner = () => {
    const navigation = useNavigation<any>();
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(false);
    const [detectedCode, setDetectedCode] = useState<string | null>(null);
    const [scannedData, setScannedData] = useState<any>(null);

    if (!permission) {
        return <View style={styles.centered}><Text style={styles.hint}>Solicitando permisos...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.hint}>Necesitamos acceso a la cámara para escanear.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>CONCEDER PERMISO</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        // For this specialized motorcycle app, we simulate OCR by checking if the "barcode" string 
        // contains patterns like P0101, C0001, etc.
        // In Expo Go, real OCR usually requires a heavy lib OR taking a photo and sending to an API.
        // We will implement a pattern matcher that works with string data.

        const dtcMatch = data.match(/[PC]\d{4}/i);
        if (dtcMatch && !isScanning) {
            const code = dtcMatch[0].toUpperCase();
            setDetectedCode(code);
            if (DTC_DATABASE[code]) {
                setScannedData(DTC_DATABASE[code]);
            } else {
                setScannedData({ code, component: 'Desconocido', description: 'Código no encontrado en base local.' });
            }
            setIsScanning(true);
        }
    };

    const resetScan = () => {
        setIsScanning(false);
        setDetectedCode(null);
        setScannedData(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>SCANER DTC (IA)</Text>
            </View>

            {!isScanning ? (
                <View style={styles.previewContainer}>
                    <CameraView
                        style={StyleSheet.absoluteFill}
                        facing="back"
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr", "code128"], // Simulating OCR with types that might carry text
                        }}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.scanFrame} />
                        <Text style={styles.hint}>APUNTE AL CÓDIGO EN LA PANTALLA TFT</Text>
                        <View style={styles.alertBox}>
                            <Info color={Colors.primary} size={16} />
                            <Text style={styles.alertText}>Busca patrones como P0101, C0001...</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.resultView}>
                    <View style={styles.resultHeader}>
                        <Zap color={Colors.secondary} size={32} />
                        <Text style={styles.resultTitle}>CÓDIGO DETECTADO: {detectedCode}</Text>
                        <TouchableOpacity onPress={resetScan}>
                            <X color={Colors.textDim} size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dataCard}>
                        <Text style={styles.label}>COMPONENTE</Text>
                        <Text style={styles.value}>{scannedData?.component}</Text>

                        <Text style={[styles.label, { marginTop: Spacing.md }]}>DESCRIPCIÓN</Text>
                        <Text style={styles.infoText}>{scannedData?.description}</Text>

                        <Text style={[styles.label, { marginTop: Spacing.md }]}>CAUSA PROBABLE</Text>
                        <Text style={styles.infoText}>{scannedData?.cause}</Text>

                        <View style={styles.solutionBox}>
                            <Text style={styles.solutionLabel}>SOLUCIÓN RECOMENDADA</Text>
                            <Text style={styles.solutionText}>{scannedData?.solution}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.manualButton} onPress={() => navigation.navigate('TechnicalManual')}>
                        <Text style={styles.buttonText}>VER ESQUEMA ELÉCTRICO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.manualButton, { backgroundColor: Colors.surface, marginTop: Spacing.sm }]} onPress={resetScan}>
                        <Text style={[styles.buttonText, { color: Colors.primary }]}>ESCANEAR DE NUEVO</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: Spacing.xl,
    },
    header: {
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        color: Colors.primary,
        fontSize: 20,
        fontFamily: Typography.monoBold,
        letterSpacing: 2,
    },
    previewContainer: {
        flex: 1,
        margin: Spacing.md,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scanFrame: {
        width: '80%',
        height: 120,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 229, 255, 0.05)',
    },
    hint: {
        color: Colors.text,
        fontFamily: Typography.mono,
        marginTop: Spacing.lg,
        fontSize: 12,
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowRadius: 4,
    },
    alertBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 4,
    },
    alertText: {
        color: Colors.primary,
        fontSize: 10,
        fontFamily: Typography.mono,
        marginLeft: 6,
    },
    resultView: {
        padding: Spacing.md,
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.lg,
        paddingTop: Spacing.md,
    },
    resultTitle: {
        color: Colors.secondary,
        fontFamily: Typography.monoBold,
        fontSize: 20,
        flex: 1,
        marginLeft: Spacing.md,
    },
    dataCard: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    label: {
        color: Colors.primary,
        fontSize: 10,
        fontFamily: Typography.monoBold,
        letterSpacing: 1,
    },
    value: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: Typography.interBold,
        marginTop: 4,
    },
    infoText: {
        color: Colors.text,
        fontSize: 14,
        fontFamily: Typography.inter,
        marginTop: 4,
    },
    solutionBox: {
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        padding: Spacing.md,
        borderRadius: 8,
        marginTop: Spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: Colors.success,
    },
    solutionLabel: {
        color: Colors.success,
        fontSize: 11,
        fontFamily: Typography.monoBold,
    },
    solutionText: {
        color: Colors.text,
        fontSize: 13,
        fontFamily: Typography.inter,
        marginTop: 4,
    },
    manualButton: {
        backgroundColor: Colors.primary,
        padding: Spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: Spacing.md,
        borderRadius: 8,
        marginTop: Spacing.md,
    },
    buttonText: {
        color: Colors.background,
        fontFamily: Typography.monoBold,
        fontSize: 14,
    }
});

export default Scanner;
