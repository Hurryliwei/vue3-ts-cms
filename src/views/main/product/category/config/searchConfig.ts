import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placehold: '请输入分类名称'
    }
  ],

  labelWidth: '120px',

  itemStyle: { padding: '10px 40px' },

  colLayout: { xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }
}
