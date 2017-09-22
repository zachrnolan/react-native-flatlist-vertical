import React, { PureComponent, Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class ListItem extends Component {

  render() {
    const user = this.props.user
    return (
      <View style={styles.rowContainer}>
        <Image source={{ uri: user.picture.thumbnail}} style={styles.image} />
        <Text>{`${user.name.first} ${user.name.last}`}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 20
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  }
})
