'use strict';

const display = document.getElementById('display'); //tela
//id *= 'string' --> seleciona todos os ids que contenham a string 'string'
const numeros = document.querySelectorAll('[id*=tecla]'); //numeros
const operadores = document.querySelectorAll('[id*=operador]'); //numeros

//variavel boolean para distinguir os numeros das operações
let novoNumero = true;
//variavel para armazenar o primeiro numero
let numeroAnterior;
//variavel que guarda o valor do operador
let operador;

//função que verifica se existe operação pendente
const operacaoPendente = () => operador != undefined;

//função que realiza as operações
const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent);
    novoNumero = true;
    switch (operador) {
      case '+':
        atualizarDisplay(numeroAnterior + numeroAtual);
        break;
      case '-':
        atualizarDisplay(numeroAnterior - numeroAtual);
        break;
      case 'x':
        atualizarDisplay(numeroAnterior * numeroAtual);
        break;
      case '/':
        atualizarDisplay(numeroAnterior / numeroAtual);
        break;
      default:
        break;  
    }
  }
};

//função que atualiza o display de acordo com os botões clicados
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

//função que é disparada ao clique de um número
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//adicionar evento de clique em todos os numeros
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (event) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
  }
};
//adicionar evento de clique em todos os operadores
operadores.forEach((operador) =>
  operador.addEventListener('click', selecionarOperador)
);

//implementando a funcionalidade do botão "="

document.getElementById('=').addEventListener('click', retornarResultado)