import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Veiculo } from '../types';

// Chave que identificará a lista no armazenamento do aparelho
const STORAGE_KEY = '@boxto_vagas';

export const useEstacionamento = () => {
  const [placa, setPlaca] = useState<string>('');
  const [vagas, setVagas] = useState<Veiculo[]>([]);

  // 1. CARREGAR OS DADOS ASSIM QUE O APP ABRIR
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          const vagasFormatadas: Veiculo[] = JSON.parse(dadosSalvos).map((veiculo: any) => ({
            ...veiculo,
            entrada: new Date(veiculo.entrada)
          }));
          setVagas(vagasFormatadas);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do armazenamento:', error);
      }
    };

    carregarDados();
  }, []);

  // 2. FUNÇÃO AUXILIAR PARA SALVAR OS DADOS NO DISPOSITIVO
  const salvarDados = async (novasVagas: Veiculo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasVagas));
    } catch (error) {
      console.error('Erro ao salvar os dados no armazenamento:', error);
    }
  };

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

    const listaAtualizada = [...vagas, novoVeiculo];
    setVagas(listaAtualizada);
    salvarDados(listaAtualizada); // Salva no dispositivo
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

    const acaoConfirmarSaida = () => {
      const listaFiltrada = vagas.filter(item => item.id !== veiculo.id);
      setVagas(listaFiltrada);
      salvarDados(listaFiltrada); // Salva a lista atualizada sem o veículo removido
    };

    if (Platform.OS === 'web') {
      const confirmar = window.confirm(`Conta Fechada\n\n${mensagem}\n\nDeseja concluir e liberar a vaga?`);
      if (confirmar) {
        acaoConfirmarSaida();
      }
    } else {
      Alert.alert(
        'Conta Fechada',
        mensagem,
        [
          {
            text: 'Concluir e Liberar Vaga',
            onPress: acaoConfirmarSaida
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