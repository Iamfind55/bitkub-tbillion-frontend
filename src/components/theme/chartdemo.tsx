import Highcharts from 'highcharts';
import React from 'react'

export default async function Chartdemo() {
    // Load the dataset
    const data = await fetch(
        'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
    ).then(response => response.json());

    return Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 1
        },
        navigator: { 
        },
        series: [{
            type: 'hollowcandlestick',
            name: 'Hollow Candlestick',
            data: data
        }]
    });
}
