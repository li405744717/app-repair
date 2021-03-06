/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import filters from '@/common/filters'


export default function renderView(page) {
  const {menus} = page.state
  const {list, selectList} = page.props
  const {pageId, code} = page

  return (<div className="page bg_fg flex_column height_100">
    <div className="flex_row align_center margin_top_40 padding_LR_40">
      {
        list.map((item, index) => {
          return <div className={`flex_column role_view ${selectList !== index ? 'role_view_un' : ''} margin_right_40`}
                      key={`list${index}`}
                      onClick={() => page.selectList(index)}>
            <span className="text_30 c_FFAB19">{item.type_name}</span>
          </div>
        })
      }

    </div>
    {
      <div className="flex_1 scroll_y bg_fg margin_top_30" id={pageId}>
        {
          (list[selectList].contents || []).map((item, index) => {
            return <div className="house_item flex_column" key={`content${index}`}
                        onClick={() => page.goInfo(index, item)}>
              <div className="flex_row align_center  ">
                <img className="icon_location" src={require('@/img/icon_location.png')}/>
                <span className="text_30 margin_left_20 text_line_1 flex_1">{item.address}</span>
              </div>
              <div className="flex_row align_center margin_top_10">
                <img className="icon_phone" src={require('@/img/icon_phone.png')}/>
                <span className="text_30 margin_left_20">{item.phone}</span>
                <div className="list_phone_btn margin_left_20">
                  <span className="text_22 c_FFAB19">点击拨打</span>
                </div>
              </div>

              <span className="text_34 black margin_bottom_20 margin_top_10">{item.remark}</span>
              <div className="flex_row flex_warp">
                {
                  item.images.map((image, index) => {
                    return <div key={`image${index}`}
                                className="house_add_view relative">
                      <img src={image} className="flex_row width_100 height_100"/>
                    </div>
                  })
                }

              </div>
              <div className="flex_row align_center  padding_TB_10 border_top">
                <span className="text_20 c_999999">提交时间：{item.create_time}</span>
                <div className="flex_1"/>
                {
                  item.status === 'complete' ?
                    <span className="c_999999 text_20">用户已完成支付</span> :
                    item.status === 'process' ?
                      <span className="c_FFAB19 text_24">用户未支付</span> :
                      <div className="list_order_btn">
                        <span className="white text_28">进入订单</span>
                      </div>
                }
              </div>
            </div>
          })
        }
        {
          list[selectList].contents && list[selectList].contents.length === 0 ?
            <div className="flex_1 flex_column center content_view">
              <img src={require('@/img/icon_empty.png')} className="icon_empty"/>
              <span className="text_26 light margin_top_80">暂无数据～</span>
            </div> : null
        }
        {
          !list[selectList].next ?
            <div className='width_100 flex_row center padding_TB_20'>
              <span>没有更多了</span>
            </div> : null
        }
      </div>


    }


  </div>)
}
