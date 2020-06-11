import {GData as app} from "./global_data";
import wx from './wx'
import request from './../common/request'
import Config from './../common/config'
import _Object from "lodash/object";
import $ from 'jquery'

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  var year = this.getFullYear();
  var yearstr = year + '';
  yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
const utils = {
  toFixed(inputValue, fixed, negative) {
    if (negative) {
      return Math.abs(parseFloat(inputValue + '')).toFixed(fixed + 1).slice(0, -1)
    } else {
      if (fixed == 0) {
        return parseFloat(inputValue + '').toFixed(fixed + 1).slice(0, -2)
      } else {
        return parseFloat(inputValue + '').toFixed(fixed + 1).slice(0, -1)
      }

    }
  },
  showToast(message, icon, duration) {
    wx.showToast({
      title: message || '',
      icon: icon || 'none',
      duration: duration || 2000
    })
  },
  addScrollPage(onBottom, onScroll, pageId) {
    // console.log(window, window.addEventListener)
    onReachBottom = (event) => {
      var page = $("#" + pageId)

      var scrollTop = page.scrollTop();
      var scrollHeight = page[0].scrollHeight;
      var offsetHeight = page[0].offsetHeight;
      // console.log("navTop", scrollTop, scrollHeight, offsetHeight)

      if (onScroll) onScroll(scrollTop)
      //ios documentElement.scrollTop ,android body.scrollTop
      if (scrollTop + offsetHeight + 100 >= scrollHeight) {
        if (onBottom) onBottom()
        //这个位置去加载更多的数据；或者进一步判断是否有分页可以加载；
      }
    }

    var page = $('#' + pageId)
    page.scroll(onReachBottom);
  },
  removeScrollPage() {
    if (onReachBottom) {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', onReachBottom, false);
      } else {
        window.onscroll = null
      }
    }
  }
}
var onReachBottom
export default utils
