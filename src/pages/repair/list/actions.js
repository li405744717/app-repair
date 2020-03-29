/**
 * Created by dp-k on 2019/12/5.
 */
import {SET_DATA, SET_TYPE_INDEX} from './actionTypes'

export const setData = (options) => {
  return {
    type: SET_DATA,
    ...options
  }
}
export const setTypeIndex = (options) => {
  return {
    type: SET_TYPE_INDEX,
    ...options
  }
}