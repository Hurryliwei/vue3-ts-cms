<template>
  <div class="pie-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>

<script setup lang="ts">
import HyEcharts from '@/base-ui/echarts'
import { defineProps, computed } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  title?: string
  xLabel: string[]
  value: any[]
}>()

const options: EChartsOption = computed(() => {
  return {
    title: {
      text: props.title ?? ''
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabel
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.value,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
