export const contentTableConfig = {
  title: '用户列表',
  propList: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '100',
      slotName: 'name'
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
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '180',
      slotName: 'handler'
    }
  ],
  showIndexCol: true
}
