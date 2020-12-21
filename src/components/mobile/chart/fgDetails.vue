<template>
  <div class="sfDetails">
    <div class="head">
      <img src="../img/back.png" @click="back()" />
      <p>{{$route.query.label}}复工复产分布图</p>
    </div>
    <fgtop :num="num" />
    <div id="bl-head">
      <ul>
        <li v-for="(item,index) in tabdata" :key="index">
          <p>
            {{item.label}}
            <span :style="{color:item.color}">{{item.value}}</span>
            {{item.unit}}
          </p>
        </li>
      </ul>
    </div>
    <div class="mapDiv" id="mapDiv">
      <div id="xq-map"></div>
      <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
    </div>
    <!-- <div class="kind">
      <p style="height: 23px;">提交复工申请企业总数</p>
      <div class="t1">≥2万家</div>
      <div class="t2">≥1~＜2万家</div>
      <div class="t3">≥0.5~＜1万家</div>
      <div class="t4">＜0.5万家</div>
    </div>-->
    <!-- 返工信息 -->
    <div class="bltitle" style="width:96%;margin-left: 2%;">
      <img src="../img/blxq.png" />
      <p>
        复工返工信息
        <i style="color:#ccc;font-style:normal;">（左右可拖动查阅）</i>
      </p>
    </div>
    <div style="width: 96%;overflow: auto;margin-left: 2%;">
      <table style="width:500px;font-size:12px;" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <td rowspan="2" style="width:60px;">
              乡镇
              <br />街道
            </td>
            <td>
              企业
              <br />总数(家)
            </td>
            <td>
              规(限)
              <br />上企业(家)
            </td>
            <td>
              超一亿
              <br />项目(个)
            </td>
            <td>
              温州籍
              <br />返工(人)
            </td>
            <td>
              非温州籍
              <br />返工(人)
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key,index) in objData" :key="index">
            <td>{{key}}</td>
            <td>{{item.ysq_qy_cnt}}</td>
            <td>{{item.ysq_gsqy_cnt}}</td>
            <td>{{item.ysq_tzyygc_cnt}}</td>
            <td>{{item.ysq_snfgrs_cnt}}</td>
            <td>{{item.ysq_swfgrs_cnt}}</td>
            <!-- <td>{{item.batg_qy_cnt}}</td>
            <td>{{item.batg_gsqy_cnt}}</td>
            <td>{{item.batg_tzyygc_cnt}}</td>
            <td>{{item.batg_snfgrs_cnt}}</td>
            <td>{{item.batg_swfgrs_cnt}}</td>-->
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="sjlz">本页面返工企业人员数据每半小时更新</div>
      <div class="sjlz">数据来源：三返人员信息系统</div>
      <div class="float" v-show="logoshow">
        <span>技术支持:温州设计集团</span>
      </div>
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">{{time}}</span>时
        <img style src="../img/logo.png" @click="showLogo()" />
      </p>
    </div>
  </div>
</template>

<script>
import fgtop from "./fgTop";
import { mapState } from "vuex";
import MAP_YONGJIA from "../geoJson/map_YongJia";
import MAP_LUCHENG from "../geoJson/map_LuCheng";
import MAP_OUHAI from "../geoJson/map_OuHai";
import MAP_LONGWAN from "../geoJson/map_LongWan";
import MAP_DONGTOU from "../geoJson/map_DongTou";
import MAP_OUJIANGKOU from "../geoJson/map_OuJiangKou";
import MAP_ZHENAN from "../geoJson/map_ZheNan";
import MAP_YUEQING from "../geoJson/map_YueQing";
import MAP_RUIAN from "../geoJson/map_RuiAn";
import MAP_LONGGANG from "../geoJson/map_LongGang";
import MAP_TAISHUN from "../geoJson/map_TaiShun";
import MAP_CANGNAN from "../geoJson/map_CangNan";
import MAP_WENCHENG from "../geoJson/map_WenCheng";
import MAP_PINGYANG from "../geoJson/map_PingYang";
import MAP_RUIAN2 from "../geoJson/map_RuiAn2";
import MAP_PINGYANG2 from "../geoJson/map_PingYang2";
import {
  GEO_LUCHENG,
  GEO_OUHAI,
  GEO_LONGWAN,
  GEO_DONGTOU,
  GEO_OUJIANGKOU,
  GEO_ZHENAN,
  GEO_YUEQING,
  GEO_RUIAN,
  GEO_YONGJIA,
  GEO_LONGGANG,
  GEO_TAISHUN,
  GEO_CANGNAN,
  GEO_WENCHENG,
  GEO_PINGYANG
} from "../data/geo_Data";

export default {
  components: { fgtop },
  data() {
    return {
      tabdata: [
        { label: "企业规(限)上", value: 0, color: "#a93fe0", unit: "家" },
        { label: "温州籍返工", value: 0, color: "#15b5a0", unit: "人" },
        { label: "投资额1亿元工程", value: 0, color: "#ff6000", unit: "家" },
        { label: "非温州籍返工", value: 0, color: "#a93fe0", unit: "人" }
      ],
      xq: [],
      title: "",
      num: [
        {
          title: "复工复产备案企业",
          value: 0,
          unit: "家",
          color: "ffbf13"
        }
      ],
      // date: window.date,
      date: this.$route.query.date,
      time: this.$route.query.time,
      server: "https://lysb.lucheng.gov.cn/other/",
      fk_imgtag: 9,
      logoshow: false,
      chart: undefined,
      mapHash: {
        鹿城区: [MAP_LUCHENG, GEO_LUCHENG, window.chart_Data.DATA_LUCHENG],
        瓯海区: [MAP_OUHAI, GEO_OUHAI, window.chart_Data.DATA_OUHAI],
        龙湾区: [MAP_LONGWAN, GEO_LONGWAN, window.chart_Data.DATA_LONGWAN],
        洞头区: [MAP_DONGTOU, GEO_DONGTOU, window.chart_Data.DATA_DONGTOU],
        永嘉县: [MAP_YONGJIA, GEO_YONGJIA, window.chart_Data.DATA_YONGJIA],
        泰顺县: [MAP_TAISHUN, GEO_TAISHUN, window.chart_Data.DATA_TAISHUN],
        苍南县: [MAP_CANGNAN, GEO_CANGNAN, window.chart_Data.DATA_CANGNAN],
        文成县: [MAP_WENCHENG, GEO_WENCHENG, window.chart_Data.DATA_WENCHENG],
        平阳县: [
          MAP_PINGYANG,
          GEO_PINGYANG,
          window.chart_Data.DATA_PINGYANG,
          MAP_PINGYANG2
        ],
        乐清市: [MAP_YUEQING, GEO_YUEQING, window.chart_Data.DATA_YUEQING],
        瑞安市: [
          MAP_RUIAN,
          GEO_RUIAN,
          window.chart_Data.DATA_RUIAN,
          MAP_RUIAN2
        ],
        龙港市: [MAP_LONGGANG, GEO_LONGGANG, window.chart_Data.DATA_LONGGANG],
        浙南: [MAP_ZHENAN, GEO_ZHENAN, window.chart_Data.DATA_ZHENAN],
        瓯江口: [
          MAP_OUJIANGKOU,
          GEO_OUJIANGKOU,
          window.chart_Data.DATA_OUJIANGKOU
        ]
      },
      cur_map: null,
      cur_geo: null,
      cur_data: null,
      objData: {},
      all: {
        瓯江口: { name: "瓯江口", value: 0 },
        龙港镇: { name: "龙港镇", value: 0 }
      }
    };
  },
  computed: {
    ...mapState({
      FgfcList: state => state.FgfcList
    })
  },
  mounted() {
    this.title = this.$route.query.label;
    const [map, geo] = this.mapHash[this.$route.query.label]; //传值
    this.cur_map = map;
    this.cur_geo = geo;
    this.XQMapInit();
    this.$nextTick(() => {
      this.fgfcDataFix();
      $("#mapDiv").scrollLeft(document.body.clientWidth / 12);
    });
  },
  methods: {
    fgfcDataFix() {
      const _xq_ = this.$route.query.label.replace(/产业集聚区/g, "");
      const mapData = {};
      const objData = {};
      let num = 0;
      const tabdata = [
        { label: "企业规(限)上", value: 0, color: "#a93fe0", unit: "家" },
        { label: "温州籍返工", value: 0, color: "#15b5a0", unit: "人" },
        { label: "投资额1亿元工程", value: 0, color: "#ff6000", unit: "家" },
        { label: "非温州籍返工", value: 0, color: "#a93fe0", unit: "人" }
      ];
      const xq = this.FgfcList.filter(
        ({ area1 }) => area1.replace(/产业集聚区/g, "") == _xq_
      );
      const all = {
        瓯江口: { name: "瓯江口", value: 0 },
        龙港镇: { name: "龙港镇", value: 0 }
      };
      xq.map(item => {
        //  头部
        num += parseInt(item.ysq_qy_cnt);
        //  地图
        const xjjd = item.area2;
        !mapData[xjjd] && (mapData[xjjd] = { name: xjjd, value: 0 });
        mapData[xjjd].value += parseInt(item.ysq_qy_cnt);
        _xq_ == "瓯江口" && (all["瓯江口"].value += parseInt(item.ysq_qy_cnt));
        _xq_ == "龙港市" && (all["龙港镇"].value += parseInt(item.ysq_qy_cnt));
        !objData[xjjd] &&
          (objData[xjjd] = {
            ysq_qy_cnt: 0,
            ysq_tzyygc_cnt: 0,
            ysq_gsqy_cnt: 0,
            ysq_snfgrs_cnt: 0,
            ysq_swfgrs_cnt: 0,
            batg_qy_cnt: 0,
            batg_tzyygc_cnt: 0,
            batg_gsqy_cnt: 0,
            batg_snfgrs_cnt: 0,
            batg_swfgrs_cnt: 0
          });
        for (let v in objData[xjjd]) {
          objData[xjjd][v] += parseInt(item[v]);
        }
        tabdata[0].value += parseInt(item.ysq_gsqy_cnt);
        tabdata[1].value += parseInt(item.ysq_snfgrs_cnt);
        tabdata[2].value += parseInt(item.ysq_tzyygc_cnt);
        tabdata[3].value += parseInt(item.ysq_swfgrs_cnt);
      });
      this.xq = xq;
      this.cur_data = mapData;
      this.all = all;
      this.num[0].value = num;
      this.tabdata = tabdata.map(item => {
        return { ...item, value: item.value };
      });
      this.objData = objData;
      //  地图初始化
      this.XQMap();
      if (this.title == "瑞安市" || this.title == "平阳县") {
        this.cur_map2 = this.mapHash[this.title][3];
        this.XQMapInit2();
        this.XQMap2();
      }
    },
    back() {
      this.$router.go(-1);
    },
    XQMapInit() {
      this.chart = this.$echarts.init(document.getElementById("xq-map"));
      this.$echarts.registerMap("wenzhou", this.cur_map);
    },
    XQMap() {
      const that = this;
      this.chart.setOption({
        tooltip: {
          //提示框组件。
          formatter: function(param) {
            const _obj_ = that.objData[param.name] || {};
            return [
              param.name,
              "备案企业总数: " + (_obj_.ysq_qy_cnt || 0) + "家",
              "规(限)上企业数: " + (_obj_.ysq_gsqy_cnt || 0) + "家",
              "投资额1亿元工程: " + (_obj_.ysq_tzyygc_cnt || 0) + "个",
              "温州籍返工: " + (_obj_.ysq_snfgrs_cnt || 0) + "人",
              "非温州籍返工: " + (_obj_.ysq_swfgrs_cnt || 0) + "人"
            ].join("\n");
          },
          extraCssText: "white-space:pre-wrap;text-align:left;",
          textStyle: {
            fontSize: "14"
          }
        },
        geo: {
          map: "wenzhou",
          aspectScale: 1,
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "苍南县"
              ? 1.5
              : ~["永嘉县", "文成县"].indexOf(this.title)
              ? 1.1
              : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
              ? 1.3
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "乐清市"
              ? 1.2
              : 1.2,
          top:
            this.title == "洞头区"
              ? "35%"
              : this.title == "苍南县"
              ? "35%"
              : this.title == "乐清市"
              ? "10%"
              : this.title == "瓯江口"
              ? "35%"
              : this.title == "鹿城区"
              ? "35%"
              : "15%",
          left: this.title == "苍南县" ? "20%" : "center",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 10000,
        //   inRange: {
        //     color: ["#FFFFFF", "#FFF2AC", "#FF912F", "#F72726"]
        //   }
        // },
        series: [
          {
            type: "map",
            map: "wenzhou",
            aspectScale: 1,
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "苍南县"
                ? 1.5
                : ~["永嘉县", "文成县"].indexOf(this.title)
                ? 1.1
                : ~["鹿城区", "瓯海区", "泰顺县", "平阳县"].indexOf(this.title)
                ? 1.3
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "乐清市"
                ? 1.2
                : 1.2,
            top:
              this.title == "洞头区"
                ? "35%"
                : this.title == "苍南县"
                ? "35%"
                : this.title == "乐清市"
                ? "10%"
                : this.title == "瓯江口"
                ? "35%"
                : this.title == "鹿城区"
                ? "35%"
                : "15%",
            left: this.title == "苍南县" ? "20%" : "center",
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null
            },
            // textFixed: {
            //   Alaska: [200, 0]
            // },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color: "#fff2d2"
                }
              };
            })
          },
          {
            name: "",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 1,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: params => {
                  let _data = this.cur_data;
                  ~["龙港市", "瓯江口"].indexOf(this.title) &&
                    (_data = this.all);
                  return `${this.$util.nameFixed(params.name)}${
                    _data[params.name] ? _data[params.name].value : 0
                  }家`;
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_geo[item].concat(this.cur_data[item] || 0)
              };
            })
          }
        ]
      });
    },
    XQMapInit2() {
      this.chart2 = this.$echarts.init(document.getElementById("xq-map2"));
      this.$echarts.registerMap("wenzhou2", this.cur_map2);
    },
    XQMap2() {
      const that = this;
      this.chart2.setOption({
        tooltip: {
          //提示框组件。
          formatter: function(param) {
            const _obj_ = that.objData[param.name] || {};
            return [
              param.name,
              "备案企业总数: " + (_obj_.ysq_qy_cnt || 0) + "家",
              "规(限)企业数: " + (_obj_.ysq_tzyygc_cnt || 0) + "家",
              "投资额1亿元工程: " + (_obj_.ysq_gsqy_cnt || 0) + "个",
              "温州籍返工: " + (_obj_.ysq_snfgrs_cnt || 0) + "人",
              "非温州籍返工: " + (_obj_.ysq_swfgrs_cnt || 0) + "人"
            ].join("\n");
          },
          extraCssText: "white-space:pre-wrap;text-align:left;",
          textStyle: {
            fontSize: "14"
          }
        },
        geo: {
          map: "wenzhou2",
          aspectScale: 1,
          zoom:
            this.title == "洞头区"
              ? 1
              : this.title == "永嘉县"
              ? 1.1
              : this.title == "文成县"
              ? 1.2
              : this.title == "苍南县"
              ? 1.5
              : this.title == "泰顺县"
              ? 1.25
              : this.title == "瑞安市"
              ? 1.2
              : this.title == "鹿城区"
              ? 1.3
              : this.title == "瓯海区"
              ? 1.25
              : this.title == "龙湾区"
              ? 1.1
              : this.title == "乐清市"
              ? 1.2
              : 0.15,
          right: "right",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        series: [
          {
            type: "map",
            map: "wenzhou2",
            aspectScale: 1,
            zoom:
              this.title == "洞头区"
                ? 1
                : this.title == "永嘉县"
                ? 1.1
                : this.title == "文成县"
                ? 1.2
                : this.title == "苍南县"
                ? 1.5
                : this.title == "泰顺县"
                ? 1.25
                : this.title == "瑞安市"
                ? 1.2
                : this.title == "鹿城区"
                ? 1.3
                : this.title == "瓯海区"
                ? 1.25
                : this.title == "龙湾区"
                ? 1.1
                : this.title == "乐清市"
                ? 1.1
                : 0.15,
            right: "right",
            emphasis: {
              label: {
                show: true
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null
            },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color: "#fff2d2"
                }
              };
            })
          },
          {
            name: "",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 1,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontSize: 10,
                  fontWeight: "bolder",
                  textBorderColor: "#fff",
                  textBorderWidth: 1
                },
                formatter: params => {
                  return `${this.$util.nameFixed(params.name)}${
                    this.cur_data[params.name]
                      ? this.cur_data[params.name].value
                      : 0
                  }家`;
                },
                position: "bottom"
              }
            },
            itemStyle: {
              opacity: 1
            },
            data: Object.keys(this.cur_geo).map(item => {
              return {
                name: item,
                value: this.cur_geo[item].concat(this.cur_data[item] || 0)
              };
            })
          }
        ]
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
.sfDetails {
  background-image: url("../img/bg.jpg");
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .head {
    display: block;
    width: 100%;
    p {
      text-align: center;
      font-size: 20px;
      font-weight: bolder;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#5ef2f5),
        to(#0b3cca)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 15px;
    }
    img {
      width: 45px;
      height: 25px;
      float: left;
      padding-top: 15px;
    }
  }
  .qz {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
    p {
      color: #fff;
      font-size: 12px;
      padding-left: 5px;
      display: inline-block;
      span {
        color: #ff4242;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .qz_num {
      width: 100%;
      box-sizing: border-box;
      padding: 0px 10px;
      ul {
        list-style: none;
        background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
        padding: 8px;
        li {
          height: 23px;
          line-height: 23px;
          display: inline-block;
          text-align: center;
          * {
            display: inline-block;
            vertical-align: top;
          }
          img {
            height: 14px;
            margin-top: 4px;
          }
        }
      }
    }
  }
}

html,
body {
  height: auto !important;
  overflow: auto !important;
}
#nyjj-map {
  width: 100%;
  height: 60%;
  position: relative;
  top: 25%;
}
#bl-head {
  position: relative;
  width: 100%;
  font-size: 12px;
  li {
    list-style: none;
    width: 45%;
    display: inline-block;
    border-left: 3px solid #298ceb;
    padding: 4px;
    span {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.kind {
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;
  margin-bottom: 10px;
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
    background-color: rgb(247, 39, 38);
  }
  .t2:before {
    background-color: rgb(255, 145, 47);
  }
  .t3:before {
    background-color: rgb(255, 242, 172);
  }
  .t4:before {
    background-color: rgb(255, 255, 255);
  }
}
.mapDiv {
  position: relative;
  height: 400px;
  width: 100%;
  overflow-x: auto;
  #xq-map {
    height: 100%;
    width: 120%;
  }
  #xq-map2 {
    position: absolute;
    width: 60%;
    height: 80px;
    bottom: 5%;
    right: 1%;
    border: 1px solid #fff;
  }
}
table td {
  padding: 5px 5px;
  border: 1px solid #0090ff;
  color: #12caff;
}
table thead td {
  background-color: #021739;
}
table tbody td {
  background-color: #04204d;
}
.bltitle {
  width: 100%;
  display: inline-block;
  text-align: left;
  margin-bottom: 2px;
  img {
    width: 13px;
    margin-right: 6px;
  }
  p {
    font-size: 16px;
    color: #09fcff;
    text-align: left;
    display: inline-block;
  }
}

/*定义滑块 内阴影+圆角*/
.xq1::-webkit-scrollbar {
  background-color: rgb(9, 15, 57);
  width: 10px;
}
.xq1::-webkit-scrollbar-thumb {
  background-color: rgb(111, 122, 236);
  height: 40px;
  box-shadow: 0px 1px 3px 0px rgba(44, 47, 49, 0.4);
}
.xq1 {
  list-style: none;
  display: inline-block;
  height: 300px;
  overflow: auto;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #4e5fd5;
  li {
    width: 97%;
    border-bottom: 1px solid #ccc;
    padding: 4px;
    line-height: 20px;
    margin-bottom: 10px;
    text-align: left;
    span {
      font-size: 12px;
      color: #fff;
    }
    span:nth-child(1) {
      color: rgb(9, 252, 255);
    }
    span:nth-child(2) {
      color: rgb(9, 252, 255);
    }
  }
}
.bottom {
  width: 100%;
  text-align: center;
  z-index: 2;
  margin: 10px 0;
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
  }
  .float {
    position: fixed;
    right: 32%;
    color: #000;
    width: 160px;
    display: block;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    padding: 5px;
    border-radius: 10px;
    bottom: 2%;
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
</style>