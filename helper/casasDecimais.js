function addDecimal(numero) {
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

function decimalStringToFloat(numeroString) {
    return '' + parseFloat(numeroString) / 100
}

let result
result = addDecimal('1')
console.log(result, 'type', typeof result) //0.01
result = addDecimal('12')
console.log(result, 'type', typeof result) // 0.12
result = addDecimal('123')
console.log(result, 'type', typeof result) // 1.23
result = addDecimal('12656565634')
console.log(result, 'type', typeof result) // 126565656.34
result = addDecimal('00199')
console.log(result, 'type', typeof result) // expected: 1.99

result = decimalStringToFloat('1')
console.log(result, 'type', typeof result) //0.01
result = decimalStringToFloat('12')
console.log(result, 'type', typeof result) // 0.12
result = decimalStringToFloat('123')
console.log(result, 'type', typeof result) // 1.23
result = decimalStringToFloat('12656565634')
console.log(result, 'type', typeof result) // 126565656.34
result = decimalStringToFloat('00199')
console.log(result, 'type', typeof result) // expected: 1.99

export const addDecimal = addDecimal
export const decimalStringToFloat = decimalStringToFloat
