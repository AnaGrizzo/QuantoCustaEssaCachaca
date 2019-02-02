import * as React from 'react';
import { Text, ScrollView, StyleSheet, TextInput } from 'react-native';
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
    return (
      <ScrollView style={styles.container}>
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
            value={this.state.nome}
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
            value={this.state.bebidaMl}
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
            value={this.state.bebidaCusto}
          />
        </Card>
        <Button
          onPress={this.onPressCalcular}
          title="Calcular!"
          color="#841584"
        />
        <Text style={{marginTop: 10, fontSize: 20}}>
          O(s) preço(s) por litro dessa(s) cachaça(s) é(são):
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
