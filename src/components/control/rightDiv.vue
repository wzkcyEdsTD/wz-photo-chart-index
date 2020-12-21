<template>
  <div id="fy-rightDiv">
    <bqtj />
    <ylzy />
    <sbDate />
  </div>
</template>

<script>
/* eslint-disable */
import bqtj from "./rightDiv/bqtj";
import ylzy from "./rightDiv/ylzy";
import sbDate from "./rightDiv/sbDate";
export default {
  components: {
    bqtj, //病例统计
    sbDate, //上报动态数据
    ylzy //医疗资源状况
  }
};
</script>

<style>
#fy-rightDiv {
  position: absolute;
  right: 2%;
  top: 10%;
  width: 25%;
  height: 88%;
}
</style>