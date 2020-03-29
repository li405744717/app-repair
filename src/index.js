import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './Store'
import config from '@/common/config'
import wx from '@/common/wx'

import App from './app'
import Home from '@/pages/home/c'
import RepairList from '@/pages/repair/list/c'
import RepairInfo from '@/pages/repair/info/c'
import Login from '@/pages/user/login/view'


import {SET_USER} from "./pages/user/login/actionTypes";


var param = {};
window.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);

function checkToken() {
  const state = store.getState()
  if (state.user.token) {
    return true
  } else {
    return false
  }
}

let DefaultAgentId = config.env === 'devkb' ? 'ddtest' : null
let AGENT_ID = param.fcCode || DefaultAgentId

let localUserInfo = wx.getStorage(config.env + '_userInfo')
console.log('localUserInfo', localUserInfo)
if (AGENT_ID) {

} else if (localUserInfo && localUserInfo.token) {
  console.log('no agent_id,get local userInfo')
  store.dispatch({type: SET_USER, id: localUserInfo.id, token: localUserInfo.token})
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='repair'>
      <Switch>
        <Route exact path="/login" component={Login}/>

        <Route path='/' render={props =>
          !checkToken() ?
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}/>
            :
            <App>
              <Switch className="flex_column flex_1">
                <Route exact path="/repair" component={RepairList}/>
                <Route exact path="/repair/info/:id" component={RepairInfo}/>
              </Switch>
            </App>}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
