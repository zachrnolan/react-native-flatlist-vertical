import _ from 'lodash'

export const get_data = (num, skip) => {
  const start = skip
  const end = skip + num
  console.log('start: ', start)
  console.log('end: ', end)
  return _.range(start, end).map((x, i) => ({id: i, title: 'List Item ' + i}))
}
