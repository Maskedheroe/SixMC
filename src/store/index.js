import { createLogger, createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: debug ? [createLogger()] : [],
  strict: debug
})
