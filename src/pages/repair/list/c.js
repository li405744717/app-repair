/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import utils from '@/common/utils'
import $ from 'jquery'
import store from '@/Store'
import {setTypeIndex} from './actions'

class RepairList extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
    this.pageId = 'fundMasterPage'
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.onLoad(nextProps)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }


  onLoad(props) {

  }

  render() {
    return renderView(this)
  }

  selectList(index) {
    this.props.setTypeIndex({index})
  }

  goInfo(index, item) {
    let {id} = item
    wx.navigateTo({
      page: this,
      url: `/repair/info/${id}`
    })
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state.repair
  }

}


export default connect(mapStateToProps, {setTypeIndex})(RepairList)