import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Veiculo } from '../types';

interface CardVagaProps {
  veiculo: Veiculo;
  onDarBaixa: (veiculo: Veiculo) => void;
}

export const CardVaga: React.FC<CardVagaProps> = ({ veiculo, onDarBaixa }) => {
  const horaEntrada = veiculo.entrada.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <View style={styles.cardVaga}>
      <View style={styles.infoContainer}>
        <Text style={styles.textoPlaca}>{veiculo.placa}</Text>
        <Text style={styles.textoHora}>{horaEntrada}</Text>
      </View>
      
      <TouchableOpacity style={styles.botaoCheck} onPress={() => onDarBaixa(veiculo)}>
        <View style={styles.circuloCheck} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardVaga: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textoPlaca: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  textoHora: {
    fontSize: 16,
    color: '#666',
  },
  botaoCheck: {
    padding: 15,
  },
  circuloCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF5722',
    backgroundColor: 'transparent',
  },
});