<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleReset"
      @queryBtnClick="handleSearch"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      pageName="users"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <!-- 原始视频中并未在用户管理里展示角色这个列表 这里如果要展示正常的话 必须要手动转化这个角色id对应的name -->
      <!-- 应该是去遍历vuex中所有的角色的数据 然后遍历渲染 -->
      <template #roleId="scoped">
        {{ idMapToRole(scoped.row.roleId) }}
      </template>
      <template #enable="scoped">
        <el-button
          size="small"
          plain
          :type="scoped.row.enable ? 'success' : 'danger'"
        >
          {{ scoped.row.enable ? '启用' : '停用' }}
        </el-button>
      </template>
    </page-content>
    <page-modal
      :modalTitle="modalTitle"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal/index'
import { modalConfig } from './config/pageFormConfig'

import { searchFormConfig } from './config'
import { contentTableConfig } from './config/pageContentConfig'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: 'user',
  setup() {
    // 处理角色那一列的数据
    const idMapToRole = (id: number) => {
      const roleList = store.state.entireRole
      for (const role of roleList) {
        if (role.id === id) {
          return role.name
        }
      }
    }
    // 这里对search部分的逻辑封装到hook后 返回调用函数的处理
    // 这里就是需要这样去做 用对象进行结构 不然无法实现事件监听的绑定

    // 1.查询和处理重置
    const retHooks = usePageSearch()
    const pageContentRef = retHooks.pageContentRef
    const handleReset = retHooks.handleReset
    const handleSearch = retHooks.handleSearch

    // 这里是对具体user页面操作的处理
    // 这里是针对 新增时和修改时 给hook函数传递不同的回调函数 来促使配置文件中的数据发生变化
    // 这里其实就是 hook封装好了通用逻辑 至于这个页面需要在新增和修改时 有不同的逻辑 那么就将不同逻辑的函数
    // 当做触发时的回调函数传过去 如果确实有值就触发一下 这个函数也仅仅是用来更改配置文件中的一个isHide的值罢了
    // 只是这里为了 让逻辑更严密 将通用的逻辑抽取到hook 将不通用的 user独特的功能抽取到user页面 然后再传递到通用的逻辑中执行罢了

    // 2.处理password 以及form标题
    const modalTitle = ref('')
    // modal handle
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHide = false

      modalTitle.value = '新建' + modalConfig.title
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHide = true

      modalTitle.value = '编辑' + modalConfig.title
    }

    // 3.处理modalconfig中的select的响应式数据
    const store = useStore()
    // 配置信息
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    // 4.将通用的hooks逻辑返回
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(newCallback, editCallback)

    return {
      modalTitle,
      idMapToRole,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleSearch,
      modalConfigRef,
      handleNewData, // 新增按钮
      handleEditData, // 更新按钮
      pageModalRef, // ref
      defaultInfo //默认的数据
    }
  }
})
</script>

<style scoped></style>
