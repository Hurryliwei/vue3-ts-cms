<template>
  <div class="page-search">
    <hy-from v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary">重置</el-button>
          <el-button type="primary">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      sport: '',
      password: '',
      createTime: ''
    })
    return {
      formData
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
