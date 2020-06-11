import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var KbURL = Config.KBURL
var AgentURL = Config.AGENTURL
var RequestURL = Config.REQUEST_URL
export default {
  login(params) {
    let url = RequestURL + 'account/staff/staff_login/'
    return request.post(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },

  repair_list(worker_id, status, page) {
    let url = RequestURL + 'repair/repair/admin_repair_records/'
    var params = {worker_id, status, page}
    // if (worker_id) params.worker_id = worker_id
    // if (page) params.page = page
    // if (status) params.status = status
    return request.get(url, params, null, false).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  repair_info(id) {
    let url = RequestURL + 'repair/repair/admin_repair_retrieve/'
    var params = {id}
    return request.get(url, params, null, false).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  repair_update(id, paras) {
    let url = RequestURL + 'repair/repair/admin_repair_update/'
    var params = {
      "ids": [id],
      "action": "UPDATE",
      "paras": paras
    }
    return request.post(url, params, null, false).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
