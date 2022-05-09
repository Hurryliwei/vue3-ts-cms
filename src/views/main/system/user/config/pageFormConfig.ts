import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  title: '用户',
  formItems: [
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
      field: 'password',
      type: 'password',
      label: '密码',
      placehold: '请输入密码',
      isHide: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placehold: '请输入电话'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placehold: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placehold: '请选择角色',
      options: []
    }
  ],
  labelWidth: '100px',

  itemStyle: { padding: '10px 40px' },

  colLayout: { span: 24 }
}
