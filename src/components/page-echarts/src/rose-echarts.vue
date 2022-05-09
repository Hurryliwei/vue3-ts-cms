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
  roseData: IDataType[]
}>()

const options: EChartsOption = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: [40, 140],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 7
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
