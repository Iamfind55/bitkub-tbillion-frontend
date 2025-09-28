"use client"
import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: 'I love This chart'
  }, 
  series: [{
    data: [1, 2,15, 3, 4,3,2,3,4,6,4,3,3,2,3,4,8,5,3,2,3]
  }]
}

const MyStockChart = () => 
<HighchartsReact
  highcharts={Highcharts}
  constructorType={'stockChart'}
  options={options}
/>

export default MyStockChart