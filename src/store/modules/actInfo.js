import axios from 'axios'
import Url from '../../assets/scripts/interface'
import * as types from '../mutations'


axios.defaults.withCredentials = true
axios.defaults.crossDomain = true



axios.interceptors.request.use((config)=>{
  state.isMum = true
  return config
}, (error)=>{
  state.isMum = false
  return Promise.reject(error)
})

axios.interceptors.response.use((response)=>{
  state.isMum = false
  return response.data
}, (error)=>{
  state.isMum = false
  return Promise.reject(error)
})

const state = {
  actInfo: {
    nowprize_name:'手机',//中奖名字
    is_nowprize:true,//是否中奖
  },//用户信息,不管，这个就只是登录的那个人用户信息
  isMum: false,
  isDialog: false,
  isShowToast:false,//是否显示抽奖类弹窗
  toastType:0,//显示哪个弹窗
  isShowyuyue:false,//是否显示立字据弹窗
  msg: '',
}

const getters = {
  actInfo: state => state.actInfo,
  isMum: state => state.isMum,
  isDialog: state => state.isDialog,
  msg: state => state.msg,
  isShowyuyue:state => state.isShowyuyue,
  isShowToast:state => state.isShowToast,
  toastType:state => state.toastType,
}


const actions = {
  //获取用户信息
  getUserInfo({dispatch,commit, state}, params) {
    axios.get(Url.userInfoUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        // dispatch('setDialog',{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      // dispatch('setDialog',{time: 2000, msg: error});
    })

  },
  //分享 do
  goShare({dispatch,commit, state}, params) {
    axios.get(Url.shareUrl).then((res)=>{
      if(res.status){
        setTimeout(()=>{
          commit('UPDATEUSERINFO', res.data);
        },5000)
      }else {
        dispatch('setDialog',{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      dispatch('setDialog',{time: 2000, msg: error});
    })
  },
  //转盘抽奖 do
  goLotpan({dispatch,commit, state}, params) {
    return axios.post(Url.lotpanUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        dispatch('setDialog',{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      dispatch('setDialog',{time: 2000, msg: error});
    })
  },
  //翻牌抽奖 do
  goLotcard({dispatch,commit, state}, params) {
    return axios.post(Url.lotcardUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        dispatch('setDialog',{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      dispatch('setDialog',{time: 2000, msg: error});
    })
  },
  //分享信息展示 do
  getShareinfo({dispatch,commit, state}, params) {
    axios.post(Url.shareinfoUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        // dispatch('setDialog',{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      // dispatch('setDialog',{time: 2000, msg: error});
    })
  },
  //显示报名弹框
  showBaominToast({dispatch,commit, state}, params){
    commit(types.ISSHOWYUYUE, params);
  },
  //显示抽奖类弹框
  whickToast({dispatch,commit, state}, params){
    commit(types.TOASTS, params);
  },
  //对话框
  setDialog ({dispatch,commit, state}, params) {
    let time = params.time || 1500
    commit(types.ISDIALOG, {isDialog: true, msg: params.msg})
    setTimeout(()=>{
      commit(types.ISDIALOG, {isDialog: false, msg: params.msg})
    }, time)
  },
  //Loading GIF
  setMum ({dispatch,commit}, boolean) {
    commit(types.ISMUM, boolean)
  }
}

const mutations = {
  //更新 actInfo
  [types.UPDATEUSERINFO] (state, playload) {
    state.actInfo = playload
  },
  //显示报名成功弹框
  [types.ISSHOWYUYUE] (state, playload) {
    state.isShowyuyue=playload.isShowyuyue
  },
  //显示弹框 isShowToast:false,type:0
  [types.TOASTS] (state, playload) {
    state.isShowToast=playload.isShowToast
    state.toastType=playload.type
  },
  //提示对话框
  [types.ISDIALOG] (state, playload) {
    state.isDialog = playload.isDialog
    state.msg = playload.msg
  },
  //Loading GIF
  [types.ISMUM] (state, boolean) {
    state.isMum = boolean
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}