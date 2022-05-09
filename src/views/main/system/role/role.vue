<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleSearch"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :modalTitle="modalTitle"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <template #tree>
        <el-tree
          ref="elTreeRef"
          class="tree"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="handleCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { contentTableConfig } from './config/pageContentConfig'
import { searchFormConfig } from './config/searchConfig'
import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/pageFormConfig'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { getMenuLeafKeys } from '@/util/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    //1. 处理搜索和重置
    const retHook = usePageSearch()
    const pageContentRef = retHook.pageContentRef
    const handleReset = retHook.handleReset
    const handleSearch = retHook.handleSearch

    //2.利用hook传递callback函数来处理form中不同的地方
    const modalTitle = ref('')
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // modal handle
    const newCallback = () => {
      modalTitle.value = '新建' + modalConfig.title
    }
    const editCallback = (item: any) => {
      // 处理标题
      modalTitle.value = '编辑' + modalConfig.title

      // 处理叶子节点
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(newCallback, editCallback)

    // 3.处理树形数据
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    const store = useStore()
    const otherInfo = ref({})
    const menus = computed(() => store.state.entireMenu)

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleReset,
      handleSearch,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      modalConfig,
      modalTitle,
      defaultProps,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="scss">
.tree {
  position: relative;
  width: 80%;
  left: 10%;
}
</style>
