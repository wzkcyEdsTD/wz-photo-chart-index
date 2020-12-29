<template>
  <div class="sfDetails">
    <!-- <div class="head">
      <img src="../img/back.png" @click="back()" />
      <p>{{ $route.query.label }}被征地农民参保</p>
    </div> -->
    <!-- <fgtop :num="num" /> -->
    <p style="padding: 10px 0px; font-size: 18px;font-weight:bold">{{$route.query.label}}各乡镇街道五类未分人员整改率</p>
    <div class="infoline">
      <span class="line1">总人数：</span>
      <span class="line2">{{sumperson}}</span>
      <span class="line1">人；已整改：</span>
      <span class="line2">{{ sumdatehas }}</span>
      <span class="line1">人；整改率：</span>
      <span class="line2">{{strnum(sumdaterate)}}%</span>
    </div>
    
    <!-- <div id="bl-head">
      <ul>
        <li v-for="(item,index) in tabdata" :key="index">
          <p>
            {{item.label}}
            <span :style="{color:item.color}">{{item.value}}</span>
            {{item.unit}}
          </p>
        </li>
      </ul>
    </div> -->
    
    <div class="mapDiv" id="mapDiv">
      <div id="xq-map"></div>
      <div id="xq-map2" v-if="title == '瑞安市' || title == '平阳县'"></div>
    </div>
    <div class="infospan">数据截止：{{tm}}</div>
    <!-- <div class="kind">  
      <div class="t1">整改率＜95%</div>
      <div class="t2">95%~99%</div>
      <div class="t3">99%~100%</div>
      <div class="t4">整改率=100%</div>    
    </div> -->
    <div class="kind">
      <div class="t1">整改率＜{{color[0]}}%</div>
      <div class="t2">{{color[0]}}%~{{color[1]}}%</div>
      <div class="t3">{{color[1]}}%~{{color[2]}}%</div>
      <div class="t4">整改率＞={{color[2]}}%</div>
    </div>
    <fgqy :chartData="fixed_qy" ref="qf_chart" v-if="picactive" :title="'五类未分人员'" />
    <!-- <div class="kind">
      <p style="height: 23px;">提交复工申请企业总数</p>
      <div class="t1">≥2万家</div>
      <div class="t2">≥1~＜2万家</div>
      <div class="t3">≥0.5~＜1万家</div>
      <div class="t4">＜0.5万家</div>
    </div>-->
    <!-- 返工信息 -->

    <!-- 底部 -->
    <!-- <div class="bottom">
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
    </div> -->
    <div style="height:60px;"></div>
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
import fgqy from "./sfChart/fgqy";
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
  GEO_PINGYANG,
} from "../data/geo_Data";
import axios from "axios";

export default {
  components: { fgtop,fgqy },
  data() {
    return {
      tabdata: [
        { label: "企业规(限)上", value: 0, color: "#a93fe0", unit: "家" },
        { label: "温州籍返工", value: 0, color: "#15b5a0", unit: "人" },
        { label: "投资额1亿元工程", value: 0, color: "#ff6000", unit: "家" },
        { label: "非温州籍返工", value: 0, color: "#a93fe0", unit: "人" },
      ],
      color:[],
      xq: [],
      fixed_qy: { name: [], hb: [], rest: [] },
      sumwzg: 0,
      sumyzg: 0,
      sumrate: 0,
      picactive:false,
      fixed_yg: { name: [], hb: [], rest: [] },
      tm:"",
      title: "",
      impdata:0,
      impdataf:0,
      imprate:"100%",
      num: [
        {
          title: "复工复产备案企业",
          value: 0,
          unit: "家",
          color: "ffbf13",
        },
      ],
      // date: window.date,
      date: this.$route.query.date,
      time: this.$route.query.time,
      //this.sumdaterate = this.sumdateafter/(this.sumdatehas+this.sumdateafter)
      sumdaterate:"100",
      sumdateafter:0,
      sumdatehas:0,
      sumperson:0,
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
          MAP_PINGYANG2,
        ],
        乐清市: [MAP_YUEQING, GEO_YUEQING, window.chart_Data.DATA_YUEQING],
        瑞安市: [
          MAP_RUIAN,
          GEO_RUIAN,
          window.chart_Data.DATA_RUIAN,
          MAP_RUIAN2,
        ],
        龙港市: [MAP_LONGGANG, GEO_LONGGANG, window.chart_Data.DATA_LONGGANG],
        经开区: [MAP_ZHENAN, GEO_ZHENAN, window.chart_Data.DATA_ZHENAN],
        瓯江口: [
          MAP_OUJIANGKOU,
          GEO_OUJIANGKOU,
          window.chart_Data.DATA_OUJIANGKOU,
        ],
      },

      dtarrya:[0,0],
      dtarryb:[0,0],
      dtarryc:[0,0],
      dtarryd:[0,0],
      dtarrye:[0,0],
      dtarryf:[0,0],
      dtarryg:[0,0],
      dtarryh:[0,0],


      cur_map: null,
      cur_geo: null,
      cur_data: null,
      infoactive:false,
      objData: {},
      all: {
        瓯江口: { name: "瓯江口", value: 0 },
        // 龙港镇: { name: "龙港镇", value: 0 }
      },
      jkList: {},
      zjkList: {},
    };
  },
  computed: {
    ...mapState({
      FgfcList: (state) => state.FgfcList,
    }),
  },
  mounted() {
    const that = this;
    this.color =this.$window.color_data.color;

    this.title = this.$route.query.label.replace(/产业集聚区/g, "");
    const [map, geo] = this.mapHash[this.$route.query.label]; //传值
    var jk;
    const objData = {};
    const qyObj = {};
    this.cur_map = map;
    this.cur_geo = geo;
    this.XQMapInit();
    this.$nextTick(() => {
      this.fgfcDataFix();
      $("#mapDiv").scrollLeft(document.body.clientWidth / 12);
    });
    var params = new URLSearchParams();
    params.append("params", "");
    params.append("code", "100023037");
    params.append("systype", 1);
    // params.append('data', JSON.stringify(this.rank));
    axios
      .get(
        "https://sourcephone.wzcitybrain.com:8081/Interface/statistics/ProxyGetCityBraainData?params=&code=100023070&systype=1"
      )
      .then((res) => {
        that.jkList = JSON.parse(res.data.result);
        const jkxq = this.jkList.data.filter(
          ({ area_name }) => area_name.replace(/产业集聚区/g, "") == this.title
        );
        this.tm = this.strtime(jkxq[0].data_point)
        jkxq.map((item) => {
          const xjjd = item.town_name;
          //console.log(item.after_rectification_number_type_A)
          // this.dtarrya[0] +=parseInt(item.has_rectification_number_type_A);
          // this.dtarryb[0] +=parseInt(item.has_rectification_number_type_B);
          // this.dtarryc[0] +=parseInt(item.has_rectification_number_type_C);
          // this.dtarryd[0] +=parseInt(item.has_rectification_number_type_D);
          // this.dtarrye[0] +=parseInt(item.has_rectification_number_type_E);
          // this.dtarryf[0] +=parseInt(item.has_rectification_number_type_F);
          // this.dtarryg[0] +=parseInt(item.has_rectification_number_type_G);
          // this.dtarryh[0] +=parseInt(item.has_rectification_number_type_H);

          // this.dtarrya[1] +=parseInt(item.after_rectification_number_type_A);
          // this.dtarryb[1] +=parseInt(item.after_rectification_number_type_B);
          // this.dtarryc[1] +=parseInt(item.after_rectification_number_type_C);
          // this.dtarryd[1] +=parseInt(item.after_rectification_number_type_D);
          // this.dtarrye[1] +=parseInt(item.after_rectification_number_type_E);
          // this.dtarryf[1] +=parseInt(item.after_rectification_number_type_F);
          // this.dtarryg[1] +=parseInt(item.after_rectification_number_type_G);
          // this.dtarryh[1] +=parseInt(item.after_rectification_number_type_H);
          
          
          this.sumdateafter +=parseInt(item.after_rectification_number);
          this.sumdatehas +=parseInt(item.has_rectification_number);
          !objData[xjjd] &&
            (objData[xjjd] = {
              after: {
                sum: parseInt(item.after_rectification_number),
              },
              has: {
                sum: parseInt(item.has_rectification_number),
              },
              rate: {
                sum: (parseInt(item.after_rectification_number)+parseInt(item.has_rectification_number))<=0?"100%":(parseInt(item.has_rectification_number)/(parseInt(item.after_rectification_number)+parseInt(item.has_rectification_number))*100).toFixed(1)+"%",
              },
            });

          !qyObj[xjjd] &&
            (qyObj[xjjd] = { name: xjjd, Sumyzg: 0, Sumwzg: 0, rate: 0, rest: 0 });
          qyObj[xjjd].Sumyzg =parseInt(item.has_rectification_number),
          qyObj[xjjd].Sumwzg =  parseInt(item.after_rectification_number),
          qyObj[xjjd].rate = (parseInt(item.after_rectification_number)+parseInt(item.has_rectification_number))<=0?100:(parseInt(item.has_rectification_number)/(parseInt(item.after_rectification_number)+parseInt(item.has_rectification_number))*100).toFixed(1);
          console.log("ceshi",qyObj[xjjd].rate)
          qyObj[xjjd].test = String(qyObj[xjjd].Sumyzg)+"/"+String(qyObj[xjjd].Sumwzg+qyObj[xjjd].Sumyzg);
          this.sumdaterate = parseInt(this.sumdatehas+this.sumdateafter)<=0?"100":((this.sumdatehas/(this.sumdatehas+this.sumdateafter))*100).toFixed(2);
          this.sumperson =parseInt(this.sumdatehas)+parseInt(this.sumdateafter);
        });
        that.objData = objData;
        console.log(qyObj);

        var _qy_ = [];
        const fixed_qy = { name: [], Sumyzg: [], Sumwzg: [], rate: [], rest: [],test:[] };
        for (let v in qyObj) {
          if(v!="")
          {
            _qy_.push(qyObj[v]);
          } 
        }
        //console.log("111",_qy_)
        _qy_ = _qy_.sort((item,item2)=>{
          return Number(item.rate)-Number(item2.rate);
        })
        _qy_.map(({ name, Sumyzg, Sumwzg, rate,test }) => {
            fixed_qy.name.push(name);
            fixed_qy.Sumyzg.push(Sumyzg);
            fixed_qy.Sumwzg.push(Sumwzg);
            fixed_qy.rate.push(Number(rate));
            fixed_qy.test.push(test);
            //fixed_qy.all.push(all);
        });

        console.log("12111111",fixed_qy)
        // that.objData = that.objData.sort(function(item,item2){
        //   return (Number(item.rate.sum) - Number(item.rate.sum));
        // })
        this.fixed_qy = fixed_qy;
        this.picactive = true;
        that.infoactive=true;
        
      });
      this.getimpinfo();
  },
  methods: {
    strnum(value){
      if(value<=0){
        return 0;
      }
      else if(value>=100)
      {
        return 100;
      }else{
        return value;
      }
    },
    filtnum(value){
      if(value=="100.0%"||value=="100.00%")
      {
        return "100%";
      }
      else if(value=="0.0%"||value=="0.0%")
      {
        return "0%";
      }
      else
      {
        return value;
      }

    },
    getimpinfo()
    {
      const that = this;
      //const axios = getDefaultAxios();
     axios
      .get(
        "https://sourcephone.wzcitybrain.com:8081/Interface/statistics/ProxyGetCityBraainData?params=&code=100023038&systype=1"
      )
      .then((res) => {
         
        that.jkList = JSON.parse(res.data.result).data;
        var sumyzg = 0;
        var sumwzg=0;

        // var rs = that.jkList.filter((item)=>{
        //   return item.area_name = this.title
        // })
        that.jkList.forEach((element)=>{
          if(element.area_name==this.title)
          {
            sumyzg+=parseInt(element.has_rectification_number);
            sumwzg+=parseInt(element.after_rectification_number);
          }
        })

        that.impdata = sumwzg;
        that.impdataf = sumyzg;
        that.imprate = sumwzg<=0?"100%":parseInt((sumyzg/sumwzg)*100)+"%";

        //console.log("已整改：",sumyzg,"未整改",sumwzg)

      });
      //this.impinfo = axios.get("")
    },
    strtime(value){
      var dt = new Date(value);
      var month = dt.getMonth()<9?"0"+(dt.getMonth()+1):dt.getMonth()+1;
      var day = dt.getDate()<10?"0"+dt.getDate():dt.getDate();
      var hour = dt.getHours()<10?"0"+dt.getHours():dt.getHours();
      var minute = dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes();
      return month+"月"+day+"日"+hour+"时"+minute+"分"
    },
    fgfcDataFix() {
      const _xq_ = this.$route.query.label.replace(/产业集聚区/g, "");
      const mapData = {};
      const mapyzg = {};
      const mapwzg = {};
      const objData = {};
      let wzg = 0;
      let yzg = 0;
      let impwzg = 0;
      let impyzg = 0;
      let num = 0;
      const tabdata = [
        { label: "企业规(限)上", value: 0, color: "#a93fe0", unit: "家" },
        { label: "温州籍返工", value: 0, color: "#15b5a0", unit: "人" },
        { label: "投资额1亿元工程", value: 0, color: "#ff6000", unit: "家" },
        { label: "非温州籍返工", value: 0, color: "#a93fe0", unit: "人" },
      ];
      
      const xq = this.FgfcList.filter(
        ({ area_name }) => area_name.replace(/产业集聚区/g, "") == _xq_
      );

      // console.log(jkxq)
      const all = {
        瓯江口: { name: "瓯江口", value: 0 },
        // 龙港镇: { name: "龙港镇", value: 0 }
      };
      xq.map((item) => {
        //  头部
        num += parseInt(item.ysq_qy_cnt);
        wzg += parseInt(item.rectification_completion_rate);
        yzg += parseInt(item.Sumyzg);
        //  地图
        const xjjd = item.town_name;
        !mapData[xjjd] && (mapData[xjjd] = { name: xjjd, value: 0 });
        !mapyzg[xjjd] && (mapyzg[xjjd] = { name: xjjd, value: 0 });
        !mapwzg[xjjd] && (mapwzg[xjjd] = { name: xjjd, value: 0 });

        mapyzg[xjjd].value += parseInt(item.has_rectification_number);
        mapwzg[xjjd].value += parseInt(item.after_rectification_number);
        mapData[xjjd].value =(mapyzg[xjjd].value+mapwzg[xjjd].value)<=0?100:((mapyzg[xjjd].value/(mapwzg[xjjd].value+mapyzg[xjjd].value))*100).toFixed(1);  //item.rectification_completion_rate;
        //console.log("list",mapData[xjjd].value)
        
        //mapwzg[xjjd].value <= 0
            // ? 0
            // : parseInt((mapyzg[xjjd].value / mapwzg[xjjd].value) * 100); //+= parseInt(item.ysq_qy_cnt);
        _xq_ == "瓯江口" && (all["瓯江口"].value += parseInt(item.ysq_qy_cnt));
        // _xq_ == "龙港市" && (all["龙港镇"].value += parseInt(item.ysq_qy_cnt));
        !objData[xjjd] &&
          (objData[xjjd] = {
            // ysq_qy_cnt: 0,
            // ysq_tzyygc_cnt: 0,
            // ysq_gsqy_cnt: 0,
            // ysq_snfgrs_cnt: 0,
            // ysq_swfgrs_cnt: 0,
            // batg_qy_cnt: 0,
            // batg_tzyygc_cnt: 0,
            // batg_gsqy_cnt: 0,
            // batg_snfgrs_cnt: 0,
            // batg_swfgrs_cnt: 0,
            Sumyzg: 0,
            Sumwzg: 0,
            rate: 0,
          });

        for (let v in objData[xjjd]) {
          objData[xjjd][v] += parseInt(item[v]);
        }
        // tabdata[0].value += parseInt(item.ysq_gsqy_cnt);
        // tabdata[1].value += parseInt(item.ysq_snfgrs_cnt);
        // tabdata[2].value += parseInt(item.ysq_tzyygc_cnt);
        // tabdata[3].value += parseInt(item.ysq_swfgrs_cnt);
      });
      this.xq = xq;
      this.sumwzg = wzg;
      this.sumyzg = yzg;
      this.sumrate =
        this.sumwzg <= 0 ? 0 : parseInt((this.sumyzg / this.sumwzg) * 100);
      this.cur_data = mapData;
      this.cur_yzg = mapyzg;
      this.cur_wzg = mapwzg;
      this.all = all;
      this.num[0].value = num;
      this.tabdata = tabdata.map((item) => {
        return { ...item, value: item.value };
      });
      // this.objData = objData;
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
          formatter: function (param) {
            //console.log("123", that.objData);
            const _obj_ = that.objData[param.name] || {};
            return [
              param.name,
              "已整改: " + (_obj_.has.sum || 0) + "人",
              "待整改: " + (_obj_.after.sum || 0) + "人",
              "整改率: " + ((_obj_.rate.sum=="100.0%")?"100%":(_obj_.rate.sum))//((_obj_.rate.sum==0||_obj_.rate.sum>=1)?"100%":(_obj_.rate.sum*100).toFixed(1)+"%"),
            ].join("\n");
          },
          extraCssText: "white-space:pre-wrap;text-align:left;",
          textStyle: {
            fontSize: "14",
          },
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
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
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
                show: true,
              },
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null,
            },
            // textFixed: {
            //   Alaska: [200, 0]
            // },
            data: Object.keys(this.cur_geo).map((item) => {
              const that = this;
              var rate = this.cur_data[item] ? this.cur_data[item].value: 0;
            
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color:
                    !rate?"#b0b0b0"
                      :rate < this.color[0]
                      ? "#f82727"
                      : rate <this.color[1]
                      ? "#ff912f"
                      : rate < this.color[2]
                      ? "#64f855"
                      : "#30a5f0",
                },
              };
            }),
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
                  textBorderWidth: 1,
                },
                formatter: (params) => {
                  // let _data = this.cur_data;
                  // ~["龙港市", "瓯江口"].indexOf(this.title) &&
                  //   (_data = this.all);
                  // return `${this.$util.nameFixed(params.name)}${
                  //   _data[params.name] ? _data[params.name].value : 0
                  // }家`;
                  return params.name;
                },
                position: "bottom",
              },
            },
            itemStyle: {
              opacity: 1,
            },
            data: Object.keys(this.cur_geo).map((item) => {
              return {
                name: item,
                value: this.cur_geo[item].concat(this.cur_data[item] || 0),
              };
            }),
          },
        ],
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
          formatter: function (param) {
            const _obj_ = that.objData[param.name] || {};
            return [
              param.name,
              "已整改: " + (_obj_.ysq_gsqy_cnt || 0) + "人",
              "待整改: " + (_obj_.ysq_qy_cnt || 0) + "人",
              "整改率: " + (_obj_.ysq_tzyygc_cnt || 0) + "%",
            ].join("\n");
          },
          extraCssText: "white-space:pre-wrap;text-align:left;",
          textStyle: {
            fontSize: "14",
          },
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
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
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
                show: true,
              },
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              areaColor:
                this.title == "龙港市" ||
                this.title == "瓯江口" ||
                this.title == "浙南" ||
                this.title == "龙湾区"
                  ? "#fff2d2"
                  : null,
            },
            data: Object.keys(this.cur_geo).map((item) => {
              return {
                name: item,
                value: this.cur_data[item] ? this.cur_data[item].value : 0,
                coord: this.cur_geo[item],
                itemStyle: {
                  color: "#fff2d2",
                },
              };
            }),
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
                  textBorderWidth: 1,
                },
                formatter: (params) => {
                  return `${this.$util.nameFixed(params.name)}${
                    this.cur_data[params.name]
                      ? this.cur_data[params.name].value
                      : 0
                  }家`;
                },
                position: "bottom",
              },
            },
            itemStyle: {
              opacity: 1,
            },
            data: Object.keys(this.cur_geo).map((item) => {
              return {
                name: item,
                value: this.cur_geo[item].concat(this.cur_data[item] || 0),
              };
            }),
          },
        ],
      });
    },
    showLogo() {
      this.logoshow = true;
      const that = this;
      setTimeout(function () {
        that.logoshow = false;
      }, 3000);
    },
  },
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
.infospan{
  width:100%;
  //margin:10px auto;
  //background:url(../img/bbg.png) center center no-repeat;
  //background-size:100% 100%;
      background-image: -webkit-gradient(linear, left top, right top, from(#15005b), color-stop(#4855d6), to(#15005b));
    background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
  height:30px;
  font-size:14px;
  line-height:35px;
  color:#fff;
  position: fixed;
  right:0px;
  bottom:0px;
  z-index:10;
}
.tbox {
  width: 80%;
  margin: 0 auto;
  //background: url(../img/tablebox2.png) center center no-repeat;
  background-size: 100% 100%;
  padding: 10px 15px;
}
.sfDetails {
  background-image: url("../img/bg.jpg");
  width: 100%;
  height: 100%;
  overflow-y: auto;

  #tbbox::-webkit-scrollbar {
    width: 5px; /*对垂直流动条有效*/
    height: 5px; /*对水平流动条有效*/
  }

  /*定义滚动条的轨道颜色、内阴影及圆角*/
  #tbbox::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #021739;
  }

  /*定义滑块颜色、内阴影及圆角*/
  #tbbox::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #10b9cc;
  }

  .bl_info_line {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;

    .info_item {
      width: 25%;
      box-sizing: border-box;
      float: left;

      .itname {
        display: block;
        font-size: 14px;
        color: #fff;
        line-height: 25px;
        text-align: left;
        font-weight: bold;
      }

      .itemvalue {
        display: block;
        text-align: left;

        .itval1 {
          font-size: 14px;
          color: #008aff;
          line-height: 25px;
          font-weight: bold;
        }
        .itval2 {
          font-size: 14px;
          color: #ffbf13;
          line-height: 25px;
          font-weight: bold;
        }
      }
    }
  }
  .infoline {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    height: 30px;
    background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
    text-align: center;
    z-index:1;
    .line1 {
      font-size: 12px;
      line-height: 30px;
      font-weight: bold;
      color: #fff;
    }
    .line2 {
      font-size: 12px;
      line-height: 30px;
      font-weight: bold;
      color: #ffbf13;
    }
  }
  .head {
    display: block;
    width: 100%;
    height: 45px;
    background: url(../img/titlepic.png) top center no-repeat;
    background-size: 100% auto;

    p {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;

      padding: 10px;
    }
    img {
      height: 25px;
      float: left;
      margin-left: 15px;
      margin-top: 10px;
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
    background-color: #f82727; //rgb(104, 156, 32);
  }

  .t2:before {
    background-color: #ff912f //rgb(172, 212, 74);;
  }
  .t3:before {
    background-color: #63f856 //rgb(200, 226, 177);;
  }
  .t4:before {
    background-color: #31a5f2 //rgb(230, 241, 216);;
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