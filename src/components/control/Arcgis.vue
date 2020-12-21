<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import {
  OPTION,
  spatialReference,
  WRT_config,
  QHMB,
  CYBJ,
  IMAGELAYER,
  TDT25DCONFIG,
  DKHX,
  JJTS,
  YZQY,
  LVYOU,
  IMAGELAYERDSJ,
  TDTJY,
  TDTIMAGE2017
} from "@/components/common/Tmap";
const { server } = WRT_config;

export default {
  name: "commonEcoArcgis",
  data() {
    return {};
  },
  components: {},
  props: {
    id: String,
    leftOptions: Array
  },
  created() {},
  async mounted() {
    const that = this;
    /**init map**/
    await this.createMap();
    await this.addQh();
    await this.addmbk();
    this.$props.leftOptions &&
      this.$props.leftOptions.map(_item => {
        _item.children.map(item => {
          //  id,fun 都存在表明有该选项的对应画图函数
          if (!item.id || !item.fun) return;
          that.doFun(item);
        });
      });
  },
  watch: {
    leftOptions: {
      handler(newVal, val) {
        const that = this;
        if (!that.map) return;
        newVal.map(_item => {
          _item.children.map(item => {
            if (!item.id || !item.fun) return;
            that.doFun(item);
          });
        });
      },
      deep: true
    }
  },
  methods: {
    /**
     * 数、组勾选触发图层寻找
     * @param {Object} item 单个元素
     */
    doFun(item) {
      // const arr = ["农林牧渔业","装备制造","鞋材、鞋业","其他","房地产业","交通运输、仓储和邮政业","金融业","批发和零售业","其他服务业","信息传输、软件和信息技术服务业","住宿和餐饮业"]
      if (item.check) {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = true)
          : eval(`this.${item.fun}(${item.takeParam ? `'${item.name}'` : ``})`);
        if (item.id == "chanyePlate" && this.map.findLayerById(item.id)) {
          const zoom = this.view.zoom;
          const shallPlate = zoom > 12 ? false : true;
          this.map.findLayerById("chanyePlate").visible = shallPlate;
        }
      } else {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;
      }
    },
    /**
     * 初始化地图对象,带上底图
     * @param {Function} fn 回调函数
     */
    createMap(fn) {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/Legend",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer",
            "esri/layers/GraphicsLayer"
          ],
          OPTION
        ).then(
          ([
            Map,
            MapView,
            Legend,
            VectorTileLayer,
            TileLayer,
            GraphicsLayer
          ]) => {
            // map加载底图
            that.map = new Map({
              spatialReference
            });
            //设置地图容器
            that.view = new MapView({
              container: that.$props.id,
              spatialReference,
              map: that.map,
              zoom: 13,
              center: [120.67819448808013, 28.039695289562555]
            });
            const layer = new VectorTileLayer({
              url: IMAGELAYER
            });
            that.map.add(layer);
            if (
              window.user.style.length &&
              window.user.style[0].mapStyle == "image2017"
            ) {
              that.map.add(
                new TileLayer({
                  url: TDTIMAGE2017,
                  id: "image2017"
                })
              );
            }
            that.legend = new Legend({
              view: that.view
            });
            resolve(true);
          }
        );
      });
    },
    //  添加区划图
    addQh() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const qh = new MapImageLayer({
              url: QHMB,
              id: "lcjjdt",
              sublayers: [{ id: 3 }, { id: 0 }]
            });
            that.map.add(qh);
            resolve(true);
          }
        );
      });
    },
    addmbk() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const mbk = new MapImageLayer({
              url: QHMB,
              id: "mbk",
              sublayers: [{ id: 1 }]
            });
            that.map.add(mbk);
            resolve(true);
          }
        );
      });
    }
  }
};
</script>
 <style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
  .arcgisMap {
    width: 100%;
    height: 100%;
  }
}
</style>