import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, PanResponder, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { X, ZoomIn } from 'lucide-react-native';

interface DetailPart {
    id: string;
    title: string;
    description: string;
    image: any;
    specs: string[];
}

const PARTS_DB: Record<string, DetailPart> = {
    motor: {
        id: 'motor',
        title: 'MOTOR MONOCILÍNDRICO 350cc',
        description: 'Corazón mecánico de la 350T, diseñado para un equilibrio entre torque y eficiencia.',
        image: require('../../assets/bike_engine.png'),
        specs: ['348cc', '39 CV @ 9500rpm', '32.8 Nm @ 7500rpm', 'Inyección Bosch 6.0']
    },
    frenos_delanteros: {
        id: 'frenos_delanteros',
        title: 'SISTEMA DELANTERO J.JUAN',
        description: 'Anclaje radial y ABS Bosch. Equipa pastillas EBC Sinterizadas (Double-H) para máxima potencia y durabilidad sin degradación por calor.',
        image: require('../../assets/brake_pads.png'),
        specs: ['EBC FA244HH Sinterizadas', 'Dimensiones: 75x55x8.7mm', 'Disco delantero 320mm', 'Pinza J.Juan 4 pistones']
    },
    frenos_traseros: {
        id: 'frenos_traseros',
        title: 'SISTEMA TRASERO J.JUAN',
        description: 'Pinza multipistón y ABS Bosch. Equipa pastillas de alto rendimiento compatibles con Brembo 07029.',
        image: require('../../assets/brake_pads_rear.png'),
        specs: ['Brembo 07029 Compatible', 'OEM: 1100100-092000', 'Disco trasero 265mm', 'ABS Bosch 9.1M']
    },
    escape: {
        id: 'escape',
        title: 'SISTEMA DE ESCAPE DOBLE',
        description: 'Diseño icónico de Zontes con doble salida y protector antiquemaduras.',
        image: require('../../assets/bike_rear.png'),
        specs: ['Acero inoxidable', 'Doble salida lateral', 'Euro 5 compliance', 'Protector térmico integrado']
    }
};

const Bike360 = () => {
    const [rotation, setRotation] = useState(0);
    const [selectedPart, setSelectedPart] = useState<DetailPart | null>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
            onPanResponderMove: (_, gestureState) => {
                const delta = gestureState.dx / 5;
                setRotation((prev) => (prev + delta) % 360);
            },
        })
    ).current;

    const currentRotation = ((Math.floor(rotation) % 360) + 360) % 360;

    // Standardized 4-Frame Logic
    let bikeImage = require('../../assets/bike.png');
    let mirror = false;
    let viewName = 'LATERAL DERECHO';

    if (currentRotation >= 45 && currentRotation < 135) {
        bikeImage = require('../../assets/bike_front.png');
        viewName = 'FRONTAL';
    } else if (currentRotation >= 135 && currentRotation < 225) {
        bikeImage = require('../../assets/bike.png');
        mirror = true;
        viewName = 'LATERAL IZQUIERDO';
    } else if (currentRotation >= 225 && currentRotation < 315) {
        bikeImage = require('../../assets/bike_rear.png');
        viewName = 'TRASERO';
    }

    const renderHotspot = (partId: string, top: any, left: any, label: string) => (
        <View style={[styles.hotspotContainer, { top, left }]}>
            <TouchableOpacity
                style={styles.hotspot}
                onPress={() => setSelectedPart(PARTS_DB[partId])}
            >
                <ZoomIn color={Colors.primary} size={14} />
            </TouchableOpacity>
            <Text style={styles.hotspotLabel}>{label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.bikeContainer} {...panResponder.panHandlers}>
                <Image
                    source={bikeImage}
                    style={[
                        styles.bikeImage,
                        mirror && { transform: [{ scaleX: -1 }] }
                    ]}
                    resizeMode="contain"
                />

                <View style={styles.rotationLabelContainer}>
                    <Text style={styles.rotationText}>{viewName}</Text>
                </View>

                {/* Dynamic Hotspots based on View */}
                {viewName === 'LATERAL DERECHO' && (
                    <>
                        {renderHotspot('motor', '55%', '45%', 'MOTOR')}
                        {renderHotspot('frenos_delanteros', '65%', '82%', 'FRENO DEL.')}
                        {renderHotspot('frenos_traseros', '70%', '25%', 'FRENO TRAS.')}
                        {renderHotspot('escape', '75%', '68%', 'ESCAPE')}
                    </>
                )}
                {viewName === 'LATERAL IZQUIERDO' && (
                    <>
                        {renderHotspot('motor', '55%', '50%', 'MOTOR')}
                        {renderHotspot('frenos_delanteros', '65%', '15%', 'FRENO DEL.')}
                        {renderHotspot('frenos_traseros', '70%', '72%', 'FRENO TRAS.')}
                    </>
                )}
                {viewName === 'FRONTAL' && (
                    <>
                        {renderHotspot('frenos_delanteros', '75%', '47%', 'FRENOS')}
                    </>
                )}
                {viewName === 'TRASERO' && (
                    <>
                        {renderHotspot('frenos_traseros', '80%', '45%', 'FRENO TRAS.')}
                        {renderHotspot('escape', '65%', '47%', 'ESCAPE')}
                    </>
                )}
            </View>

            {/* Technical Detail Modal */}
            <Modal visible={!!selectedPart} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setSelectedPart(null)}
                        >
                            <X color={Colors.text} size={24} />
                        </TouchableOpacity>

                        {selectedPart && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.modalTitle}>{selectedPart.title}</Text>

                                <View style={styles.zoomImageContainer}>
                                    <Image
                                        source={selectedPart.image}
                                        style={styles.zoomImage}
                                        resizeMode="contain"
                                    />
                                </View>

                                <Text style={styles.modalDesc}>{selectedPart.description}</Text>

                                <View style={styles.specsContainer}>
                                    {selectedPart.specs.map((spec, index) => (
                                        <View key={index} style={styles.specRow}>
                                            <View style={styles.specDot} />
                                            <Text style={styles.specText}>{spec}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 380,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginVertical: Spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    bikeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bikeImage: {
        width: '95%',
        height: '85%',
    },
    rotationLabelContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    rotationText: {
        color: '#666666',
        fontSize: 10,
        fontFamily: Typography.monoBold,
        letterSpacing: 1,
    },
    hotspotContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    hotspot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    hotspotLabel: {
        color: Colors.textDim,
        fontSize: 8,
        fontFamily: Typography.monoBold,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 4,
        marginTop: 4,
        borderRadius: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '75%',
        backgroundColor: Colors.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        borderTopWidth: 2,
        borderTopColor: Colors.primary,
    },
    closeBtn: {
        alignSelf: 'flex-end',
        padding: 8,
        marginBottom: 10,
    },
    modalTitle: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    zoomImageContainer: {
        width: '100%',
        height: 220,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    zoomImage: {
        width: '90%',
        height: '90%',
    },
    modalDesc: {
        color: Colors.text,
        fontFamily: Typography.inter,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 20,
        textAlign: 'justify',
    },
    specsContainer: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    specRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    specDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primary,
        marginRight: 10,
    },
    specText: {
        color: Colors.text,
        fontFamily: Typography.mono,
        fontSize: 12,
    }
});

export default Bike360;
