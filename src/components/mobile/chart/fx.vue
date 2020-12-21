<template>
  <div>
    <header class="header" />
    <div id="arcgis">
      <iframe :src="src" />
    </div>
    <div class="legend" />
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { IMAGELAYER, OPTION } from "@/components/common/Tmap";

export default {
  name: "fx",
  data() {
    return {
      src: "http://lysb.lucheng.gov.cn/esri_api/index.html"
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 10%;
  z-index: 2;
  width: 100%;
  padding-bottom:12%; 
  background: url(./img/esri/toubu.png);
  background-size: cover;
}
#arcgis {
  width: 100%;
  height: 80%;
  position: fixed;
  top: 10%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
.legend {
  position: fixed;
  z-index: 2;
  height: 110px;
  width: 100px;
  padding: 6px;
  background: url(./img/esri/tuli.png);
  background-size: cover;
  // background-color: rgba(255, 255, 255, 0.9);
  border: 1px #ddd solid;
  bottom: 15%;
  left: 20px;
  span {
    display: block;
    height: 22px;
    line-height: 22px;
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
  }
  span:before {
    content: "";
    display: block;
    height: 14px;
    width: 20px;
    margin: 3px;
    float: left;
    border-radius: 2px;
  }
  span:first-child:before {
    background-color: red;
  }
  span:nth-child(2):before {
    background-color: orange;
  }
  span:nth-child(3):before {
    background-color: gold;
  }
  span:last-child:before {
    background-color: plum;
  }
}
</style>