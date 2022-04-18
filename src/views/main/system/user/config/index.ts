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
      field: 'password',
      type: 'password',
      label: '密码',
      placehold: '请输入密码'
    },
    {
      field: 'sports',
      type: 'select',
      label: '爱好',
      placehold: '请选择喜欢的运动',
      options: [
        {
          value: 'Option1',
          title: 'Option1'
        },
        {
          value: 'Option2',
          title: 'Option2'
        }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ],

  labelWidth: '120px',

  itemStyle: { padding: '10px 40px' },

  colLayout: { xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }
}

export const userPropConfig: ITable[] = [
  {
    prop: 'name',
    label: '用户名',
    minWidth: '100',
    slotName: 'name'
  },
  {
    prop: 'id',
    label: 'id',
    minWidth: '100',
    slotName: 'id'
  },
  {
    prop: 'realname',
    label: '真实姓名',
    minWidth: '100',
    slotName: 'realname'
  },
  {
    prop: 'cellphone',
    label: '电话',
    minWidth: '100',
    slotName: 'cellphone'
  },
  {
    prop: 'enable',
    label: '状态',
    minWidth: '100',
    slotName: 'enable'
  },
  {
    prop: 'roleId',
    label: '所属角色',
    minWidth: '100',
    slotName: 'roleId'
  }
]
