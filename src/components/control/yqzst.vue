<template>
    <div class="yqtj" id="zst">
        <div id='titop'>
            <div class="leftdiv">鹿城区病例统计</div>
            <div class="rightdiv">
                <select @change="bqSelect($event)">
                    <option value="0">确诊病例</option>
                    <!--                    <option value="1">疑似病例</option>
                                        <option value="2">医院发热待查</option>
                                        <option value="3">社区发热待查</option>-->
                </select>
            </div>
        </div>
        <div id="yqzstChart"></div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
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
                    that.labelname = window.nCov_luchengData.control.lc.namelist1;
                    that.numdata = window.nCov_luchengData.control.lc.datalist1;
                    this.draw();
                }
                if (event.target.value == "1") {
                    that.labelname = that.namelist2;
                    that.numdata = that.datalist2;
                    this.draw();
                }
                if (event.target.value == "2") {
                    that.labelname = that.namelist3;
                    that.numdata = that.datalist3;
                    this.draw();
                }
                if (event.target.value == "3") {
                    that.labelname = that.namelist4;
                    that.numdata = that.datalist4;
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
                let myChart = echarts.init(document.getElementById('yqzstChart'));
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
                        type: 'line',
                        color: '#0AB3F6',
                        smooth: true,
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
            this.labelname = window.nCov_luchengData.control.lc.namelist1;
            this.numdata = window.nCov_luchengData.control.lc.datalist1;
            this.draw();
        },
    }
</script>

<style scoped>
    .yqtj {
        width: 100%;
        height: 100%;
    }

    #zst #titop {
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

    #zst #titop select {
        background-color: #0c7cd2;
        border: none;
        color: #fff;
        padding: 7px 7px;
        margin-left: 5px;
    }

    #zst #yqzstChart {
        width: 100%;
        height: 85%;
    }
</style>