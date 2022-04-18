<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { IBreadcrumb } from '../type/index'
export default defineComponent({
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.breadcrumb {
  .el-breadcrumb__item {
    font-size: 15px;
    line-height: 45px;
  }
}
</style>
