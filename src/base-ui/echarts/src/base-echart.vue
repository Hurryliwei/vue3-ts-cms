<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ height: height, width: width }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, withDefaults, defineProps, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
