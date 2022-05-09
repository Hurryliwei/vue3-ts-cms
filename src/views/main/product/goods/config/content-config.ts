export const contentTableConfig = {
  title: '商品列表',
  propList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '180',
      slotName: 'name'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '100',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '100',
      slotName: 'newPrice'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '100',
      slotName: 'enable'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'imgUrl'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '100',
      slotName: 'address'
    },
    {
      prop: 'saleCount',
      label: '已销售',
      minWidth: '100',
      slotName: 'saleCount'
    },
    {
      label: '操作',
      minWidth: '180',
      slotName: 'handler'
    }
  ],
  showIndexCol: true
}
