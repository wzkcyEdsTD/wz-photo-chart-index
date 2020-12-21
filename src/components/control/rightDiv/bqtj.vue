<template>
  <div id="bltjDiv">
    <h3>
      - 鹿城区病例统计 -
      <select name id>
        <option value>确诊病例</option>
        <option value>疑似病例</option>
        <option value>死亡病例</option>
        <option value>治愈病例</option>
      </select>
    </h3>
    <div id="bqtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      charts: " ",
      titleData: "灾情统计",
      dataAge: [
        {
          value: 2,
          name: "滨江",
          itemStyle: { color: "#f41e1e" }
        },
        {
          value: 0,
          name: "山福镇",
          itemStyle: { color: "#4dc075" }
        },
        {
          value: 0,
          name: "藤桥镇",
          itemStyle: { color: "#b8d94c" }
        },
        {
          value: 0,
          name: "仰义",
          itemStyle: { color: "#ffb738" }
        },
        {
          value: 0,
          name: "南郊",
          itemStyle: { color: "#ab64cc" }
        },
        {
          value: 0,
          name: "丰门",
          itemStyle: { color: "#ffdd55" }
        },
        {
          value: 5,
          name: "南汇",
          itemStyle: { color: "#fe4d69" }
        },
        {
          value: 0,
          name: "双屿",
          itemStyle: { color: "#ffefa1" }
        },
        {
          value: 5,
          name: "五马",
          itemStyle: { color: "#ff8e66" }
        },
        {
          value: 0,
          name: "松台",
          itemStyle: { color: "#ff936a" }
        },
        {
          value: 1,
          name: "七都",
          itemStyle: { color: "#aa63cb" }
        },
        {
          value: 3,
          name: "蒲鞋市",
          itemStyle: { color: "#bace53" }
        },
        {
          value: 0,
          name: "广化",
          itemStyle: { color: "#f41e1e" }
        },
        {
          value: 1,
          name: "大南",
          itemStyle: { color: "#fef5cc" }
        }
      ],
      dataHJ: [60] //合计损失
    };
  },
  methods: {
    //灾情占比
    zqzb() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        title: [
          {
            text: "确诊病例",
            subtext: this.dataHJ + "例",
            textStyle: {
              fontSize: 16,
              color: "#fff"
            },
            subtextStyle: {
              fontSize: 21,
              color: "#fff",
              fontWeight: "bold"
            },
            textAlign: "center",
            x: "49%",
            y: "40%"
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: function(parms) {
            console.log(parms);
            var str =
              // parms.name +
              // "</br>" +
              parms.marker +
              "" +
              parms.name +
              "</br>" +
              "经济损失：" +
              parms.data.value +
              "</br>" +
              "占比：" +
              parms.percent +
              "%";
            return str;
          }
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["45%", "75%"],
            clockwise: false, //饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            //标签
            label: {
              normal: {
                show: true,
                position: "outter", //inside
                formatter: "{b}  {c}例", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  align: "center",
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            labelLine: {
              show: false,
              normal: {
                length: 5,
                length2: 40,
                smooth: true
              }
            },
            data: this.dataAge
          }
        ]
      });
    }
  },
  mounted() {
    this.zqzb(); //近5年产量预警
  }
};
</script>

<style>
#fy-rightDiv #bltjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #bltjDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #bltjDiv #ylzyChart {
  width: 100%;
  height: 60%;
}
#fy-rightDiv #bltjDiv h3 select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
#fy-rightDiv #bltjDiv #bqtjChart {
  width: 100%;
  height: 82%;
}
</style>