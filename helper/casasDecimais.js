export function addDecimal(numero) {
    if (numero.length == 1){
        return '0.0' + numero
    }
    else if (numero.length == 2) {
        return '0.' + numero
    }
    else if (numero.length >= 3) {
        let centavos = numero.slice(-2)
        let reais = numero.slice(0, -2)
        return reais + '.' + centavos
    }
    return numero
}

export function decimalStringToFloat(numeroString) {
    return parseFloat(numeroString) / 100
}

console.log(addDecimal('1'))
console.log(addDecimal('12'))
console.log(addDecimal('123'))
console.log(addDecimal('12656565634'))
