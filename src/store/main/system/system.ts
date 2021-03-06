import { Module } from 'vuex'

import { IRootState } from '@/store/storeType'

import { IPageListConfig, ISystemState } from './systemType'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyList: [],
      storyCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeStoryList(state, storyList: any[]) {
      state.storyList = storyList
    },
    changeStoryCount(state, storyCount: number) {
      state.storyCount = storyCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAciton({ commit }, payload: IPageListConfig) {
      // 1.??????url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.????????????
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageName)

      // 3.???????????????
      let { list, totalCount } = pageResult.data
      if (!totalCount) {
        totalCount = list.length
      }
      if (!list) {
        list = []
      }
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // ?????????????????????
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      // ??????????????????
      await deletePageData(url)
      //  ??????????????????
      dispatch('getPageListAciton', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      // ??????????????????
      await createPageData(url, newData)
      //  ??????????????????
      dispatch('getPageListAciton', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async updatePageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const url = `/${pageName}/${id}`
      await editPageData(url, editData)
      // ???????????????
      dispatch('getPageListAciton', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
