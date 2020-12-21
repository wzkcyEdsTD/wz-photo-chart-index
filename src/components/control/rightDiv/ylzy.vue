<template>
  <div id="ylzyDiv">
    <h3>- 鹿城区定点救助医疗资源使用情况 -</h3>
    <div class="ylzySelect">
      <select name id>
        <option value>温州市</option>
        <option value>鹿城区</option>
        <option value>龙湾区</option>
        <option value>瓯海区</option>
        <option value>乐清市</option>
        <option value>洞头区</option>
        <option value>苍南县</option>
        <option value>龙港市</option>
        <option value>永嘉县</option>
        <option value>文成县</option>
        <option value>平阳县</option>
      </select>
      <select name id>
        <option value>定点救治医院</option>
        <option value>发热门诊机构</option>
      </select>
      <select name id>
        <option value>床位数</option>
        <option value>肺炎试剂</option>
        <option value>疫苗及其他药物</option>
      </select>
    </div>
    <div id="ylzyChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
export default {
  data() {
    return {
      charts: "",
      phname: [
        "温州市第六人民医院",
        "瑞安市人民医院",
        "乐清市人民医院",
        "永嘉县人民医院",
        "平阳县人民医院",
        "苍南县人民医院"
      ],
      phData: [11, 33, 77, 39, 55, 88],
      phKd: [100, 100, 100, 100, 100, 100]
    };
  },
  methods: {
    mapPh() {
      const chart = this.$echarts.init(document.getElementById("ylzyChart"));
      chart.setOption({
        grid: {
          show: "true",
          borderWidth: "0",
          height: "90%",
          width: "67%",
          x: "28%",
          y: "10%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        xAxis: {
          show: false, //是否显示x轴
          type: "value"
        },
        yAxis: {
          type: "category",
          inverse: true, //让y轴数据逆向
          axisLabel: {
            show: true,
            textStyle: {
              color: "#64c4e4" //y轴字体颜色
            }
          },
          splitLine: { show: false }, //横向的线
          axisTick: { show: false }, //y轴的端点
          axisLine: { show: false }, //y轴的线
          data: this.phname
        },
        series: [
          {
            name: "数据内框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#c62528"
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                fontSize: 12
              }
            },
            barWidth: 15,
            data: this.phData
          },
          {
            name: "外框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#05184b" //rgba设置透明度0.14
              }
            },
            barGap: "-100%",
            z: 0,
            barWidth: 15,
            data: this.phKd
          }
        ]
      });
    }
  },
  mounted() {
    this.mapPh(); //调用地图边上的柱状图
  }
};
</script>

<style>
#fy-rightDiv #ylzyDiv {
  width: 100%;
  height: 30%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #ylzyDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #ylzyDiv #ylzyChart {
  width: 100%;
  height: 60%;
}
#fy-rightDiv .ylzySelect {
  width: 100%;
  height: 35px;
  margin-top: 15px;
}
#fy-rightDiv .ylzySelect select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
</style>