<template>
  <div class="content">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="pageHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="userList"
      border
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="hanleSelectChange"
    >
      <el-table-column
        type="selection"
        v-if="showIndexCol"
        width="60"
      ></el-table-column>
      <el-table-column
        type="index"
        v-if="showIndexCol"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 遍历循环出每一行的数据 -->
          <template #default="scoped">
            <!-- 给每一列写一个插槽 方便后面修改某一列的数据的时候用 -->
            <slot :name="propItem.slotName" :row="scoped.row">
              {{ scoped.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    title: {
      type: String
    },
    userList: {
      type: Array,
      default: () => []
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<any>,
      default: () => []
    },
    showIndexCol: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, { emit }) {
    const hanleSelectChange = (value: any) => {
      emit('selectChange', value)
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      hanleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="scss">
.el-table .el-table__cell {
  position: static;
}
</style>
<style scoped lang="scss">
.content {
  padding: 20px;
  height: 100%;
  border-top: 20px solid #f5f5f5;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  .el-pagination {
    text-align: center;
  }
}
</style>
