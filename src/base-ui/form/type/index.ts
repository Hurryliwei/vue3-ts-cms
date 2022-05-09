type IFormType = 'input' | 'password' | 'select' | 'datepicker'
type IOptions = {
  title: string
  value: number | string
}
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placehold?: string
  options?: IOptions[]
  otherOptions?: any
  isHide?: boolean
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
}
