<template>
  <div class="menu">
    <page-content :content-table-config="contentTableConfig" pageName="menu">
      <template #type="scoped">
        <span v-if="scoped.row.type == 1">一级菜单</span>
        <span v-if="scoped.row.type == 2">二级菜单</span>
        <span v-if="scoped.row.type == 3">三级菜单</span>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content/index'
import { contentTableConfig } from './config/pageContentConfig'
export default defineComponent({
  name: 'menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
