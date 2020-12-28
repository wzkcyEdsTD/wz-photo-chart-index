<template>
    <div class="load">
    </div>
</template>
<script>
import watermark from '../common/user/watermark'
export default {
    name: "load",
    mounted(){
        
        
    },
    created(){
        if(!!this.$route.query.column){
            var id = this.$route.query.column
            this.$router.push({path:"/",query:{column:id}})
        }else{
            this.$router.push({path:"/",query:{column:0}})
        }
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