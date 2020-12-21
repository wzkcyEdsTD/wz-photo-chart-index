const {
    macroscopic
} = window.nCov_luchengData;
const {
    lc,
    lc_yt
} = macroscopic;
export const leftOptions = [{
    label: "疫情分布",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `确诊病例 (${lc.qzbl}例)`,
        ytname: `确诊病例 (${lc_yt.qzbl}例)`,
        ytd: "ContactHistory like '%银泰%'",
        id: "qzbl",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "0",
        icon: "确诊病例",
        check: true
    }, {
        name: `疑似病例 (${lc.zzbl}例)`,
        ytname: `疑似病例 (${lc_yt.zzbl}例)`,
        ytd: "ContactHistory like '%银泰%'",
        id: "zzbl",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "1",
        icon: "疑似病例",
        check: false
    }, {
        name: "-1",
        ytname: `银泰员工 (${lc_yt.ytyg}例)`,
        id: "ytyg",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "11",
        icon: "银泰员工",
        check: false
    },
    //  {
    //     name: `医院发热待查 (${lc.yydc}例)`,
    //     id: "yydc",
    //     ytname: -1,
    //     url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
    //     sublayers: "2",
    //     icon: "医院发热待查",
    //     check: false
    // }, {
    //     name: `社区发热待查 (${lc.sqdc}例)`,
    //     id: "sqdc",
    //     ytname: -1,
    //     url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
    //     sublayers: "3",
    //     icon: "社区发热待查",
    //     check: false
    // }, 
    {
        name: `集中隔离点 (${lc.gld}个)`,
        id: "gld",
        ytname: `集中隔离点 (${lc_yt.gld}个)`,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "2",
        icon: "治愈",
        check: false
    }, {
        name: `集中隔离点人员名单 (${lc.gld_list}个)`,
        id: "gld_list",
        ytname: `集中隔离点人员名单 (${lc_yt.gld_list}个)`,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "5",
        icon: "治愈",
        check: false
    }, {
        name: `密切接触者 (${lc.mj}例)`,
        ytname: `密切接触者 (${lc_yt.mj}例)`,
        ytd: "IdentityType like '%银泰%'",
        id: "mj",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "5",
        icon: "密接",
        check: false
    }, {
        name: `居家隔离人员 (${lc.jjgl}例)`,
        id: "jjgl",
        ytname: -1,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "7",
        icon: "死亡",
        check: false
    }, {
        name: `湖北回鹿人员信令 (${lc.hbhw}例)`,
        id: "hbhw",
        ytname: -1,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "9",
        icon: "湖北回温",
        check: false
    }
    ]
},
{
    label: "网格管理",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: "街镇网格",
        id: "chanyePlate",
        sublayers: "0",
        // isImg: true,
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/xzjd/MapServer",
        check: true
    }, {
        name: "社区网格",
        id: "wg",
        sublayers: "12",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        check: false
    }, {
        name: "小区、大厦、物业",
        id: "xq",
        sublayers: "14",
        // isImg: true,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        check: false
    }]
},
{
    label: "卡口值班",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `高速卡口 (${macroscopic.highway_type_1}个)`,
        id: "highway_type_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/zhiban/MapServer",
        sublayers: "0",
        icon: "高速",
        check: false
    },
    // {
    //     name: "汽车站 (4个)",
    //     id: "highway_type_3",
    //     url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/crowded/MapServer",
    //     sublayers: "0",
    //     icon: "汽车站",
    //     check: false
    // },
    {
        name: `火车站 (${macroscopic.highway_type_2}个)`,
        id: "highway_type_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "1",
        icon: "火车站",
        check: false
    }, {
        name: `商场超市 (${macroscopic.people_type_8}个)`,
        id: "people_type_8",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "3",
        icon: "商场超市",
        check: false
    }, {
        name: `农贸市场 (${macroscopic.people_type_9}个)`,
        id: "people_type_9",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "4",
        icon: "农贸市场",
        check: false
    }, {
        name: "小区进出口点",
        id: "xqjck",
        sublayers: "0",
        icon: "进出口",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        check: false
    }
    ]
},
{
    label: "人员密集场所",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `佛道宗教活动场所 (${macroscopic.people_type_1}个)`,
        id: "people_type_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "2",
        icon: "宗教",
        check: false
    }, {
        name: `天基宗教活动场所 (${macroscopic.people_type_2}个)`,
        id: "people_type_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "3",
        icon: "宗教",
        check: false
    }, {
        name: `伊斯兰教宗教活动场所 (${macroscopic.people_type_13}个)`,
        id: "people_type_13",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "12",
        icon: "宗教",
        check: false
    }, {
        name: `专业市场 (${macroscopic.people_type_3}个)`,
        id: "people_type_3",
        url: "http://172.20.89.59/server/rest/services/lcjjdt/jjts/MapServer",
        sublayers: "3",
        icon: "市场",
        check: false
    }, {
        name: `城市书房 (${macroscopic.people_type_6}个)`,
        id: "people_type_6",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "6",
        icon: "城市书房",
        check: false
    }, {
        name: `健身房 (${macroscopic.people_type_7}个)`,
        id: "people_type_7",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "5",
        icon: "健身房",
        check: false
    },
    {
        name: `民办培训机构 (${macroscopic.people_type_12}个)`,
        id: "people_type_12",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "13",
        icon: "民办培训机构",
        check: false
    },
    {
        name: `博物馆 (${macroscopic.people_type_10}个)`,
        id: "people_type_10",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "7",
        icon: "博物馆",
        check: false
    }, {
        name: `文化场所 (${macroscopic.people_type_11}个)`,
        id: "people_type_11",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer",
        sublayers: "8",
        icon: "文化",
        check: false
    }
    ]
},
{
    label: "医疗资源",
    sflabel: -1,
    check: false,
    show: true,
    children: [{
        name: `发热门诊 (${macroscopic.clinic_type_1}家)`,
        id: "clinic_type_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "1",
        icon: "发热门诊",
        check: false
    }, {
        name: `定点救治医院 (${macroscopic.clinic_type_2}家)`,
        id: "clinic_type_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        sublayers: "2",
        icon: "定点医院",
        check: false
    }, {
        name: `其他专科医院 (${macroscopic.clinic_type_3}家)`,
        id: "clinic_type_3",
        url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        sublayers: "8",
        definitionExpression: "TAG LIKE '%专科医院%'",
        icon: "其他专科医院",
        check: false
    },
    // {
    //     name: "乡镇卫生医院 (7129家)",
    //     id: "clinic_type_4",
    //     url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
    //     sublayers: "8",
    //     definitionExpression: "TAG LIKE '%医疗卫生%'",
    //     icon: "乡镇卫生院",
    //     check: false
    // },
    {
        name: `医保药房 (${macroscopic.clinic_type_5}家)`,
        id: "clinic_type_5",
        url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
        sublayers: "8",
        definitionExpression: "TAG LIKE '%药房/保健品%'",
        icon: "药店",
        check: false
    },
    // {
    //     name: "其他医疗机构 (7129家)",
    //     id: "clinic_type_6",
    //     sublayers: "8",
    //     url: "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer",
    //     icon: "其他医疗机构",
    //     check: false
    // },
    {
        name: `疾控中心 (${macroscopic.clinic_type_7}家)`,
        id: "clinic_type_7",
        sublayers: "0",
        url: "http://172.20.89.7:6082/arcgis/rest/services/weijian/resource/MapServer",
        icon: "疾控中心",
        check: false
    }
    ]
},
{
    label: -1,
    sflabel: "三返专题",
    check: false,
    show: true,
    children: [{
        name: `建筑工地信息 (${macroscopic.jzgd}家)`,
        id: "jzgd",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        sublayers: "13",
        icon: "建筑工地",
        check: false
    }, {
        name: `南郊重点企业 (${macroscopic.nj_zdqy}家)`,
        id: "nj_zdqy",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
        sublayers: "4",
        icon: "重点企业",
        check: false
    }, {
        name: `南郊街道自建项目企业 (${macroscopic.nj_xm_1}家)`,
        id: "nj_xm_1",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
        sublayers: "1",
        definitionExpression: "CompanyType = '南郊街道自建项目企业'",
        icon: "自建项目",
        check: false
    }, {
        name: `南郊街道在建项目企业 (${macroscopic.nj_xm_2}家)`,
        id: "nj_xm_2",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/nanjiao/MapServer",
        sublayers: "1",
        definitionExpression: "CompanyType = '南郊街道辖区在建项目企业'",
        icon: "在建项目",
        check: false
    }]
}
]