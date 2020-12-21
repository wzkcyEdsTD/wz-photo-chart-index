<template>
    <div class="zdfkq">
        <div class="secofbg" v-for="(value, index) of fangKongData" :key="index">
            <div class="ecimg1"><img :src="value.img"></div>
            <div class="ecri">
                <div class="dwtt">{{ value.name }}</div>
                <div class="secnum">共计<span style="color: #FFB502;font-size: 16px;">{{ value.num }}</span>家</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "zdfkq",
        props: {
            fangKongData: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
            };
        },
    }
</script>

<style scoped>
    .zdfkq {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 15px 13px;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .secofbg {
        width: 32%;
        background: #EEF1F9;
        margin-bottom: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
    }

    .ecimg1 {
        float: left;
        width: 28px;
        height: 25px;
        margin-right: 5px;
    }
    .ecimg1 img {
        width: 100%;
        height: 100%;
    }
    .ecri {
        float: right;
        height: 100%;
        text-align: left;
    }
    .dwtt {
        color: #000;
        font-size: 12px;
        font-weight: bold;
    }
    .secnum {
        color: #000;
        font-size: 12px;
        font-weight: bold;
    }
</style>