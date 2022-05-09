<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleSearch"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="category"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :modalTitle="modalTitle"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="category"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/searchConfig'
import { contentTableConfig } from './config/pageContentConfig'
import { modalConfig } from './config/pageFormConfig'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 处理搜索的hook
    const retHook = usePageSearch()
    const pageContentRef = retHook.pageContentRef
    const handleReset = retHook.handleReset
    const handleSearch = retHook.handleSearch

    // 处理弹窗的问题
    const modalTitle = ref('')
    // modal handle
    const newCallback = () => {
      modalTitle.value = '新建' + modalConfig.title
    }
    const editCallback = () => {
      // 处理标题
      modalTitle.value = '编辑' + modalConfig.title
    }

    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      pageContentRef,
      handleReset,
      handleSearch,
      modalConfig,
      contentTableConfig,
      modalTitle,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData
    }
  }
})
</script>

<style scoped></style>
