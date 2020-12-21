<template>
    <div class="control-view">
        <div class="control-view-title">
            <div class="control-view-bl">
                <div class="control-view-bl-head">
                    <div class="control-view-bl-head-left" id="bg1"></div>
                    <div class="control-view-bl-head-right" style="color: #189bfe;">
                        确诊病例 <br>
                        <span class="control-view-bl-head-right-span">{{$window.nCov_luchengData.macroscopic.lc.qzbl}}例</span>
                    </div>
                </div>
                <div class="control-view-bl-body">
                    <div>今日新增 <span
                            style="color: rgb(30, 255, 149);">{{$window.nCov_luchengData.control.lc.qzbl_add}}</span>
                    </div>
                    <div>温州占比 <span style="color: purple;">{{$window.nCov_luchengData.control.lc.qzbl_mix}}</span></div>
                </div>
            </div>
            <div class="control-view-bl">
                <div class="control-view-bl-head">
                    <div class="control-view-bl-head-left" id="bg2"></div>
                    <div class="control-view-bl-head-right" style="color: #ff9b27;">
                        疑似病例 <br>
                        <span class="control-view-bl-head-right-span">{{$window.nCov_luchengData.macroscopic.lc.zzbl}}例</span>
                    </div>
                </div>
                <div class="control-view-bl-body">
                    <div>今日新增 <span
                            style="color: rgb(30, 255, 149);">{{$window.nCov_luchengData.control.lc.zzbl_add}}</span>
                    </div>
                    <div>温州占比 <span style="color: purple;">{{$window.nCov_luchengData.control.lc.zzbl_mix}}</span></div>
                </div>
            </div>
            <div class="control-view-bl">
                <div class="control-view-bl-head">
                    <div class="control-view-bl-head-left" id="bg3"></div>
                    <div class="control-view-bl-head-right" style="color: #00b87a;">
                        治愈病例 <br>
                        <span class="control-view-bl-head-right-span">{{$window.nCov_luchengData.macroscopic.cure}}例</span>
                    </div>
                </div>
                <div class="control-view-bl-body">
                    <div>今日新增 <span
                            style="color: rgb(30, 255, 149);">{{$window.nCov_luchengData.control.lc.cure_add}}</span>
                    </div>
                    <div>温州占比 <span style="color: purple;">{{$window.nCov_luchengData.control.lc.cure_mix}}</span></div>
                </div>
            </div>
            <div class="control-view-bl">
                <div class="control-view-bl-head">
                    <div class="control-view-bl-head-left" id="bg4">

                    </div>
                    <div class="control-view-bl-head-right" style="color: #fa5350;">
                        死亡病例 <br>
                        <span class="control-view-bl-head-right-span">{{$window.nCov_luchengData.macroscopic.death}}例</span>
                    </div>
                </div>
                <div class="control-view-bl-body">
                    <div>今日新增 <span
                            style="color: rgb(30, 255, 149);">{{$window.nCov_luchengData.control.lc.death_add}}</span>
                    </div>
                    <div>温州占比 <span style="color: purple;">{{$window.nCov_luchengData.control.lc.death_mix}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-view-inner" @scroll="scrollHandler">
            <table class="control-view-table-header" cellspacing="5" :style="{top: top + 'px'}">
                <thead>
                <tr>
                    <th>类别</th>
                    <th>统计总数</th>
                    <th>今日新增</th>
                    <th>增长速度</th>
                </tr>
                </thead>
            </table>
            <table class="control-view-table-body" cellspacing="5">
                <tbody>
                <tr v-for="(value, index) of $window.nCov_luchengData.control.lc.tableData" :key="index">
                    <td>{{ value.key }}</td>
                    <td v-for="(item, ind) of value.value" :key="ind">{{ item }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "control-view",
        props: {
            viewData: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                top: 0
            };
        },
        created() {
        },
        mounted() {
        },
        methods: {
            scrollHandler(e) {
                const target = e.target;
                this.top = target.scrollTop;
            }
        }
    };
</script>
<style scoped>
    .control-view {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .control-view-title {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
    }

    .control-view-bl {
        width: 25%;
        margin: 0 5px;
        max-width: 130px;
    }

    .control-view-bl-head {
        overflow: hidden;
        text-align: center;
        margin-bottom: 15px;
    }

    .control-view-bl-head-left {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: sub;
    }

    #bg1 {
        background: url('./img/1.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg2 {
        background: url('./img/2.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg3 {
        background: url('./img/3.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg4 {
        background: url('./img/4.png') center center no-repeat;
        background-size: 100% 100%;
    }

    .control-view-bl-head-right {
        display: inline-block;
        text-align: right;
        color: #07e2e8;
        font-weight: bolder;
    }

    .control-view-bl-head-right-span {
        font-size: 25px;
        color: #ffe915;
        font-weight: bolder;
    }

    .control-view-bl-body {
        padding: 8px 10px;
        background-color: #081942;
        border: 1px solid #07e2e8;
        text-align: left;
        font-size: 14px;
        box-sizing: border-box;
    }

    .control-view-inner {
        flex-grow: 1;
        min-height: 0;
        width: 100%;
        padding-top: 43px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
    }

    .control-view-table-header {
        table-layout: fixed;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 45px;
        background: rgba(5, 26, 79);
    }

    .control-view-table-header th {
        width: 20%;
        padding: 5px 0;
        font-size: 16px;
        background: #07e2e8;
        color: #081942;
    }

    .control-view-table-header th:nth-child(1) {
        width: 40%;
        background-color: #1b45a7;
        border: 1px solid #07e2e8;
        color: #fff;
    }

    .control-view-table-body {
        width: 100%;
        height: 100%;
        table-layout: fixed;
    }

    .control-view-table-body td {
        width: 20%;
        padding: 5px 0;
        font-size: 16px;
        background-color: #1b45a7;
    }

    .control-view-table-body td:nth-child(1) {
        width: 40%;
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