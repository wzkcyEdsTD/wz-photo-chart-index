/**
 * 地图确诊病例数字修改
 */
const mapdata = [
  {
    name: "鹿城区",
    value: [65, 14],
    color: "#fe902e",
    coord: [120.489894, 28.122536]
  },
  {
    name: "龙湾区",
    value: [17, 1],
    coord: [120.770894, 27.930969]
  },
  {
    name: "瓯海区",
    value: [35, 4],
    color: "#ffeea9",
    coord: [120.501369, 28.016593]
  },
  {
    name: "洞头区",
    value: [5, 0],
    coord: [121.100762, 27.872626]
  },
  {
    name: "瑞安市",
    value: [72, 39],
    color: "#ff912f",
    coord: [120.385572, 27.871998]
  },
  {
    name: "乐清市",
    value: [166, 43],
    color: "#f92728",
    coord: [120.978579, 28.250666]
  },
  {
    name: "永嘉县",
    value: [52, 9],
    color: "#ff912f",
    coord: [120.642158, 28.330733]
  },
  {
    name: "文成县",
    value: [10, 1],
    coord: [120.002316, 27.827567]
  },
  {
    name: "平阳县",
    value: [30, 6],
    color: "#ffeea9",
    coord: [120.390537, 27.663857]
  },
  {
    name: "泰顺县",
    value: [19, 3],
    coord: [119.867783, 27.549151]
  },
  {
    name: "苍南县",
    value: [9, 0],
    coord: [120.447814, 27.441237]
  },
  {
    name: "龙港市",
    value: [8, 0],
    coord: [120.6009323, 27.56166944]
  },
  {
    name: "浙南",
    value: [1, 0, "浙南"],
    // coord: [120.779894, 27.850969]
    coord: [120.779894, 27.810969]
  },
  {
    name: "瓯江口",
    value: [1, 0],
    coord: [120.9859323, 28.00166944]
  }
];
/**
 * 病例小区
 */
const mapdata_bl = [
  {
    name: "鹿城区",
    value: 50,
    color: "#fe902e",
    coord: [120.489894, 28.122536]
  },
  {
    name: "龙湾区",
    value: 10,
    coord: [120.805894, 27.900969]
  },
  {
    name: "瓯海区",
    value: 24,
    color: "#ffeea9",
    coord: [120.501369, 28.016593]
  },
  {
    name: "洞头区",
    value: 4,
    coord: [121.113762, 27.832626]
  },
  {
    name: "瑞安市",
    value: 43,
    color: "#ff912f",
    coord: [120.365572, 27.901998]
  },
  {
    name: "乐清市",
    value: 107,
    color: "#f92728",
    coord: [120.978579, 28.250666]
  },
  {
    name: "永嘉县",
    value: 33,
    color: "#ff912f",
    coord: [120.642158, 28.330733]
  },
  {
    name: "文成县",
    value: 2,
    coord: [119.982316, 27.807567]
  },
  {
    name: "平阳县",
    value: 25,
    color: "#ffeea9",
    coord: [120.390537, 27.663857]
  },
  {
    name: "泰顺县",
    value: 6,
    coord: [119.867783, 27.549151]
  },
  {
    name: "苍南县",
    value: 8,
    coord: [120.452814, 27.381237]
  },
  {
    name: "龙港市",
    value: 6,
    coord: [120.6099323, 27.52166944]
  },
  {
    name: "浙南",
    value: [1, 0, "浙南"],
    // coord: [120.779894, 27.850969]
    coord: [120.779894, 27.820969]
  },
  {
    name: "瓯江口",
    value: 1,
    coord: [120.9299323, 27.99566944]
  }
];
//日期
const date = 12;
//图例
const num = [
  {
    label: "确诊病例",
    value: 490
  },
  {
    label: "重症病例",
    value: 24
  },
  {
    label: "出院病例",
    value: 120
  },
  {
    label: "死亡病例",
    value: 0
  },
  {
    label: "累计病例小区",
    value: 320
  },
  {
    label: "确诊新增",
    value: 9
  },
  {
    label: "出院新增",
    value: 13
  },
  {
    label: "重症新增",
    value: 5
  },
  {
    label: "死亡新增",
    value: 0
  },
  {
    label: "病例小区今日新增",
    value: 5
  }
];
const qz_num = [
  { red: 165, white: 20 }, //红旗数量，白旗数量
  { rw: 1, wr: 1 } //红转白，白转红
];
const imgurl = "m_t";

window.mapdata = mapdata;
window.mapdata_bl = mapdata_bl;
window.date = date;
window.num = num;
window.qz_num = qz_num;
window.imgurl = imgurl;
