<template>
  <div class="fg-chart">
    <div class="fg-chart-title">计划回温人员统计</div>
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
      console.log(this.chartData)
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
          top: "10%",
          left: "0",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        legend: {
          show: true,
          left: "center",
          top: "1%",
          textStyle: {
            color: "#fff"
          },
          data: [{ name: "计划回温人员(万)" }, { name: "其中计划回温湖北籍(万)" }]
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
            name: "计划回温人员(万)",
            type: "bar",
            stack: "one",
            label: {
              position: "top",
              // offset:[0,],
              show: true,
              color: "#fff",
              formatter: ({ dataIndex }) => {
                return (
                  Math.round(
                    (this.chartData.rest[dataIndex]) /
                      1000
                  ) / 10
                );
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#4E9BE9" },
                { offset: 1, color: "#89E2FF" }
              ])
            },
            data: this.chartData.rest.map(item => Math.round(item / 100) / 100)
          },
          {
            name: "其中计划回温湖北籍(万)",
            type: "bar",
            stack: "one",
            barWidth: 10,
            label: {
              position: "top",
              show: false,
              color: "#fff",
              formatter: function(param) {
                return param.value;
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#DF1502" },
                { offset: 1, color: "#F3C4B7" }
              ])
            },
            data: this.chartData.hb.map(item => Math.round(item / 100) / 100)
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