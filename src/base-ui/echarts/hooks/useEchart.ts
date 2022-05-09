import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    updateSize,
    setOptions
  }
}
