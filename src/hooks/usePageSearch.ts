import PageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleReset = () => {
    pageContentRef.value?.getPageData()
  }

  const handleSearch = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  // 这里尽量使用对象 然后引用之后用对象结构会好一点 因为函数本身就是一个对象
  // 如果使用数组的话 目前用的版本 Vue和TS都会报错
  return { pageContentRef, handleReset, handleSearch }
}
