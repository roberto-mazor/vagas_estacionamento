# Vaguinho Vagas

Aplicativo React Native para controle simples de vagas de estacionamento. O projeto principal está na pasta `Vaguinho-Vagas` e usa Expo para rodar em Android, iOS e Web.

## Funcionalidade

- Registrar a placa de um carro que ocupa uma vaga.
- Listar as vagas atualmente ocupadas.
- Dar baixa em uma vaga para calcular o valor do estacionamento e liberar a vaga.
- Cálculo de cobrança:
  - Até 60 minutos: R$ 5,00.
  - A cada 30 minutos adicionais (ou fração): R$ 1,00.

## Como funciona

1. Abra o app e digite a placa do veículo no campo de entrada.
2. Toque no botão `+` para adicionar o veículo à lista de vagas ocupadas.
3. As vagas aparecem em uma lista.
4. Toque na vaga desejada para registrar a saída do veículo.
5. O app exibe a hora de entrada, hora de saída e o valor total.
6. Confirme para liberar a vaga.

## Estrutura do projeto

- `Vaguinho-Vagas/App.tsx` — ponto de entrada do app.
- `Vaguinho-Vagas/src/screens/Home.tsx` — tela principal com formulário e lista de vagas.
- `Vaguinho-Vagas/src/hooks/useEstacionamento.ts` — lógica de estado do estacionamento e cálculo do valor.
- `Vaguinho-Vagas/src/components/CardVaga.tsx` — componente de exibição de cada vaga.
- `Vaguinho-Vagas/src/types/index.ts` — tipos TypeScript usados pelo app.

## Instalação e execução

No terminal, acesse a pasta do app e execute:

```bash
cd Vaguinho-Vagas
npm install
npm start
```

Depois, abra no Expo Go, no emulador ou no navegador conforme desejar.

## Documentação adicional

- Consulte `Vaguinho-Vagas/README.md` para um guia específico do app Expo e detalhes de execução.

## Observações

- O app não persiste os dados entre reinícios: as vagas são mantidas apenas em memória.
- A validação exige que a placa não seja vazia.
