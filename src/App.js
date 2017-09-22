import React from 'react'
import { StyleSheet, Text, FlatList, View, Image } from 'react-native'
import ListItem from './components/ListItem'
// import { get_data } from './utils/data'

const NUM_DATA = 20

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1
    }
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=${NUM_DATA}`
    this.setState({ loading: true })
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.results],
          loading: false
        })
      })
      .catch(error => console.log('error: ', error))
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate: ', nextState, this.state)
  //   return nextState.data !== this.state.data
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate: ', nextProps, nextState)
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate: ', prevProps, prevState)
  // }

  _renderItem({item}) {
    return <ListItem user={item} />
  }

  onEndReached = () => {
    this.setState({ page: this.state.page + 1}, () => {
      this.makeRemoteRequest()
    })
  }

  // onEndReached = () => {
  //   if (!this.onEndReachedCalledDuringMomentum) {
  //     console.log('onEndReached()')
  //     let data = this.state.data
  //     let newData = data.concat(get_data(NUM_DATA, data.length))
  //     this.setState({data: newData})
  //     this.onEndReachedCalledDuringMomentum = true;
  //   }
  // }

  renderFlatList = () => {
    if (!this.state.data) return null
    // console.log('renderFlatList()')
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index}
        renderItem={this._renderItem}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        shouldItemUpdate={ (prev, next) => {
          console.log('prev: ', prev)
          console.log('next: ', next)
          return prev.item !== next.item
        }}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
      />
    )
  }

  render() {
    // console.log('render()', this.state.data)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>FlatList (Vertical)</Text>
        { this.renderFlatList() }
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
  }
})
