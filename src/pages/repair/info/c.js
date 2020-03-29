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


  onLoad(props) {
    let order = {
      id: 1,
      images: [require('@/img/ad_1.png'), require('@/img/ad_1.png'), require('@/img/ad_1.png')],
      remark: '家里马桶堵塞，请来维修。客户自己输入的报修简要，不过140个字',
      create_time: '02-22',
      phone: '13412341234',
      status: 'holding',
      apartment: {
        city: {
          province: '江西省',
          city: '南昌市',
          town: '聊城'
        },
        apartment: '东昌首府',
        house: {
          building: '七期住宅-1',
          unit: '20栋',
          room: '2号'
        }
      },
    }
    this.setState({
      order
    })
    if (order.status === 'payed') {
      this.startTimer()
    }

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
    order.status = 'paying'
    this.setState({
      order
    })
    setTimeout(()=>{
      order.status = 'payed'
      this.setState({
        order
      },()=>{
        this.startTimer()
      })
    },3000)
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