import { createStore, Store, useStore as useStoreX } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import { IRootState, IStoreType } from './storeType'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'liwei',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useStoreX()
}

export default store
