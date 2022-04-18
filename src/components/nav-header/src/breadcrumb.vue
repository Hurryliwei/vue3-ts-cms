<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: parentPath }">{{
        parentMenu
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: sonPath }">{{
        sonMenu
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MenusRaw } from '@/util/map-menus'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const parentMenu = ref('首页')
    const parentPath = ref('')
    const sonMenu = ref('预览')
    const sonPath = ref('')

    watch(
      () => router.currentRoute.value,
      (newValue, oldValue) => {
        const firstName = newValue.name
        const fullPath = newValue.fullPath.toString()
        const firstPath = fullPath.replace('/' + (firstName as string), '')
        const userMenus = store.state.login.userMenus

        userMenus.forEach((route: MenusRaw) => {
          if (route.url === firstPath) {
            parentMenu.value = route.name
            parentPath.value = route.url
            route.children.forEach((sonRoute: MenusRaw) => {
              if (sonRoute.url === fullPath) {
                sonMenu.value = sonRoute.name
                sonPath.value = sonRoute.url
              } else {
                return
              }
            })
          } else {
            return
          }
        })
      }
    )

    return {
      parentMenu,
      sonMenu,
      parentPath,
      sonPath
    }
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
