<template>
	<div class="yq-mobile">
		<div class="yq-mobile-bg">
			<div class="yq-mobile-bg-title">鹿城区疫情防控指挥平台</div>
			<div class="yq-mobile-bg-subtitle">肺炎疫情实时动态播报</div>
		</div>
		<div class="yq-mobile-zl">
			<div class="zl-title">数据总览 <span class="jz-time">截至{{ jzsj }}</span></div>
			<div class="control-view-title">
	            <div class="control-view-bl">
	                <div class="control-view-bl-head">
	                    <div class="control-view-bl-head-left" id="bg1"></div>
	                    <div class="control-view-bl-head-right">
	                        确诊病例 <br>
	                        <span class="control-view-bl-head-right-span" style="color: #fa5350;">{{ viewData.quezhen.value }}</span>例
	                    </div>
	                </div>
	                <div class="control-view-bl-body">
	                    <div>今日新增 <span>{{ viewData.quezhen.add }}</span></div>
	                    <div>温州占比 <span>{{ viewData.quezhen.percent }}</span></div>
	                </div>
	            </div>
	            <div class="control-view-bl">
	                <div class="control-view-bl-head">
	                    <div class="control-view-bl-head-left" id="bg2"></div>
	                    <div class="control-view-bl-head-right">
	                        疑似病例 <br>
	                        <span class="control-view-bl-head-right-span" style="color: #fa5350;">{{ viewData.yisi.value }}</span>例
	                    </div>
	                </div>
	                <div class="control-view-bl-body">
	                    <div>今日新增 <span>{{ viewData.yisi.add }}</span></div>
	                    <div>温州占比 <span>{{ viewData.yisi.percent }}</span></div>
	                </div>
	            </div>
	            <div class="control-view-bl">
	                <div class="control-view-bl-head">
	                    <div class="control-view-bl-head-left" id="bg3"></div>
	                    <div class="control-view-bl-head-right">
	                        治愈病例 <br>
	                        <span class="control-view-bl-head-right-span" style="color: #00b87a;">{{ viewData.zhiyu.value }}</span>例
	                    </div>
	                </div>
	                <div class="control-view-bl-body">
	                    <div>今日新增 <span>{{ viewData.zhiyu.add }}</span></div>
	                    <div>温州占比 <span>{{ viewData.zhiyu.percent }}</span></div>
	                </div>
	            </div>
	            <div class="control-view-bl">
	                <div class="control-view-bl-head">
	                    <div class="control-view-bl-head-left" id="bg4">

	                    </div>
	                    <div class="control-view-bl-head-right">
	                        死亡病例 <br>
	                        <span class="control-view-bl-head-right-span" style="color: #7E7E7E;">{{ viewData.siwang.value }}</span>例
	                    </div>
	                </div>
	                <div class="control-view-bl-body">
	                    <div>今日新增 <span>{{ viewData.siwang.add }}</span></div>
	                    <div>温州占比 <span>{{ viewData.siwang.percent }}</span></div>
	                </div>
	            </div>
	        </div>
	        <div class="zl-desc">
	        	<div class="zl-desc-li">病毒传染源：<span>新型冠状病毒2019-nCoV</span></div>
	        	<div class="zl-desc-li">传染途径：<span>存在人传人</span></div>
	        	<div class="zl-desc-li">发热门诊/定点医院（温州市） <div class="search-button"></div></div>
	        </div>
		</div>
		<div class="yq-mobile-body" style="background: #F6F6F6;">
			<ul class="yq-tab-head">
				<li v-for="(value, index) of tabHead" :class="[value.value === tabActive ? 'current-tab' : '']" :key="index" @click="changeTab(value.value)">{{ value.key }}<span class="tab-split" v-if="value.value === tabActive"></span></li>
			</ul>
			<div class="yq-tab-content">
				<mt-tab-container v-model="tabActive" :swipeable="true">
				  <mt-tab-container-item id="tab-1">
				  	<YQMap :yqMapData="yqMapData"></YQMap>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="tab-2">
				  	<JieDaoData :tableData="jieDaoTable" :tableHead="['街道名称', '确诊病例', '疑似病例', '治愈病例', '死亡病例']"></JieDaoData>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="tab-3">
				  	<ZiYuan :ziYuanData="ziYuanData" ref="ziyuan"></ZiYuan>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="tab-4">
				  	<FangKong :fangKongData="fangKongData"></FangKong>
				  </mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
	</div>
</template>
<script>
import JieDaoData from './JieDaoData.vue';
import FangKong from './FangKong.vue';
import ZiYuan from './ZiYuan.vue';
import YQMap from './YQMap.vue';
export default {
	name: 'yq-mobile',
	components: {
		JieDaoData,
		FangKong,
		ZiYuan,
		YQMap
	},
	data () {
		return {
			tabActive: 'tab-1',
			tabHead: [
				{
					key: '疫情地图',
					value: 'tab-1'
				},
				{
					key: '街道数据',
					value: 'tab-2'
				},
				{
					key: '资源总览',
					value: 'tab-3'
				},
				{
					key: '防控区域',
					value: 'tab-4'
				}
			],
			jzsj: '2020-02-03 24：00', // 截止时间
			viewData: {  // 疫情总览
		        tableData: [
		          {
		            key: "医院发热待查",
		            value: ["15", "0", "-"]
		          },
		          {
		            key: "社区发热待查",
		            value: ["7", "0", "-"]
		          },
		          {
		            key: "居家隔离人员",
		            value: ["2416", "0", "-"]
		          },
		          {
		            key: "密切接触者",
		            value: ["282", "0", "-"]
		          }
		        ],
		        quezhen: {
		          value: 41,
		          add: 4,
		          percent: "-"
		        },
		        yisi: {
		          value: 18,
		          add: 13,
		          percent: "-"
		        },
		        zhiyu: {
		          value: 1,
		          add: 0,
		          percent: "-"
		        },
		        siwang: {
		          value: 0,
		          add: 0,
		          percent: "-"
		        }
		    },
		    jieDaoTable: [  // 街道数据
		        {
		          key: "五马街道",
		          value: ["3", "3", "0", "1"]
		        },
		        {
		          key: "广化街道",
		          value: ["0", "0", "1", "0"]
		        },
		        {
		          key: "大南街道",
		          value: ["7", "1", "1", "0"]
		        },
		        {
		          key: "松台街道",
		          value: ["3", "6", "6", "1"]
		        },
		        {
		          key: "滨江街道",
		          value: ["0", "4", "1", "0"]
		        },
		        {
		          key: "蒲鞋市街道",
		          value: ["1", "1", "1", "0"]
		        },
		        {
		          key: "南汇街道",
		          value: ["11", "3", "2", "0"]
		        },
		        {
		          key: "双屿街道",
		          value: ["1", "2", "0", "0"]
		        },
		        {
		          key: "七都街道",
		          value: ["0", "0", "0", "0"]
		        },
		        {
		          key: "仰义街道",
		          value: ["0", "1", "0", "0"]
		        },
		        {
		          key: "丰门街道",
		          value: ["0", "0", "0", "0"]
		        },
		        {
		          key: "南郊街道",
		          value: ["2", "0", "1", "0"]
		        },
		        {
		          key: "藤桥镇街道",
		          value: ["6", "0", "1", "5"]
		        },
		        {
		          key: "山福镇街道",
		          value: ["0", "0", "0", "0"]
		        }
		    ],
		    ziYuanData: { // 资源总览数据
		    	echartData: [{
				    value: 1300,
				    name: '已使用房间'
				}, {
				    value: 3157,
				    name: '剩余房间'
				}],
				homeNum: 14,
				tableData: [
                    {
                        key: '大宅门宾馆',
                        value: ['77', '0', '77']
                    },
                    {
                        key: '唯乐创意酒店',
                        value: ['46', '46', '2']
                    },
                    {
                        key: '锦江之星',
                        value: ['80', '30', '50']
                    },
                    {
                        key: '新国贸大酒店',
                        value: ['140', '0', '140']
                    },
                    {
                        key: '金丝桥瑞都商旅酒店',
                        value: ['61', '42', '29']
                    },
                    {
                        key: '聚商连锁酒店',
                        value: ['27', '3', '24']
                    },
                    {
                        key: '锐思特（飞霞路店）',
                        value: ['50', '0', '50']
                    },
                    {
                        key: '瑞都酒店',
                        value: ['72', '70', '7']
                    },
                    {
                        key: '锐思特（飞霞路店）',
                        value: ['80', '50', '47']
                    },
                    {
                        key: '威斯顿时尚酒店',
                        value: ['50', '58', '0']
                    },
                    {
                        key: '众豪酒店',
                        value: ['50', '10', '23']
                    },
                    {
                        key: '瑞都连锁酒店',
                        value: ['63', '39', '31']
                    },
                    {
                        key: '普尔顿酒店',
                        value: ['69', '0', '69']
                    },
                    {
                        key: '百思快捷宾馆',
                        value: ['35', '30', '21']
                    },
                    {
                        key: '新生代员工宿舍',
                        value: ['75', '0', '75']
                    },
                    {
                        key: '双屿欣悦宾馆',
                        value: ['51', '9', '42']
                    },
                    {
                        key: '好万家公寓',
                        value: ['70', '0', '70']
                    },
                    {
                        key: '龙城宾馆',
                        value: ['37', '34', '3']
                    },
                ]
		    },
		    fangKongData: [  // 防控数据
                {name: '商场超市', num: 24, img: require('./img/商场.png')},
                {name: '农贸市场', num: 41, img: require('./img/农贸市场.png')},
                {name: '培训机构', num: 4, img: require('./img/培训机构.png')},
                {name: '健身房', num: 28, img: require('./img/健身房.png')},
                {name: '城市书房', num: 93, img: require('./img/书房.png')},
                {name: '旅游酒店', num: 14, img: require('./img/酒店.png')},
                {name: '学校', num: 26, img: require('./img/学校.png')},
                {name: '专业市场', num: 10, img: require('./img/市场.png')},
                {name: '天基宗教', num: 91, img: require('./img/教堂.png')},
                {name: '佛道宗教', num: 110, img: require('./img/佛.png')} 
            ],
            yqMapData: { // 疫情地图数据
            	dates: ['1.21', '1.22', '1.23', '1.24', '1.25', '1.26', '1.27', '1.28', '1.29', '1.30'],
                lineData: {
                    qz: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    ys: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    zy: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                    sw: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
                mapData: [
	                {name: '山福镇', value: 1},
	                {name: '南郊', value: 1},
	                {name: '南汇', value: 2},
	                {name: '蒲鞋市', value: 3},
	                {name: '大南', value: 4},
	                {name: '广化', value: 1},
	                {name: '滨江', value: 1},
	                {name: '五马', value: 2},
	                {name: '松台', value: 3},
	                {name: '双屿', value: 1},
	                {name: '丰门', value: 0},
	                {name: '仰义', value: 1},
	                {name: '藤桥镇', value: 3},
	                {name: '七都', value: 2}
	            ]
            }
		}
	},
	methods: {
		// 切换tab
		changeTab (active) {
			if (this.tabActive === active) return;
			this.tabActive = active;
		}
	},
	beforeCreate () {
		this.$parent.showHeader = false; // 关闭头部
	},
	created () {

	},
	mounted () {

	}
}
</script>
<style scoped lang="scss">
	$baseWidth: 375;
	$baseHeight: 667;

	@function toX($px) {
		@return $px*100/$baseWidth * 1vw;
	}
	@function toY($px) {
		@return $px*100/$baseHeight * 1vh;
	}
	.yq-mobile {
		width: 100%;
		height: 100%;
		padding-bottom: 20px;
		box-sizing: border-box;
		overflow: auto;
		position: relative;
	}
	.yq-mobile-bg {
		width: 100%;
		height: toY(180);
		padding: 0 toX(17);
		box-sizing: border-box;
		background: url(./img/mobile_bg.png) 0 0 no-repeat;
		background-size: 100% 100%;
		text-align: left;
	}
	.yq-mobile-bg-title {
		font-size: 24px;
		padding-top: toY(38);
		font-weight: bold;
		color: #fff;
		margin-bottom: 5px;
	}
	.yq-mobile-bg-subtitle {
		font-size:18px;
		color: #fff;
		display: inline-block;
		padding: 3px toX(13);
		font-weight:bold;
		background:rgba(75,75,216,1);
	}
	.yq-mobile-zl {
		background: #fff;
		padding: 0 toX(9);
		margin: 0 toX(13);
		margin-top: toY(-60);
		box-shadow:0px 1px 6px 0px rgba(214,213,213,0.78);
		border-radius: 6px;
	}
	.zl-title {
		padding: 15px 0;
		text-align: left;
		width: 100%;
		font-size: 14px;
		font-weight: bold;
		color: rgba(0,0,0,1);
	}
	.zl-title::before {
		content: "";
		width: 9px;
		height: 9px;
		background: #4B4BD8;
		display: inline-block;
		margin-right: 7px;
	}
	.jz-time {
		margin-left: 11px;
		font-size:11px;
		font-weight:bold;
		color:rgba(168,168,168,1);
	}
	.control-view-title {
        display: flex;
        margin-bottom: 16px;
        justify-content: space-between;
    }
    .control-view-bl {
        width: 24%;
    }

    .control-view-bl-head {
        overflow: hidden;
        text-align: center;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .control-view-bl-head-left {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: sub;
    }

    #bg1 {
        background: url('./img/4.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg2 {
        background: url('./img/4.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg3 {
        background: url('./img/3.png') center center no-repeat;
        background-size: 100% 100%;
    }

    #bg4 {
        background: url('./img/5.png') center center no-repeat;
        background-size: 100% 100%;
    }

    .control-view-bl-head-right {
        text-align: right;
        color: #000;
        font-weight: bold;
        font-size: 10px;
    }

    .control-view-bl-head-right-span {
        font-size: 24px;
        font-weight: bold;
    }

    .control-view-bl-body {
    	padding: 8px 0;
        background: rgba(41,82,180,0.08);
        text-align: center;
        font-size: 14px;
        box-sizing: border-box;
        color: #000;
    }
    .control-view-bl-body span {
    	font-weight: bold;
    }
    .zl-desc {
    	text-align: left;
    	border-top: 1px solid #BFBFBF;
    	padding: 14px 0 2px;
    }
    .zl-desc-li {
    	font-size: 12px;
		color: #000;
		overflow: hidden;
		margin-bottom: 16px;
    }
    .zl-desc-li > span {
    	font-weight: bold;
    }
    .zl-desc-li::before {
    	content: "";
    	display: inline-block;
    	width:5px;
		height:5px;
		background:rgba(75,75,216,1);
		border-radius:50%;
		margin-right: 7px;
		vertical-align: middle;
    }
    .search-button {
    	float: right;
    	width:74px;
		height:24px;
		background: url(./img/search.png) center no-repeat;
		background-size: 100% 100%;
    }
    .yq-tab-head {
    	margin: 20px 0 10px;
    	width: 100%;
    	height: 30px;
    	line-height: 30px;
    	padding: 2px 0;
    	background: #fff;
    	list-style: none;
    	overflow: hidden;
    }
    .yq-tab-head li {
    	float: left;
    	font-weight: 400;
    	width: 25%;
    	font-size: 14px;
		font-weight: 400;
		color: #000;
		position: relative;
    }
    .yq-tab-head li.current-tab {
    	color: #4B4BD8;
    }
    .yq-tab-head li.current-tab .tab-split {
    	position: absolute;
    	bottom: 0;
    	width: toX(39);
		height:2px;
		background:rgba(75,75,216,1);
		border-radius:1px;
		left: 50%;
		transform: translateX(-50%);
    }
    .yq-tab-content {
    	background: #fff;
    	width: 100%;
    }
</style>