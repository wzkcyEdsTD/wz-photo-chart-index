<template>
  <div class="yq-map">
    <div class="yq-map-content" id="yq-map-echart"></div>
    <div id="yq-map-line"></div>
  </div>
</template>
<script>
import geoJson from "./geoJson.js";
export default {
  name: "yq-map",
  props: {
    yqMapData: {
      type: Object,
      default: function() {
        return {
          dates: [],
          lineData: {},
          mapData: []
        };
      }
    }
  },
  data() {
    return {
      lineChart: null,
      mapChart: null
    };
  },
  methods: {
    drawLineEchart() {
      let option = {
        title: {
          text: "鹿城区疫情走势",
          top: "1%",
          left: "1%",
          textStyle: {
            color: "#000",
            fontSize: 14
          }
        },
        grid: {
          top: "25%",
          bottom: "10%",
          left: "8%",
          right: "3%"
        },
        tooltip: {
          trigger: "axis",
          label: {
            show: true
          }
        },
        legend: {
          show: true,
          right: "10",
          top: "10%",
          formatter: function(name) {
            return name.substr(0, 2);
          }
        },
        xAxis: {
          boundaryGap: true, //默认，坐标轴留白策略
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0, //强制显示文字
            textStyle: {
              color: "#666464"
            }
          },
          data: this.yqMapData.dates
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#666464"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,187,187,.5)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(192,187,187,.5)"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "确诊病例",
            type: "line",
            symbolSize: 7,
            color: "#D14444",
            label: {
              show: false,
              distance: 1
            },
            data: this.yqMapData.lineData.qz
          },
          {
            name: "疑似病例",
            type: "line",
            symbolSize: 7,
            color: "#F7D033",
            label: {
              show: false,
              distance: 1
            },
            data: this.yqMapData.lineData.ys
          },
          {
            name: "治愈病例",
            type: "line",
            symbolSize: 7,
            color: "#1CC366",
            label: {
              show: false,
              distance: 1
            },
            data: this.yqMapData.lineData.zy
          },
          {
            name: "死亡病例",
            type: "line",
            symbolSize: 7,
            color: "#7E7E7E",
            label: {
              show: false,
              distance: 1
            },
            data: this.yqMapData.lineData.sw
          }
        ]
      };
      this.lineChart.setOption(option);
    },
    drawMap() {
      const myChart = this.mapChart;
      this.$echarts.registerMap("lucheng", geoJson);
      myChart.hideLoading();
      let geoCoordMap = {
        山福镇: [120.474425531, 28.1343692142286],
        南郊: [120.651791079866, 27.9986151196537],
        南汇: [120.688223689587, 28.0006727766532],
        蒲鞋市: [120.68110600807, 28.016867166328],
        大南: [120.659201469028, 28.009665954327],
        广化: [120.625069812094, 28.0220375135252],
        滨江: [120.709421614242, 28.0221811273661],
        五马: [120.660720933266, 28.0319409441212],
        松台: [120.642766803, 28.0200092361291],
        双屿: [120.598540339967, 28.0309099121868],
        丰门: [120.57675018418, 28.0466598211285],
        仰义: [120.561137415292, 28.0731958098226],
        藤桥镇: [120.490621867821, 28.091200967577],
        七都: [120.765381895269, 28.0108972456898]
      };
      let data = this.yqMapData.mapData;
      let convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 15,
          left: "left",
          top: "bottom",
          text: ["新型肺炎确诊病例人数"], // 文本，默认为数值文本
          orient: "horizontal",
          calculable: true,
          itemWidth: 10,
          // itemHeight: 10,
          seriesIndex: [1],
          inRange: {
            color: ["#fff", "#FF3C07"] // 黑紫黑
          }
        },
        geo: {
          right: "3%",
          left: "4%",
          top: "5%",
          bottom: "8%",
          show: true,
          map: "lucheng",
          zoom: 1.3,
          center: [120.625069812094, 28.0220375135252],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#C0BBBB",
              width: 3
            },
            emphasis: {
              // areaColor: '#01fea8',
            }
          }
        },
        series: [
          {
            name: "credit_pm2.5",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: 2,
            label: {
              normal: {
                formatter: "{b}",
                position: "bottom",
                show: true,
                fontSize: 9
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#000"
              }
            }
          },
          {
            type: "map",
            map: "lucheng",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            // symbolSize: [35,35],
            symbolSize: [0, 0],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                },
                formatter(value) {
                  return value.data.value[2];
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#D41B1E" //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    // 解决display为none时 echarts显示的问题
    $("#yq-map-line").css({ width: $(".yq-mobile-body").width() - 26 });
    this.lineChart = this.$echarts.init(document.getElementById("yq-map-line"));
    $("#yq-map-echart").css({ width: $(".yq-mobile-body").width() - 26 });
    this.mapChart = this.$echarts.init(
      document.getElementById("yq-map-echart")
    );
    this.drawLineEchart();
    this.drawMap();
  }
};
</script>

<style scoped lang="scss">
$baseWidth: 375;
$baseHeight: 667;

@function toX($px) {
  @return $px * 100 / $baseWidth * 1vw;
}
@function toY($px) {
  @return $px * 100 / $baseHeight * 1vh;
}
.yq-map {
  width: 100%;
  padding: 15px 13px;
  box-sizing: border-box;
}
.yq-map-content {
  width: 100%;
  height: toY(213);
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(192, 187, 187, 1);
  box-sizing: border-box;
  margin-bottom: 16px;
}
#yq-map-line {
  width: 100%;
  height: toY(253);
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(192, 187, 187, 1);
}
</style>