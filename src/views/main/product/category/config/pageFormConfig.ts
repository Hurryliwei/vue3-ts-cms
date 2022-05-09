import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  title: '分类',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placehold: '请输入分类名称'
    }
  ],
  labelWidth: '100px',

  itemStyle: { padding: '20px 10px' },

  colLayout: { span: 24 }
}
