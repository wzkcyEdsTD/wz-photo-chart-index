<template>
  <div class="fg-chart">
    <div class="fg-chart-title">各区县完成率排名</div>
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
          },
          formatter: function(a) {
            console.log(a);
            var html = "<div><div style='width:100%;overflow: hidden;'><span style='font-size:12px;font-weight:bold;color:#fff'>"+
            a[0].name+"</span></br><span style='font-size:12px;font-weight:bold;color:#fff'>已整改：</span><span style='font-size:12px;font-weight:bold;color:#fff'>"+a[2].value+"</span></br><span style='font-size:12px;font-weight:bold;color:#fff'>未整改：</span><span style='font-size:12px;font-weight:bold;color:#fff'>"+a[3].value+"</span></div></div>"
            return html
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
            { name: "完成率" },
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
              show: true,
              lineStyle: {
                color: "#fff"
              }
            },
            data: this.chartData.name
          }
        ],
        yAxis: {
          show: true,
          type: "value",
          name: "完成率",
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
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "完成率",
            type: "bar",
            stack: "one",
             barWidth: 10,
            label: {
              position: "top",
              show: true,
              color:"#FEE000",
              formatter: function (params) {
                  return params.value+"%";
              }

            },       
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#40D8ED" },
                { offset: 1, color: "#0D8F77" }
              ])
            },
            data:this.chartData.rate,
          },
          {
            name: "完成率",
            type: "line",
            symbol: "circle",
            symbolSize: [5, 5],
            label:{
              show:false
            },
            itemStyle: {
              color:"#FEDC00"
            },
            data: this.chartData.rate
          },
          {
            name: "已整改",
            type: "line",
            symbolSize: 0, // symbol的大小设置为0
            showSymbol: false, // 不显示symbol
            lineStyle: {
                width: 0, // 线宽是0
                color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
            },     

            data:this.chartData.Sumyzg,
          },
          {
            name: "未整改",
            type: "line",
            symbolSize: 0, // symbol的大小设置为0
            showSymbol: false, // 不显示symbol
            lineStyle: {
                width: 0, // 线宽是0
                color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
            },     

            data:this.chartData.Sumwzg,
          },
        ]
      });
    }
  },
  mounted() {
    this.fetchFgList().then(() => {
      this.drawEchart();
    });
  }
};
</script>
<style scoped>
.fg-chart {
  width:100%;
  overflow:auto;
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
  width:550px;
}
.toolinfobox{
  width:80px;
  border-radius:10px;
  background:rgba(255, 255, 255, 0.7);
  padding:15px;
  
}
.toolinfobox .toolitem{
  height:25px;
  width:100%;
  overflow: hidden;
}
.toolinfobox .toolitem span{
  font-weight:bold;
  font-size:12px;
  line-height:25px;
}
</style>