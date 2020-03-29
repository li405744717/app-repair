/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setUser} from './actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import {GData as app} from "@/common/global_data";
import {List, InputItem, Button,Icon} from 'antd-mobile'

class Login extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: ''
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
  }

  componentDidMount() {
    // this.props.getFilters()
    this.initData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps)
    // utils.reSetPropsState(this, nextProps)
  }

  initData(props) {
    var {user} = props
    this.handleAction(user.token)
  }

  setInputValue(val, key) {
    console.log(val, key)
    this.setState({
      [key]: val
    })
  }

  onPass() {
    // this.props.login()
    wx.showLoading({title: '请稍后...', mask: true})
    var params = {
      username: 'zsw',
      password: 'zxcasd123'
    }
    UserAPI.login(params).then(data => {
      wx.hideLoading()
      this.props.setUser(data)
      this.handleAction(data.token)
    })
    // app.globalData.token = '4313120545a40d6355ab736e9e6566b0cb709170'
  }

  handleAction(token) {
    if (token) {
      let RedirectUrl = this.props.location.state ? this.props.location.state.from.pathname : null
      let RedirectUrlSearch = this.props.location.state ? this.props.location.state.from.search : ''
      console.log('RedirectUrl', RedirectUrl + RedirectUrlSearch)
      if (RedirectUrl !== '/') {
        // 登陆成功之后的跳转
        this.props.history.replace(RedirectUrl + RedirectUrlSearch)
      }else{
        this.props.history.replace('/repair')
      }

    }
  }

  render() {
    const {user} = this.props
    const {username, password} = this.state
    return (<div className="page flex_column flex_1 center " id="rankPage">
      <img src={require('@/img/login_bg_1.png')} className="width_100"/>
      <img src={require('@/img/login_bg_mid.png')} className="flex_1 width_100"/>
      <img src={require('@/img/login_bg_2.png')} className="width_100"/>
      {
        !user.id ?
          <div className="width_60 flex_column login_container center">
            <span className="margin_bottom_30 text_80 white bold">登录</span>
            <div className="flex_column login_view">
              <div className="login_input_view flex_row align_center padding_LR_40">
                <InputItem className="text_30"  value={username} onChange={val => this.setInputValue(val, 'username')} placeholder="输入您的帐号"/>
              </div>
              <div className="login_input_view flex_row align_center padding_LR_40 margin_top_40">
                <InputItem className="text_30" value={password} onChange={val => this.setInputValue(val, 'password')}
                           placeholder="输入您的密码" type="password"/>
              </div>
              <div className="login_btn_view flex_row center margin_top_60" onClick={() => this.onPass()}>
                <span className="text_40 white">点击登录</span>
              </div>
              <div className="width_100 flex_row center margin_top_80">
                <span className="text_22 gray">如忘记后台密码请联系后台工作人员</span>
              </div>
            </div>
          </div> :
          <div>
            登陆中...
          </div>
      }
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(Login)

