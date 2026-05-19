import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Veiculo } from '../types';

export const useEstacionamento = () => {
  const [placa, setPlaca] = useState<string>('');
  const [vagas, setVagas] = useState<Veiculo[]>([]);

  const adicionarVeiculo = (): void => {
    if (placa.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite a placa do carro.');
      return;
    }

    const novoVeiculo: Veiculo = {
      id: Date.now().toString(),
      placa: placa.toUpperCase(),
      entrada: new Date(),
    };

    setVagas([...vagas, novoVeiculo]);
    setPlaca('');
  };

  const calcularValor = (horaEntrada: Date): number => {
    const horaSaida = new Date();
    const diferencaMs = horaSaida.getTime() - horaEntrada.getTime();
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));

    const VALOR_BASE = 5.0;
    
    if (diferencaMinutos <= 60) {
      return VALOR_BASE;
    } else {
      const minutosAdicionais = diferencaMinutos - 60;
      const periodosAdicionais = Math.ceil(minutosAdicionais / 30); 
      return VALOR_BASE + (periodosAdicionais * 1.0);
    }
  };

  const darBaixa = (veiculo: Veiculo): void => {
    const valorFinal = calcularValor(veiculo.entrada);
    const horaSaidaFormatada = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const horaEntradaFormatada = new Date(veiculo.entrada).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const mensagem = `Veículo: ${veiculo.placa}\nEntrada: ${horaEntradaFormatada}\nSaída: ${horaSaidaFormatada}\n\nValor total: R$ ${valorFinal.toFixed(2)}`;

    // Se estiver rodando no Navegador (Web)
    if (Platform.OS === 'web') {
      const confirmar = window.confirm(`Conta Fechada\n\n${mensagem}\n\nDeseja concluir e liberar a vaga?`);
      if (confirmar) {
        setVagas(vagas.filter(item => item.id !== veiculo.id));
      }
    } else {
      // Se estiver rodando no Celular (Android / iOS)
      Alert.alert(
        'Conta Fechada',
        mensagem,
        [
          {
            text: 'Concluir e Liberar Vaga',
            onPress: () => {
              setVagas(vagas.filter(item => item.id !== veiculo.id));
            }
          },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
    }
  };

  return {
    placa,
    setPlaca,
    vagas,
    adicionarVeiculo,
    darBaixa,
  };
};

