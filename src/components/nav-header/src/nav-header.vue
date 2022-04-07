<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" v-show="isFold"
      ><collection-tag
    /></el-icon>
    <el-icon @click="handleFoldClick" v-show="!isFold"><expand /></el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 子组件向父组件传递值
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-header {
  el-icon {
    font-size: 30px;
  }
}
</style>
