<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="modalTitle"
      width="30%"
      center
      destroy-on-close
    >
      <hy-from v-bind="modalConfig" v-model="formData"></hy-from>
      <slot name="tree"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleComfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HyFrom from '@/base-ui/form'
import { useStore } from '@/store/index'
export default defineComponent({
  components: {
    HyFrom
  },
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const store = useStore()
    const handleComfirmClick = () => {
      dialogVisible.value = false
      // 区分是新建还是编辑
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/updatePageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新增
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleComfirmClick
    }
  }
})
</script>

<style scoped></style>
