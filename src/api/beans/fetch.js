import { getDefaultAxios } from "@/api/index.js";
const RES = "sql_wzxgfy";

/**
 * [wz_blxxb]确诊病例\出院
 * @params 具体取各字段含义后续再补,没时间搞
 */
export const wz_qzjcysj = async () => {
  const axios = getDefaultAxios();
  const params = [
    "hzxm",
    "xq",
    "xb",
    "bz",
    "xjjd",
    "dzzssj",
    "cysj",
    "lcyzcd",
    "xqmmc",
    "xqmwym",
    "xzbq"
  ];
  const name = "wz_qzjcysj";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_blxxb]病例信息表
 */
export const wz_blxxb = async () => {
  const axios = getDefaultAxios();
  const params = ["id", "qx", "blxx", "gxsj"];
  const name = "wz_blxxb";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_bqztb]出院
 */
export const wz_bqztb = async () => {
  const axios = getDefaultAxios();
  const params = ["blxx", "qx", "bqwzqk", "cysj"];
  const name = "wz_bqztb";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_jdqdhbqb]乡镇街道红旗
 */
export const wz_jdqdhbqb = async () => {
  const axios = getDefaultAxios();
  const params = ["qx", "jd", "hbqqk", "hqzbq", "bqzhq"];
  const name =
    "(select * from wz_jdqdhbqb where gxsj = (select top 1 gxsj from wz_jdqdhbqb order by gxsj desc))";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_jdqdhbqb]小区确诊病例统计[暂无]
 */
export const u_xqqzbltjb = async () => {
  const params = ["jd", "jd", "hbqqk", "hqzbq", "bqzhq"];
  const name = "wz_jdqdhbqb";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_blxxb]热力图中的X.Y坐标数据
 */
export const wz_qzkjhzbb = async () => {
  const axios = getDefaultAxios();
  const params = ["sjc", "x", "y"];
  const name = "wz_qzkjhzbb";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_sfxxbb]三返人员
 */
export const wz_sfxxbb = async () => {
  const axios = getDefaultAxios();
  // const option = { "res": "sql_wzxgfy", "ds": [{ "dsid": "_", "schema": { "tables": [{ "alias": "a", "name": "wz_sfrxx", "x": "0", "y": "0" }], "join": [], "cols": [{ "name": "id", "field": "a.id", "type": "int" }, { "name": "qx_name", "field": "a.qx_name", "type": "string(50)" }, { "name": "qx_order", "field": "a.qx_order", "type": "string(50)" }, { "name": "qx_id", "field": "a.qx_id", "type": "string(50)" }, { "name": "xz_name", "field": "a.xz_name", "type": "string(50)" }, { "name": "xz_order", "field": "a.xz_order", "type": "string(50)" }, { "name": "xz_id", "field": "a.xz_id", "type": "string(50)" }, { "name": "qy_cnt", "field": "a.qy_cnt", "type": "string(50)" }, { "name": "sanfan_cnt", "field": "a.sanfan_cnt", "type": "string(50)" }, { "name": "sanfan_hb", "field": "a.sanfan_hb", "type": "string(50)" }, { "name": "liuwen_cnt", "field": "a.liuwen_cnt", "type": "string(50)" }, { "name": "liuwen_hb", "field": "a.liuwen_hb", "type": "string(50)" }, { "name": "quanfan_today", "field": "a.quanfan_today", "type": "string(50)" }, { "name": "quanfan_cnt", "field": "a.quanfan_cnt", "type": "string(50)" }, { "name": "huiwen_today_cnt", "field": "a.huiwen_today_cnt", "type": "string(50)" }, { "name": "huiwen_today_hb", "field": "a.huiwen_today_hb", "type": "string(50)" }, { "name": "huiwen_today_gl", "field": "a.huiwen_today_gl", "type": "string(50)" }, { "name": "huiwen_cnt", "field": "a.huiwen_cnt", "type": "string(50)" }, { "name": "huiwen_hb", "field": "a.huiwen_hb", "type": "string(50)" }, { "name": "huiwen_gl", "field": "a.huiwen_gl", "type": "string(50)" }, { "name": "weilai3", "field": "a.weilai3", "type": "string(50)" }, { "name": "gxsj", "field": "a.gxsj", "type": "datetime" }, { "name": "jhhw", "field": "a.jhhw", "type": "string(50)" }, { "name": "jhhw_hb", "field": "a.jhhw_hb", "type": "string(50)" }], "wherejson": [{ "index": 1, "field": "a.id", "comp": "$eq", "param": "id" }, { "index": 2, "field": "a.qx_name", "comp": "$like", "value": "", "param": "qx_name" }, { "index": 3, "field": "a.xz_name", "comp": "$like", "value": "", "param": "xz_name" }], "groupby": [], "orderby": [{ "index": 1, "field": "a.id", "order": "asc" }], "update": {}, "params": [{ "name": "qx_name", "type": "", "info": "" }, { "name": "xz_name", "type": "", "info": "" }] }, "editor": {}, "params": {} }] };
  // return await axios.post("/dw/datastores", option);
  const params = [
    "id",
    "qx_name",
    "qx_order",
    "qx_id",
    "xz_name",
    "xz_order",
    "xz_id",
    "qy_cnt",
    "sanfan_cnt",
    "sanfan_hb",
    "liuwen_cnt",
    "liuwen_hb",
    "quanfan_today",
    "quanfan_cnt",
    "huiwen_today_cnt",
    "huiwen_today_hb",
    "huiwen_today_gl",
    "huiwen_cnt",
    "huiwen_hb",
    "huiwen_gl",
    "weilai3",
    "gxsj",
    "jhhw",
    "jhhw_hb"
  ];
  const name = "view_newlastestsafanxx";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_fgfcxx]复工
 */
export const wz_fgfcxx = async () => {
  const axios = getDefaultAxios();
  // const option = { "res": "sql_wzxgfy", "ds": [{ "dsid": "_", "schema": { "tables": [{ "alias": "a", "name": "wz_sfrxx", "x": "0", "y": "0" }], "join": [], "cols": [{ "name": "id", "field": "a.id", "type": "int" }, { "name": "qx_name", "field": "a.qx_name", "type": "string(50)" }, { "name": "qx_order", "field": "a.qx_order", "type": "string(50)" }, { "name": "qx_id", "field": "a.qx_id", "type": "string(50)" }, { "name": "xz_name", "field": "a.xz_name", "type": "string(50)" }, { "name": "xz_order", "field": "a.xz_order", "type": "string(50)" }, { "name": "xz_id", "field": "a.xz_id", "type": "string(50)" }, { "name": "qy_cnt", "field": "a.qy_cnt", "type": "string(50)" }, { "name": "sanfan_cnt", "field": "a.sanfan_cnt", "type": "string(50)" }, { "name": "sanfan_hb", "field": "a.sanfan_hb", "type": "string(50)" }, { "name": "liuwen_cnt", "field": "a.liuwen_cnt", "type": "string(50)" }, { "name": "liuwen_hb", "field": "a.liuwen_hb", "type": "string(50)" }, { "name": "quanfan_today", "field": "a.quanfan_today", "type": "string(50)" }, { "name": "quanfan_cnt", "field": "a.quanfan_cnt", "type": "string(50)" }, { "name": "huiwen_today_cnt", "field": "a.huiwen_today_cnt", "type": "string(50)" }, { "name": "huiwen_today_hb", "field": "a.huiwen_today_hb", "type": "string(50)" }, { "name": "huiwen_today_gl", "field": "a.huiwen_today_gl", "type": "string(50)" }, { "name": "huiwen_cnt", "field": "a.huiwen_cnt", "type": "string(50)" }, { "name": "huiwen_hb", "field": "a.huiwen_hb", "type": "string(50)" }, { "name": "huiwen_gl", "field": "a.huiwen_gl", "type": "string(50)" }, { "name": "weilai3", "field": "a.weilai3", "type": "string(50)" }, { "name": "gxsj", "field": "a.gxsj", "type": "datetime" }, { "name": "jhhw", "field": "a.jhhw", "type": "string(50)" }, { "name": "jhhw_hb", "field": "a.jhhw_hb", "type": "string(50)" }], "wherejson": [{ "index": 1, "field": "a.id", "comp": "$eq", "param": "id" }, { "index": 2, "field": "a.qx_name", "comp": "$like", "value": "", "param": "qx_name" }, { "index": 3, "field": "a.xz_name", "comp": "$like", "value": "", "param": "xz_name" }], "groupby": [], "orderby": [{ "index": 1, "field": "a.id", "order": "asc" }], "update": {}, "params": [{ "name": "qx_name", "type": "", "info": "" }, { "name": "xz_name", "type": "", "info": "" }] }, "editor": {}, "params": {} }] };
  // return await axios.post("/dw/datastores", option);
  const params = [
    "id", //序号
    "dept_id", //部门id
    "area1", //乡镇街道
    "area2", //县
    "ysq_qy_cnt", //申请企业数总数
    "ysq_gsqy_cnt", //申请企业数总数规（限）上数
    "ysq_tzyygc_cnt", //申请企业数总数投资超过1亿元工程数
    "ysq_snfgrs_cnt", //申请返工员工数市内
    "ysq_swfgrs_cnt", //申请返工员工数市外
    "ysq_ygqs_cnt", //申请返工员工数员工亲属
    "batg_qy_cnt", //备案通过企业数总数
    "batg_gsqy_cnt", //备案通过企业数总数规（限）上数
    "batg_tzyygc_cnt", //备案通过企业数总数投资超过1亿元工程数
    "batg_snfgrs_cnt", //备案通过返工员工数市内
    "batg_swfgrs_cnt", //备案通过返工员工数市外
    "batg_ygqs_cnt", //备案通过返工员工数员工亲属
    "gxsj", //更新时间
    "ysq_snfg_green_cnt",
    "ysq_snfg_yellow_cnt",
    "ysq_snfg_red_cnt"
  ];
  const name = "view_latsestfgspb";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_blxxb]趋势数据
 */
export const view_qzcytjz = async () => {
  const axios = getDefaultAxios();
  const params = [
    "xq",
    "date",
    "累计确诊人数",
    "治愈累积量",
    "当日新增确诊",
    "当日新增出院",
    "当日重症"
  ];
  const name = "view_qzcytjz";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * [wz_blxxb]温州市区每日确诊治愈数
 */
export const view_zytj = async () => {
  const axios = getDefaultAxios();
  const params = ["date", "累计确诊人数", "治愈累积量", "治愈率"];
  const name = "view_zytj";
  return await axios.post("/dw/ds", option_concat(name, params));
};

/**
 * 配置
 * @param {*} name
 * @param {*} cols
 * @param {*} where
 * @param {*} count
 */
const option_concat = (name, cols, where = "", count) => {
  const option = {
    module: "dwbean",
    action: "001",
    res: RES,
    ds: {
      buffers: [],
      tables: [{ alias: "f", orm: "", name, updateflag: 1 }],
      cols: cols.map(item => {
        return { name: item, raw: `f.${item}` };
      }),
      module: RES,
      where
    }
  };
  count && (option.count = count);
  return option;
};
