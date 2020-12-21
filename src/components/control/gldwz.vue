<template>
    <div class="gldtj" id="gld">
        <div id='gldtitop'>
            <div class="leftdiv">隔离点物资总览</div>
            <div class="rightdiv">
                <select @change="bqSelect($event)">
                    <option value="0">区域筛选</option>
                    <option value="1">五马街道</option>
                    <option value="2">蒲鞋市街道</option>
                    <option value="3">广化街道</option>
                    <option value="4">滨江街道</option>
                    <option value="5">大南街道</option>
                    <option value="6">南汇街道</option>
                    <option value="7">松台街道</option>
                    <option value="8">南郊街道</option>
                    <option value="9">双屿街道</option>
                </select>
                <select @change="qySelect($event)">
                    <option value="0">已启用</option>
                    <option value="1">未启用</option>
                </select>
            </div>
        </div>
        <div class="ntn">
            {{$window.nCov_luchengData.control.gld.horseNum}}家/{{$window.nCov_luchengData.control.gld.roomNum}}间
        </div>
        <div id="gldChart"></div>
        <div class="tagld">
            <div class="control-view-inner" @scroll="scrollHandler">
                <table class="control-view-table-header" cellspacing="5" :style="{top: top + 'px'}">
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>房间数</th>
                        <th>使用人数</th>
                        <th>其中湖北回鹿人数</th>
                        <th>空余房间</th>
                    </tr>
                    </thead>
                </table>
                <table class="control-view-table-body" cellspacing="5">
                    <tbody>
                    <tr v-for="(value, index) of $window.nCov_luchengData.control.gld.gldtable" :key="index">
                        <td>{{ value.key }}</td>
                        <td v-for="(item, ind) of value.value" :key="ind">{{ item }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    let colorList = ['rgb(94,116,255)', 'rgb(31,255,237)'];
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/title');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/grid');
    require('echarts/lib/chart/pie');
    export default {
        name: "gldwz",
        methods: {
            bqSelect: function (event) {
                const that = this;
                // `this` 在方法里指向当前 Vue 实例
                //console.log(event.target.value);
                // eslint-disable-next-line no-console
                if (event.target.value == "0") {
                    console.log(1)
                }
            },
            draw() {
                let myChart = echarts.init(document.getElementById('gldChart'));
                myChart.setOption({
                    title: {
                        text: '鹿城隔离点房间数量',
                        textStyle: {
                            color: '#FFF',
                            fontSize: 15,
                        },
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    grid: {
                        left: 15,
                        right: 40,
                        top: 40,
                        bottom: 10,
                        containLabel: true
                    },
                    legend: {
                        top: '10%',
                        left: 0,
                        orient: 'horizontal',
                        textStyle: {
                            color: '#fff',
                            fontSize: 10,
                        },
                        itemWidth: 20,
                        itemHeight: 10,
                        padding: 5,
                        itemGap: 10,
                        icon: 'rect',
                    },
                    series: [
                        // 主要展示层的
                        {
                            radius: ['29%', '49%'],
                            center: ['45%', '55%'],
                            type: 'pie',
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 10,
                                    length2: 10,
                                    lineStyle: {
                                        color: '#d3d3d3'
                                    },
                                    align: 'right'
                                },
                                color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        var str = '';
                                        switch (params.name) {
                                            case '剩余房间':
                                                str = params.value;
                                                break;
                                            case '已使用人数':
                                                str = params.value;
                                                break;
                                        }
                                        return str
                                    },
                                    height: 35,
                                }
                            },
                            data: [
                                {value: 760, name: '剩余房间'},
                                {value: 421, name: '已使用人数'},
                            ]
                        },
                    ]
                })
            }
        },
        mounted() {
            this.draw();
        },
    }
</script>

<style scoped>
    .gldtj {
        width: 100%;
        height: 100%;
    }

    #gld #gldtitop {
        height: 30px;
        color: #23c9f3;
        margin-top: 10px;
    }

    .ntn {
        position: absolute;
        top: 40%;
        right: 470px;
        color: #FFF;
        font-size: 16px
    }

    .leftdiv {
        display: inline;
        float: left;
        text-align: left;
        font-size: 20px;
        font-weight: bolder;
        color: #07e2e8;
        margin-bottom: 10px;
    }

    .leftdiv::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 5px;
        height: 15px;
        background: #07e2e8;
        margin-right: 10px;
    }

    .rightdiv {
        display: inline;
        float: right;
        margin-right: 15px;
    }

    #gld #gldtitop select {
        background-color: #0c7cd2;
        border: none;
        color: #fff;
        padding: 7px 7px;
        margin-left: 5px;
    }

    .tagld {
        position: absolute;
        top: 10%;
        right: 24px;
        width: 370px;
        height: 44%;
    }

    #gld #gldChart {
        width: 35%;
        height: 85%;
    }

    .control-view-inner {
        width: 100%;
        height: 85%;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        padding-top: 67px;
    }

    .control-view-table-header {
        table-layout: fixed;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 25px;
        background: rgba(5, 26, 79);
    }

    .control-view-table-header th {
        padding: 0;
        font-size: 14px;
        background-color: #1b45a7;
        border: 1px solid #07e2e8;
        height: 25px;
    }

    .control-view-table-body {
        width: 100%;
        height: 100%;
        table-layout: fixed;
    }

    .control-view-table-body tbody tr:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 1px #fff inset;
    }

    .control-view-table-body td {
        padding: 5px 0;
        font-size: 16px;
    }

    .control-view-table-body td:nth-child(1) {
        background-color: #081942;
        border: 1px solid #07e2e8;
    }

    .control-view-inner::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    .control-view-inner::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #07e2e8;
    }

    .control-view-inner::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #081942;
    }

</style>