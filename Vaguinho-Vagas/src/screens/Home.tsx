import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { useEstacionamento } from '../hooks/useEstacionamento';
import { CardVaga } from '../components/CardVaga';

export const Home: React.FC = () => {
  const { placa, setPlaca, vagas, adicionarVeiculo, darBaixa } = useEstacionamento();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vagas do BoxTo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Placa do Carro (Ex: ABC-1234)"
          value={placa}
          onChangeText={setPlaca}
          autoCapitalize="characters"
          maxLength={8}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarVeiculo}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardVaga veiculo={item} onDarBaixa={darBaixa} />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhuma vaga ocupada no momento.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
  },
  botaoAdicionar: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 10,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listaVazia: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});