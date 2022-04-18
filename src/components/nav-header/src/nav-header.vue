<template>
  <div class="nav-header">
    <div class="icon">
      <el-icon @click="handleFoldClick"><expand /></el-icon>
    </div>
    <div class="content">
      <hy-bread-crumb :breadcrumb="breadcrumb"></hy-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import hyBreadCrumb from '@/base-ui/breadcrumb'
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumb } from '@/util/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    userInfo,
    hyBreadCrumb
  },
  emits: ['foldChange'],

  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()
    const route = useRoute()

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 子组件向父组件传递值
      emit('foldChange', isFold.value)
    }

    const breadcrumb = computed(() => {
      const userMeuns = store.state.login.userMenus

      const currentPath = route.path

      return pathMapBreadcrumb(userMeuns, currentPath)
    })

    return {
      isFold,
      breadcrumb,
      handleFoldClick
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .icon {
    font-size: 25px;
    line-height: 50px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
