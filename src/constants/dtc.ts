export const DTC_DATABASE = {
    'P0107': {
        code: 'P0107',
        component: 'Sensor MAP (Presión Colector)',
        description: 'Señal de presión de aire demasiado baja.',
        cause: 'Fuga en admisión, sensor defectuoso o cableado dañado.',
        symptoms: 'Ralentí inestable, tirones, pérdida de potencia.',
        solution: 'Revisar tubos de vacío y conector del sensor MAP.'
    },
    'P0108': {
        code: 'P0108',
        component: 'Sensor MAP (Presión Colector)',
        description: 'Señal de presión de aire demasiado alta.',
        cause: 'Sensor defectuoso o cortocircuito.',
        symptoms: 'Ralentí alto, consumo excesivo.',
        solution: 'Verificar voltaje de alimentación del sensor.'
    },
    'P0117': {
        code: 'P0117',
        component: 'Sensor ECT (Temperatura Motor)',
        description: 'Voltaje del sensor de temperatura demasiado bajo.',
        cause: 'Sensor dañado o falta de refrigerante.',
        symptoms: 'El ventilador no arranca, marca mal en TFT.',
        solution: 'Revisar nivel de refrigerante y resistencia del sensor.'
    },
    'P0118': {
        code: 'P0118',
        component: 'Sensor ECT (Temperatura Motor)',
        description: 'Voltaje del sensor de temperatura demasiado alto.',
        cause: 'Circuito abierto en el cableado o sensor desconectado.',
        symptoms: 'Ventilador encendido constante, mal arranque en frío.',
        solution: 'Verificar conexión del sensor cerca del cilindro.'
    },
    'P0122': {
        code: 'P0122',
        component: 'Sensor TPS (Posición Acelerador)',
        description: 'Señal del acelerador demasiado baja.',
        cause: 'Sensor desajustado o dañado.',
        symptoms: 'Respuesta lenta, la moto se apaga al acelerar.',
        solution: 'Verificar posición del cuerpo de mariposa y calibración TPS.'
    },
    'P0123': {
        code: 'P0123',
        component: 'Sensor TPS (Posición Acelerador)',
        description: 'Señal del acelerador demasiado alta.',
        cause: 'Cortocircuito a positivo.',
        symptoms: 'Respuesta brusca, ralentí acelerado.',
        solution: 'Revisar cableado del mando del gas.'
    },
    'P0131': {
        code: 'P0131',
        component: 'Sonda Lambda (Sensor O2)',
        description: 'Voltaje bajo (Mezcla pobre).',
        cause: 'Entrada de aire extra, inyector sucio o sensor sucio.',
        symptoms: 'Humo blanco, detonaciones, sobrecalentamiento.',
        solution: 'Limpiar sonda lambda y revisar fugas en escape.'
    },
    'P0132': {
        code: 'P0132',
        component: 'Sonda Lambda (Sensor O2)',
        description: 'Voltaje alto (Mezcla rica).',
        cause: 'Exceso de gasolina, sensor defectuoso.',
        symptoms: 'Humo negro, consumo elevado, olor a gasolina.',
        solution: 'Revisar presión de combustible y estado de bujía.'
    },
    'P0351': {
        code: 'P0351',
        component: 'Bobina de Encendido',
        description: 'Fallo en circuito primario/secundario.',
        cause: 'Bujía mal, cable de bujía suelto o bobina quemada.',
        symptoms: 'La moto no arranca o falla un cilindro (cojea).',
        solution: 'Verificar capuchón de bujía y continuidad de bobina.'
    },
    'C0001': {
        code: 'C0001',
        component: 'Modulador ABS Bosch',
        description: 'Error interno de comunicación del modulo ABS.',
        cause: 'Batería baja o fallo en la bomba del ABS.',
        symptoms: 'Luz ABS fija, freno duro o sin asistencia.',
        solution: '¡IMPORTANTE! Revisar voltaje de batería (>12.1V). Resetear sistema.'
    },
    'PKE': {
        code: 'PKE Error',
        component: 'Sistema de Llave Remota',
        description: 'Fallo de señal entre mando y antena.',
        cause: 'Pila baja en mando, interferencias o antena desconectada.',
        symptoms: 'La moto no desbloquea o se apaga sola.',
        solution: 'Cambiar pila CR2032 del mando. Acercar mando a la antena del asiento.'
    }
};
