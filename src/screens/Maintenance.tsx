import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Modal, Image as RNImage } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { CheckCircle, Circle, AlertTriangle, Info, Clock, BookOpen, X } from 'lucide-react-native';
import { useBike } from '../context/BikeContext';

interface MaintenanceTask {
    id: number;
    km: number;
    label: string;
    description: string;
    instructions: string[];
    image?: any;
    critical: boolean;
    done: boolean;
}

const Maintenance = () => {
    const { totalKm } = useBike();
    const currentKm = parseInt(totalKm) || 0;

    const calculateNextMaintenance = (km: number) => {
        if (km < 1000) return 1000;
        return (Math.floor(km / 5000) + 1) * 5000;
    };

    const nextMaintenance = calculateNextMaintenance(currentKm);

    const [tasks, setTasks] = useState<MaintenanceTask[]>([
        {
            id: 1, km: 1000, label: 'Aceite Motor (1.6L)',
            description: 'Usa 10W-40 o 10W-50 sintético.',
            image: require('../../assets/oil_guide.png'),
            instructions: [
                'Calentar el motor 5 min antes del cambio.',
                'Drenar aceite por el tornillo inferior (17mm).',
                'Limpiar el tapón magnético de partículas.',
                'Llenar con 1.6L si se cambia el filtro.'
            ],
            critical: true, done: true
        },
        {
            id: 2, km: 1000, label: 'Filtro de Aceite',
            description: 'Reemplazo obligatorio en primer servicio.',
            image: require('../../assets/oil_guide.png'),
            instructions: [
                'Abrir tapa lateral derecha (3 tornillos 8mm).',
                'Extraer filtro viejo y limpiar alojamiento.',
                'Lubricar junta tórica del filtro nuevo con aceite.',
                'Apretar tornillos de forma alterna (8-10 Nm).'
            ],
            critical: true, done: true
        },
        {
            id: 3, km: 1000, label: 'Limpieza Tamiz Metálico',
            description: 'Ubicado en el lado izquierdo del cárter.',
            image: require('../../assets/bike_engine.png'),
            instructions: [
                'Retirar tapa circular lado izquierdo.',
                'Extraer tamiz con alicates de punta.',
                'Limpiar con gasolina o aire a presión.',
                'Verificar que no haya virutas metálicas grandes.'
            ],
            critical: false, done: true
        },
        {
            id: 4, km: 1000, label: 'Reapriete Soportes Motor',
            description: 'Vibraciones pueden aflojar tornillos del chasis.',
            image: require('../../assets/bike_side.png'),
            instructions: [
                'Revisar tornillos pasantes del motor al chasis.',
                'Usar llaves de vaso 13mm and 14mm.',
                'Verificar soportes de maletas y guardabarros.',
                'Aplicar fijador de roscas medio (azul) si es necesario.'
            ],
            critical: true, done: true
        },
        {
            id: 5, km: 5000, label: 'Tensión de Cadena',
            description: 'Holgura 25-30mm. Limpiar y engrasar.',
            image: require('../../assets/bike_rear.png'),
            instructions: [
                'Aflojar tuerca eje trasero (30mm).',
                'Girar tensores de forma uniforme en ambos lados.',
                'Medir holgura central (debe ser 2.5 a 3 cm).',
                'Apretar eje y verificar alineación.'
            ],
            critical: true, done: false
        },
        {
            id: 6, km: 5000, label: 'Limpieza Sensor Velocidad',
            description: 'Frecuente fallo de lectura por suciedad.',
            image: require('../../assets/bike_engine.png'),
            instructions: [
                'Ubicar sensor en el piñón de ataque o rueda trasera.',
                'Limpiar con spray limpiacontactos (tipo residuo cero).',
                'Secar bien antes de reconectar.',
                'Verificar cableado por posibles roces.'
            ],
            critical: false, done: false
        },
        {
            id: 7, km: 5000, label: 'Engrase Manetas y Caballete',
            description: 'Evita desgaste prematuro del bulón.',
            image: require('../../assets/bike_front.png'),
            instructions: [
                'Retirar pasadores de maneta freno y embrague.',
                'Aplicar grasa de litio en el eje.',
                'Limpiar exceso para no manchar protecciones.',
                'Engrasar muelle y eje del caballete lateral/central.'
            ],
            critical: false, done: false
        },
        {
            id: 8, km: 5000, label: 'Revisión Filtro de Aire',
            description: 'Limpiar con aire a presión o reemplazar.',
            image: require('../../assets/bike_side.png'),
            instructions: [
                'Acceder bajo el asiento/tanque (según manual 350T).',
                'Soplar de dentro hacia afuera.',
                'Si el papel está oscuro o con aceite, reemplazar.',
                'Cerrar caja filtro verificando sellado estanco.'
            ],
            critical: false, done: false
        },
        {
            id: 9, km: 10000, label: 'Bujía de Encendido',
            description: 'Reemplazar por NGK LMAR8A-9 o equivalente.',
            image: require('../../assets/bike_engine.png'),
            instructions: [
                'Retirar pipeta con cuidado.',
                'Limpiar base para evitar entrada de suciedad.',
                'Usar llave de bujías específica.',
                'Verificar distancia de electrodo (0.8 - 0.9 mm).'
            ],
            critical: true, done: false
        },
        {
            id: 10, km: 10000, label: 'Líquido de Frenos (DOT 4)',
            description: 'Verificar nivel y color en mirilla.',
            image: require('../../assets/bike_front.png'),
            instructions: [
                'Limpiar tapa depósito antes de abrir.',
                'Proteger pintura (el líquido es corrosivo).',
                'Purgar si el tacto es esponjoso.',
                'Usar solo líquido DOT 4 fresco.'
            ],
            critical: true, done: false
        },
    ]);

    const [selectedInstructions, setSelectedInstructions] = useState<MaintenanceTask | null>(null);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>LOGBOOK TÉCNICO</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{currentKm} KM</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.nextServiceCard}>
                    <Clock color={Colors.primary} size={20} />
                    <View style={styles.nextServiceInfo}>
                        <Text style={styles.nextServiceLabel}>PRÓXIMA REVISIÓN</Text>
                        <Text style={styles.nextServiceValue}>{nextMaintenance} KM</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${(currentKm / nextMaintenance) * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>TAREAS DE MANTENIMIENTO</Text>
                    <Info color={Colors.textDim} size={16} />
                </View>

                {tasks.map((task) => (
                    <View key={task.id} style={[styles.taskCard, task.done && styles.taskCardDone]}>
                        <TouchableOpacity
                            style={styles.taskCore}
                            onPress={() => toggleTask(task.id)}
                        >
                            {task.done ?
                                <CheckCircle color={Colors.success} size={22} /> :
                                <Circle color={Colors.textDim} size={22} />
                            }
                            <View style={styles.taskInfo}>
                                <View style={styles.labelRow}>
                                    <Text style={[styles.taskLabel, task.done && styles.taskTextDone]}>{task.label}</Text>
                                    {task.critical && !task.done && (
                                        <View style={styles.criticalBadge}>
                                            <AlertTriangle color={Colors.secondary} size={10} />
                                            <Text style={styles.criticalText}>CRÍTICO</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.taskDesc}>{task.description}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.taskFooter}>
                            <TouchableOpacity
                                style={styles.instructionBtn}
                                onPress={() => setSelectedInstructions(task)}
                            >
                                <BookOpen color={Colors.primary} size={14} />
                                <Text style={styles.instructionBtnText}>VER PASOS</Text>
                            </TouchableOpacity>
                            <Text style={styles.taskKm}>{task.km} KM</Text>
                        </View>
                    </View>
                ))}

                <View style={styles.warningBox}>
                    <AlertTriangle color={Colors.secondary} size={18} />
                    <Text style={styles.warningText}>
                        Zontes 350T: Se recomienda revisar el apriete de los tornillos del guardabarros delantero y soportes de maletas cada 2.500km.
                    </Text>
                </View>
            </ScrollView>

            {/* Instructions Modal */}
            <Modal visible={!!selectedInstructions} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <BookOpen color={Colors.primary} size={20} />
                            <Text style={styles.modalTitle}>GUÍA TÉCNICA</Text>
                            <TouchableOpacity onPress={() => setSelectedInstructions(null)}>
                                <X color={Colors.textDim} size={24} />
                            </TouchableOpacity>
                        </View>

                        {selectedInstructions && (
                            <View>
                                {selectedInstructions.image && (
                                    <RNImage
                                        source={selectedInstructions.image}
                                        style={styles.guideImage}
                                        resizeMode="contain"
                                    />
                                )}
                                <Text style={styles.instructionSubject}>{selectedInstructions.label}</Text>
                                <View style={styles.instructionList}>
                                    {selectedInstructions.instructions.map((step, idx) => (
                                        <View key={idx} style={styles.instructionRow}>
                                            <Text style={styles.stepNumber}>{idx + 1}</Text>
                                            <Text style={styles.stepText}>{step}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.tipBox}>
                                    <Info color={Colors.primary} size={16} />
                                    <Text style={styles.tipText}>Sigue siempre el par de apriete del manual.</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontFamily: Typography.monoBold,
        letterSpacing: 1,
    },
    badge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: Colors.background,
        fontSize: 12,
        fontFamily: Typography.monoBold,
    },
    content: {
        padding: Spacing.md,
    },
    nextServiceCard: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    nextServiceInfo: {
        marginLeft: Spacing.md,
        flex: 1,
    },
    nextServiceLabel: {
        color: Colors.textDim,
        fontSize: 10,
        fontFamily: Typography.mono,
    },
    nextServiceValue: {
        color: Colors.text,
        fontSize: 24,
        fontFamily: Typography.monoBold,
    },
    progressContainer: {
        width: 80,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 14,
        letterSpacing: 1,
    },
    taskCard: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    taskCardDone: {
        opacity: 0.6,
        borderColor: 'transparent',
    },
    taskCore: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    taskInfo: {
        marginLeft: Spacing.md,
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    taskLabel: {
        color: Colors.text,
        fontFamily: Typography.interBold,
        fontSize: 15,
        marginRight: Spacing.sm,
    },
    taskTextDone: {
        textDecorationLine: 'line-through',
        color: Colors.textDim,
    },
    taskDesc: {
        color: Colors.textDim,
        fontFamily: Typography.inter,
        fontSize: 12,
        marginTop: 2,
    },
    taskFooter: {
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        alignItems: 'flex-end',
    },
    taskKm: {
        color: Colors.primary,
        fontSize: 10,
        fontFamily: Typography.monoBold,
    },
    instructionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 229, 255, 0.05)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 229, 255, 0.2)',
    },
    instructionBtnText: {
        color: Colors.primary,
        fontSize: 10,
        fontFamily: Typography.monoBold,
        marginLeft: 6,
    },
    criticalBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 109, 0, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.secondary,
    },
    criticalText: {
        color: Colors.secondary,
        fontSize: 8,
        fontFamily: Typography.monoBold,
        marginLeft: 2,
    },
    warningBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 109, 0, 0.05)',
        padding: Spacing.md,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: Colors.secondary,
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    warningText: {
        color: Colors.text,
        fontSize: 11,
        fontFamily: Typography.inter,
        marginLeft: Spacing.sm,
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 12,
        letterSpacing: 2,
    },
    instructionSubject: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: Typography.interBold,
        marginBottom: 16,
    },
    guideImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    instructionList: {
        marginBottom: 20,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    stepNumber: {
        color: Colors.primary,
        fontFamily: Typography.monoBold,
        fontSize: 12,
        width: 24,
    },
    stepText: {
        color: Colors.text,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Typography.inter,
        flex: 1,
    },
    tipBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 229, 255, 0.05)',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    tipText: {
        color: Colors.textDim,
        fontSize: 11,
        marginLeft: 10,
        fontFamily: Typography.inter,
    }
});

export default Maintenance;
