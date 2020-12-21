<template>
	<div class="ziyuan">
		<div id="ziyuan-echarts"></div>
		<JieDaoData :tableData="ziYuanData.tableData" :tableHead="['名称', '房间数量', '隔离人员', '空余房间']" style="padding: 22px 0 0;"></JieDaoData>
	</div>
</template>
<script>
import JieDaoData from './JieDaoData.vue';
export default {
	name: 'zi-yuan',
	props: {
		ziYuanData: {
			type: Object,
			default: function () {
				return {
					echartData: [],
					homeNum: 0,
					tableData: []
				}
			}
		}
	},
	components: {
		JieDaoData
	},
	data () {
		return {
			myChart: null
		}
	},
	methods: {
		drawEcharts () {
			let homes = this.ziYuanData.homeNum;
			let echartData = this.ziYuanData.echartData;
			let total = 0; //考生总数量
			echartData.forEach(function(value, index, array) {
			    total += value.value;
			});
			let rich = {
			    yellow: {
			        color: "#ffc72b",
			        fontSize: 14,
			        align: 'center'
			    },
			    blue: {
			        color: '#000',
			        fontSize: 14,
			        padding: [5, 0],
			        align: 'center'
			    },
			    purple: {
			        color: '#7E47FF',
			        fontSize: 24,
			        align: 'center'
			    }
			}
			let option = {
				grid: {
					left: 0,
					right: 0,
					bottom: 0,
					top: 0
				},
			    title: {
			        text: ['{purple|' + homes + '}家'].join(''),
			        textStyle: {
			            rich: rich,
			            fontSize: 16,
			            color: '#000'
			        },
			        left:'center',
			        top:'40%',
			        subtext: ['{purple|'+ total +'}','间'].join(''),
			        subtextStyle: {
			            rich: rich,
			            fontSize: 16,
			            color: '#000'
			        },
			    },
			    legend: {
			        right: 10,
			        bottom: 5,
			        data: echartData,
			        textStyle: {
			            color: '#000',
			            fontSize: 12,
			        }
			    },
			    series: [{
			        name: '总考生数量',
			        type: 'pie',
			        radius: ['34%', '55%'],
			        color: ['#FD5916', '#7E47FF',],
			        label: {
			            normal: {
			                formatter: function(params, ticket, callback) {
			                    var percent = 0;
			                    percent = ((params.value / total) * 100).toFixed(1);
			                    return '{blue|' + percent + '%}\n{yellow|' + params.value + '}';
			                },
			                rich: rich
			            },
			        },
			        labelLine: {
			            normal: {
			                length: 30,
			                length2: 20,
			                lineStyle: {
			                    color: '#767376'
			                }
			            }
			        },
			        data: echartData
			    }]
			};
			this.myChart.setOption(option);
		},
	},
	mounted () {
		// 解决display为none时 echarts显示的问题
		$("#ziyuan-echarts").css({"width":$(".yq-mobile-body").width() - 26,"height":$("#ziyuan-echarts").height()});
		this.myChart = this.$echarts.init(document.getElementById('ziyuan-echarts'));
		this.drawEcharts();
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
	.ziyuan {
		width: 100%;
		box-sizing: border-box;
		padding: 15px 13px;
	}
	#ziyuan-echarts {
		width: 100%;
		height: toY(319);
		background:rgba(250,250,250,1);
		border:1px solid rgba(192,187,187,1);
		box-sizing: border-box;
		position: relative;
	}
	#ziyuan-echarts::before {
		content: "鹿城隔离点房间数据";
		position: absolute;
		left: toX(15);
		top: toY(10);
		z-index: 5;
		font-size: 14px;
		font-weight: 600;
		color:rgba(0,0,0,1);
	}
</style>