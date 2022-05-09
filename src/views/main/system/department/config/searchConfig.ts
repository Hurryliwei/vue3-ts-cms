import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色',
      placehold: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '介绍',
      placehold: '请输入介绍'
    }
    // 时间为空会出错
    // {
    //   field: 'createTime',
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
