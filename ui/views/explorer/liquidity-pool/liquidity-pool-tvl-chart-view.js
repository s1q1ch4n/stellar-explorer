import React from 'react'
import {usePoolHistory} from '../../../business-logic/api/lp-api'
import Chart from '../../components/chart-view'

export default function LiquidityPoolTvlChartView({id}) {
    const poolHistory = usePoolHistory(id)
    if (!poolHistory.loaded) return <div className="loader"/>
    if (poolHistory.error || !poolHistory.data.length) return null

    const tvl = [],
        participants = []
    for (let entry of poolHistory.data) {
        tvl.push([entry.ts * 1000, Math.round(entry.total_value_locked / 10000000)])
        participants.push([entry.ts * 1000, Math.round(entry.accounts)])
    }

    const config = {
        yAxis: [{
            title: {
                text: 'Locked Liquidity'
            }
        }, {
            title: {
                text: 'Pool Participants'
            },
            opposite: true
        }],
        series: [
            {
                type: 'line',
                name: 'Liquidity',
                data: tvl,
                tooltip: {
                    valueSuffix: ' USD'
                }
            },
            {
                type: 'line',
                name: 'Participants',
                yAxis: 1,
                data: participants
            }]
    }

    return <Chart options={config} grouped range noLegend title="Locked Liquidity"/>
}