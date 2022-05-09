<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panel-data="item"></statistical-panel>
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="goodsAddressSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <roseEchart :roseData="categoryGoodsCount"></roseEchart>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏量">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'
import StatisticalPanel from '@/components/statistical-panel'
import HyCard from '@/base-ui/card/index'
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts/index'
export default defineComponent({
  name: 'dashboard',
  components: {
    StatisticalPanel,
    HyCard,
    pieEchart,
    roseEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    // 1.获取头部数据
    const store = useStore()
    store.dispatch('analysis/getAnalysisDataAction')
    const topPanelData = computed(() => store.state.analysis.topPanelDatas)

    // 2.获取中间图形的数据
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const goodsAddressSale = computed(() => {
      return store.state.analysis.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    // 左下
    const categoryGoodsSale = computed(() => {
      const xLabel: string[] = []
      const value: any[] = []

      const categoryGoodsSale = store.state.analysis.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabel.push(item.name)
        value.push(item.goodsCount)
      }

      return { xLabel, value }
    })
    // 右下
    const categoryGoodsFavor = computed(() => {
      const xLabel: string[] = []
      const value: any[] = []

      const categoryGoodsFavor = store.state.analysis.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabel.push(item.name)
        value.push(item.goodsFavor)
      }

      return { xLabel, value }
    })
    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      goodsAddressSale
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  background-color: #f5f5f5;
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
