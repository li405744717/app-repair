/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import filters from '@/common/filters'


export default function renderView(page) {
  const {} = page.props
  const {menus} = page.state
  const {pageId, code} = page
  return (<div className="page bg_fg" id={pageId}>
    <div className="flex_row margin_top_30 flex_warp">
      {
        menus.map((item, index) => {
          return <div className='home_menu_item flex_row' key={`menu_${index}`} onClick={()=>page.goPage(item)}>
            <div className="flex_column">
              <span className="text_32 black">{item.title}</span>
              <span className="text_24 gray margin_top_10">{item.subTitle}</span>
            </div>
            <div className="flex_1"/>
            <img src={`https://devoss.ddwenwen.com/agent/${item.icon}.png`} className="home_icon_image"/>
          </div>
        })
      }
    </div>

  </div>)
}
