import * as React from 'react';
import { Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import addOQEhNum from './helper/addOQEhNum'
import { addDecimal, decimalStringToFloat } from './helper/casasDecimais'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: undefined,
      bebidaMl: undefined,
      bebidaCusto: undefined,
      litroCusto: undefined,
      listaCachacas: [],
      nomeComPreco: undefined
    };
  }

  handleNomeDaCachacaChanged = text => this.setState({nome: text})

  handleQuantosMlChanged = (text) => {
    this.setState({bebidaMl: addOQEhNum(text)}, this.updateLitroCusto)
  }

  handleQuantoCustaChanged = (text) => {
    console.log('handleQuantoCustaChanged', text)
    let mutatedText = decimalStringToFloat(addOQEhNum(text))
    // let mutatedText = addOQEhNum(text)
    // let mutatedText = addDecimal(addOQEhNum(text))

    // TODO: erro que não permite 0 (zero) no meio do valor, e.g: 10.50 => 1.5
    // TODO: erro quando deleta todo o valor => fica NaN
    this.setState({bebidaCusto: mutatedText}, this.updateLitroCusto)
  }

  updateLitroCusto = () => {
    console.log('updateLitroCusto: bebidaCusto', this.state.bebidaCusto)
    console.log('updateLitroCusto: litroCusto', this.state.litroCusto)
    if (!this.state.bebidaCusto || !this.state.bebidaMl || !this.state.nome) {
      return // colocar uma mensagem "preencha todos os campos"
    }

    this.setState({
      litroCusto: ((this.state.bebidaCusto * 1000) / this.state.bebidaMl)
    })
  }

  litroCustoFormatado = () => {
    console.log('litroCustoFormatado')
    // Retorna lista com o nome e custo do litro com somente N casas decimais à direita
    return 'R$ ' + parseFloat(this.state.litroCusto).toFixed(2);
  }

  onPressCalcular = () => {
    console.log('chegou no onPressCalcular', this.state)
    if (this.state.nome !== undefined && this.state.bebidaMl !== undefined && this.state.bebidaCusto !== undefined) {
      let parzinho = (this.state.nome + ': ' + this.litroCustoFormatado())

      this.setState({
        listaCachacas: [...this.state.listaCachacas, parzinho],
        nome: undefined,
        bebidaMl: undefined,
        bebidaCusto: undefined
      })
    }
  }

  render() {
    console.log("método render", this.state.bebidaCusto)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>
            Quanto custa essa cachaça?!
          </Text>
        </View>
        <Text>
          Qual é o nome dessa cachaça? (Ex: "Brahma")
        </Text>
        <Card>
          <TextInput
            style={{height: 40}}
            placeholder="Brahma"
            onChangeText={this.handleNomeDaCachacaChanged}
            value={this.state.nome}
          />
        </Card>
        <Text>
          Quantos ml tem essa cachaça? (Ex: 350)
        </Text>
        <Card>
          <TextInput
            style={{height: 40}}
            keyboardType="numeric"
            placeholder="350"
            onChangeText={this.handleQuantosMlChanged}
            value={this.state.bebidaMl}
          />
        </Card>
        <Text>
          Quanto é essa cachaça?
        </Text>
        <Card>
          {/* TODO: colocar o R$ tipo: <Text>R$</Text> */}
          <TextInput
            style={{height: 40}}
            keyboardType="numeric"
            placeholder="1.99"
            onChangeText={this.handleQuantoCustaChanged}
            value={this.state.bebidaCusto}
          />
        </Card>
        <Button
          onPress={this.onPressCalcular}
          title="Calcular!"
          color="#A50897"
        />
        <Text style={{marginTop: 10, fontSize: 20}}>
          R$/litro:
        </Text>
        {this.state.listaCachacas && this.state.listaCachacas.map((parzinho, posicao) => (
          <Text key={posicao} style={{paddingTop: 10}}>
            {parzinho}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FDDE9E',
    padding: 8,
  },
  titulo: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  header: {
    backgroundColor: '#A50897',
    marginBottom: 24,
  }
});
