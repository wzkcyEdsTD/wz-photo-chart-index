<template>
  <div class="fg-chart">
    <div class="fg-chart-title">各县(市)区{{title}}整改率排名</div>
    <div class="fg-chart-content" ref="fg"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "fg-chart",
  data() {
    return {
      color:[],
    };
  },
  props: ["chartData","title"],
  methods: {
    ...mapActions(["fetchFgList"]),
    drawEchart() {

      const self = this;
      this.chart = this.$echarts.init(this.$refs.fg);
      console.log("chart", this.chartData);
      var arry = this.chartData.test;
      console.log("arry1",arry);
      console.log("arry", arry, "arry2", arry.reverse());
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            align: "left",
          },
          // formatter: function(a) {
          //   console.log(a);
          //   // var html = "<div><div style='width:100%;overflow: hidden;'><span style='font-size:12px;font-weight:bold;color:#fff'>"+
          //   // a[0].name+"</span></br><span style='font-size:12px;font-weight:bold;color:#fff'>已整改：</span><span style='font-size:12px;font-weight:bold;color:#fff'>"+a[2].value+"</span></br><span style='font-size:12px;font-weight:bold;color:#fff'>未整改：</span><span style='font-size:12px;font-weight:bold;color:#fff'>"+a[3].value+"</span></div></div>"
          //   var html="<div style='width:100%;overflow: hidden;'><span style='font-size:12px;font-weight:bold;color:#fff'>"+a[0].value+"%"+"</span></div>"
          //   return html
          // }
        },
        grid: {
          top: "5%",
          left: "5",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        // legend: {
        //   show: true,
        //   right: "10%",
        //   orient: "vertical",
        //   top: "10%",
        //   textStyle: {
        //     color: "#fff"
        //   },
        //   // data: [
        //   //   // { name: "完成率" },
        //   // ]
        // },
        yAxis: [
          {
            boundaryGap: true,
            type: "category",
            axisTick: {
              show: false,
              color: "#fff",
              alignWithLabel: true,
            },
            inverse: true,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            data: this.chartData.name,
          },
          {
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: 12,
              },
            },
            data: arry,
          },
        ],
        xAxis: {
          show: false,
          type: "value",
          name: "整改率",
          nameTextStyle: {
            fontSize: 14,
            color: "#fff",
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff",
            },
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          // {
          //   name: "整改率",
          //   type: "bar",
          //   stack: "one",
          //    barWidth: 13,
          //   label: {
          //     position: "top",
          //     show: true,
          //     color:"#FEE000",
          //     formatter: function (params) {
          //         return params.value+"%";
          //     }

          //   },
          //   itemStyle: {
          //     color:function(param){
          //       {
          //         return param.value< 80? '#f82727':param.value<90? "#ff912f":param.value<95? "#64f855": "#30a5f0"
          //       }
          //     }
          //   },
          //   data:this.chartData.rate,
          // },
          {
            name: "整改率",
            type: "bar",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: {
                  color: "#ffffff",
                  fontSize: "12",
                },
                formatter: function (params) {
                  return params.value + "%";
                },
              },
            },
            barWidth: 15,
            barCategoryGap: 15,
            itemStyle: {
              normal: {
                color: function (param) {
                  return param.value < self.color[0]
                    ? "#f82727"
                    : param.value < self.color[1]
                    ? "#ff912f"
                    : param.value < self.color[2]
                    ? "#64f855"
                    : "#30a5f0";
                },
              },
            },
            data: this.chartData.rate,
          },
          // {
          //   name: '外框',
          //   type: 'bar',
          //   yAxisIndex: 0,
          //   barGap: '-100%',
          //   data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          //   barWidth: 12,
          //   itemStyle: {
          //       normal: {
          //           color: '#0e2147',
          //           barBorderRadius: 5
          //       }
          //   },
          //   z: 0
          // },
        ],
      });
    },
  },
  mounted() {
    this.color =this.$window.color_data.color;
    this.fetchFgList().then(() => {
      this.drawEchart();
    });
  },
};
</script>
<style scoped>
.fg-chart {
  width: 100%;
  overflow: auto;
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
  height: 400px;
  width: 100%;
}
.toolinfobox {
  width: 80px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  padding: 15px;
}
.toolinfobox .toolitem {
  height: 25px;
  width: 100%;
  overflow: hidden;
}
.toolinfobox .toolitem span {
  font-weight: bold;
  font-size: 12px;
  line-height: 25px;
}
</style>