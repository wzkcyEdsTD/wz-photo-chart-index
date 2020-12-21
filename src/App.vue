<template>
  <div id="app">
    <!-- <header :class="`app_header `">
      <div class="app_icon">鹿城区疫情防控指挥地图</div>
      <div class="app_toptab_position app_toptab_normal">
        <ul class="app_toptab">
          <li
            v-for="(item,index) in toptab"
            :key="index"
            :class="{top_active:index==current}"
            @click="$goRoute(item.route),selected(index)"
          >{{item.label}}</li>
        </ul>
        <p>截至日期：2020年2月1日8点</p>
        <p style="position: absolute;right: 15px;top: 15px;">温州设计集团勘测院</p>
        <p style="position: absolute;right: 15px;top: 40px;">{{time}}</p>
      </div>
    </header>-->
    <div class="app_container">
      <transition :name="transitionName">
        <keep-alive include="Mobile">
          <router-view></router-view>
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
export default {
  name: "app",
  data() {
    return {
      toptab: [
        { label: "宏观管控", route: "control" },
        { label: "防疫布控", route: "macroscopic" },
        { label: "疫情监控", route: "monitor" }
      ],
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
