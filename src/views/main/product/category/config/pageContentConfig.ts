export const contentTableConfig = {
  title: '商品分类',
  propList: [
    {
      prop: 'name',
      label: '分类名称',
      minWidth: '100',
      slotName: 'name'
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
