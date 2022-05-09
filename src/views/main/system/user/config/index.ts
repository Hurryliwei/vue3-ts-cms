import { IForm } from '@/base-ui/form'
import { ITable } from '@/base-ui/table'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placehold: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placehold: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placehold: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placehold: '请输入电话'
    }
    // {
    //   field: 'sports',
    //   type: 'select',
    //   label: '状态',
    //   placehold: '请选择用户状态',
    //   options: [
    //     {
    //       value: 1,
    //       title: '启用'
    //     },
    //     {
    //       value: 0,
    //       title: '停用'
    //     }
    //   ]
    // },
    // {
    //   field: 'createAt',
    //   type: 'datepicker',
    //   label: '创建时间',
    //   otherOptions: {
    //     'start-placeholder': '开始时间',
    //     'end-placeholder': '结束时间',
    //     type: 'daterange'
    //   }
    // }
  ],

  labelWidth: '120px',

  itemStyle: { padding: '10px 40px' },

  colLayout: { xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }
}
