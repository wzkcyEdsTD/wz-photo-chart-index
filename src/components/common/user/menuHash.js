/**
 * 权限菜单
 * 1.0后台未接入 先写死
 */
export const menuHash = {
  苍南县: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  洞头区: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  乐清市: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  龙港市: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  龙湾区: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  鹿城区: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  瓯海区: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  瓯江口集聚区: ["经济总图", "楼宇地图", "用地地图", "招商地图"],
  平阳县: ["招商地图"],
  瑞安市:[],
  泰顺县:[],
  文成县:[],
  永嘉县:[],
  浙南产业集聚区:[]
};
/**
 *  禁用子菜单
 */
export const fixMenuList = (list = []) => {
  const { au_username, group } = window.user;
  const _groups_ = group.map(item => {
    return item.au_groupname;
  });
  let premission = menuHash["游客"];
  for (let d in menuHash) {
    if (_groups_.includes(d)) {
      premission = premission.concat(menuHash[d]);
    }
  }
  const _premission_ = [...new Set(premission)];
  //  亩均论英雄额外判断
  _groups_.includes("亩均论英雄") && (window.user.rland = true);
  //  经济信息额外判断
  _groups_.includes("企业经济信息") && (window.user.rquota = true);
  return list.filter(item => {
    return ~_premission_.indexOf(item.label);
  });
};
