<template>
  <div class="xq">
    <div class="head">
      <img src="./img/back.png" @click="back()" />
      <p>{{$route.query.name}}病例小区分布图</p>
    </div>
    <div class="redFlag">
      <div class="xq_contain">
        <div class="title">
          <div></div>
          <p>
            病例小区合计
            <span style="color:#ff4240">{{this.num}}</span>个
          </p>
        </div>
        <img style="width:100%;" :src="`${this.server}${this.imgurl}/img/estate/${this.title}.png`" />
        <img style="width:100%;" :src="`${this.server}${this.imgurl}/img/tl/${this.title}-T.png`" />
        <!-- <div class="kind">
          <div class="t1">11~14</div>
          <div class="t2">6~10</div>
          <div class="t3">1~5</div>
          <div class="t4">0</div>
        </div>-->
        <img
          style="width:100%;"
          :src="`${this.server}${this.imgurl}/img/estate/${this.title}1.png`"
        />
        <!-- <div class="mapDiv" v-if="title=='永嘉县'">
          <div id="bl-map"></div>
        </div>
        <div class="msg">
          <div class="imghead">
            <img style="float:left" src="./img/bltitle.png" />
            <p>病例小区详情</p>
            <img style="float:right;transform: rotateY(180deg);" src="./img/bltitle.png" />
          </div>

          <ul class="msg_title">
            <li>
              <div>乡镇街道</div>
              <div>小区名</div>
            </li>
          </ul>
          <div class="table">
            <div class="bl_table" v-for="(item,key,index) in street" :key="index">
              <p @click="toggleTree(item.name,index)">
                {{++index}}.{{item.name}} ({{item.num}}例)
                <i :class="`${item.show?`up`:`down`}`"></i>
              </p>
              <ul v-if="item.show">
                <li v-for="(oitem,oindex) in item.arr" :key="oindex">
                  <span>({{++oindex}}).{{oitem.name}}({{oitem.value}}例)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>-->
        <div class="bltitle">
          <img src="./img/blxq.png" />
          <p>病例信息</p>
        </div>
        <ul class="xq1">
          <li v-for="(bitem,bindex) in xq" :key="bindex">
            <span>{{++bindex}}.</span>
            <span>{{bitem.blxx}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="sjlz">数据来源：温州市新冠肺炎工作领导小组</div>
        <div class="float" v-show="logoshow">
          <span>技术支持:温州设计集团</span>
        </div>
        <p>
          <span class="text">截至</span> 2020年 2月
          <span class="time">{{date}}</span>日
          <span class="time">24</span>时
          <img style src="./img/logo.png" @click="showLogo()" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import MAP_YONGJIA from "./geoJson/map_YongJia";
import { GEO_YONGJIA } from "./data/geo_Data";
import { DATA_YONGJIA, TEST_DATA_YONGJIA } from "./data/chart_Data";
import { mapState } from "vuex";

export default {
  name: "gk",
  data() {
    return {
      context: window.context,
      xq: [],
      street: {},
      title: this.$route.query.name,
      server: "https://lysb.lucheng.gov.cn/other/",
      chart: undefined,
      imgurl: window.imgurl,
      msgObj: null,
      GEO_YONGJIA,
      DATA_YONGJIA,
      TEST_DATA_YONGJIA,
      num: 0,
      //date: window.date,
      date:"",
      logoshow: false,
      imgIndex: ""
    };
  },
  computed: {
    ...mapState({
      blList: state => state.blList,
      blxxList: state => state.blxxList
    })
  },
  mounted() {
    this.date = this.$date();
    this.imgIndex = this.$imgIndex;
    this.xqxx();
  },
  methods: {
    xqxx() {
      //  列表
      const _xq_ = this.$route.query.name.replace(/产业集聚区/g, "");
      const xq = this.blList.filter(
        ({ xq }) => xq.replace(/产业集聚区/g, "") == _xq_
      );
      const bl = this.blxxList
        .filter(({ qx }) =>
          qx == "经开区"
            ? _xq_ == "浙南"
            : qx.replace(/产业集聚区/g, "") == _xq_
        )
        .map(item => {
          return {
            ...item,
            time: +new Date(
              "2020-" +
                item.blxx
                  .split("日确诊")[0]
                  .split("月")
                  .join("-")
            )
          };
        })
        .sort(this.$util.compare("time"))
        .reverse();
      this.xq = bl;
      //  病例小区合计
      const arr = [];
      const sObj = {};
      xq.map(({ xjjd, xqmmc }) => {
        arr.indexOf(xqmmc) < 0 && arr.push(xqmmc);
        //  街道统计
        !sObj[xjjd] &&
          (sObj[xjjd] = {
            name: xjjd,
            show: false,
            value: {},
            arr: [],
            num: 0
          });
        !sObj[xjjd]["value"][xqmmc] &&
          (sObj[xjjd]["value"][xqmmc] = { name: xqmmc, value: 0 });
        sObj[xjjd]["value"][xqmmc].value += 1;
        sObj[xjjd]["num"] += 1;
      });
      for (let v in sObj) {
        for (let cv in sObj[v]["value"]) {
          sObj[v].arr.push(sObj[v]["value"][cv]);
        }
        sObj[v].arr = sObj[v].arr.sort(this.$util.compare("value")).reverse();
      }
      this.num = arr.length;
      this.street = sObj;
    },
    back() {
      this.$router.go(-1);
    },
    showLogo() {
      this.logoshow = true;
      const that = this;
      setTimeout(function() {
        that.logoshow = false;
      }, 3000);
    },
    toggleTree(label, index) {
      for (let v in this.street) {
        if (this.street[v].name == label) {
          this.street[v].show = !this.street[v].show;
        }
      }
    },
    BLMapInit() {
      this.chart = this.$echarts.init(document.getElementById("bl-map"));
      this.$echarts.registerMap("wenzhou", MAP_YONGJIA);
    },
    BLMap() {
      const that = this;
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          position: "top",
          backgroundColor: "#021739",
          formatter: function(params) {
            if (params.seriesIndex == 1) {
              const ds = that.TEST_DATA_YONGJIA[params.dataIndex];
              return [
                `<span style='color: #0eade0; font-weight: bolder;'>${ds.name}（<span style='color: #19cfe7;'>${ds.value.length}</span>）</span>`,
                ds.value.join("<br />")
              ].join("<br />");
            }
          }
        },
        geo: {
          map: "wenzhou",
          aspectScale: 1,
          zoom: 1.3,
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
            map: "wenzhou",
            aspectScale: 1,
            zoom: 1.3,
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
            textFixed: {
              Alaska: [200, 0]
            },
            data: this.DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: item.value,
                coord: this.GEO_YONGJIA[item.name],
                itemStyle: {
                  color: item.color || "#fff"
                }
              };
            })
          },
          {
            id: "point",
            name: "",
            type: "effectScatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#10bef1"
                },
                formatter: "{b}",
                position: "bottom"
              }
            },
            itemStyle: {
              color: "#00f6bf"
            },
            rippleEffect: {
              color: "#7fba9e"
            },
            data: this.TEST_DATA_YONGJIA.map(item => {
              return {
                name: item.name,
                value: this.GEO_YONGJIA[item.name].concat(item.value.length)
              };
            })
          }
        ]
      });

      that.chart.getZr().on("click", function(event) {
        if (event.target && event.target.seriesIndex == 1) {
          const ds = that.TEST_DATA_YONGJIA[event.target.dataIndex];
          that.msgObj = ds;
        }
      });
    }
  }
};
</script>

<style scoped  lang="less">
@MaxHeight: 36px;
.topLine(@height:100%,@block:inline-block) {
  display: @block;
  vertical-align: top;
  height: @height;
  line-height: @height;
  text-align: center;
}
.xq {
  box-sizing: border-box;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .head {
    display: block;
    width: 100%;
    height: 35px;
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
  .redFlag {
    padding: 15px;
    .xq_contain {
      width: 100%;
      margin-bottom: 5px;
      .title {
        display: inline-block;
        width: 100%;
        left: 22px;
        div {
          height: 11px;
          width: 2px;
          background: #2782df;
          display: inline-block;
          margin-right: 5px;
          position: relative;
          left: 78px;
        }
        p {
          font-size: 12px;
          width: 90%;
          display: inline-block;
          text-align: center;
          vertical-align: text-bottom;
          span {
            font-size: 16px;
          }
        }
      }
      .mapDiv {
        height: 377px;
        #bl-map {
          height: 100%;
        }
      }
      .kind {
        height: 36px;
        width: 100%;
        box-sizing: border-box;
        font-size: 12px;
        padding: 5px;
        > div {
          .topLine(@MaxHeight);
          width: 25%;
          position: relative;
        }
        > div:before {
          content: "";
          display: block;
          width: 70px;
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
      /*定义滑块 内阴影+圆角*/
      .msg::-webkit-scrollbar {
        background-color: rgb(9, 15, 57);
        width: 10px;
      }
      .msg::-webkit-scrollbar-thumb {
        background-color: rgb(111, 122, 236);
        height: 40px;
        box-shadow: 0px 1px 3px 0px rgba(44, 47, 49, 0.4);
      }
      .msg {
        box-sizing: border-box;
        padding-top: 10px;
        margin-bottom: 14px;

        ul {
          list-style: none;
        }
        .imghead {
          display: inline-block;
          img {
            width: 30%;
            padding-top: 6px;
          }
          p {
            margin-bottom: 10px;
            font-size: 12px;
            text-align: center;
            width: 30%;
            display: inline-block;
          }
        }
        .msg_title {
          width: 100%;
          height: 30px;
          li {
            width: 99%;
            height: 100%;
            font-size: 12px;
            color: #fff;
            background-color: #2531c5;
            border: 1px solid #00d3ff;
            div {
              width: 70%;
              display: inline-block;
              line-height: 30px;
            }
            div:nth-child(1) {
              width: 25%;
              border-right: 1px solid #00d3ff;
            }
          }
        }
        .table {
          width: 100%;
          height: 175px;
          overflow: auto;
          background-color: rgb(17, 23, 101);
          box-sizing: border-box;
          margin-bottom: 5px;
          .bl_table {
            width: 99.5%;
            text-align: left;
            box-sizing: border-box;
            p {
              font-size: 12px;
              color: #00d3ff;
              text-align: left;
              border: 1px solid #00d3ff;
              padding: 5px;
              margin-bottom: unset;
              .up {
                width: 14px;
                height: 8px;
                float: right;
                background-image: url("./img/up.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin: 5px;
              }
              .down {
                width: 14px;
                height: 8px;
                float: right;
                background-image: url("./img/down.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin: 5px;
              }
            }
            ul {
              width: 100%;
              li {
                height: 25px;
                padding-left: 5px;
                span {
                  font-size: 12px;
                  color: #00d3ff;
                }
              }
            }
          }
        }
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
          width: 100px;
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
        // li {
        //   line-height: 20px;
        //   border: 1px solid #4e5fd5;
        //   text-align: left;
        //   padding: 5px;
        //   margin-bottom: 5px;
        //   text-align: left;
        //   div:nth-child(1) {
        //     display: inline-block;
        //     width: 5%;
        //     vertical-align: top;
        //     box-sizing: border-box;
        //     padding-top: 8px;
        //     span {
        //       font-size: 16px;
        //       color: rgb(9, 252, 255);
        //     }
        //   }
        //   div:nth-child(2) {
        //     display: inline-block;
        //     width: 85%;
        //     padding: 5px 10px;
        //     // border-bottom: 1px solid rgb(39, 45, 119);
        //     span {
        //       font-size: 14px;
        //     }
        //     span:nth-child(1) {
        //       color: rgb(9, 252, 255);
        //     }
        //   }
        // }
        li {
          width: 97%;
          border-bottom: 1px solid #4e5fd5;
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
    }
    .bottom {
      width: 100%;
      text-align: center;
      z-index: 2;
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
  }
}
</style>