import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: undefined,
      bebidaMl: undefined,
      bebidaCusto: undefined,
      litroCusto: undefined,
      listaCachacas: ['Brahma: R$ 123,09'],
      nomeComPreco: undefined
    };
  }

  handleNomeDaCachacaChanged = text => this.setState({nome: text})

  handleQuantosMlChanged = (text) => this.setState({bebidaMl: text}, this.updateLitroCusto)

  handleQuantoCustaChanged = (text) => this.setState({bebidaCusto: text}, this.updateLitroCusto)

  updateLitroCusto = () => {
    if (!this.state.bebidaCusto || !this.state.bebidaMl || !this.state.nome) {
      return
    }

    this.setState({
      litroCusto: ((this.state.bebidaCusto * 1000) / this.state.bebidaMl)
    })
  }

  litroCustoFormatado = () => {
    // Retorna lista com o nome e custo do litro com somente N casas decimais à direita
    return 'R$ ' + parseFloat(this.state.litroCusto).toFixed(2);
  }

  onPressCalcular = () => {
    // junta o nome e o litroCustoFormatado na listaCachaca
    // coisa = nome + preço
    // coloca coisa no fim da lista
    // A = nome
    console.log('Nome: ', this.state.nome)
    // B = litroCustoFormatado
    console.log('LitroCustoFormatado: ', this.litroCustoFormatado())
    // C = A + B = adicionar na listaCachaca
    // junta o nome e o litroCustoFormatado e adiciona na listaCachaca
    // imprime essa lista no campo do preço/litro (um por linha)
    // console.log(nome + litroCusto)
  }

  render() {
    const {litroCusto} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Quanto custa essa cachaça?!
        </Text>
        <Text>
          Qual é o nome dessa cachaça?
        </Text>
        <Card>
          <TextInput
            style={{height: 40}}
            placeholder="Nome da cachaça"
            onChangeText={this.handleNomeDaCachacaChanged}
          />
        </Card>
        <Text>
          Quantos ml tem essa cachaça?
        </Text>
        <Card>
          <TextInput
            style={{height: 40}}
            placeholder="Quantos ML tem?"
            onChangeText={this.handleQuantosMlChanged}
          />
        </Card>
        <Text>
          Quanto é essa cachaça?
        </Text>
        <Card>
          <TextInput
            style={{height: 40}}
            placeholder="Quanto custa?"
            onChangeText={this.handleQuantoCustaChanged}
          />
        </Card>
        <Button
          onPress={this.onPressCalcular}
          title="Calcular!"
          color="#841584"
        />
        {/* // Fazer o campo do preço receber vários valores e mostrar todos como uma lista */}
        <Text>
          O(s) preço(s) por litro dessa(s) cachaça(s) é(são):
        </Text>
        <Card>
          <Text style={{padding: 10, fontSize: 42}}>
            LALALALLA
          </Text>
        </Card>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
