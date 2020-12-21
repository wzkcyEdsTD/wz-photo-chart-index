<template>
  <div class="qf-chart">
    <div class="qf-chart-title">复工复产备案员工分析</div>
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
          right: "10%",
          orient: "vertical",
          top: "10%",
          textStyle: {
            color: "#fff"
          },
          data: [{ name: "非温州籍返工(万)" }, { name: "温州籍返工(万)" }]
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
            name: "非温州籍返工(万)",
            type: "bar",
            stack: "one",
            barWidth: 10,
            label: {
              position: "inside",
              show: false
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FF8C00" },
                { offset: 1, color: "#FFE4B5" }
              ])
            },
            data: this.chartData.sw.map(item => Math.round(item / 100) / 100)
          },
          {
            name: "温州籍返工(万)",
            type: "bar",
            stack: "one",
            label: {
              position: "top",
              show: true,
              color: "#fff",
              formatter: ({ dataIndex }) => {
                return Math.round(this.chartData.all[dataIndex] / 1000) / 10;
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00CED1" },
                { offset: 1, color: "#40E0D0" }
              ])
            },
            barWidth: 10,
            data: this.chartData.sn.map(item => Math.round(item / 100) / 100)
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