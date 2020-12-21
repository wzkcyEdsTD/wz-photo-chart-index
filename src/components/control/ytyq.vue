<template>
    <div class="yqtj" id="yt">
        <div id='titop'>
            <div class="leftdiv">银泰疫情专题统计分析</div>
            <div class="rightdiv">
                <select @change="bqSelect($event)">
                    <option value="0">确诊病例</option>
                    <option value="1">疑似病例</option>
                    <option value="2">银泰员工</option>
                    <option value="3">密切接触者</option>
                </select>
            </div>
        </div>
        <div id="ytyqChart"></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/grid');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/polar');
    export default {
        name: "mqyqtj",
        data() {
            return {
                labelname: [],
                numdata: [],
            }
        },
        methods: {
            bqSelect: function (event) {
                const that = this;
                // `this` 在方法里指向当前 Vue 实例
                //console.log(event.target.value);
                // eslint-disable-next-line no-console
                console.log(event.target.value)
                if (event.target.value == "0") {
                    this.labelname = window.nCov_luchengData.control.yt.list1;
                    that.numdata = window.nCov_luchengData.control.yt.datalist1;
                    this.draw();
                }
                if (event.target.value == "1") {
                    this.labelname = window.nCov_luchengData.control.yt.list2;
                    that.numdata = window.nCov_luchengData.macroscopic.lc_yt.zzbl;
                    this.draw();
                }
                if (event.target.value == "2") {
                    this.labelname = window.nCov_luchengData.control.yt.list3;
                    that.numdata = window.nCov_luchengData.macroscopic.lc_yt.ytyg;
                    this.draw();
                }
                if (event.target.value == "3") {
                    this.labelname = window.nCov_luchengData.control.yt.list4;
                    that.numdata = window.nCov_luchengData.macroscopic.lc_yt.mj;
                    this.draw();
                }
            },
            draw() {
                const matarr = [];
                for (var i = 0; i < this.numdata.length; i++) {
                    if (this.numdata[i]) {
                        matarr.push(Math.ceil(this.numdata[i]));
                    }
                }
                const maxstr = String(Math.max.apply(null, matarr));
                const b = Math.pow(10, maxstr.length - 1);
                const maxnum = (parseInt(maxstr[0]) + 1) * b;
                let myChart = echarts.init(document.getElementById('ytyqChart'));
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: 20,
                        right: 30,
                        top: 50,
                        bottom: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.labelname,
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            textStyle: {
                                color: '#38D4DC',
                                fontSize: 16,
                            }
                        },
                        axisLine: {
                            lineStyle: {color: '#38D4DC'}
                        }
                    },
                    yAxis: {
                        name: '病例数(人)',
                        type: 'value',
                        max: maxnum,
                        min: 0,
                        minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
                        interval: maxnum / 5, //间隔
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['#103667', '#061848']
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#38D4DC',
                                fontSize: 16,
                            }
                        },
                        axisLine: {
                            lineStyle: {color: '#38D4DC'}
                        }
                    },
                    series: [{
                        data: this.numdata,
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#18E5F7'
                                }, {
                                    offset: 1,
                                    color: '#1963E2'
                                }]),
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                },
                                position: 'top',
                                textStyle: {
                                    color: '#FFF',
                                    fontSize: 16
                                }
                            }
                        },
                    }]
                })
            }
        },
        mounted() {
            this.labelname = window.nCov_luchengData.control.yt.list1;
            this.numdata = window.nCov_luchengData.control.yt.datalist1;
            this.draw();
        },
    }
</script>

<style scoped>
    .yqtj {
        width: 100%;
        height: 100%;
    }

    #yt #titop {
        height: 30px;
        color: #23c9f3;
        margin-top: 10px;
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
        margin-right: 30px;
        margin-bottom: 10px;
    }

    #yt #titop select {
        background-color: #0c7cd2;
        border: none;
        color: #fff;
        padding: 7px 7px;
        margin-left: 5px;
    }

    #yt #ytyqChart {
        width: 100%;
        height: 85%;
    }
</style>