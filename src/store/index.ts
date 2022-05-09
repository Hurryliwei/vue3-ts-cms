import { createStore, Store, useStore as useStoreX } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/analysis'
import { IRootState, IStoreType } from './storeType'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'liwei',
      age: 18,
      entireDepartment: [], //全局用到的部门
      entireRole: [], // 全局用到的角色
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //1.请求部门 角色 以及 角色权限菜单
      const departmentList = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })

      const roleList = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })

      const menuList = await getPageListData('/menu/list', {})
      // 2.保存角色和部门 角色权限菜单
      commit('changeEntireDepartment', departmentList.data.list)
      commit('changeEntireRole', roleList.data.list)
      commit('changeEntireMenu', menuList.data.list)
    }
  },
  modules: {
    login,
    system,
    analysis
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useStoreX()
}

export default store
