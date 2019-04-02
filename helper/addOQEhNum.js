function addOQEhNum(numerosComSimbolos) {
  let numeros = '0123456789'
  let numerosSemSimbolos = ''
  for (i = 0; i < numerosComSimbolos.length; i++) {
    if (numeros.includes(numerosComSimbolos[i])) {
      numerosSemSimbolos += numerosComSimbolos[i]
      console.log(numerosSemSimbolos)
    }
  }

  return numerosSemSimbolos
}

console.log(addOQEhNum('5'))
console.log(addOQEhNum('55'))
console.log(addOQEhNum('55,5'))
console.log(addOQEhNum('55,05-')) // 5505
console.log(addOQEhNum('s'))
console.log(addOQEhNum('AAAHH'))

export default addOQEhNum
