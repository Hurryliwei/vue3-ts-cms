// 存放store中 会用到的所有的类型或者接口
import { ILoginState } from './login/loginType'
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
