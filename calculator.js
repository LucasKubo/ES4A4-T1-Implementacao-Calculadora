'use strict';

const display = document.getElementById('display'); //tela
const numeros = document.querySelectorAll('[id*=tecla]'); //numeros
const operadores = document.querySelectorAll('[id*=operador]'); //operadores
//id *= 'string' --> seleciona todos os ids que contenham a string 'string'

//variavel boolean para distinguir os numeros das operações
let novoNumero = true;
//variavel para armazenar o primeiro numero
let numeroAnterior;
//variavel que guarda o valor do operador
let operador;

//função que realiza as operações pegando o numeroAtual (display) e numeroAnterior(calculado por último)
const calcular = () => {
  //Condição para operação pendente
  if (operador != undefined) {
    const numeroAtual = parseFloat(display.textContent);
    novoNumero = true;
    var resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);
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

//função disparada ao clicar um operador
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

//função disparada ao clicar no botão de igual '='
const clicarIgual = (evento) => {
  calcular();
  novoNumero = false;
  operador = undefined;
};
//evento de clique no botão de igual '='
document.getElementById('equals').addEventListener('click', clicarIgual);

//função disparada ao clicar no botão de trocar sinal
const trocarSinal = (evento) => {
  const sinalTrocado = parseFloat(display.textContent) * -1;
  display.textContent = '';
  atualizarDisplay(sinalTrocado);
};
//evento de clique no botão de trocar sinal '+/-'
document.getElementById('signal').addEventListener('click', trocarSinal);

//função para limpar calculo
const limparCalculo = () => {
  display.textContent = '';
};
//evento de clique no botão "C"
document
  .getElementById('clearcalculus')
  .addEventListener('click', limparCalculo);
