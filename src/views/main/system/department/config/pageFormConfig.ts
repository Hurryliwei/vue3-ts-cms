import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  title: '部门',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placehold: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导人',
      placehold: '请输入部门领导人'
    }
  ],
  labelWidth: '100px',

  itemStyle: { padding: '20px 10px' },

  colLayout: { span: 24 }
}
