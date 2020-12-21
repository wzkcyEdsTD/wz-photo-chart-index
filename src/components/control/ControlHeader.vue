<template>
    <ul class="control-header-ul">
        <li class="control-li control-float-left">湖北返鹿人数<span class="control-li-number"
                                                              style="color: rgb(255, 40, 58);">{{ headerData.whNumber }}</span>人
        </li>
        <li class="control-li control-float-left">已管控人数<span class="control-li-number"
                                                             style="color: rgb(252, 198, 89);">{{ headerData.ygkNumber }}</span>人
        </li>
        <li class="control-li control-float-left">未管控人数<span class="control-li-number"
                                                             style="color: rgb(30, 255, 149);">{{ headerData.wgkNumber }}</span>人
        </li>
        <li class="control-li control-float-left">发热门诊机构<span class="control-li-number"
                                                              style="color: rgb(30, 255, 149);">{{ headerData.frNumer }}</span>家
        </li>
    </ul>
</template>

<script>
    export default {
        name: "control-header",
        props: {
            headerData: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {};
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>
<style scoped>
    .control-header-ul {
        width: 100%;
        overflow: hidden;
        list-style: none;
    }

    .control-li {
        font-weight: bolder;
        margin: 0 10px;
        padding: 5px 15px;
        font-size: 25px;
        color: #07e2e8;
        background-color: #081942;
        border: 2px solid #07e2e8;
    }

    .control-li-number {
        font-size: 25px;
        margin: 0 7px;
    }

    .control-float-left {
        float: left;
    }

    .control-float-right {
        float: right;
    }
</style>