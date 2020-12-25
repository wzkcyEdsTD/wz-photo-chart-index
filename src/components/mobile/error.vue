<template>
    <div class="load">
        <div class="error_icon"></div>
        <div class="error_span">授权失败您没有访问权限！</div>
    </div>
</template>
<script>
import watermark from '../common/user/watermark'
export default {
    name: "error",
    mounted(){
        console.log("456");
        watermark.remove();
    }
}
</script>
<style scoped>
.error_icon{
    width:120px;
    height:120px;
    margin: 40px auto 15px;
    background:url("./img/tokenerror.png") center center no-repeat;
    background-size:100% 100%;
}
.error_span{
    width:100%;
    font-size:16px;
    font-weight:bold;
    line-height:35px;
    text-align: center;
    color:red;
}
</style>