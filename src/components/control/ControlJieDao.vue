<template>
    <div class="control-view">
        <div class="control-view-inner" @scroll="scrollHandler">
            <table class="control-view-table-header" cellspacing="5" :style="{top: top + 'px'}">
                <thead>
                <tr>
                    <th>街道名称</th>
                    <th>确诊病例</th>
                    <th>疑似病例</th>
                    <th>医院发热待查</th>
                    <th>社区发热待查</th>
                    <th>居家隔离人员</th>
                    <th>密切接触者</th>
                </tr>
                </thead>
            </table>
            <table class="control-view-table-body" cellspacing="5">
                <tbody>
                <tr v-for="(value, index) of $window.nCov_luchengData.control.jd.jieDaoTable" :key="index">
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
    }

    .control-view-inner {
        width: 100%;
        height: 100%;
        padding-top: 67px;
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
        padding: 0;
        font-size: 16px;
        background-color: #1b45a7;
        border: 1px solid #07e2e8;
        height: 55px;
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