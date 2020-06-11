/**
 * Created by dp-k on 2019/12/5.
 */
import {SET_DATA, SET_TYPE_INDEX} from './actionTypes'

const State = {
  selectList: 0,
  list: [
    {
      type: 'wait',
      type_name: "待处理",
      contents: null,
      page: 1,
      next: null
    },
    {
      type: 'done',
      type_name: "完成",
      contents: null,
      page: 1,
      next: null
    }
  ],
}
export default (state = State, action) => {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_DATA:
      var {index, data} = action
      if (Array.isArray(index)) {
        for (var _index of index) {
          newState.list[_index] = data[_index]
        }
      } else {
        newState.list[index] = data
      }

      return newState
    case SET_TYPE_INDEX:
      var {index} = action
      newState.selectList = index
      return newState
    default:
      return state;
  }
}
