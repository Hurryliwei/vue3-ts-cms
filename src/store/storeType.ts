// 存放store中 会用到的所有的类型或者接口
import { ILoginState } from './login/loginType'
import { IAnalysis } from './main/analysis/types'
import { ISystemState } from './main/system/systemType'
export interface IRootState {
  name: string
  age: number
  entireDepartment: departmentAndRole[]
  entireRole: departmentAndRole[]
  entireMenu: any[]
}
// module的接口类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysis
}
// 部门和角色返回的信息接口
export interface departmentAndRole {
  createAt: string
  id: number
  leader: string
  name: string
  parentId: number
}
export type IStoreType = IRootState & IRootWithModule
