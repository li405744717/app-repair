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
import {setTypeIndex, setData} from './actions'
import userAPI from '@/commAction/user'

class RepairList extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
    this.pageId = 'listPage'
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.onLoad(nextProps)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }


  onLoad(props) {
    this.worker_id = null
    var {list, selectList} = props
    if (!list[0].contents) {
      Promise.all([userAPI.repair_list(this.worker_id, 'wait', null), userAPI.repair_list(this.worker_id, 'done', null)]).then(datas => {
        console.log(datas)
        var wait_content = []
        var count = 0
        for (var item of datas[0].data) {
          wait_content.push({
            id: item.id,
            images: item.photos,
            remark: item.detail,
            create_time: item.order_time,
            phone: item.contact,
            address: item.address
          })
        }

        var done_content = []
        var count_done = 0
        for (var item of datas[1].data) {
          done_content.push({
            id: item.id,
            images: item.photos,
            remark: item.detail,
            create_time: item.order_time,
            phone: item.contact,
            address: item.address
          })
        }

        this.props.setData({
          index: [0, 1],
          data: [
            {
              type: 'wait',
              type_name: "待处理",
              contents: wait_content,
              page: 1,
              next: datas[0].next
            },
            {
              type: 'done',
              type_name: "完成",
              contents: done_content,
              page: 1,
              next: datas[1].next
            }
          ]
        })
      })
    }
    utils.addScrollPage(() => this.onBottom(), null, this.pageId)
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

  onBottom() {
    var {list, selectList} = this.props
    if (list[selectList].next) {
      this.getData(true, list[selectList], list)
    }
  }

  getData(loadMore,) {
    if (this.loading) return
    this.loading = true
    var {list, selectList} = this.props
    var type = list[selectList].type, page
    if (loadMore) {
      page = list[selectList].page + 1
      userAPI.repair_list(this.worker_id, type, page).then(data => {
        this.loading = false
        var contents = []
        for (var item of data.data) {
          contents.push({
            id: item.id,
            images: item.photos,
            remark: item.detail,
            create_time: item.order_time,
            phone: item.contact,
            address: item.address
          })
        }
        contents = list[selectList].contents.concat(contents)
        this.props.setData({
          index: selectList,
          data: {
            type: type,
            type_name: type === 'wait' ? "待处理" : "完成",
            contents: contents,
            page: page,
            next: data.next
          }
        })
      }).catch(err => {
        this.loading = false
      })
    } else {
      userAPI.repair_list(this.worker_id, type, null).then(data => {
        this.loading = false
        var contents = []
        for (var item of data.data) {
          contents.push({
            id: item.id,
            images: item.photos,
            remark: item.detail,
            create_time: item.order_time,
            phone: item.contact,
            address: item.address
          })
        }
        this.props.setData({
          index: selectList,
          data: {
            type: type,
            type_name: type === 'wait' ? "待处理" : "完成",
            contents: contents,
            page: 1,
            next: data.next
          }
        })
      }).catch(err => {
        this.loading = false
      })
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state.repair
  }

}


export default connect(mapStateToProps, {setTypeIndex, setData})(RepairList)
