<template>
  <div>
    <div ref="container" class="echarts-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

import optionPromise from './optionsPromise.js'

const container = ref(null)
onMounted(() => {
  optionPromise.then(function({ data }) {
    const option = {
      title: {
        text: 'Beijing AQI',
        left: '1%'
      },
      toolbox: {
        right: '1%',
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        left: '5%',
        right: '15%'
      },
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          startValue: '2014-06-01'
        }
      ],
      xAxis: {
        data: data.map(item => {
          return item[0]
        })
      },
      yAxis: {
        axisLabel: {
          inside: true
        }
      },
      visualMap: [
        {
          type: 'piecewise',
          right: '1%',
          top: '10%',
          outOfRange: {
            color: '#999999'
          },
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: '#93CE07'
            },
            {
              gt: 50,
              lte: 100,
              color: '#FBDB0F'
            },
            {
              gt: 100,
              lte: 150,
              color: '#FC7D02'
            },
            {
              gt: 150,
              lte: 200,
              color: '#FD0100'
            },
            {
              gt: 200,
              lte: 300,
              color: '#AA069F'
            },
            {
              gt: 300,
              color: '#AC3B2A'
            }
          ]
        }
      ],
      series: [
        {
          name: 'Beijing AQI',
          type: 'line',
          zlevel: 0,
          // symbol: 'none',
          data: data.map(item => {
            return item[1]
          }),
          markLine: {
            silent: true,
            lineStyle: { color: '#333333' },
            data: [
              { yAxis: 50 },
              { yAxis: 100 },
              { yAxis: 150 },
              { yAxis: 200 },
              { yAxis: 300 }
            ]
          }
        }
      ]
    }
    const echartsInstance = echarts.init(container.value, null, {
      width: 'auto',
      height: 'auto'
    })
    echartsInstance.setOption(option)
  })
})
onBeforeUnmount(() => {
  echarts.dispose(container.value)
})
</script>

<style lang="less" scoped>
.echarts-container {
  width: 800px;
  height: 400px;
}
</style>
