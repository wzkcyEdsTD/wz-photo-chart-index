<template>
  <div id="app">
    <div class="app_container">
      <transition :name="transitionName">
        <keep-alive include="Mobile">
          <router-view ></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import router from "@/router";
import { OPTION, GET_ARCGIS_TOKEN, WRT_config } from "./components/common/Tmap";
import { fixMenuList } from "./components/common/user/menuHash";
import Watermark from './components/common/user/watermark';
let Base64 = require('js-base64').Base64;
export default {
  name: "app",
  data() {
    return {
      toptab: [
        { label: "宏观管控", route: "control" },
        { label: "防疫布控", route: "macroscopic" },
        { label: "疫情监控", route: "monitor" }
      ],
      isRouter:false,
      current: 1,
      time: " ",
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      let toName = to.name;
      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      this.transitionName = toIndex > fromIndex ? "slide-left" : "slide-right";
    }
  },
  methods: {
    selected(index) {
      this.current = index;
    }
  },
  created(){
    // if(!!this.$route.query.userName)
    // {
    //   // console.log("hah");
    //    var userName =Base64.decode(this.$route.query.userName);
    //    Watermark.set(userName)
    // }

    //console.log("名儿字",this.$route.query.userName); 
  }
};
</script>

<style lang="less">
@import url("components/common/css/common.less");
@import url("components/common/css/style.less");
@import url("components/common/css/animate.css");
@import url("components/common/css/frame.less");
@import url("components/common/css/arcgis.css");



.Router {
  position: relative;
}
.Router > * {
  position: absolute;
  width: 100%;
  text-align: center;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
