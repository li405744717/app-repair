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

class FundMaster extends React.Component {
  static propTypes = {}

  static defaultProps = {
    menus: [],
    masterData: []
  }

  state = {
    menus: [
      {
        title: "自选基金",
        subTitle: "个人核心基金池",
        icon: "icon_menu_fund_favor",
        enable: true,
        url: '/fund/favor',
      },
      {
        title: "基金组合",
        subTitle: "组合创建和诊断",
        icon: "icon_menu_combination",
        enable: true,
        url: '/combination/list',
      },
      {
        title: "指标选基",
        subTitle: "大浪淘沙千里选一",
        icon: "icon_menu_filter",
        enable: true,
        url: '/fund/list?from=home',
      },
      {
        title: "基金诊断",
        subTitle: "全方位量化诊断",
        icon: "icon_menu_fund_diagnose",
        enable: true,
        url: '/combination/addFromSearch?from=home',
      },
      {
        title: "组合比较",
        subTitle: "穿透对比基金组合",
        icon: "icon_menu_combination_pk",
        enable: true,
        url: '/combination/pk/landing/',
      },
      {
        title: "基金排行",
        subTitle: "优秀基金榜单",
        icon: "icon_menu_fund_rank",
        enable: false,
        url: '',
        query: {}
      },
      {
        title: "敬请期待",
        subTitle: "更多功能稍后上线",
        icon: "icon_menu_wait",
        enable: false,
        url: '',
        query: {}
      }
    ]
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
    this.pageId = 'fundMasterPage'
  }

  componentWillReceiveProps(newVal) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }


  onLoad(props) {
    var options = props.match.params
    this.code = options.code
    this.htmlParam = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => this.htmlParam[k] = v);


  }

  render() {
    return renderView(this)
  }

  goPage(item) {
    if (!item.enable) {
      // utils.showToast('敬请期待')
    } else {
      wx.navigateTo({
        page: this,
        url: item.url,
        query: item.query
      })
    }
  }

}

const mapStateToProps = (state, props) => {
  return {}

}


export default connect(mapStateToProps, {})(FundMaster)