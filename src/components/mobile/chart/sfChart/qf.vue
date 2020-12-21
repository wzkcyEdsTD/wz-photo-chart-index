<template>
  <div class="qf-chart">
    <div class="qf-chart-title">成功劝返人员统计</div>
    <div class="qf-chart-content" ref="qf"></div>
  </div>
</template>
<script>
export default {
  name: "qf-chart",
  data() {
    return {};
  },
  props: ["chartData"],
  methods: {
    drawEchart() {
      this.chart = this.$echarts.init(this.$refs.qf);
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
          data: [{ name: "今日劝返人员(万)" }, { name: "累计劝返人员(万)" }]
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
            name: "今日劝返人员(万)",
            type: "bar",
            stack: "one",
            label: {
              position: "inside",
              distance: 12,
              show: false,
              color: "#fff",
              formatter: function(param) {
                return param.value;
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFFEB1" },
                { offset: 1, color: "#FFDE00" }
              ])
            },
            barWidth: 10,
            data: this.chartData.hb.map(item => Math.round(item / 1000) / 10)
          },
          {
            name: "累计劝返人员(万)",
            type: "bar",
            stack: "one",
            barWidth: 10,
            label: {
              position: "top",
              show: true,
              color: "#fff",
              formatter: ({ dataIndex }) => {
                return (
                  Math.round(
                    (this.chartData.hb[dataIndex] +
                      this.chartData.rest[dataIndex]) /
                      1000
                  ) / 10
                );
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#A93FE0" },
                { offset: 1, color: "#CF72FF" }
              ])
            },
            data: this.chartData.rest.map(item => Math.round(item / 1000) / 10)
          }
        ]
      });
    }
  },
  mounted() {
    // this.drawEchart();
  }
};
</script>
<style scoped>
.qf-chart {
  width: 100%;
  height: auto;
}
.qf-chart-title {
  width: 100%;
  font-size: 20px;
  background-image: -webkit-linear-gradient(bottom, #6470ff, #78c1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.qf-chart-content {
  width: 100%;
  height: 300px;
}
</style>