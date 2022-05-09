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
import { mapMenusToRoutes, mapMenusToPermission } from '@/util/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,

  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: '',
      permissions: []
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

      console.log('注册动态路由')

      routes.forEach((routeItem) => {
        router.addRoute('main', routeItem)
      })

      // 获取用户的权限
      const permission = mapMenusToPermission(userMenus)
      state.permissions = permission
    }
  },

  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 通过登录 先来获取Token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      dispatch('getInitialDataAction', null, { root: true }) //初始化信息

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
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
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
