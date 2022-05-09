<template>
  <div class="pie-echart">
    <hy-echarts :options="options"></hy-echarts>
  </div>
</template>

<script setup lang="ts">
import HyEcharts from '@/base-ui/echarts'
import { IDataType } from '../types'
import { defineProps, computed } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

const props = defineProps<{
  pieData: IDataType[]
}>()

const options: EChartsOption = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
