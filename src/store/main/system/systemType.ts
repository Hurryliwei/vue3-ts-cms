export interface ISystemState {
  userList: any[]
  userCount: number
}
export interface IqueryInfo {
  offset: number
  size: number
}
export interface IPageListConfig {
  pageUrl: string
  queryInfo: IqueryInfo
}
