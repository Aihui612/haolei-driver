<template>
	<view class="wallet">
		<view class="top">
			<image src="../../static/images/wallet_bg.png" mode=""></image>
			<view class="name">
				{{ msg.driverName }}
				<image :src="cutimg(msg.driverAvator)" alt="" v-if='msg.driverAvator'/>
				<image src="@/static/images/headportrait.png" alt="" v-else/>
			</view>
		</view>
		<view class="price">
			<view class="list">
				累计总金额
				<text>{{ msg.totalAmount }}</text>
			</view>
			<view class="list">
				可提现金额
				<text>{{ msg.avaAmount }}</text>
			</view>
			<view class="withdraw" @click="go('withdraw')">提现</view>
		</view>
		<view class="detail">
			<view class="detail_item">
				<view class="detail_list" :class="{ active: type == 1 }" @click="gotype(1)">提现记录</view>
				<view class="detail_list" :class="{ active: type == 2 }" @click="gotype(2)">账单明细</view>
			</view>
			<view class="from" v-if="type == 1">
				<view class="th">
					<view class="td">序号</view>
					<view class="td">金额</view>
					<view class="td">提现时间</view>
					<view class="td">审核结果</view>
				</view>
				<view class="tb" v-for="(item, index) in listWithdraw" :key="index">
					<view class="td">{{ index + 1 }}</view>
					<view class="td">{{ item.amount }}</view>
					<view class="td">{{ item.gmtTime.substring(0, 10) }}</view>
					<view class="td" v-if="item.state == 1">待审核</view>
					<view class="td" v-if="item.state == 2">审核失败</view>
					<view class="td" v-if="item.state == 3">审核通过</view>
					<view class="td" v-if="item.state == 4">打款中</view>
					<view class="td" v-if="item.state == 5">提现成功</view>
					<view class="td" v-if="item.state == 6">提现失败</view>
				</view>
			</view>
			<view class="from" v-else>
				<view class="th">
					<view class="td">序号</view>
					<view class="td">金额</view>
					<view class="td">提现时间</view>
					<view class="td">类型</view>
				</view>
				<view class="tb" v-for="(item, index) in listAccout" :key="index">
					<view class="td">{{ index + 1 }}</view>
					<view class="td">{{ item.amount }}</view>
					<view class="td">{{ item.gmtTime.substring(0, 10) }}</view>
					<view class="td" v-if="item.billType == 1">入账</view>
					<view class="td" v-if="item.billType == 2">出账</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import my from '../../servers/my.js';
export default {
	data() {
		return {
			type: 1,
			msg: [],
			listWithdraw: [],
			listAccout: [],
			queryform: {
				pageNum: 1,
				pageSize: 10
			},
			more: true
		};
	},
	onShow() {
		this.queryform.pageNum= 1
		this.getdata();
		this.getWithdraw();
	},
	onReachBottom() {
		if (this.more) {
			this.queryform.pageNum += 1;
			if (this.type == 1) {
				this.getWithdraw();
			} else {
				this.getlistAccout();
			}
		}
	},
	methods: {
		cutimg(e) {
			if (e) {
				return this.imgUrl + e;
			}else{
				return ''
			}
		},
		getdata() {
			my.driveraccount().then(res => {
				this.msg = res.data;
			});
		},
		getWithdraw() {
			my.listWithdraw(this.queryform).then(res => {
				res.data.rows.map(v => {
					this.listWithdraw.push(v);
				});
				if (res.data.total = this.listWithdraw.length) {
					this.more = false;
				}
			});
		},
		getlistAccout() {
			my.listAccout(this.queryform).then(res => {
				res.data.rows.map(v => {
					this.listAccout.push(v);
				});
				if (res.data.total = this.listAccout.length) {
					this.more = false;
				}
			});
		},
		gotype(e) {
			if (this.type != e) {
				this.listWithdraw = [];
				this.listAccout = [];
				this.queryform = {
					pageNum: 1,
					pageSize: 10
				};
				this.more = true;
				this.type = e;
				if (e == 1) {
					this.getWithdraw();
				} else {
					this.getlistAccout();
				}
			}
		},
		go(e) {
			uni.navigateTo({
				url: e
			});
		}
	}
};
</script>

<style lang="less" scoped>
.wallet {
	color: #fff;
	.top {
		position: relative;
		image {
			width: 100%;
			height: 312rpx;
		}
		.name {
			position: absolute;
			top: 62rpx;
			left: 33rpx;
			right: 33rpx;
			font-size: 48rpx;
			font-weight: 400;

			image {
				position: absolute;
				right: 0;
				top: -18rpx;
				width: 84rpx;
				height: 84rpx;
				border-radius: 50%;
				border: 6rpx solid #ffffff;
			}
		}
	}
	.price {
		position: relative;
		z-index: 9;
		width: 690rpx;
		height: 323rpx;
		background: rgba(255, 255, 255, 0.89);
		box-shadow: 0px 4rpx 68rpx 0px rgba(39, 52, 125, 0.25);
		border-radius: 16rpx;
		padding-top: 48rpx;
		margin: -148rpx auto 0;
		.list {
			padding: 0 50rpx;
			line-height: 88rpx;
			color: #212c67;
			font-size: 42rpx;
			text {
				position: relative;
				top: 6rpx;
				left: 30rpx;
				font-size: 28px;
				font-weight: 500;
			}
		}
		.withdraw {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 96rpx;
			line-height: 96rpx;
			background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
			border-radius: 0px 0px 16rpx 16rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
		}
	}
	.detail {
		width: 690rpx;
		margin: 41rpx auto;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 16rpx;
		overflow: hidden;
		.detail_item {
			padding: 20rpx 0;
			height: 60rpx;
			line-height: 60rpx;
			background: #425985;
			display: flex;
			text-align: center;
			.detail_list {
				flex: 1;
				font-size: 28rpx;
				font-weight: 500;
			}
			.detail_list:nth-child(1) {
				border-right: 1px solid #fff;
			}
			.active {
				position: relative;
				color: #ffe471;
			}
			.active:before {
				content: ' ';
				position: absolute;
				bottom: -20rpx;
				width: 128rpx;
				height: 5rpx;
				background: #ffe471;
				border-radius: 10rpx;
			}
		}
		.from {
			line-height: 77rpx;
			text-align: center;
			.th,
			.tb {
				display: flex;
				.td {
					flex: 1;
					font-size: 26rpx;
				}
			}
		}
	}
}
</style>
