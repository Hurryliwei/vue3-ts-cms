<template>
  <div>
    <hy-table
      :userList="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 头部的插槽 -->
      <template #pageHandler>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick"
          >新增{{ contentTableConfig.title.slice(0, 2) }}</el-button
        >
      </template>

      <!-- 列中的插槽 -->
      <!-- <template #roleId="scoped">
        <span>{{ idMapToRole(scoped.row.roleId) }}</span>
      </template> -->
      <template #createAt="scoped">
        <span>{{ formatUTCString(scoped.row.createAt) }}</span>
      </template>
      <template #updateAt="scoped">
        <span>{{ formatUTCString(scoped.row.updateAt) }}</span>
      </template>
      <template
        #handler="scoped"
        v-if="contentTableConfig.title !== '故事列表'"
      >
        <div>
          <el-button
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scoped.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scoped.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scoped"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scoped.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import hyTable from '@/base-ui/table/index'
import { formatUTCString } from '@/util/date-format'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/userPermission'

export default defineComponent({
  components: {
    hyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 1. 查看当前权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    //  2. 获取当前页的数据 根据不同的pageName 获取
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    const getPageData = (queryInfo: any = {}) => {
      // if (!isQuery) return
      store.dispatch('system/getPageListAciton', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 监听分页 来保证数据及时变化
    watch(pageInfo, () => getPageData(), { immediate: true })

    // 3. 通过计算属性 拿到真实的数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其他的动态插槽的名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    //5. 删除,编辑，新增方法
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    // 监听按钮
    const handleNewClick = () => {
      //
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      //
      emit('editBtnClick', item)
    }
    return {
      getPageData,
      formatUTCString,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
