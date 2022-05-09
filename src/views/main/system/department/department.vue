<template>
  <div class="department">
    <page-content
      :content-table-config="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalTitle="modalTitle"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/pageContentConfig'
import { modalConfig } from './config/pageFormConfig'
import { usePageModal } from '@/hooks/usePageModal'
export default defineComponent({
  name: 'department',
  components: {
    PageContent,
    PageModal
  },
  setup() {
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
      contentTableConfig,
      modalTitle,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData
    }
  }
})
</script>

<style scoped></style>
