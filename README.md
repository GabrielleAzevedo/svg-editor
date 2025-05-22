# Desafio Técnico - Editor SVG Interativo com Angular

## 🚀 Sobre o Projeto

Este projeto é uma aplicação web desenvolvida com Angular que simula uma ferramenta de design gráfico simplificada. O usuário pode adicionar e configurar formas SVG (retângulos e estrelas) em um canvas interativo. A aplicação foca em interatividade em tempo real, boa UX e manipulação direta do DOM SVG.

## 👨‍💻 Desenvolvido por

**Gabrielle Granja Aguiar Azevedo**

## 🛠 Funcionalidades Implementadas

### ✅ Funcionalidades Obrigatórias
- [x] **Canvas SVG** renderizado com `<svg>` para exibir os elementos.
- [x] **Adição de elementos:**
  - [x] Botão "Adicionar Retângulo".
  - [x] Botão "Adicionar Estrela".
- [x] **Renderização de elementos** SVG diretamente no canvas.
- [x] **Configuração de Retângulo:**
  - [x] Arredondamento dos cantos (`rx`) via input com atualização em tempo real.
- [x] **Configuração de Estrela:**
  - [x] Número de pontas.
  - [x] Comprimento/profundidade das pontas (diferença entre raio interno e externo).
  - [x] Alterações aplicadas visualmente em tempo real.
- [x] Estrutura modular com SPA utilizando Angular 16+.

### 🌟 Funcionalidades Opcionais Implementadas
- [x] **Painel de Propriedades:**
  - [x] Aparece ao selecionar um elemento.
  - [x] Atualização de propriedades em tempo real.
- [x] **Seleção de elementos no canvas com clique.**
- [x] **Configurações visuais adicionais:**
  - [x] Cor de preenchimento (fill).
  - [x] Cor da borda (stroke).

## 🧠 Decisões de Arquitetura

- Utilização de **Serviços com Subjects/Observables** para controle de estado e comunicação entre componentes.
- **Componentização clara**: canvas, controles de adição, painel de propriedades.
- **Manipulação direta do DOM SVG**, como solicitado, sem uso de bibliotecas externas como D3.js.
- Cálculo dos pontos da estrela com **funções trigonométricas**, controlando número de pontas e profundidade via sliders.

## 🖼 Exemplo da Interface

![image](https://github.com/user-attachments/assets/dedc8ae9-4395-46cd-a8b7-85822943a4b0)


## 🧪 Como rodar o projeto localmente

1. Clone o repositório
2. ## Como executar?

No diretório do projeto, execute

### `npm install`


Depois, execute

### `ng serve`

Abra o seu navegador em [http://localhost:4200](http://localhost:4200) para visualizar o projeto rodando.
