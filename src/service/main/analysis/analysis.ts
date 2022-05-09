import hyRequest from '../../index'

enum AnalysisAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  goodsSaleTop10 = '/goods/sale/top10',
  goodsAddressSale = '/goods/address/sale'
}
interface dataList {
  amount: string
  number1: number
  number2: number
  subtitle: string
  tips: string
  title: string
}
interface IDashboardResult {
  code: number
  data: dataList[]
}
export function getAmountList() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.amountList
  })
}

export function getCategoryGoodsCount() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.categoryGoodsFavor
  })
}

export function getGoodsSaleTop10() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.goodsSaleTop10
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get<IDashboardResult>({
    url: AnalysisAPI.goodsAddressSale
  })
}
