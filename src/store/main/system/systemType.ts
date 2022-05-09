export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
  departmentList: any[]
  departmentCount: number
  categoryList: any[]
  categoryCount: number
  storyList: any[]
  storyCount: number
}
export interface IqueryInfo {
  offset: number
  size: number
}
export interface IPageListConfig {
  pageName: string
  pageUrl: string
  queryInfo: IqueryInfo
}
