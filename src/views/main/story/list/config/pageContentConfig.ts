export const contentTableConfig = {
  title: '故事列表',
  propList: [
    {
      prop: 'title',
      label: '标题',
      minWidth: '100',
      slotName: 'title'
    },
    {
      prop: 'content',
      label: '内容',
      minWidth: '100',
      slotName: 'content'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    }
  ],
  showIndexCol: true
}
