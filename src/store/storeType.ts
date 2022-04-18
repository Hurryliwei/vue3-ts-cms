// 存放store中 会用到的所有的类型或者接口
import { ILoginState } from './login/loginType'
import { ISystemState } from './main/system/systemType'
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
