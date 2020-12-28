/**
 * vue-cli router config
 * add by eds 2019/7/6
 */
import Vue from "vue";
import Router from "vue-router";
// pages modules
import Monitor from "./components/monitor/Monitor.vue";
import Mobile from "./components/mobile/map.vue"
import MobileXq from "./components/mobile/xq.vue"
import MobileGK from "./components/mobile/gk.vue"
import BlImg from "./components/mobile/blImg.vue"
import sfDetail from "./components/mobile/chart/sfDetails.vue"
import fgDetail from "./components/mobile/chart/fgDetails.vue"
import fgDetail2 from "./components/mobile/chart/fgDetails2.vue"
import error from "./components/mobile/error.vue"
import mapelse from "./components/mobile/mapelse.vue"
import load from "./components/mobile/load.vue"

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes:
    [
      {
        // path: "/",
        // name: "macroscopic",
        // component: Macroscopic
        path: "/",
        name: "Mobile",
        component: Mobile,
        meta: { index: 1 }
      }, {
        path: "/MobileXq",
        name: "MobileXq",
        component: MobileXq,
        meta: { index: 2 }
      }, {
        path: "/MobileGK",
        name: "MobileGK",
        component: MobileGK,
      }, {
        path: "/BlImg",
        name: "BlImg",
        component: BlImg,
      },
      {
        path: "/sfDetail",
        name: "sfDetail",
        component: sfDetail
      },
      {
        path: "/fgDetail",
        name: "fgDetail",
        component: fgDetail
      },
      {
        path: "/fgDetail2",
        name: "fgDetail2",
        component: fgDetail2
      },
      {
        path: "/monitor",
        name: "monitor",
        component: Monitor
      },
      {
        path: "/error",
        name: "error",
        component: error
      },
      {
        path: "/mapelse",
        name: "mapelse",
        component: mapelse
      },
      {
        path: "/load",
        name: "load",
        component: load
      }
    ]
});
