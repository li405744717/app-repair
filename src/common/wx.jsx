import {Toast} from 'antd-mobile';
import React from 'react';

function showLoading(content) {
  var {title, mask} = content
  Toast.info(<div className="padding_TB_20 padding_LR_20">
    <img src={require('@/img/icon_loading.png')} className="loading_view_animation loading_roll"/>
  </div>, 0, null, mask);
}

function showToast(content) {
  var title = content.title
  Toast.info(title, 1);
}

function stopPullDownRefresh() {

}

function hideLoading() {
  Toast.hide()
}

function getStorage(key) {
  var data = window.localStorage.getItem(key)
  data = JSON.parse(data)
  return data
}

function setStorage(dict) {
  var {key, data} = dict
  data = JSON.stringify(data)
  window.localStorage.setItem(key, data)
}

function clearStorage() {
  window.localStorage.clear()
}

function relaunchTo(options) {
  var {page, url} = options
  page.props.history.replace({pathname: url})
}

function navigateTo(options) {
  var {page, url, query} = options
  // /pages/details/stock-info/stock-info?stockcode=002515
  var _url = url
  var param = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);
  var navigate = () => {
    if (page.isPad) _url = `/pad${_url}`
    page.props.history.push(_url)
  }
  console.log(url)
  if (url.indexOf("/pages/details/stock-info/stock-info") > -1) {
    _url = `/detail/stock_info/${param.stockcode}`
    navigate()
  } else if (url.indexOf("/pages/details/fund-info/fund-info") > -1) {
    _url = `/detail/fund_info/${param.fundcode}`
    navigate()
  } else if (url.indexOf("/pages/details/fund-info/fund-info") > -1) {
    _url = `/detail/fund_info/${param.fundcode}`
    navigate()
  } else if (url.indexOf("/pages/details/same-index-fund/same-index-fund") > -1) {
    _url = `/detail/same_index_fund/${param.fundcode}`
    navigate()
  } else {
    // if (_url.indexOf("?") > -1) {
    //   // _url = _url.slice(0,url.indexOf("?"))
    //   page.props.history.push({pathname:_url,  query: param})
    // }
    // else
    if (query) {
      page.props.history.push({pathname: _url, query})
    } else {
      page.props.history.push(_url)
    }

  }
}

function navigateBack(options) {
  var {page} = options
  page.props.history.goBack()
}

function navigateGoTo(options) {
  var {page, num} = options
  page.props.history.go(num)
}

function request(option) {
  return new Promise(((resolve, reject) => {
    let url = option.url
    let body
    if (option.method === 'GET') {
      if (JSON.stringify(option.data) != JSON.stringify({})) {
        url += '?'
        for (let key in option.data) {
          if (option.data[key]) url += key + '=' + option.data[key] + '&'
        }
        if (url) {
          let lastIndex = url.lastIndexOf('&')
          url = url.slice(0, lastIndex)
        }
      }
      body = null
    } else {
      body = JSON.stringify(option.data || {})
    }
    var header = {
      'content-type': 'application/json', // 默认值,
    }
    option.header = option.header || header
    window.fetch(url || '',
      {
        body: body,
        method: option.method || 'GET',
        headers: option.header
      }).then(response => response.text())
      .then(data => {
        try {
          var response = JSON.parse(data)
          resolve(response)
        } catch (e) {
          reject(e)
        }

      }).catch(err => {
      reject(err)
    })
  }))
}

function showModal() {

}

function getStorageSync() {

}

function pageScrollTo(options) {
  var {scrollTop, duration} = options
  document.documentElement.scrollTop = scrollTop;
}

export default {
  showLoading,
  showToast,
  stopPullDownRefresh,
  hideLoading,
  getStorage,
  setStorage,
  getStorageSync,
  clearStorage,
  relaunchTo,
  navigateTo,
  navigateBack,
  navigateGoTo,
  request,
  showModal,
  pageScrollTo
};
