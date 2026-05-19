# Vaguinho Vagas

Aplicativo móvel e web para controle de vagas de estacionamento construído com Expo e React Native.

## O que o app faz

- Registra a placa de um carro que entra no estacionamento.
- Exibe as vagas atualmente ocupadas em uma lista.
- Permite dar baixa em uma vaga para calcular o valor devido e liberar a vaga.
- Calcula cobrança automática com base no tempo de permanência.

## Regras de cobrança

- Até 60 minutos: R$ 5,00.
- A cada 30 minutos adicionais (ou fração): R$ 1,00.

## Como executar

1. Acesse a pasta do projeto:

```bash
cd Vaguinho-Vagas
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o Expo:

```bash
npm start
```

4. Escolha a plataforma desejada:
   - Android
   - iOS
   - Web

## Principais arquivos

- `App.tsx` — entrada do aplicativo.
- `src/screens/Home.tsx` — tela principal com formulário de cadastro e lista de vagas.
- `src/hooks/useEstacionamento.ts` — lógica de estado, cadastro, baixa e cálculo de cobrança.
- `src/components/CardVaga.tsx` — componente que exibe cada vaga ocupada.
- `src/types/index.ts` — tipos TypeScript usados no app.

## Observações

- Os dados não são persistidos; reiniciar o app limpa a lista de vagas.
- O app aceita placa em formato de texto e converte para maiúsculas automaticamente.
- Em Web, a confirmação de baixa é exibida via `window.confirm`. Em Android/iOS, usa `Alert`.
