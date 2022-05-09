export const contentTableConfig = {
  title: '菜单管理',
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100',
      slotName: 'name'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '100',
      slotName: 'type'
    },
    {
      prop: 'url',
      label: '路由地址',
      minWidth: '100',
      slotName: 'url'
    },
    {
      prop: 'icon',
      label: '菜单图表',
      minWidth: '100',
      slotName: 'icon'
    },
    {
      prop: 'permission',
      label: '权限',
      minWidth: '100',
      slotName: 'permission'
    },
    {
      label: '操作',
      minWidth: '180',
      slotName: 'handler'
    }
  ],
  showIndexCol: true,
  childrenProps: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  },
  showFooter: false
}
