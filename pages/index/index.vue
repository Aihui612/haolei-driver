<template>
	<view class="order">
		<view class="top_item">
			<view class="tip" :class="{ active: type == 1 }" @click="gotype(1)">新订单</view>
			<view class="tip" :class="{ active: type == 3 }" @click="gotype(3)">已接单</view>
			<view class="tip" :class="{ active: type == 6 }" @click="gotype(6)">取车中</view>
			<view class="tip" :class="{ active: type == 12 }" @click="gotype(12)">检测中</view>
			<view class="tip" :class="{ active: type == 18 }" @click="gotype(18)">送车中</view>
			<view class="tip" :class="{ active: type == 21 }" @click="gotype(21)">已完成</view>
			<view class="tip" :class="{ active: type == 0 }" @click="gotype(0)">全部</view>
		</view>
		<view class="list" v-if="datalist.length">
			<view class="orderlist" :class="{ type: item.orderState == 21 }" v-for="(item, index) in datalist" :key="index">
				<view class="name" @click="goorder(item.id)">
					代驾审车
					<text v-if="item.orderState == 3">已接单</text>
					<text v-if="item.orderState == 6">取车中</text>
					<text v-if="item.orderState == 12">检测中</text>
					<text v-if="item.orderState == 18">送车中</text>
					<text v-if="item.orderState == 21">已完成</text>
				</view>
				<view class="msg" @click="goorder(item.id)">
					<text>车牌号</text>
					{{ item.carNum }}
				</view>
				<view class="msg" @click="goorder(item.id)">
					<text>车辆类型</text>
					{{ cuttype(item.carType, item.useType) }}
				</view>
				<view class="msg" @click="goorder(item.id)">
					<text>取车位置</text>
					{{ item.pickAddr }}
				</view>
				<view class="msg" @click="goorder(item.id)" v-if="item.orderState == 1">
					<text>取车距离</text>
					{{ item.distance }}(KM)
				</view>
				<view class="grab" @click="grab(item.id)" v-if="type == 1">抢单</view>
				<view class="grab" @click="grab1(item.id)" v-if="item.orderState == 3">去取车</view>
				<view class="grab" @click="grab2(item.id)" v-if="item.orderState == 6">取车</view>
				<view class="grab" @click="grab3(item.id)" v-if="item.orderState == 12">送车</view>
				<view
					class="grab"
					@click="
						$refs.popup.open();
						id = item.id;
					"
					v-if="item.orderState == 18"
				>
					还车
				</view>
			</view>
		</view>
		<view class="more" v-else>
			<image src="../../static/images/index_bg2.png" mode=""></image>
			<view class="no">
				<view class="title">未获取到订单</view>
				<view class="msg">
					足不出户，上门接送；省时省力，审车无忧。
					<br />
					代驾审车，让您的时间变得更有意义！
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="flex-item tab_order">
				<image src="../../static/images/item6.png"></image>
				<view class="title">订单</view>
			</view>
			<view class="flex-item tab_my" @click="goindex('/pages/index/my')">
				<image src="../../static/images/item7.png"></image>
				<view class="title">我的</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog" class="tipinput">
			<uni-popup-dialog mode="input" :duration="2000" @confirm="confirm" title="还车码" placeholder="请输入还车码"  maxlength="6" ></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { UniIcons } from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
import order from '../../servers/order.js';
export default {
	components: { UniIcons, uniPopup, uniPopupMessage, uniPopupDialog },
	data() {
		return {
			datalist: [],
			type: 1,
			queryform: {
				pageNum: 1,
				pageSize: 10
			},
			id: 0,
			more: true,
			time_i:0,
			show:true
		};
	},
	onReachBottom() {
		var Authorization = uni.getStorageSync('Authorization');
		if(Authorization&&Authorization!='undefined'){
			if (this.more) {
				this.queryform.pageNum += 1;
				if (this.type != 1) {
					this.getorder();
				} else {
					this.getdata();
				}
			}
		}else{
			uni.navigateTo({
			    url: '/pages/index/login'
			});
		}
	},
	onLoad() {
		uni.hideTabBar()
	},
	mounted() {
		// var Authorization = uni.getStorageSync('Authorization');
		// if(!Authorization&&Authorization=='undefined'){
		// 	uni.navigateTo({
		// 	    url: '/pages/index/login'
		// 	});
		// }
		
		
	},
	onHide(){
		this.show=false
	},
	onShow(){
		this.show=true
		this.queryform.pageNum = 1;
		this.datalist=[]
		if (this.type != 1) {
			this.getorder();
		} else {
			this.getdata();
		}
	},
	methods: {
		getdata() {
			this.time_i=60
			this.settime()
			order.grabOrderList(this.queryform).then(res => {
				res.data.rows.map(v => {
					this.datalist.push(v);
				});
				if (this.datalist.length == res.data.total) {
					this.more = false;
				}
			});
		},
		settime(){
			var _this = this
			if(this.type == 1&&this.shows){
				if(this.time_i>0){
					this.time_i-=1
					setTimeout(function(){
						_this.settime()
					},1000)
				}else{
					this.datalist=[]
					this.queryform.pageNum = 1;
					this.getdata();
				}
			}
		},
		grab(e) {
			order.grabOrder(e).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				this.datalist = [];
				this.getdata();
			});
		},
		grab1(e) {
			order.goPickCar(e).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				this.datalist = [];
				this.getorder();
			});
		},
		grab2(e) {
			uni.navigateTo({
				url: '../list/pick?id=' + e
			});
		},
		grab3(e) {
			order.goCar(e).then(res => {
				this.datalist = [];
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				this.getorder();
			});
		},
		grab4(e, c) {
			var da = {
				id: e,
				code: c
			};
			order.returnCar(da).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				this.datalist = [];
				this.getorder();
			});
		},
		getorder() {
			var da = {
				pageNum: this.queryform.pageNum,
				pageSize: this.queryform.pageSize,
				type: this.type
			};
			order.order(da).then(res => {
				res.data.rows.map(v => {
					this.datalist.push(v);
				});
				if (this.datalist.length == res.data.total) {
					this.more = false;
				}
			});
		},
		goindex(e){
			uni.switchTab({
				url: e
			});
		},
		confirm(done, value) {
			// 输入框的值
			console.log(value);
			if (value) {
				this.grab4(this.id, value);
			} else {
				uni.showToast({
					title: '请输入还车码',
					icon: 'none'
				});
			}
			// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			// ...
			done();
		},
		goorder(e) {
			uni.navigateTo({
				url: '../list/order?id=' + e
			});
		},
		cuttype(e, a) {
			if (a == 1) return '非运营' + e;
			if (a == 2) return '运营' + e;
		},

		gotype(e) {
			if (this.type != e) {
				this.datalist = [];
				this.queryform = {
					pageNum: 1,
					pageSize: 10
				};
				this.type = e;
				this.more = true;
				if (e != 1) {
					this.getorder();
				} else {
					this.getdata();
				}
			}
		},
		go(e) {
			console.log(e);
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="less" scoped>
.order {
	color: #ffffff;
	.top_item {
		position: fixed;
		top: 44px;
		// #ifdef MP-WEIXIN
		top: 0;
		// #endif
		left: 0;
		z-index: 9;
		display: flex;
		width: 100%;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		.tip {
			flex: 1;
			font-size: 26rpx;
			font-weight: 600;
		}
		.active {
			position: relative;
			color: #ffe471;
		}
		.active:before {
			content: ' ';
			position: absolute;
			bottom: 0;
			width: 80rpx;
			height: 5rpx;
			background: #ffe471;
			border-radius: 10rpx;
		}
	}
	.list {
		position: relative;
		padding: 110rpx 25rpx 150rpx;
		.orderlist {
			width: 620rpx;
			height: 350rpx;
			background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
			border-radius: 16rpx;
			margin-top: 30rpx;
			padding: 40rpx;
			.name {
				font-size: 32rpx;
				font-weight: 600;
				border-bottom: 1px solid #94a1b8;
				height: 62rpx;
				text {
					float: right;
					font-size: 26rpx;
					font-weight: 400;
					color: #ffe471;
				}
			}
			.msg {
				line-height: 55rpx;
				font-size: 26rpx;
				font-weight: 400;
				text {
					width: 150rpx;
					display: inline-block;
				}
			}
			.grab {
				width: 126rpx;
				height: 50rpx;
				background: #ffe471;
				border-radius: 27rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #4e6792;
				line-height: 50rpx;
				float: right;
				text-align: center;
				margin-top: 15rpx;
			}
		}
		.type {
			height: 220rpx;
		}
	}
	.more {
		text-align: center;
		color: #fff;
		image {
			width: 100vw;
			height: 100vw;
		}
		.no {
			position: relative;
			z-index: 9;
			margin: -135rpx auto 0;
			width: 620rpx;
			border-radius: 20rpx;
			padding: 40rpx;
			background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
			.title {
				font-size: 32rpx;
			}
			.msg {
				margin: 40rpx 0;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
	}
	.tab_order .title {
		opacity: 1;
	}
	.tipinput {
		color: #333;
	}
}
</style>
