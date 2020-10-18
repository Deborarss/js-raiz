//* purposeless condition

function eDeMaior(idade) {
  return idade >= 18
}

console.log(eDeMaior(15))

//* Positivo

let nome = 'Debora'

//? Certo
if(nome.trim() !== '') {
  console.log('nome valido');
}

//! Evitar
if(!nome.trim() === '') {
  console.log('nome invalido');
}

//* Decompose Conditional

//! Sem decompose conditional
if(nome.trim() !== '' && nome.trim().length > 3){
  console.log('nome valido');
}

//? Com decompose conditional
function isValidName(nome) {
  return nome.trim() !== '' && nome.trim().length > 3
}

if(isValidName(nome)){
  console.log('nome valido');
}

// Podemos também quebrar a expressão condicional em duas novas funções 
function isNotEmpty(field){
  return field.trim() !== ''
}

// gte significa greater then or equal (>=) - usada em bastante librarys
function gte(lenght, field){
  return field.length >= lenght
}

// lte significa less then or equal (<=)
function lte(lenght, field){
  return field.length <= lenght
}

if(isNotEmpty(nome) && gte(3, nome) && lte(30, nome)){
  console.log('nome valido');
}

// Pointfree style e every

function isNotEmpty(field){
  return field.trim() !== ''
}

function gte(length){
  return function(field) {
    return field.length >= length
  }
}

function lte(length){
  return function(field) {
    return field.length <= length
  }
}

const validations = {
  nome: [isNotEmpty, gte(3), lte(30)]
}

function isValid(validations, field) {
  return validations.every(function(fn) {
    return fn(field)
  })
}

if(isValid(validations.nome, nome)) {
  console.log('nome válido');
}

// Outro exemplo

// Temos o seguinte codigo que iremos melhorar:
const operator = '+'

if(operator === '+' || operator === '-' || operator === '*' || operator === '/') {
  console.log('operador valido');
}

// melhorando o codigo 1
if(['+', '-', '*', '/'].includes(operator)) {
  console.log('operador valido');  // operador valido
}


// Melhorando o código 2
function isValidOperator(operator){
  return ['+', '-', '*', '/'].includes(operator)
}

if(isValidOperator(operator)) {
  console.log('operador valido');
}

// Temos a seguinte função
function getDiscount(people) {
  let price;
  
  if(people < 10) {
    price = 500
  } else if (people >= 10 && people < 25) {
    price = 350
  } else if (people >= 25 && people < 100) {
    price = 250
  } else if (people >= 100 ) {
    price = 200
  }
  return price
}

// Melhorando a função com o find
function getDiscount2(people) {
  const result = [
    [ function (valor) { return  valor < 10 }, 500 ],
    [ function (valor) { return  valor >= 10 && valor < 25}, 350 ],
    [ function (valor) { return  valor >= 25 && valor < 100 }, 250 ],
    [ function (valor) { return  valor >= 100 }, 200 ],
  ].find(function(teste) {
    return teste[0](people)
  })

  return result[1]
}

console.log(getDiscount2(11))

//Melhorando um pouco mais usando o destructure
function getDiscount3(people) {
  const [ _, result ] = [
    [ function (valor) { return  valor < 10 }, 500 ],
    [ function (valor) { return  valor >= 10 && valor < 25}, 350 ],
    [ function (valor) { return  valor >= 25 && valor < 100 }, 250 ],
    [ function (valor) { return  valor >= 100 }, 200 ],
  ].find(function([ teste ]) {
    return teste(people)
  })

  return result
}

console.log(getDiscount3(11))


// Outro exemplo

function setAccType(accType) {
  if(accType === 'PLATINUM') {
    return "Platinum Customer"
  } else if(accType === 'GOLD') {
    return "Gold Customer"
  } else if(accType === 'SILVER') {
    return "Silver Customer"
  }
}

//Melhorando

const types = {
  PLATINUM: 'Platinum Customer',
  GOLD: 'Gold Customer',
  SILVER: 'Silver Customer'
}

function setAccType(accType) {
  return types[accType]
}

console.log(setAccType('PLATINUM'));