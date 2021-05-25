import { EChartOption } from "echarts";
export const option: EChartOption = {
    title: {
        textAlign: 'auto',
        text: '曲线平移'
    },
    xAxis: {
        max: 6,
        min: 1,
        type: 'value'
    },
    yAxis: {
        min: 1,
        max: 5,
        type: 'value'
    },
    series: [
        // {
        //     type: 'line',
        //     smooth: true,
        //     data: [[2, 4], [3, 3], [4, 4], [5, 2]],

        // },
        {
            id: 'a',
            name: "ghost",
            type: "line",
            yAxisIndex: 0,
            smooth: true,
            showSymbol: true,
            symbolSize: 8,
            itemStyle: {
                color: "#c23531",
            },
            data: [[2, 4], [3, 3], [4, 4], [5, 2]],
            z: 9999,
        },]
}