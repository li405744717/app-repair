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
import {} from '../list/actions'
import userAPI from '@/commAction/user'

class RepairInfo extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    inputValue: null,
    lastSecond: 10,

  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
    this.pageId = 'fundMasterPage'
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    // this.onLoad(nextProps)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }


  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onLoad(props) {
    var options = props.match.params
    this.id = options.id

    userAPI.repair_info(this.id).then(data => {
      var item = data.data
      let order = {
        id: item.id,
        images: item.photos,
        remark: item.detail,
        create_time: item.order_time,
        phone: item.contact,
        address: item.address,
        status: item.charge_status
      }

      this.setState({
        order
      })

      if (order.status === 'done') {
        this.startTimer()
      }
    })


  }

  render() {
    return renderView(this)
  }

  setInputValue(e) {
    this.setState({
      inputValue: e
    })
  }

  submit() {
    let {order} = this.state
    var paras = {
      repair_status: 'done',
      charge_status: 'wait'
    }
    userAPI.repair_update(this.id, paras).then(data => {
      setTimeout(() => {
        order.status = 'done'
        this.setState({
          order
        }, () => {
          this.startTimer()
        })
      }, 3000)
    })
  }

  startTimer() {
    console.log('111')
    this.timer = setInterval(() => {
      let {lastSecond} = this.state
      if (lastSecond <= 1 && this.timer) {
        clearInterval(this.timer)
        this.goHome()
      } else {
        this.setState({
          lastSecond: lastSecond - 1
        })
      }
    }, 1000)
  }

  goHome() {
    wx.relaunchTo({
      page: this,
      url: '/repair'
    })
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state.repair
  }

}


export default connect(mapStateToProps, {})(RepairInfo)
