// 这里是写login具体的方法
import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import { ILoginState } from './loginType'
import { IRootState } from '../storeType'
import localCache from '@/util/cache'
import router from '@/router/index'
import { mapMenusToRoutes } from '@/util/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,

  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: ''
    }
  },

  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((routeItem) => {
        router.addRoute('main', routeItem)
      })
    }
  },

  actions: {
    async accountLoginAction({ commit }, payload: any) {
      // 通过登录 先来获取Token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 拿到token就可以做别的事情了
      // 1.先获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 2.拿到对应的菜单
      const userMenusResult = await requestUserMenusById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 3.跳转main
      router.push('main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
