<template>
  <div class="page-search">
    <hy-from v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary" @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </template>
    </hy-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyFrom from '@/base-ui/form'
export default defineComponent({
  components: {
    HyFrom
  },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
        /* formData.value[`${key}`] = formOriginData[key] **/
      }
      emit('resetBtnClick')
    }

    const handleSearch = () => {
      console.log('点击了搜索')
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleSearch
    }
  }
})
</script>

<style scoped>
.handle-btn {
  text-align: right;
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
