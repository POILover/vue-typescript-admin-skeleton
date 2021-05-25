<template>
    <div class="echarts-container">
        <div class="title">平移/拖拽</div>
        <div class="charts-container">
            <el-switch
                style="display: block"
                v-model="isLinear"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="线性"
                inactive-text="对数"
            >
            </el-switch>
            <div class="chart" id="chart"></div>
        </div>
        <div class="explain">
            <span
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus voluptate officiis nesciunt facilis, in id et
                accusamus aliquam fugiat labore consectetur pariatur iste
                possimus temporibus rem quasi dolore quos ipsa.</span
            >
        </div>
    </div>
</template>

<script lang="ts">
// TODO: 加 resize Mixins, 完善EchartOption相关类型校验
import { option } from "./option";
import echarts, { EChartOption } from "echarts";
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({})
export default class extends Vue {
    private isLinear: boolean = true;
    private option: EChartOption = {};
    private data = [
        [2, 4],
        [3, 3],
        [4, 4],
        [5, 2],
    ];
    private origin = [
        [2, 4],
        [3, 3],
        [4, 4],
        [5, 2],
    ];
    @Watch("isLinear")
    private onToggleLinear() {
        this.drawChart();
    }

    mounted() {
        this.drawChart();
    }
    drawChart() {
        this.option = option;
        this.option.xAxis.type = this.isLinear ? "value" : "log";
        this.option.yAxis.type = this.isLinear ? "value" : "log";
        this.chart = echarts.init(
            document.querySelector("#chart") as HTMLDivElement
        );
        this.chart.setOption(this.option);
        this.renderDraggableLine();
    }
    renderDraggableLine() {
        let self = this;
        this.chart.setOption({
            graphic: (echarts as any).util.map(this.data, function(
                item: number[],
                dataIndex: number
            ) {
                return {
                    type: "circle",
                    position: self.chart.convertToPixel("grid", item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 4,
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: (echarts as any).util.curry(
                        self.onPointDragging,
                        dataIndex
                    ),
                    ondragend: (echarts as any).util.curry(
                        self.onMouseUp,
                        dataIndex
                    ),
                    z: 999999,
                };
            }),
            series: [
                {
                    id: "a",
                    data: this.data,
                },
            ],
        });
    }
    onMouseUp(dataIndex: number, e: any) {
        // 拖拽完成,接口处理
    }
    onPointDragging(dataIndex: number, e: any) {
        this.data[dataIndex] = this.chart.convertFromPixel(
            "grid",
            e.target.position
        );
        let distance = [];
        let distance0 = 0;
        let distance1 = 0;
        let dataLen = this.data.length;
        if (this.isLinear) {
            for (let i = 0; i < dataLen; i++) {
                distance0 = this.origin[i][0] - this.origin[dataIndex][0];
                distance1 = this.origin[i][1] - this.origin[dataIndex][1];

                distance.push([distance0, distance1]);
            }
            for (let i = 0; i < dataLen; i++) {
                {
                    this.data[i][1] = this.data[dataIndex][1] + distance[i][1];
                    this.data[i][0] = this.data[dataIndex][0] + distance[i][0];
                }
            }
        } else {
            for (let i = 0; i < dataLen; i++) {
                distance0 = Math.log10(
                    this.origin[i][0] / this.origin[dataIndex][0]
                );
                distance1 = Math.log10(
                    this.origin[i][1] / this.origin[dataIndex][1]
                );

                distance.push([distance0, distance1]);
            }
            for (let i = 0; i < dataLen; i++) {
                {
                    this.data[i][1] =
                        this.data[dataIndex][1] * Math.pow(10, distance[i][1]);
                    this.data[i][0] =
                        this.data[dataIndex][0] * Math.pow(10, distance[i][0]);
                }
            }
        }

        let self = this;
        this.chart.setOption({
            graphic: (echarts as any).util.map(this.data, function(
                item: number[],
                dataIndex: number
            ) {
                return {
                    type: "circle",
                    position: self.chart.convertToPixel("grid", item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 4,
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: (echarts as any).util.curry(
                        self.onPointDragging,
                        dataIndex
                    ),
                    ondragend: (echarts as any).util.curry(
                        self.onMouseUp,
                        dataIndex
                    ),
                    z: 9999999,
                };
            }),
            series: [
                {
                    id: "a",
                    data: this.data,
                },
            ],
        });
    }
}
</script>
