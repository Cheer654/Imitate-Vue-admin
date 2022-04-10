import * as echarts from 'echarts'

const option1Color = ['#5470C6', '#EE6666']
const option1Data = [
  [
    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
  ],
  [
    3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
  ]
]
const option1xAxis = [
  ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
  ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
]
export const option1 = {
  color: option1Color,
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: option1xAxis[0],
      axisLine: {
        lineStyle: {
          color: option1Color[0]
        }
      },
      axisPointer: {
        label: {
          formatter: params => {
            return params?.seriesData?.length
              ? `Precipitation ${params.value}: ${params.seriesData[0].value}`
              : ''
          },
          backgroundColor: option1Color[0]
        }
      }
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: option1xAxis[1],
      axisLine: {
        lineStyle: {
          color: option1Color[1]
        }
      },
      axisPointer: {
        label: {
          formatter: params => {
            return params?.seriesData?.length
              ? `Precipitation ${params.value}: ${params.seriesData[0].value}`
              : ''
          },
          backgroundColor: option1Color[1]
        }
      }
    }
  ],
  yAxis: {},
  series: [
    {
      name: 'Precipitation(2015)',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: option1Data[0]
    },
    {
      name: 'Precipitation(2016)',
      type: 'line',
      smooth: true,
      xAxisIndex: 1,
      emphasis: {
        focus: 'series'
      },
      data: option1Data[1]
    }
  ]
}

export const option2 = {
  title: {
    id: 2,
    text: '某楼盘销售情况',
    subtext: '纯属虚构'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack']
      },
      saveAsImage: {}
    }
  },
  legend: {
    data: ['意向', '预购', '成交']
  },
  xAxis: [
    {
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: {},
  series: [
    {
      name: '成交',
      type: 'line',
      smooth: true,
      data: [10, 12, 21, 54, 260, 830, 710]
    },
    {
      name: '预购',
      type: 'line',
      smooth: true,
      data: [30, 182, 434, 791, 390, 30, 10]
    },
    {
      name: '意向',
      type: 'line',
      smooth: true,
      data: [1320, 1132, 601, 234, 120, 90, 20]
    }
  ]
}

let base = +new Date(2016, 9, 3)
const oneDay = 24 * 3600 * 1000
let valueBase = Math.random() * 300
let valueBase2 = Math.random() * 50
const data = []
const data2 = []
for(let i = 1; i < 10; i++) {
  const now = new Date((base += oneDay))
  const dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
  valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase)
  valueBase <= 0 && (valueBase = Math.random() * 300)
  data.push([dayStr, valueBase])
  valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2)
  valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
  data2.push([dayStr, valueBase2])
}
export const option3 = {
  title: {
    text: 'Tootip and dataZoom on Mobile Device',
    left: 'center'
  },
  toolbox: {
    left: 'center',
    top: 55,
    itemSize: 25,
    feature: {
      dataZoom: {
        yAxisIndex: false
      }
    }
  },
  tooltip: {
    triggerOn: 'none',
    position: (pos) => {
      return [pos[0] + 10, pos[1]]
    }
  },
  grid: {
    top: 100
  },
  xAxis: {
    type: 'time',
    axisPointer: {
      handle: {
        show: true,
        color: '#7581BD'
      },
      value: '2016-10-07',
      snap: true,
      label: {
        formatter: (params) => echarts.time.format(params.value, '{yyyy}-{MM}-{dd}'),
        backgroundColor: '#7581BD'
      },
      lineStyle: {
        color: '#7581BD',
        width: 2
      }
    }
  },
  yAxis: {},
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      data: data,
      stack: 'a',
      symbol: 'circle',
      areaStyle: {
        color: {
          type: 'liner',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(58,77,233,0.8)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(58,77,233,0.3)' // 100% 处的颜色
          }]
        }
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgba(58,77,233,0.8)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgba(58,77,233,0.3)'
        //   }
        // ])
      }
    },
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      data: data2,
      stack: 'a',
      symbol: 'circle',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(213,72,120,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(213,72,120,0.3)'
          }
        ])
      }
    }
  ]
}

const dataAll = [
  [
    [10.0, 8.04],
    [8.0, 6.95],
    [13.0, 7.58],
    [9.0, 8.81],
    [11.0, 8.33],
    [14.0, 9.96],
    [6.0, 7.24],
    [4.0, 4.26],
    [12.0, 10.84],
    [7.0, 4.82],
    [5.0, 5.68]
  ],
  [
    [10.0, 9.14],
    [8.0, 8.14],
    [13.0, 8.74],
    [9.0, 8.77],
    [11.0, 9.26],
    [14.0, 8.1],
    [6.0, 6.13],
    [4.0, 3.1],
    [12.0, 9.13],
    [7.0, 7.26],
    [5.0, 4.74]
  ],
  [
    [10.0, 7.46],
    [8.0, 6.77],
    [13.0, 12.74],
    [9.0, 7.11],
    [11.0, 7.81],
    [14.0, 8.84],
    [6.0, 6.08],
    [4.0, 5.39],
    [12.0, 8.15],
    [7.0, 6.42],
    [5.0, 5.73]
  ],
  [
    [8.0, 6.58],
    [8.0, 5.76],
    [8.0, 7.71],
    [8.0, 8.84],
    [8.0, 8.47],
    [8.0, 7.04],
    [8.0, 5.25],
    [19.0, 12.5],
    [8.0, 5.56],
    [8.0, 7.91],
    [8.0, 6.89]
  ]
]
const markLine = {
  data: [
    [
      {
        coord: [0, 3],
        symbol: 'none'
      },
      {
        coord: [20, 13],
        symbol: 'none'
      }
    ]
  ],
  lineStyle: {
    type: 'solid'
  },
  tooltip: {
    formatter: 'y = 0.5 * x + 3'
  },
  label: {
    align: 'right',
    formatter: 'y = 0.5 * x + 3'
  }
}
export const option4 = {
  title: {
    text: 'Anscombe\'s quartet',
    left: 'center'
  },
  tooltip: {
    formatter: 'Group {a}: {c}'
  },
  grid: [
    { left: '7%', top: '8%', width: '38%', height: '38%' },
    { right: '7%', top: '8%', width: '38%', height: '38%' },
    { left: '7%', bottom: '7%', width: '38%', height: '38%' },
    { right: '7%', bottom: '7%', width: '38%', height: '38%' }
  ],
  xAxis: [
    { gridIndex: 0, min: 0, max: 20 },
    { gridIndex: 1, min: 0, max: 20 },
    { gridIndex: 2, min: 0, max: 20 },
    { gridIndex: 3, min: 0, max: 20 }
  ],
  yAxis: [
    { gridIndex: 0, min: 0, max: 15 },
    { gridIndex: 1, min: 0, max: 15 },
    { gridIndex: 2, min: 0, max: 15 },
    { gridIndex: 3, min: 0, max: 15 }
  ],
  series: [
    {
      name: 'I',
      type: 'scatter',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: dataAll[0],
      markLine
    },
    {
      name: 'II',
      type: 'scatter',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: dataAll[1],
      markLine
    },
    {
      name: 'III',
      type: 'scatter',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: dataAll[2],
      markLine
    },
    {
      name: 'IV',
      type: 'scatter',
      xAxisIndex: 3,
      yAxisIndex: 3,
      data: dataAll[3],
      markLine
    }
  ]
}

export const option5 = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  legend: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'a',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'a',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'a',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'a',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'a',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
}

function option6GenData(count) {
  // prettier-ignore
  const nameList = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
  ]
  const legendData = []
  const seriesData = []
  for(var i = 0; i < count; i++) {
    var name =
      Math.random() > 0.65
        ? makeWord(4, 1) + '·' + makeWord(3, 0)
        : makeWord(2, 1)
    legendData.push(name)
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000)
    })
  }
  return {
    legendData: legendData,
    seriesData: seriesData
  }
  function makeWord(max, min) {
    const nameLen = Math.ceil(Math.random() * max + min)
    const name = []
    for(var i = 0; i < nameLen; i++) {
      name.push(nameList[Math.round(Math.random() * nameList.length - 1)])
    }
    return name.join('')
  }
}
const option6Data = option6GenData(50)
export const option6 = {
  title: {
    text: '同名数量统计',
    subtext: '纯属虚构'
  },
  tooltip: {
    formatter: params => {
      return `${params.seriesName}<br/>${params.name}: ${params.value}(${params.percent}%)`
    }
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: '3%'
  },
  series: [
    {
      name: '姓名',
      type: 'pie',
      // radius: '50%',
      data: option6Data.seriesData
    }
  ]
}

export const option7 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    data: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ]
  },
  yAxis: [
    {
      name: '降水量',
      min: 0,
      max: 250,
      position: 'right',
      axisLabel: {
        formatter: params => {
          return `${params}ml`
        }
      }
    },
    {
      position: 'left',
      name: '温度',
      min: 0,
      max: 25,
      axisLabel: {
        formatter: params => {
          return `${params} C`
        }
      }
    }
  ],
  series: [
    {
      name: '降水量',
      type: 'bar',
      yAxisIndex: 0,
      data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
    },
    {
      name: '温度',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [
        6.0,
        10.2,
        10.3,
        11.5,
        10.3,
        13.2,
        14.3,
        16.4,
        18.0,
        16.5,
        12.0,
        5.2
      ]
    }
  ]
}
