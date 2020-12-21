<template>
  <div id="popZdxq" v-show="popzdShow">
    <div class="pop">
      <h2 style="color:#f19700;margin-top: 1.5%;">红白阵地说明</h2>
      <p style="color: #7c7367;padding: 5% 11%;text-align: left;font-weight: 500;">
        近3日有1例确诊或近5日其中一日有2例或近10日其中一日有3例确诊为白色阵地。
        <br />其余为红色阵地
      </p>
    </div>
    <div style="position: absolute;width: 100%;top: 58%;">
      <img style="width: 35px;" src="../img/popclose.png" alt @click="popzdShowFun" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popzdShow: false
    };
  },
  methods: {
    popzdShowFun() {
      this.popzdShow = !this.popzdShow;
    }
  }
};
</script>

<style>
#popZdxq {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
#popZdxq .pop {
  width: 80%;
  height: 35%;
  background-image: url("../img/popBg.png");
  top: 20%;
  left: 10%;
  z-index: 10;
  position: absolute;
  /* background-position: center; */
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>