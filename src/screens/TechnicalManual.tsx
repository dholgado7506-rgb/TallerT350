import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { ChevronLeft, BookOpen, Zap, Info, ShieldCheck, Wrench } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const TechnicalManual = () => {
    const navigation = useNavigation<any>();

    const ManualSection = ({ title, icon: Icon, children }: any) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Icon color={Colors.primary} size={20} />
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={Colors.primary} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MANUAL TÉCNICO</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.introCard}>
                    <BookOpen color={Colors.primary} size={32} />
                    <Text style={styles.introTitle}>Documentación Z350</Text>
                    <Text style={styles.introText}>
                        Guía oficial de mantenimiento y reparación para el modelo Zontes 350-T1 / T2.
                    </Text>
                </View>

                <ManualSection title="ESQUEMA ELÉCTRICO" icon={Zap}>
                    <View style={styles.infoBox}>
                        <Info color={Colors.secondary} size={16} />
                        <Text style={styles.infoText}>
                            El sistema eléctrico utiliza una ECU Bosch 6.0 con red CAN-BUS.
                        </Text>
                    </View>
                    <Text style={styles.bullet}>• Fusiblera principal: Bajo el asiento del conductor.</Text>
                    <Text style={styles.bullet}>• Voltaje nominal: 12.8V - 14.4V (en marcha).</Text>
                    <Text style={styles.bullet}>• Sensor de inclinación: Corta encendido a >60º.</Text>
                </ManualSection>

                <ManualSection title="MANTENIMIENTO PREVENTIVO" icon={Wrench}>
                    <Text style={styles.text}>Intervalos críticos de inspección:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellLabel}>Aceite de Motor</Text>
                            <Text style={styles.tableCellValue}>Cada 5,000 km</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellLabel}>Filtro Aire</Text>
                            <Text style={styles.tableCellValue}>Limpieza 3,000 km</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellLabel}>Holgura Válvulas</Text>
                            <Text style={styles.tableCellValue}>Cada 20,000 km</Text>
                        </View>
                    </View>
                </ManualSection>

                <ManualSection title="SEGURIDAD Y ABS" icon={ShieldCheck}>
                    <Text style={styles.text}>
                        El sistema Bosch 9.1M gestiona la frenada independiente en ambas ruedas.
                    </Text>
                    <View style={styles.warningCard}>
                        <Text style={styles.warningText}>
                            IMPORTANTE: No utilice líquido de frenos diferente a DOT 4. El uso de DOT 5 dañará los retenes del sistema J.Juan.
                        </Text>
                    </View>
                </ManualSection>

                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => alert('Descargando PDF completo...')}
                >
                    <Text style={styles.downloadButtonText}>DESCARGAR PDF COMPLETO</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: Colors.text,
        fontFamily: Typography.monoBold,
        fontSize: 16,
        letterSpacing: 1,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    introCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    introTitle: {
        color: Colors.text,
        fontFamily: Typography.monoBold,
        fontSize: 20,
        marginTop: Spacing.md,
    },
    introText: {
        color: Colors.textDim,
        fontFamily: Typography.inter,
        fontSize: 14,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        borderLeftWidth: 3,
        borderLeftColor: Colors.primary,
        paddingLeft: Spacing.sm,
    },
    sectionTitle: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 16,
        marginLeft: Spacing.sm,
        letterSpacing: 1,
    },
    sectionContent: {
        paddingLeft: Spacing.md + 3,
    },
    text: {
        color: Colors.text,
        fontFamily: Typography.inter,
        fontSize: 14,
        lineHeight: 20,
    },
    bullet: {
        color: Colors.text,
        fontFamily: Typography.mono,
        fontSize: 13,
        marginBottom: 6,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 229, 255, 0.05)',
        padding: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    infoText: {
        color: Colors.text,
        fontSize: 12,
        fontFamily: Typography.inter,
        marginLeft: Spacing.sm,
        flex: 1,
    },
    table: {
        marginTop: Spacing.md,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    tableCellLabel: {
        color: Colors.textDim,
        fontFamily: Typography.mono,
        fontSize: 12,
    },
    tableCellValue: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 12,
    },
    warningCard: {
        backgroundColor: 'rgba(255, 109, 0, 0.1)',
        padding: Spacing.md,
        borderRadius: 8,
        marginTop: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.secondary,
    },
    warningText: {
        color: Colors.secondary,
        fontSize: 12,
        fontFamily: Typography.monoBold,
        textAlign: 'center',
    },
    downloadButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: Spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    downloadButtonText: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 14,
        letterSpacing: 1,
    }
});

export default TechnicalManual;
