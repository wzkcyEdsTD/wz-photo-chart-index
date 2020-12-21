<template>
  <div class="fg-chart">
    <div class="fg-chart-title">复工复产备案企业分析</div>
    <div class="fg-chart-content" ref="fg"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "fg-chart",
  data() {
    return {};
  },
  props: ["chartData"],
  methods: {
    ...mapActions(["fetchFgList"]),
    drawEchart() {
      this.chart = this.$echarts.init(this.$refs.fg);
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            align: "left"
          }
        },
        grid: {
          top: "20%",
          left: "0",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        legend: {
          show: true,
          right: "10%",
          orient: "vertical",
          top: "10%",
          textStyle: {
            color: "#fff"
          },
          data: [
            { name: "投资超过一亿工程(家)" },
            { name: "其他企业/工程(家)" },
            { name: "规(限)上企业(家)" }
          ]
        },
        xAxis: [
          {
            
            boundaryGap: true,
            type: "category",
            axisTick: {
              show: false,
              color: "#fff",
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#fff"
              },
              interval: 0,
              formatter: function(param) {
                let str = "";
                for (let i = 0; i < param.length; i++) {
                  if (i == param.length - 1) {
                    str += param[i];
                  } else {
                    str += param[i] + "\n";
                  }
                }
                return str;
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            data: this.chartData.name
          }
        ],
        yAxis: {
          show: false,
          type: "value",
          name: "例",
          nameTextStyle: {
            fontSize: 14,
            color: "#fff"
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "规(限)上企业(家)",
            type: "bar",
            stack: "one",
             barWidth: 10,
            label: {
              position: "top",
              show: false
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#DAA520" },
                { offset: 1, color: "#FFFF00" }
              ])
            },
            data: this.chartData.gs
          },
          {
            name: "其他企业/工程(家)",
            type: "bar",
            stack: "one",
             barWidth: 10,
            label: {
              position: "top",
              show: true,
              color: "#fff",
              formatter: ({ dataIndex }) => {
                return this.chartData.all[dataIndex];
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#A93FE0" },
                { offset: 1, color: "#CF72FF" }
              ])
            },
            data: this.chartData.rest
          },
          {
            name: "投资超过一亿工程(家)",
            type: "bar",
            stack: "one",
            barWidth: 10,
            label: {
              position: "top",
              show: false
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#DF1502" },
                { offset: 1, color: "#F3C4B7" }
              ])
            },
            data: this.chartData.yy
          }
        ]
      });
    }
  },
  mounted() {
    // this.fetchFgList().then(() => {
    // this.drawEchart();
    // });
  }
};
</script>
<style scoped>
.fg-chart {
  width: 100%;
  height: auto;
}
.fg-chart-title {
  width: 100%;
  font-size: 20px;
  background-image: -webkit-linear-gradient(bottom, #6470ff, #78c1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.fg-chart-content {
  width: 100%;
  height: 300px;
}
</style>