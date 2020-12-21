<template>
    <div class="com-content control">
        <div class="com-container">
            <div class="control-header">
                <ControlHeader :headerData="$window.nCov_luchengData.control.lc.headerData"></ControlHeader>
            </div>
            <div class="com-bg">
                <div class="com-container_inner">
                    <div class="control-card">
                        <div class="control-card-title">鹿城区疫情总览</div>
                        <div class="control-card-body">
                            <ControlView :viewData="viewData"></ControlView>
                        </div>
                    </div>
                    <div class="control-card">
                        <div class="control-card-title">各街道疫情情况</div>
                        <div class="control-card-body">
                            <ControlJieDao></ControlJieDao>
                        </div>
                    </div>
                    <div class="control-card">
                        <div class="control-card-body">
                            <gldwz></gldwz>
                        </div>
                    </div>
                    <div class="control-card">
                        <div class="control-card-body">
                            <yqzst></yqzst>
                        </div>
                    </div>
                    <div class="control-card">
                        <div class="control-card-body">
                            <ytyq></ytyq>
                        </div>
                    </div>
                    <div class="control-card">
                        <div class="control-card-title">重点防控区域</div>
                        <div class="control-card-body">
                            <zdfkq></zdfkq>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import commonArcgis from "./Arcgis";
    import ControlHeader from "./ControlHeader";
    import ControlJieDao from "./ControlJieDao";
    import ControlView from "./ControlView";
    import yqzst from "./yqzst";
    import ytyq from "./ytyq";
    import gldwz from "./gldwz";
    import zdfkq from "./zdfkq";

    export default {
        name: "control",
        components: {
            ControlHeader,
            ControlJieDao,
            ControlView,
            yqzst,
            ytyq,
            gldwz,
            zdfkq
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>
<style scoped lang="less">
    .com-content {
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 100;
        background: url("./img/bgimg.jpg") center center no-repeat;
        background-size: 100% 100%;
    }

    .com-container {
        width: 100%;
        height: 92%;
        position: relative;
        top: 8%;
    }

    .control-header {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .com-bg {
        width: 100%;
        position: absolute;
        bottom: 0px;
        top: 50px;
    }

    .com-container_inner {
        position: absolute;
        left: 10px;
        bottom: 10px;
        top: 50px;
        right: 10px;
        z-index: 10;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .control-card {
        width: 33%;
        height: 48%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        background-color: rgb(5, 29, 83);
        box-sizing: border-box;
    }

    .control-card-title {
        text-align: left;
        font-size: 20px;
        font-weight: bolder;
        color: #07e2e8;
        margin-bottom: 10px;
    }

    .control-card-title::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 5px;
        height: 15px;
        background: #07e2e8;
        margin-right: 10px;
    }

    .control-card-body {
        flex-grow: 1;
        min-height: 0;
    }
</style>