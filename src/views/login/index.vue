<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  }
})
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
