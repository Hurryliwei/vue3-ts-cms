import hyRequest from '../index'
import { Account, IDataType, IloginResult } from './login-type'

enum LoginAPI {
  accountLoign = '/login',
  loginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: Account) {
  return hyRequest.post<IDataType<IloginResult>>({
    url: LoginAPI.accountLoign,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.loginUserInfo + id
  })
}

export function requestUserMenusById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
