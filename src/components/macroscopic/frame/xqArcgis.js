import { tipHash, Hash } from "../config/hash.js";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
const server = "http://172.20.89.68:5001/s";
const xqUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/14"
const qzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/0";
const zzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/1";
const mjUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5";
const enterUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer/0"

export const linkXQFeatures = async (context, xqName) => {
    const geometry = await getGeometry(xqName);
    const qzbl = await addLinkFeature(context, geometry, "qzbl", "确诊病例", qzblUrl);
    const zzbl = await addLinkFeature(context, geometry, "zzbl", "疑似病例", zzblUrl)
    const mj = await addLinkFeature(context, geometry, "mj", "密接", mjUrl)
    const frameData = { qzbl, zzbl, mj };
    context.$parent.$refs.cpFrame.obj = frameData;
    context.$parent.$refs.cpFrame.title = xqName;
}

export const linkXQ_ENTERFeatures = async (context, xqName) => {
    console.log(xqName)
    const geometry = await getGeometry(xqName);
    const xqEnter = await addLinkEnterFeature(context, geometry, "进出口");
    console.log(xqEnter)
}

/**
 * 获取面
 * @param {*} xqName 
 */
const getGeometry = (xqName) => {
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
        ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({ url: xqUrl });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = `name like '%${xqName}%'`;
            const { features } = await queryTask.execute(query);
            resolve(features.length ? features[0].geometry : false);
        });
    });
}

const addLinkEnterFeature = (context, geometry, icon) => {
    return new Promise((resolve, reject) => {
        const _id = "xq_xqjck";
        context.map &&
            context.map.findLayerById(_id) &&
            context.map.remove(context.map.findLayerById(_id));
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/layers/GraphicsLayer", "esri/Graphic"],
            OPTION
        ).then(async ([QueryTask, Query, GraphicsLayer, Graphic]) => {
            const feature = new GraphicsLayer({
                id: _id
            });
            const queryTask = new QueryTask({ url: enterUrl });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.geometry = geometry;
            const { fields, features } = await queryTask.execute(query);
            const fieldAliases = {};
            fields.map(item => {
                fieldAliases[item.name] = item.alias;
            });
            const list = features.map(item => {
                item.fieldAliases = fieldAliases;
                var graphic = new Graphic({
                    geometry: item.geometry,
                    symbol: {
                        type: "picture-marker",
                        url: `${server}/icon/other/${icon}.png`,
                        width: "30px",
                        height: "32px"
                    }
                });
                feature.graphics.add(graphic);
                return item;
            });
            context.map.add(feature);
            resolve(list);
        });
    });
}

/**
 * 服务叠加
 * @param {*} context 
 * @param {*} geometry
 * @param {*} id 
 * @param {*} icon 
 * @param {*} url 
 */
const addLinkFeature = (context, geometry, id, icon, url) => {
    return new Promise((resolve, reject) => {
        const _id = "xq_" + id;
        context.map &&
            context.map.findLayerById(_id) &&
            context.map.remove(context.map.findLayerById(_id));
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/layers/GraphicsLayer", "esri/Graphic"],
            OPTION
        ).then(async ([QueryTask, Query, GraphicsLayer, Graphic]) => {
            const feature = new GraphicsLayer({
                id: _id
            });
            const queryTask = new QueryTask({ url });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.geometry = geometry;
            const { fields, features } = await queryTask.execute(query);
            const fieldAliases = {};
            fields.map(item => {
                fieldAliases[item.name] = item.alias;
            });
            const list = features.map(item => {
                item.fieldAliases = fieldAliases;
                var graphic = new Graphic({
                    geometry: item.geometry,
                    symbol: {
                        type: "picture-marker",
                        url: `${server}/icon/other/${icon}.png`,
                        width: "30px",
                        height: "32px"
                    }
                });
                feature.graphics.add(graphic);
                return item;
            });
            context.map.add(feature);
            resolve(list);
        });
    });
};

/**
 * 小区详情面
 * @param {*} isOption 
 * @param {*} obj 
 */
export const xqDetail = (isOption, obj) => {
    const arr = [
        [
            "name@社区名称",
            "District@所属街道",
            "Extent@地址范围",
            "Phone@联系电话",
            "CommunityChargeMan@社区负责人",
            "VillageNumber@小区数量",
            "TotalHouseholds@总户数",
            "TotalNumber@总人数",
        ],
        "社区值班信息",
        [
            "name@社区名称",
            "Date@日期",
            "TimeRange@时间段",
            "OnDutyLeader@值班领导",
            "LeaderDuty@领导职务",
            "OnDutyStaff@值班人员",
            "StaffDuty@人员职务"
        ],
        "小区基本信息",
        [
            "VillageName@小区名称",
            "SSSQ@所属社区",
            "XQDZ@小区地址",
            "XQFW@小区范围",
            "XQZHS@小区总户数",
            "XQZDS@小区总栋数",
            "XQZRS@小区总人数",
            "WYFWQYMC@物业服务企业名称",
            "XQGLCFZR@小区管理处负责人",
            "XQGLCLXFS@小区管理处联系方式",
            "FGZXLXR@房管中心联系人",
            "FGZXLXDH@房管中心联系电话",
        ],
        "小区物业信息",
        [
            "VillageName@小区名称",
            "WYFWQYMC@小区物业服务企业名称",
            "BAZBQK@保安值班情况",
            "BALXFS@保安联系方式",
            "WYGLRYZBQK@物业管理人员值班情况",
            "WYGLRYLXFS@物业管理人员联系方式",
            "BADZ@保安队长",
            "BADZLXFS@保安队长联系方式",
        ],
        "小区卡口信息",
        [
            "VillageName@小区名称",
            "KKWZ@卡口位置@xq_enter_btn",
            "TWJSFDW@体温计是否到位",
            "KZSFDW@口罩是否到位",
            "YPSFDW@雨棚是否到位",
            "JCRKSFZZ@进出口证是否制作",
        ]
    ];
    const ra = arr
        .map(item => {
            return item instanceof Array
                ? `<table class="esri-widget__table"><tbody>${item
                    .map(o => {
                        const [val, label, btn] = o.split("@");
                        return `<tr>
                  <th class="esri-feature__field-header">${label}</th>
                  <td class="esri-feature__field-data">${
                            val ? (isOption ? `{${val}}` : obj[val] || "") : ""
                            }${btn ? `<span class="frameBtn xq_enter_btn" data-val="${obj.name}">详情</button>` : ``}</td>
                </tr>`;
                    })
                    .join("")}</tbody></table>`
                : `<p>${item}</p>`;
        })
        .join("");
    return ra;
}