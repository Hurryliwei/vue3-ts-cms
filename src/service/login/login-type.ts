export interface IloginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

export interface Account {
  name: string
  password: string
}
