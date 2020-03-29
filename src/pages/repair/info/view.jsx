/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import filters from '@/common/filters'
import {InputItem} from 'antd-mobile'

export default function renderView(page) {
  const {} = page.props
  const {inputValue, order, lastSecond} = page.state
  const {pageId, code} = page
  return (<div className="page bg_fg flex_column height_100" id={pageId}>
    {
      order && order.status != 'payed' ?
        <>
          <div className="house_item flex_column">
            <div className="flex_row align_center  ">
              <img className="icon_location" src={require('@/img/icon_location.png')}/>
              <span className="text_30 margin_left_20 text_line_1">{order.apartment.city.town}<span
                className="text_30 margin_left_20">{order.apartment.apartment}</span><span
                className="text_30 margin_left_20">{order.apartment.house.building}-{order.apartment.house.unit}-{order.apartment.house.room}</span></span>
              <div className="flex_1"/>
              <div className="default_view text_20 c_FFAB19">默认地址</div>
            </div>
            <div className="flex_row align_center margin_top_10">
              <img className="icon_phone" src={require('@/img/icon_phone.png')}/>
              <span className="text_30 margin_left_20">{order.phone}</span>
              <div className="list_phone_btn margin_left_20">
                <span className="text_22 c_FFAB19">点击拨打</span>
              </div>
            </div>

            <span className="text_34 black margin_bottom_20 margin_top_10">{order.remark}</span>
            <div className="flex_row flex_warp">
              {
                order.images.map((image, index) => {
                  return <div key={`image${index}`}
                              className="house_add_view relative">
                    <img src={image} className="flex_row width_100 height_100"/>
                  </div>
                })
              }

            </div>
          </div>
          <div className="flex_column padding_LR_24 width_100 align_center margin_top_20">
            <span className="text_20 c_999999">提交时间：{order.create_time}</span>
            <div className="margin_top_70 repair_info_pay_view flex_column">
              <div className="flex_row align_end">
                <img src={require('@/img/icon_yuan.png')} className="icon_yuan margin_bottom_4"/>
                <span className="text_30 black margin_left_20">请填写本次维修金额</span>
                <InputItem className="text_40 black repair_info_input_view" value={inputValue}
                           onChange={val => page.setInputValue(val, 'money')} placeholder=""/>
                <span className="text_30 black">元</span>
              </div>
              <div className="flex_row width_100 center margin_top_40">
                {
                  order.status === 'paying' ?
                    <div className="flex_row align_center margin_bottom_20">
                      <img src={require('@/img/icon_complete.png')} className="icon_complete margin_right_20"/>
                      <span className="c_FFAB19 text_28">提交成功，等待用户支付</span>
                    </div> :
                    <div className="repair_info_submit_btn" onClick={() => page.submit()}>
                      <span className="white text_28">确认提交</span>
                    </div>
                }
              </div>
            </div>
          </div>
        </> :
        order && order.status == 'payed' ?
          <>
            <div className="pay_result_view flex_column center bg_white">
              <img src={require('@/img/icon_status_success.png')} className="icon_status_error"/>
              <span className="text_34 black margin_top_40 margin_bottom_10">支付成功</span>
              <span className="text_24 c_999999">该页面10秒后自动跳转订单页面</span>
              <span className="text_24 black margin_top_10">{lastSecond}S</span>
            </div>
            <div className="flex_1 content_view flex_column align_center">
              <div className="re_pay_btn_view_2 margin_top_60 flex_row center" onClick={()=>page.goHome()}>
                <span className="text_30 c_FFAB19">返回首页</span>
              </div>
            </div>
          </> : null

    }
  </div>)
}
