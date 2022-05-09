import { Module } from 'vuex'
import { IRootState } from '../../storeType'
import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsSaleTop10,
  getGoodsAddressSale
} from '@/service/main/analysis/analysis'

import { IAnalysis } from './types'

const analysisModule: Module<IAnalysis, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      goodsSaleTop10: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list
    },
    changeGoodsAddressSale(state, list) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas.data)

      const goodsCount = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', goodsCount.data)

      const goodsSale = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', goodsSale.data)

      const goodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', goodsFavor.data)

      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10.data)

      const addressSasle = await getGoodsAddressSale()
      commit('changeGoodsAddressSale', addressSasle.data)
    }
  }
}

export default analysisModule
