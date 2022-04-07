<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" class="img" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#001529"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMeuns" :key="item.id">
        <!-- 二级菜单的判断 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon><milk-tea /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单可以展开的判断 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id"
                @click="handleSubitemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单的判断 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { MenusRaw } from '@/util/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMeuns = computed(() => store.state.login.userMenus)
    const router = useRouter()
    const handleSubitemClick = (item: MenusRaw) => {
      router.push({
        path: item.url
      })
    }
    return {
      userMeuns,
      handleSubitemClick
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    background-color: rgba(12, 33, 53, 0.8);
    span {
      margin-left: 20px;
    }
  }
  .el-menu-item:hover {
    color: white !important;
  }
  .el-menu-item.is-active {
    background-color: rgba(10, 96, 189, 0.5) !important;
    color: white;
  }
  .el-sub-menu__title {
    background-color: #001529;
  }

  .el-meun-vertical:not(.el-meun--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
