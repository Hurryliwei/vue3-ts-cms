import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  title: '角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placehold: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '介绍',
      placehold: '请输入角色介绍'
    }
  ],
  labelWidth: '80px',

  itemStyle: { padding: '10px 10px' },

  colLayout: { span: 24 }
}
