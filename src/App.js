import React from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { get_data } from './utils/data'

const NUM_DATA = 20

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    this.setState({data: get_data(NUM_DATA, 0)})
  }

  _renderItem({item}) {
    return (
      <View style={styles.rowContainer}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      console.log('onEndReached()', this.state.data)
      let data = this.state.data
      let newData = data.concat(get_data(NUM_DATA, data.length + 1))
      this.setState({data: newData})
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>FlatList (Vertical)</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 20
  },
  title: {
    color: '#000',
    fontSize: 18,
    padding: 20
  },
  rowContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 20
  }
})
