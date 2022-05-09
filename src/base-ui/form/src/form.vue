<template>
  <div class="hyForm">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              :rules="item.rules"
              v-if="!item.isHide"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placehold"
                  :type="item.type === 'password' ? 'password' : 'text'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placehold"
                  size="default"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="ele in item.options"
                    :key="ele.value"
                    :label="ele.title"
                    :value="ele.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../type/index'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 1.用双向绑定来处理这个问题 在传值的时候 要改变属性的值 而不时改变整体对象的值
    // 用父组件传值的时候 进行处理

    // 2.第二个办法 手写一个双向绑定 用原生的modal-value 绑定modelvalue 然后写一个监听更新函数 然后触发emit 传递给父组件 来控制数据的变化
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newVal) => {
        emit('update:modelValue', newVal)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="scss">
.hyForm {
  padding-top: 22px;
  .form-item {
    padding: 5px 20px;
  }
}
</style>
