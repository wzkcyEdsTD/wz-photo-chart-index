<template>
  <div class="map">
    <!-- <div class="title">
      <span>温州市新冠肺炎防控作战地图</span>
    </div>-->
    <!-- <header class="app_header">温州市被征地农民参保</header> -->
    <div class="nav_top">
      <div class="nav_top_box">
        <div class="menubox">
          <div class="tlname"></div>
          <div class="menu_list_box">
            <div class="showcolumn" @click="showcolumn()">{{colname}}</div>
            <div class="column_list" v-show="columnshow">
              <div class="column_item" @click="showcol(1,'八类整改人员')">八类整改人员</div>
              <div class="column_item" @click="showcol(2,'五类未分人员')">五类未分人员</div>
            </div>
          </div>
        </div>
        <div class="endtime">截止:{{tm}}</div>
      </div>
    </div>
    <div class="infoline">
      <span class="line1">总人数</span>
      <span class="line2">{{alldata}}</span>
      <span class="line1">人；已整改</span>
      <span class="line2">{{alldataf}}</span>
      <span class="line1">人；整改率</span>
      <span class="line2">{{allrate}}</span>
    </div>
    <div class="infoline" style="top:90px" v-if="column==1">
      <span class="line1">重点人员</span>
      <span class="line2">{{impdata}}</span>
      <span class="line1">人；已整改</span>
      <span class="line2">{{impdataf}}</span>
      <span class="line1">人；整改率</span>
      <span class="line2">{{imprate}}</span>
    </div>
    <div class="qz" v-if="current == 2">
      <div class="qz_num">
        <ul>
          <li>
            <div style="width: 37%;position: relative;">
              <img style="width: 65%;float: left;" src="./img/hq.png" />
              <p>
                <span>{{qz_num.red}}</span>
              </p>
            </div>
            <div style="width: 25%;margin-top:2%">
              <img @click="showzd" style="width:100%;" src="./img/zdsm.png" />
            </div>
            <div style="width: 37%;position: relative;">
              <img style="width: 65%;float: right;" src="./img/bq.png" />
              <p style="color:#fff">
                <span>{{qz_num.white}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="isGk isGkActive" @click="gkChange" v-if="current == 0">
      <img style="vertical-align: sub;width: 15px;" src="./img/gkl.png" /> 管控力
    </div>-->
    <div class="kind" v-show="current ==2 || current == 3">
      <div class="t1">一类区域</div>
      <div class="t2">二类区域</div>
      <div class="t3">三类区域</div>
      <div class="t4">四类区域</div>
    </div>
    <!-- <div
      class="sjlz"
      v-if="current != 2 && current != 3"
    >数据来源：{{current != 3 ? `温州市新冠肺炎工作领导小组`: current ==4 ? `市大数据发展管理局`:`三返人员信息系统`}}</div>-->

    <!-- <div class="sjlz" v-if="current == 2 || current == 3 ">数据来源：温州市新冠肺炎工作领导小组</div> -->
    <div class="bottom" v-if="current == 2 || current == 3 ">
      <div class="float" v-show="logoshow">
        <span>技术支持:温州设计集团</span>
      </div>
      <p>
        <span class="text" style="margin-left:5px;">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
        <img style src="./img/logo.png" @click="showLogo()" />
      </p>
    </div>
    <!-- 弹框 -->
    <pop ref="pop" />
    <fg v-if="column==1"/>
    <fpelse v-if="column==2"/> -->
    <!-- <sf v-if="current == 1" />
    <fk v-if="current == 2" ref="fk" />
    <bl v-if="current == 3" ref="bl" />
    <tb v-if="current == 4" /> -->
    <!-- <fx v-if="current == 4" /> -->
  </div>
</template>

<script>
/* eslint-disable */

import bl from "./chart/bl";
import fk from "./chart/fk";
import tb from "./chart/tb";
import fx from "./chart/fx";
import sf from "./chart/sf";
import fg from "./chart/fg";
import fpelse from "./chart/fpelse";
import pop from "./chart/popDiv"; //阵地详情弹框
import wx from "weixin-js-sdk";
// import dd from "dingtalk-jsapi";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "Mobile",
  components: { bl, fk, tb, pop, fx, sf, fg, fpelse },
  data() {
    return {
      sfdate: "",
      sftime: "",
      alldata:0,
      alldataf:0,
      tm:"",
      allrate:"0%",
      columnshow:false,
      columnList:["八类整改人员","五类未分人员"],
      colname:'',
      activeName:"fg",
      column:"",
      impdata:0,
      impdataf:0,
      imprate:"0%",
      toptab: [
        {
          label: "复工复产",
          name: "Restore",
          icon: require("./img/fgfc_new.png")
        },
        {
          label: "三返人员",
          name: "Back",
          icon: require("./img/sf_new.png")
        },
        {
          label: "防控作战",
          name: "Map",
          icon: require("./img/fk.png")
        },
        {
          label: "病例分布",
          name: "Estate",
          icon: require("./img/bl.png")
        },
        {
          label: "疫情趋势",
          name: "Analyze",
          icon: require("./img/yq.png")
        }
        // {
        //   label: "区域风险",
        //   name: "Risk",
        //   icon: require("./img/qy.png")
        // }
      ],
      current: 0,
      reloadFlag: null,
      // date: window.date,
      date:"",
      token: "",
      access_token: "",
      ticketString: "",
      nonceStr: "Wm3WZYTPz0wzccnC",
      timestamp: 1414587466,
      wx,
      isGk: false,
      qz_num: { red: 0, white: 0, rw: 0, wr: 0 },
      logoshow: false
    };
  },
  async mounted() {
    
    if(!!this.$route.query.column)
    {
      console.log(this.$route.query.column)
      this.column = this.$route.query.column
      this.colname= this.columnList[this.column-1];
    }else{
        this.column = 1
        this.colname= this.columnList[0];
    }
    this.date = this.$date();
    // !this.blList.length && this.fetchBlList();
    // !this.flagList.length && this.fetchFlagList();
    // !this.QfList.length && this.fetchQfList();
    // !this.blxxList.length && this.fetchBlxxList();
    //  压力太大注销掉
    // await this.fetchReliXYList();
    // await this.fetchQushiData();
    // await this.fetchZyRateData();
  },

  // activated() {
  //   if(!!this.$route.query.column)
  //   {
  //     console.log(this.$route.query.column)
  //     this.column = this.$route.query.column
  //     this.colname= this.columnList[this.column-1];
  //   }else{
  //       this.column = 1
  //       this.colname= this.columnList[0];
  //   }
  // },
  computed: {
    ...mapState({
      blList: state => state.blList,
      blxxList: state => state.blxxList,
      flagList: state => state.flagList,
      QfList: state => state.QfList
    })
  },
  watch: {
    isGk(n, o) {
      this.NYJJMap();
    },
    flagList(n) {
      this.fixFlagData();
    }
  },
  methods: {
    showcol(value,colname){
      // this.colname = colname;
      window.location.href="#/?column="+value;
      window.location.reload();
      //this.activeName = value;
      //this.$router.push({path: "/load",query: {column:value}})
    },
    showcolumn(){
      this.columnshow = !this.columnshow
    },
    // ...mapActions([
    //   "fetchBlList",
    //   "fetchFlagList",
    //   "fetchQfList",
    //   "fetchBlxxList",
    //   //  压力太大注销掉
    //   "fetchReliXYList",
    //   "fetchQushiData",
    //   "fetchZyRateData"
    // ]),

    fixFlagData() {
      const qz_num = { red: 0, white: 0, rw: 0, wr: 0 };
      this.flagList.map(item => {
        parseInt(item.hbqqk) ? (qz_num.white += 1) : (qz_num.red += 1);
        parseInt(item.hqzbq) && (qz_num.rw += 1);
        parseInt(item.bqzhq) && (qz_num.wr += 1);
      });
      this.qz_num = qz_num;
    },
    goPage(index) {
      // if (index == 4) {
      //   return alert("建设中,尽情期待!");
      // } else {
      this.current = index;
      // }
    },
    showLogo() {
      this.logoshow = true;
      const that = this;
      setTimeout(function() {
        that.logoshow = false;
      }, 3000);
    },
    gkChange() {
      this.$router.push({
        path: "/MobileGK"
      });
    },
    showzd() {
      this.$refs.pop.popzdShowFun();
    },
    //信用分后台认证
    getToken() {
      const that = this;
      $.ajax({
        url: "http://115.223.34.189:8099/xypt/zww/settoken",
        type: "Post",
        data: {
          idcard: "test",
          username: "syl",
          phoneum: "123456"
        },
        dataType: "json",
        success: function(data) {
          window.localStorage.setItem("token", data.responseText);
          that.getaccess();
        },
        error: function(data) {
          window.localStorage.setItem("token", data.responseText);
          that.getaccess();
        }
      });
    },
    //获取Access_Token
    getaccess() {
      const that = this;
      $.ajax({
        url: "http://115.223.34.189:8099/xypt/wx/getsign",
        type: "Post",
        data: {
          url: location.href.split("#")[0],
          token: window.localStorage.getItem("token")
        },
        dataType: "json",
        success: function(data) {
          const signature = data.signature;
          const noncestr = data.noncestr;
          const timestamp = data.timestamp;
          that.WXshare(signature, noncestr, timestamp);
        },
        error: function(data) {
          console.log(data);
        }
      });
    },
    WXshare(signature, noncestr, timestamp) {
      const that = this;
      this.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来

        appId: "wx7eeb4eea87cf3ce6", // 必填，企业微信的corpID
        timestamp: timestamp, // 必填，生成签名的时间戳

        nonceStr: noncestr, // 必填，生成签名的随机串 必填，生成签名的随机串

        signature: signature, //
        jsApiList: ["updateAppMessageShareData"]
      });
      this.wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        that.wx.updateAppMessageShareData({
          title: "温州市疫情分布动态地图", // 分享标题
          desc: "抗击疫情，我们在一起，温州加油！", // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
      this.wx.error(function(res) {});
    }
  }
};
</script>

<style scoped lang="less">
@bg: rgba(7, 39, 80, 1);
@MaxHeight: 36px;
@MaxWidth: 100%;
.box(@size:border-box) {
  box-sizing: @size;
}
.toFather() {
  width: 100%;
  height: 100%;
}
.topLine(@height:100%,@block:inline-block) {
  display: @block;
  vertical-align: top;
  height: @height;
  line-height: @height;
  text-align: center;
}

.map {
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
    .nav_top{
      height:61px;
      position: fixed;
      z-index:15;
      background-color:#141A66;
      width:100%;
      box-sizing: border-box;
      padding:10px 15px;
      
      .nav_top_box{
        width:100%;
        box-sizing: border-box;
        height:40px;
        text-align: center;
        background:url("./img/columnline.png") center center no-repeat;
        background-size:100% 100%;

        .menubox{
          width:50%;
          float: left;
          height:100%;

          .tlname{
            display:block;
            float: left;
            font-size:14px;
            font-weight:bold;
            color:#ffbf13;
            line-height:40px;
          }  
          
          .menu_list_box{
            display: block;
            float: left;
            height:30px;
            margin-top:5px;
            margin-left:15px;
            width:110px;
            //border:solid 1px #0090ff;
            box-sizing: border-box;
            background:url(./img/arrowdown.png) right 5px center no-repeat;
            background-size:7px 5px;
            //background-color:#021739;
            position: relative;

            .showcolumn{
              width:100%;
              height:100%;
              font-size:14px;
              line-height:30px;
              color:#fff;
              text-align: left;
              padding-left:10px;
              box-sizing: border-box;
            }
            
            .column_list{
              position:absolute;
              top:30px;
              right:0px;
              width:100%;

              .column_item{
                border:solid 1px #0090ff;
                border-top:none;
                background-color:rgba(20, 26, 102, 0.9);
                width:100%;
                height:30px;
                color:#fff;
                text-align: left;
                padding-left:15px;
                font-size: 14px;
                line-height:28px;
                box-sizing: border-box;
              }
            }

          }
        }

        .endtime{
          width:50%;
          float: left;
          height:100%;
          font-size:14px;
          line-height:40px;
          color:#fff
        }
      }
    }
    .infoline{
      position: absolute;
      width:100%;
      box-sizing: border-box;
      padding:0 15px;
      height:35px;
      background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
      text-align: center;
      top:60px;
      right:0px;
      z-index:10;
    .line1{
      font-size:12px;
      line-height:35px;
      font-weight:bold;
      color:#fff;
    }
    .line2{
      font-size:12px;
      line-height:35px;
      font-weight:bold;
      color:#ffbf13
    }
  }
  .isGk {
    position: absolute;
    top: 43%;
    left: 2%;
    color: #fff;
    height: 27px;
    font-size: 12px;
    line-height: 30px;
    border-radius: 15px;
    border: 1px #30aaff solid;
    padding: 1px 12px;
    z-index: 2;
    font-weight: bold;
    opacity: 0.9;
  }
  .isGkActive {
    background-color: rgba(48, 170, 273, 0.6);
  }
  .kind {
    position: fixed;
    bottom: 60px;
    height: @MaxHeight;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: 12px;
    > div {
      .topLine(@MaxHeight);
      width: 70px;
      position: relative;
      margin: 0 2px;
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
  .app_header {
    position: fixed;
    height: 45px;//@MaxHeight;
    padding: 4px;
    background:url(./img/titlepic.png) top center no-repeat;
    background-size:100% auto;
    box-sizing: border-box;
    font-size:20px;
    line-height:45px;
    font-weight:bold;
    color:#fff;
    text-align: center;
    
    > .app_toptab {
      .toFather();
      > li {
        .topLine(@MaxHeight);
        width: @MaxWidth / 5;
        .box();
        padding: 0 4px;
        opacity: 0.65;
        > span {
          .toFather();
          border-radius: 17px;
          font-size: 12px;
          font-weight: 700;
          display: block;
          color: rgb(255, 255, 255);
          cursor: pointer;
          > * {
            display: inline-block;
            line-height: 20px;
            vertical-align: middle;
            font-style: normal;
            font-size: 17px;
            width: 100%;
          }
        }
      }
      .top_active {
        opacity: 1 !important;
      }
      .top_force {
        opacity: 0.8 !important;
      }
    }
  }
  .title {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 30px;
    z-index: 3;
    span {
      font-size: 24px;
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
    }
  }
  .sjlz {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 4%;
    font-size: 12px;
  }
  .qz {
    position: absolute;
    width: 100%;
    top: 10%;
    // height: 135px;
    box-sizing: border-box;
    z-index: 2;
    p {
      color: #ff4242;
      font-size: 12px;
      padding: 4% 0;
      margin-top: 6%;
    }
    .qz_num {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      ul {
        list-style: none;
        background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
        padding: 8px;
        li {
          display: flex;
          flex-direction: row;
          width: 100%;
          div {
            // img {
            //   width: 12px;
            //   padding-right: 7px;
            // }
            span {
              font-size: 21px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 1%;
    z-index: 2;
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
      position: relative;
      top: 2px;
      background-color: #fff;
      border-radius: 3px;
      margin-left: 4px;
    }
  }

  .bottom-right {
    position: absolute;
    left: 28%;
    bottom: 2%;
    // bottom: 2%;
    // margin: 0 72px;

    p {
      color: #fff;
      font-size: 13px;
      margin: 0;
    }
  }
}
</style>