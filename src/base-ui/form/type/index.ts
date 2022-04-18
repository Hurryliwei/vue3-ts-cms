type IFormType = 'input' | 'password' | 'select' | 'datepicker'
type IOptions = {
  title: string
  value: string
}
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placehold?: string
  options?: IOptions[]
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
}
