/**
 * Created by dp-k on 2019/12/5.
 */
import {SET_DATA, SET_TYPE_INDEX} from './actionTypes'

const State = {
  selectList: 0,
  list: []
}
export default (state = State, action) => {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_DATA:
      var {index, data} = action
      newState.list[index] = data
      return newState
    case SET_TYPE_INDEX:
      var {index} = action
      newState.selectList = index
      return newState
    default:
      return state;
  }
}
