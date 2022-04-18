<template>
  <div class="content">
    <el-table :data="userList" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 遍历循环出每一行的数据 -->
          <template #default="scoped">
            <!-- 给每一行写一个插槽 方便后面修改某一列的数据的时候用 -->
            <slot :name="propItem.slotName" :row="scoped.row">
              {{ scoped.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITable } from '../type'

export default defineComponent({
  props: {
    userList: {
      type: Array,
      default: () => []
    },
    propList: {
      type: Array as PropType<ITable[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  height: 100%;
  border-top: 20px solid #f5f5f5;
}
</style>
