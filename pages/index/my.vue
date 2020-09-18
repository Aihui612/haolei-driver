<template>
	<view class="my">
		<view class="top_bg"><image src="../../static/images/index_bg_top.png" mode=""></image></view>
		<view class="card">
			<view class="msg">
				<image :src="cutimg(msg.driverAvator)" alt="" v-if='msg.driverAvator'/>
				<image src="@/static/images/headportrait.png" alt="" v-else/>
				<view class="text" v-if="login">
					<view class="name">{{ msg.driverName }}</view>
					<view class="tell">{{ msg.driverMobile }}</view>
				</view>
				<view class="text" v-else>
					<view class="name">登录/注册</view>
					<view class="tell">登录后享受更多精彩服务</view>
				</view>
			</view>
		</view>
		<view class="bottomlist">
			<view class="list" @click="go('../set/wallet')">
				<image src="../../static/images/tab7.png" mode=""></image>
				我的钱包
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="list" @click="go('../list/msgs')">
				<image src="../../static/images/tab8.png" mode=""></image>
				消息列表
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="list" @click="go('../list/FAQ')">
				<image src="../../static/images/tab4.png" mode=""></image>
				常见问题
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="list" @click="gotel()">
				<image src="../../static/images/tab5.png" mode=""></image>
				联系客服
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="list"  @click="go('../list/aboutus')">
				<image src="../../static/images/tab6.png" mode=""></image>
				关于我们
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="list" @click="go('../set/set')">
				<image src="../../static/images/tab9.png" mode=""></image>
				系统设置
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<view class="tab">
			<view class="flex-item tab_order" @click="goindex('/pages/index/index')">
				<image src="../../static/images/item5.png"></image>
				<view class="title">订单</view>
			</view>
			<view class="flex-item tab_my">
				<image src="../../static/images/item8.png"></image>
				<view class="title">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
import { UniIcons } from '@/components/uni-icons/uni-icons.vue';
import my from '../../servers/my.js';
export default {
	components: { UniIcons },
	data() {
		return {
			login: true,
			msg: []
		};
	},
	onShow() {
		this.getdata();
	},
	mounted() {
		uni.hideTabBar();
	},
	methods: {
		getdata() {
			my.driver().then(res => {
				console.log('asddd',res);
				this.msg = res.driver;
				uni.setStorageSync('customer_mobile', res.customer_mobile);
			});
		},
		getUserInfo(e) {
			console.log(e);
		},
		gotel(){
			var customer_mobile = uni.getStorageSync('customer_mobile')
			uni.makePhoneCall({
			    phoneNumber: customer_mobile //仅为示例
			});
		},
		cutimg(e) {
			if (e) {
				return this.imgUrl + e;
			}else{
				return ''
			}
		},
		goindex(e) {
			uni.switchTab({
				url: e
			});
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
.my {
	background: #2a3a52;
	.top_bg {
		image {
			width: 100%;
			height: 371rpx;
		}
	}
	.card {
		position: relative;
		z-index: ;
		margin: -321rpx auto 0;
		width: 640rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		.msg {
			height: 190rpx;
			// border-bottom: 1px solid #dbe0e7;
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
			.text {
				float: right;
				text-align: right;
				.name {
					margin-top: 18rpx;
					font-size: 36rpx;
					font-weight: 500;
					line-height: 50rpx;
					color: #4e6792;
				}
				.tell {
					margin-top: 30rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #94a1b8;
					line-height: 45rpx;
				}
			}
		}
	}
	.bottomlist {
		padding: 30rpx 20px;
		.list {
			color: #fff;
			line-height: 99rpx;
			border-bottom: 1px solid #4c6288;

			font-size: 28rpx;
			image {
				position: relative;
				top: 8rpx;
				width: 39rpx;
				height: 39rpx;
				margin-right: 20rpx;
			}
			.uni-icons,
			uni-icons {
				float: right;
			}
		}
	}
	.tab_my .title {
		opacity: 1;
	}
}
</style>
