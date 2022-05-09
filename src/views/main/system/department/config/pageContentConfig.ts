export const contentTableConfig = {
  title: '部门列表',
  propList: [
    {
      prop: 'name',
      label: '部门名称',
      minWidth: '100',
      slotName: 'name'
    },
    {
      prop: 'leader',
      label: '部门领导',
      minWidth: '100',
      slotName: 'leader'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
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
