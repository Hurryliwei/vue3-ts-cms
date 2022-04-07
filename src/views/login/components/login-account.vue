<template>
  <div>
    <el-form
      ref="accoutForm"
      :model="userData"
      :rules="rules"
      label-width="70px"
      class="demo-dynamic"
    >
      <el-form-item prop="name" label="账号">
        <el-input v-model="userData.name" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="userData.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { reactive, ref, defineComponent } from 'vue'
import { rules } from '../config/accountConfig'
import localCache from '@/util/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()

    const userData = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const accoutForm = ref<InstanceType<typeof ElForm>>()

    const toLogin = (isKeepPassword: boolean) => {
      accoutForm.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', userData.name)
            localCache.setCache('password', userData.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 进行登录验证
          store.dispatch('login/accountLoginAction', { ...userData })
        }
      })
    }

    return {
      userData,
      rules,
      accoutForm,
      toLogin
    }
  }
})
</script>
<style lang="scss" scoped></style>
