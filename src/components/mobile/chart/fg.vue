<template>
  <div class="sf">
    <fgTop title="全市" :num="num" />
    <div class="bottom">
      <p>
        <span class="text">截至</span> 2020-2-<span class="time">{{date}}</span>&nbsp;
        <span class="time">{{time}}</span>时，数据每30分钟更新
        <img style src="../img/logo.png" @click="showLogo()" />
      </p>
    </div>
    <div class="TOP_DATA">
      <div>
        <div>
          <p>
            温州籍返工
            <i style="color:#15b5a0">{{(staticNum[2]/10000).toFixed(1)}}</i> 万人
          </p>
          <p>
            非温州籍返工
            <i style="color:#ff6000">{{(staticNum[3]/10000).toFixed(1)}}</i> 万人
          </p>
        </div>
      </div>
      <div>
        <div>
          <p>
            企业规(限)上
            <i style="color:#a93fe0">{{staticNum[0]}}</i> 家
          </p>
          <p>
            投资超1亿元工程
            <i style="color:#a93fe0">{{staticNum[1]}}</i> 个
          </p>
        </div>
      </div>
      <div class="jkm">
        <p>备案员工健康码(人数)：</p>
        <span style="color:rgb(255, 66, 66)">{{snfg[2]}}</span>/
        <span style="color:rgb(255, 191, 19)">{{snfg[1]}}</span>/
        <span style="color:#24dd50">{{snfg[0]}}</span>
      </div>
    </div>

    <div id="nyjj-map"></div>
    <img class="sftl" src="../img/fgtl_new.png" />
    <!-- <img class="down" :src="down" /> -->
    <div class="kind">
      <p>复工复产备案员工总数</p>
      <div class="t1">≥10万</div>
      <div class="t2">≥5万~＜10万</div>
      <div class="t3">≥2万~＜5万</div>
      <div class="t4">＜2万</div>
    </div>
    <fgqy :chartData="fixed_qy" ref="qf_chart" />
    <fgyg :chartData="fixed_yg" ref="fg_chart" />
    <!-- 底部 -->
    <div class="bottom">
      <!-- <div class="sjlz">本页面返工企业人员数据每半小时更新</div> -->
      <div class="sjlz">数据来源：三返人员信息系统</div>
      <div class="float" v-show="logoshow">
        <span>技术支持:温州设计集团</span>
      </div>
      <!-- <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">{{time}}</span>时
        <img style src="../img/logo.png" @click="showLogo()" />
      </p>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import wenzhouMap from "../geoJson/WenZhou";
import fgqy from "./sfChart/fgqy";
import fgyg from "./sfChart/fgyg";
import fgTop from "./fgTop";
import { mapdata } from "../mapdata";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      chart: undefined,
      mapdata,
      num: [
        {
          title: "复工复产备案企业",
          value: 0,
          unit: "家",
          color: "ffbf13"
        },
        {
          title: "复工复产备案员工",
          value: 0,
          unit: "人",
          color: "FF4242"
        }
      ],
      staticNum: [0, 0, 0, 0],
      fixed_yg: { name: [], hb: [], rest: [] },
      fixed_qy: { name: [], hb: [], rest: [] },
      date: "",
      time: "",
      logoshow: false,
      down: require("./img/down.png"),
      snfg: [0, 0, 0]
    };
  },
  components: { fgqy, fgyg, fgTop },
  computed: {
    ...mapState({
      FgfcList: state => state.FgfcList
    })
  },
  watch: {
    FgfcList() {
      this.fgfcDataFix();
    }
  },
  mounted() {
    this.NYJJMapInit(); //调用地图
    !this.FgfcList.length && this.fetchFgfcList();
    this.fgfcDataFix();
  },
  methods: {
    ...mapActions(["fetchFgfcList"]),
    fgfcDataFix() {
      if (!this.FgfcList.length) return;
      this.date = this.FgfcList[0].gxsj.substring(8, 10);
      this.time = this.FgfcList[0].gxsj.substring(11, 16);
      this.$parent.sfdate = this.FgfcList[0].gxsj.substring(8, 10);
      this.$parent.sftime = this.FgfcList[0].gxsj.substring(11, 16);
      const mapqyObj = {};
      const mapygObj = {};
      const qyObj = {};
      const ygObj = {};
      const num = [0, 0];
      const staticNum = [0, 0, 0, 0];
      this.FgfcList.map(item => {
        const _xq_ = item.area1.replace(/产业集聚区/g, "");
        //  头部
        num[0] += parseInt(item.ysq_qy_cnt); //  复工申请企业数
        num[1] += parseInt(item.ysq_snfgrs_cnt) + parseInt(item.ysq_swfgrs_cnt); //  复工申请员工数(市内市外)
        //市内健康码统计
        this.snfg[0] += parseInt(item.ysq_snfg_green_cnt);
        this.snfg[1] += parseInt(item.ysq_snfg_yellow_cnt);
        this.snfg[2] += parseInt(item.ysq_snfg_red_cnt);
        //  地图统计
        staticNum[0] += parseInt(item.ysq_gsqy_cnt);
        staticNum[1] += parseInt(item.ysq_tzyygc_cnt);
        staticNum[2] += parseInt(item.ysq_snfgrs_cnt);
        staticNum[3] += parseInt(item.ysq_swfgrs_cnt);
        //  地图
        !mapqyObj[_xq_] && (mapqyObj[_xq_] = 0);
        !mapygObj[_xq_] && (mapygObj[_xq_] = 0);
        mapqyObj[_xq_] += parseInt(item.ysq_qy_cnt);
        mapygObj[_xq_] +=
          parseInt(item.ysq_snfgrs_cnt) + parseInt(item.ysq_swfgrs_cnt);
        //  企业分析
        if (["市本级", "其他区县"].indexOf(_xq_) < 0) {
          !qyObj[_xq_] &&
            (qyObj[_xq_] = { name: _xq_, all: 0, yy: 0, gs: 0, rest: 0 });
          qyObj[_xq_].gs += parseInt(item.ysq_gsqy_cnt);
          qyObj[_xq_].yy += parseInt(item.ysq_tzyygc_cnt);
          qyObj[_xq_].all += parseInt(item.ysq_qy_cnt);
          qyObj[_xq_].rest +=
            parseInt(item.ysq_qy_cnt) -
            parseInt(item.ysq_tzyygc_cnt) -
            parseInt(item.ysq_gsqy_cnt);
          //  员工分析
          !ygObj[_xq_] && (ygObj[_xq_] = { name: _xq_, all: 0, sn: 0, sw: 0 });
          ygObj[_xq_].sn += parseInt(item.ysq_snfgrs_cnt);
          ygObj[_xq_].sw += parseInt(item.ysq_swfgrs_cnt);
          ygObj[_xq_].all +=
            parseInt(item.ysq_snfgrs_cnt) + parseInt(item.ysq_swfgrs_cnt);
        }
      });
      //  数据处理
      const _mapdata_ = this.$util.clone(this.mapdata).map(item => {
        return {
          ...item,
          ygvalue: mapygObj[item.name] || 0,
          value: mapqyObj[item.name] || 0
        };
      });
      const _qy_ = [];
      const fixed_qy = { name: [], all: [], yy: [], gs: [], rest: [] };
      for (let v in qyObj) {
        _qy_.push(qyObj[v]);
      }
      _qy_
        .sort(this.$util.compare("all"))
        .reverse()
        .map(({ name, yy, gs, rest, all }) => {
          fixed_qy.name.push(name);
          fixed_qy.yy.push(yy);
          fixed_qy.gs.push(gs);
          fixed_qy.rest.push(rest);
          fixed_qy.all.push(all);
        });
      const _yg_ = [];
      const fixed_yg = { name: [], all: [], sn: [], sw: [] };
      for (let v in ygObj) {
        _yg_.push(ygObj[v]);
      }
      _yg_
        .sort(this.$util.compare("all"))
        .reverse()
        .map(({ name, sn, sw, all }) => {
          fixed_yg.name.push(name);
          fixed_yg.sn.push(sn);
          fixed_yg.sw.push(sw);
          fixed_yg.all.push(all);
        });
      this.num = this.num.map((item, index) => {
        return { ...item, value: num[index] };
      });
      this.staticNum = staticNum;
      this.fixed_qy = fixed_qy;
      this.fixed_yg = fixed_yg;
      this.mapdata = _mapdata_;
      this.$nextTick(() => {
        this.NYJJMap(); //调用地图
        this.$refs.fg_chart.drawEchart();
        this.$refs.qf_chart.drawEchart();
      });
    },
    NYJJMapInit() {
      this.chart = this.$echarts.init(document.getElementById("nyjj-map"));
      this.$echarts.registerMap("wenzhou", wenzhouMap);
    },
    NYJJMap() {
      const that = this;
      const upurl =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAAA3CAYAAAAFdgiqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZmQ5ZmQ3My1jM2I5LTk2NDYtODA2Yi1mODUxOGVkNGFhY2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkExMzZBNjU0Q0M5MTFFQThCMjE5MzZCMzVGOTBCMDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkExMzZBNjQ0Q0M5MTFFQThCMjE5MzZCMzVGOTBCMDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZThmZGY4MDktNGU4NS0zYTQ2LThhYzAtMjg4MzY4OTIwZjZhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdmZDlmZDczLWMzYjktOTY0Ni04MDZiLWY4NTE4ZWQ0YWFjZiIv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";
      const downurl =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA6CAYAAABS36B3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjdmZDlmZDczLWMzYjktOTY0Ni04MDZiLWY4NTE4ZWQ0YWFjZiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4ODRENjE0MzRDQzkxMUVBQTE2RkQxMDdENDkwNTMzMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4ODRENjE0MjRDQzkxMUVBQTE2RkQxMDdENDkwNTMzMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplOGZkZjgwOS00ZTg1LTNhNDYtOGFjMC0yODgzNjg5MjBmNmEiIHN0UmVmOmRvY3VtZW50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";

      this.chart.setOption({
        geo: {
          map: "wenzhou",
          zoom: 1.28,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "#000"
          }
        },
        // visualMap: {
        //   show: false,
        //   min: 1000,
        //   max: 100000,
        //   inRange: {
        //     color: [
        //       "rgb(230, 241, 216)",
        //       "rgb(200, 226, 177)",
        //       "rgb(172, 212, 74)",
        //       "rgb(104, 156, 32)"
        //     ]
        //   }
        // },
        series: [
          {
            type: "map",
            map: "wenzhou",
            zoom: 1.28,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: this.mapdata.map(item => {
              return {
                name: item.name,
                value: item.ygvalue,
                qyvalue: item.value,
                itemStyle: {
                  // color: item.color || "#fff"
                  // 根据备案员工人数判断颜色
                  color:
                    item.ygvalue >= 100000
                      ? "#689c20"
                      : item.ygvalue >= 50000
                      ? "#acd44a"
                      : item.ygvalue >= 20000
                      ? "#c8e2b1"
                      : "#e6f1d8"
                },
                coord: item.coord
              };
            }),
            markPoint: {
              // symbol: upurl,
              symbol: function(params, { name }) {
                return name == "浙南" || name == "龙湾区" ? downurl : upurl;
              },
              symbolSize: [84, 40],
              label: {
                normal: {
                  show: true,
                  offset: [0, 0],
                  //     offset: function(params, { name }) {
                  //   return name == "浙南" || name == "龙湾区" ? [0,1] : [0,-1];
                  // },
                  textStyle: {
                    color: "#000"
                  },
                  position: "inside",
                  align: "center",
                  formatter: function(params) {
                    return params.data.name != "龙湾区" ||
                      params.data.name != "浙南"
                      ? [
                          "{title|" +
                            params.data.name
                              .replace("县", "")
                              .replace("区", "")
                              .replace("市", "") +
                            "}",
                          "{num2|" +
                            params.data.value +
                            "}/{num1|" +
                            params.data.ygvalue +
                            "}"
                        ].join("\n")
                      : [
                          "{title1|" +
                            params.data.name
                              .replace("县", "")
                              .replace("区", "")
                              .replace("市", "") +
                            "}",
                          "{num3|" +
                            params.data.value +
                            "}/{num4|" +
                            params.data.ygvalue +
                            "}"
                        ].join("\n");
                  },
                  rich: {
                    title: {
                      color: "black",
                      fontSize: 10,
                      fontWeight: "bold",
                      offset: [0, 1]
                    },
                    num1: {
                      color: "#FF4242",
                      fontSize: 12,
                      fontWeight: "bold",
                      offset: [0, 1]
                    },
                    num2: {
                      color: "#ffbf13",
                      fontSize: 12,
                      fontWeight: "bold",
                      offset: [0, 1]
                    },
                    title1: {
                      color: "black",
                      fontSize: 12,
                      fontWeight: "bold",
                      offset: [0, 5]
                    },
                    num3: {
                      color: "#ffbf13",
                      fontSize: 12,
                      fontWeight: "bold",
                      offset: [0, 5]
                    },
                    num4: {
                      color: "#FF4242",
                      fontSize: 12,
                      fontWeight: "bold",
                      offset: [0, 5]
                    },
                    e: {
                      color: "#FF4242",
                      fontSize: 12,
                      fontWeight: "bold"
                    }
                  }
                }
              },
              data: this.mapdata
            }
          }
        ]
      });
      that.chart.getZr().on("click", function(event) {
        if (event.target) {
          that.$router.push({
            path: "/fgDetail",
            query: {
              label: that.mapdata[event.target.dataIndex].name,
              date: that.date,
              time: that.time
            }
          });
        }
      });
    },
    showLogo() {
      this.logoshow = true;
      const that = this;
      setTimeout(function() {
        that.logoshow = false;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
@MaxHeight: 36px;
.topLine(@height:100%,@block:inline-block) {
  display: @block;
  vertical-align: top;
  height: @height;
  line-height: @height;
  text-align: center;
}
.sf {
  width: 100%;
  position: fixed;
  top: 61px;
  bottom: 22px;
  overflow-y: auto;
  #nyjj-map {
    width: 100%;
    height: 80%;
  }
  .kind {
    padding: 0px;
    width: 100%;
    box-sizing: border-box;
    font-size: 12px;
    margin-bottom: 10px;
    position: relative;
    > p {
      position: absolute;
      left: 10px;
      top: -25px;
    }
    > div {
      .topLine(@MaxHeight);
      width: 23%;
      position: relative;
      margin: 0 2px;
    }
    > div:before {
      content: "";
      display: block;
      width: 100%;
      height: 4px;
      position: absolute;
      top: 0;
    }
    .t1:before {
      background-color: rgb(104, 156, 32);
    }
    .t2:before {
      background-color: rgb(172, 212, 74);
    }
    .t3:before {
      background-color: rgb(200, 226, 177);
    }
    .t4:before {
      background-color: rgb(230, 241, 216);
    }
  }

  .TOP_DATA {
    position: absolute;
    z-index: 2;
    .jkm {
      display: inline-block;
      font-size: 12px;
      position: absolute;
      z-index: 2;
      left: 6%;
      margin-top: 6px;
      font-weight: normal;
    }
    > p {
      font-size: 12px;
      display: block;
      width: 160px;
    }
    > div {
      font-weight: 900;
      color: rgb(255, 255, 255);
      margin-top: 20px;
      div {
        margin-left: 15px;
        border-left: 2px solid #2782df;
        margin-top: 10px;
        p {
          text-align: left;
          font-weight: initial;
          padding-left: 5px;
          font-size: 12px;
          line-height: 19px;
          i {
            font-weight: bold;
            font-size: 14px;
          }
        }
        i {
          font-style: normal;
        }
        span {
          font-size: 12px;
          font-weight: normal;
          position: fixed;
          left: 22px;
        }
      }
      i {
        color: rgb(168, 63, 225);
        font-weight: 700;
      }
      .cure {
        color: #15b5a0;
      }
      .cy {
        color: #32941b;
      }
      .die {
        color: #d3ac12;
      }
    }
  }
  > .sftl {
    width: 120px;
    position: absolute;
    bottom: 12%;
    right: 1%;
  }
  > .down {
    width: 30px;
    position: absolute;
    left: 20px;
    bottom: 12%;
  }
  .bottom {
    width: 100%;
    text-align: center;
    z-index: 2;
    > * {
      margin: 5px 0;
    }
    .sjlz {
      width: 100%;
      text-align: center;
      font-size: 12px;
    }
    .tips {
      width: 313px;
      font-size: 14px;
    }
    p {
      color: #fff;
      font-size: 12px;
      font-weight: bolder;
      margin: 0;
      display: inline-block;
      width: 100%;
      position: relative;
      top: -7px;
    }
    .float {
      position: fixed;
      right: 10%;
      color: #000;
      width: 160px;
      display: block;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 5px;
      border-radius: 10px;
      top: 21%;
      z-index: 2;
      span {
        font-size: 12px;
      }
    }
    img {
      font-size: 12px;
      width: 14px;
      margin-left: 4px;
      position: relative;
      top: 2px;
      background-color: #fff;
      border-radius: 3px;
    }
  }
}
</style>