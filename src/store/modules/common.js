import {isPC} from '../../utils/isPc'
import {getDataDictionary} from '../../api/system'

const state = {
  tableSelect: [],
  selectedRow: [],
  currentUserInfo: {},
  breadList: [{name: '首页', userId: 0}],
  disabledList: [],
  addSubChipsId: '',
  isRequest: false,
  isMB: !isPC(),
  gameTypeList: [],
  cardObj: {}
}

const mutations = {
  SET_STATE(state, [key, val]) {
    state[key] = val
  }
}

const actions = {
  setState({commit}, [key, val]) {
    commit('SET_STATE', [key, val])
  },
  setTableSelect({commit}, [key, val]) {
    if (val.length) {
      const takeId = val[0].handicap ? 'handicap'.toUpperCase() : 'ID'
      const keyArr = Object.keys(val[0])
      const idKey = keyArr[keyArr.findIndex(item => item.toUpperCase().indexOf(takeId) > -1)]
      const value = val.map(item => item[idKey])
      commit('SET_STATE', [key, value])
    } else {
      commit('SET_STATE', [key, val])
    }
  },
  setGameTypeList({commit}) {
    getDataDictionary().then(res => {
      const gameKey = Object.keys(res.data)
      const arr = gameKey.map(item => ({id: item, name: res.data[item]}))
      commit('SET_STATE', ['gameTypeList', [{id: '', name: '全部'}, ...arr]])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
