import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../constants/theme';
import { Send, Bot, User, Wrench, Battery } from 'lucide-react-native';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    type?: 'info' | 'tool' | 'battery';
}

const AISupport = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Consola técnica Zontes iniciada. ¿En qué puedo ayudarte hoy?',
            sender: 'bot'
        }
    ]);
    const scrollViewRef = useRef<ScrollView>(null);

    const getBotResponse = (userInput: string): Message => {
        const text = userInput.toLowerCase();

        if (text.includes('bateria') || text.includes('voltaje') || text.includes('arranc')) {
            return {
                id: Date.now(),
                text: 'IMPORTANTE: En la Zontes 350T, una batería por debajo de 12.1V causa fallos en el ABS y PKE. Comprueba el voltaje en la pantalla TFT pulsando el botón de información.',
                sender: 'bot',
                type: 'battery'
            };
        }

        if (text.includes('tiron') || text.includes('falla') || text.includes('par')) {
            return {
                id: Date.now(),
                text: 'Para problemas de inyección o tirones, revisa el sensor MAP (P0107) y la Sonda Lambda (P0131). Necesitarás un multímetro para comprobar voltajes.',
                sender: 'bot',
                type: 'tool'
            };
        }

        if (text.includes('herramienta') || text.includes('llave')) {
            return {
                id: Date.now(),
                text: 'Herramientas básicas para mantenimiento 350T: Llave vaso 8mm (soportes motor), dinamométrica para eje trasero, y limpiador de contactos para sensores Bosch.',
                sender: 'bot',
                type: 'tool'
            };
        }

        if (text.includes('cadena') || text.includes('tension')) {
            return {
                id: Date.now(),
                text: 'La tensión de cadena debe estar entre 25-30mm. Recuerda reapretar la tornillería del motor ya que el modelo 350T vibra en rangos medios.',
                sender: 'bot'
            };
        }

        return {
            id: Date.now(),
            text: 'Entendido. Consultando base de datos de Zontes 350... Te recomiendo empezar por un escaneo de DTC si hay luces de advertencia encendidas.',
            sender: 'bot'
        };
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        setTimeout(() => {
            const botMsg = getBotResponse(input);
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={styles.header}>
                    <Bot color={Colors.primary} size={24} />
                    <Text style={styles.title}>ZONTES_REPAIR_AI</Text>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.chatContainer}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map(msg => (
                        <View key={msg.id} style={[
                            styles.messageWrapper,
                            msg.sender === 'user' ? styles.userWrapper : styles.botWrapper
                        ]}>
                            <View style={[
                                styles.messageBubble,
                                msg.sender === 'user' ? styles.userBubble : styles.botBubble
                            ]}>
                                {msg.type === 'battery' && <Battery color={Colors.primary} size={16} style={{ marginBottom: 4 }} />}
                                {msg.type === 'tool' && <Wrench color={Colors.secondary} size={16} style={{ marginBottom: 4 }} />}
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                            <Text style={styles.timestamp}>{msg.sender === 'bot' ? 'IA' : 'USUARIO'}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={[styles.inputArea, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Pregunta sobre tu Zontes..."
                        placeholderTextColor={Colors.textDim}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        activeOpacity={0.7}
                    >
                        <Send color={Colors.background} size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: Colors.text,
        fontSize: 16,
        fontFamily: Typography.monoBold,
        marginLeft: Spacing.sm,
        letterSpacing: 1,
    },
    chatContainer: {
        padding: Spacing.md,
    },
    messageWrapper: {
        marginBottom: Spacing.md,
        maxWidth: '85%',
    },
    botWrapper: {
        alignSelf: 'flex-start',
    },
    userWrapper: {
        alignSelf: 'flex-end',
    },
    messageBubble: {
        padding: Spacing.md,
        borderRadius: 12,
    },
    botBubble: {
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 3,
        borderLeftColor: Colors.primary,
    },
    userBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderBottomRightRadius: 0,
    },
    messageText: {
        color: Colors.text,
        fontFamily: Typography.inter,
        fontSize: 14,
        lineHeight: 20,
    },
    timestamp: {
        color: Colors.textDim,
        fontSize: 8,
        fontFamily: Typography.mono,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    inputArea: {
        flexDirection: 'row',
        padding: Spacing.md,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 24,
        paddingHorizontal: Spacing.md,
        paddingVertical: 10,
        color: Colors.text,
        fontFamily: Typography.inter,
        marginRight: Spacing.sm,
    },
    sendButton: {
        backgroundColor: Colors.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AISupport;
