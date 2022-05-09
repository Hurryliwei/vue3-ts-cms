<template>
  <div class="goods">
    <page-content :content-table-config="contentTableConfig" pageName="goods">
      <template #imgUrl="scoped">
        <el-image
          style="width: 50px; height: 50px"
          :src="scoped.row.imgUrl"
          :preview-src-list="[scoped.row.imgUrl]"
        ></el-image>
      </template>
      <template #enable="scoped">
        <el-button
          size="small"
          plain
          :type="scoped.row.status ? 'success' : 'danger'"
        >
          {{ scoped.row.status ? '启用' : '停用' }}
        </el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content-config'
export default defineComponent({
  name: 'goods',
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

<style lang="scss"></style>
