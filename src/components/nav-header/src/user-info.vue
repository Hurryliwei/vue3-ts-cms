<template>
  <div class="userinfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0121%2Fe85600a7j00qnaf5x0083d200u000u0g00980098.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651892451&t=54341a0b2fa4a99e96c3566c98935eea"
        />
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><el-icon><info-filled /></el-icon>用户信息</el-dropdown-item
          >
          <el-dropdown-item divided
            ><el-icon><close-bold /></el-icon>退出登录</el-dropdown-item
          >
          <el-dropdown-item
            ><el-icon><tools /></el-icon>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    return {
      name
    }
  }
})
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
    margin-top: 5px;
  }
}
</style>
