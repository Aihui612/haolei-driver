<template>
	<view class="order">
		<!-- <view class="msg">
			<view class="type">
				支付成功
				<image src="../../static/images/pay.png" mode="aspectFill"></image>
			</view>
			<view class="bg1"></view>
			<view class="bg2"></view>
		</view> -->
		<view class="msglist code" v-if="datalist.orderState == 12">
			<view class="title">二维码</view>
			<view class="qrimg">
				{{ datalist.stationVerfiCode }}
				<tki-qrcode ref="qrcode" :val="datalist.id + '-' + datalist.stationVerfiCode" size="300" unit="upx" />
			</view>
			<view class="tip">在检测站出示该二维码</view>
		</view>
		<view class="msglist">
			<view class="title">费用信息</view>
			<!-- <view class="list">
				检测费
				<text>¥{{datalist.stationFee}}</text>
			</view> -->
			<view class="list">
				代驾服务
				<text>¥{{ datalist.driverFee }}</text>
			</view>
			<!-- <view class="list">
				优惠
				<text>¥{{datalist.couponFee}}</text>
			</view> -->
			<!-- <view class="list">
				合计费用
				<text class="golden">¥{{datalist.orderPrice}}</text>
			</view> -->
		</view>
		<view class="msglist">
			<view class="title">订单信息</view>
			<view class="list">
				产品
				<text>代驾审车办理</text>
			</view>
			<view class="list">
				订单号
				<text>¥{{ datalist.orderNum }}</text>
			</view>
			<view class="list">
				车牌号
				<text>{{ datalist.carNum }}</text>
			</view>
			<view class="list" v-if="more">
				下单时间
				<text>{{ datalist.gmtTime }}</text>
			</view>
			<view class="list" v-if="more">
				联系人
				<text>{{ datalist.contactName }}</text>
			</view>
			<view class="list" v-if="more">
				手机号
				<text>{{ datalist.contactMobile }}</text>
			</view>
			<view class="list" v-if="more">
				取还车地址
				<text class="golden"  @click="gorouter(datalist.pickCoordinate)">{{ datalist.pickAddr }}</text>
				<uni-icons class="map-pin-ellipse"></uni-icons>
			</view>
			<view class="list" v-if="more && datalist.orderState == 1">
				取还车距离
				<text class="golden">{{ datalist.distance }} KM</text>
			</view>
			<view class="list" v-if="more">
				预约时间
				<text>{{ datalist.bookTime }}</text>
			</view>
			<view class="list" v-if="more && datalist.orderState > 4">
				检测站位置
				<text class="golden" @click="gorouter(datalist.stationLoc)">{{ datalist.stationName }}</text>
			</view>
			<view class="list" v-if="more && datalist.orderState != 1" @click="gotel()">
				咨询电话
				<text class="golden">联系客服</text>
			</view>
			<view class="list" v-if="more && datalist.orderImg&& datalist.orderState > 5">
				已上传照片
				<view class="imglist">
					<view class="listimg" v-if="datalist.orderImg.carBak1" @click="goImage(imgUrl + datalist.orderImg.checkImg1)">
						<image :src="imgUrl + datalist.orderImg.checkImg1" mode="aspectFill"></image>
						<view class="text">检测结果</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.checkImg2" @click="goImage(imgUrl + datalist.orderImg.checkImg2)">
						<image :src="imgUrl + datalist.orderImg.checkImg2" mode="aspectFill"></image>
						<view class="text">检测结果</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.xszFront" @click="goImage(imgUrl + datalist.orderImg.xszFront)">
						<image :src="imgUrl + datalist.orderImg.xszFront" mode="aspectFill"></image>
						<view class="text">行驶证正本</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carFrontRight" @click="goImage(imgUrl + datalist.orderImg.xszBack)">
						<image :src="imgUrl + datalist.orderImg.carFrontRight" mode="aspectFill"></image>
						<view class="text">行驶证副本</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.jqBack" @click="goImage(imgUrl + datalist.orderImg.jqBack)">
						<image :src="imgUrl + datalist.orderImg.jqBack" mode="aspectFill"></image>
						<view class="text">交强险副本</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carFrontLeft" @click="goImage(imgUrl + datalist.orderImg.carFrontLeft)">
						<image :src="imgUrl + datalist.orderImg.carFrontLeft" mode="aspectFill"></image>
						<view class="text">左前方</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carFrontRight" @click="goImage(imgUrl + datalist.orderImg.carFrontRight)">
						<image :src="imgUrl + datalist.orderImg.carFrontRight" mode="aspectFill"></image>
						<view class="text">右前方</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBackLeft" @click="goImage(imgUrl + datalist.orderImg.carBackLeft)">
						<image :src="imgUrl + datalist.orderImg.carBackLeft" mode="aspectFill"></image>
						<view class="text">左后方</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBackRight" @click="goImage(imgUrl + datalist.orderImg.carBackRight)">
						<image :src="imgUrl + datalist.orderImg.carBackRight" mode="aspectFill"></image>
						<view class="text">右后方</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBak1" @click="goImage(imgUrl + datalist.orderImg.carBak1)">
						<image :src="imgUrl + datalist.orderImg.carBak1" mode="aspectFill"></image>
						<view class="text">其他图片</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBak2" @click="goImage(imgUrl + datalist.orderImg.carBak2)">
						<image :src="imgUrl + datalist.orderImg.carBak2" mode="aspectFill"></image>
						<view class="text">其他图片</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBak3" @click="goImage(imgUrl + datalist.orderImg.carBak3)">
						<image :src="imgUrl + datalist.orderImg.carBak3" mode="aspectFill"></image>
						<view class="text">其他图片</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBak4" @click="goImage(imgUrl + datalist.orderImg.carBak4)">
						<image :src="imgUrl + datalist.orderImg.carBak4" mode="aspectFill"></image>
						<view class="text">其他图片</view>
					</view>
					<view class="listimg" v-if="datalist.orderImg.carBak5" @click="goImage(imgUrl + datalist.orderImg.carBak5)">
						<image :src="imgUrl + datalist.orderImg.carBak5" mode="aspectFill"></image>
						<view class="text">其他图片</view>
					</view>
				</view>
			</view>
			<view class="pack" v-if="more" @click="more = false">
				收起
				<uni-icons type="arrowup"></uni-icons>
			</view>
			<view class="pack" v-else @click="more = true">
				展开全部
				<uni-icons type="arrowdown"></uni-icons>
			</view>
		</view>
		<view class="msglist" v-if="datalist.orderState == 18">
			<view class="title">还车码</view>
			<!-- <view class="list">
				检测费
				<text>¥{{datalist.stationFee}}</text>
			</view> -->
			<view class="list"><input type="text" v-model="carcard" placeholder-style="color:#fff;" placeholder="请输入还车码" maxlength="6" /></view>
		</view>
		<view class="botton">
			<view class="grab" @click="grab(datalist.id)" v-if="datalist.orderState == 1">抢单</view>
			<view class="grab" @click="grab1(datalist.id)" v-if="datalist.orderState == 3">去取车</view>
			<view class="grab" @click="grab2(datalist.id)" v-if="datalist.orderState == 6">取车</view>
			<view class="grab" @click="grab3(datalist.id)" v-if="datalist.orderState == 12">送车</view>
			<view class="grab" @click="grab4()" v-if="datalist.orderState == 18">还车</view>
		</view>
	</view>
</template>

<script>
import { UniIcons } from '@/components/uni-icons/uni-icons.vue';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import order from '../../servers/order.js';
export default {
	components: {
		UniIcons,
		tkiQrcode
	},
	data() {
		return {
			more: false,
			datalist: [],
			carcard: '',
			id: 0
		};
	},
	onLoad(e) {
		this.id = e.id;
		this.getdata();
	},
	mounted() {},
	methods: {
		getdata() {
			order.orderDetails(this.id).then(res => {
				this.datalist = res.data;
				var _this = this;
				if (res.data.orderState == 12) {
					setTimeout(function() {
						_this.$refs.qrcode._makeCode();
					}, 200);
				}
			});
		},
		grab(e) {
			order.grabOrder(e).then(res => {
				uni.showToast({
					title: '抢单成功',
					duration: 2000
				});
				uni.switchTab({
					url: '../index/index'
				});
			});
		},
		grab1(e) {
			order.goPickCar(e).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				uni.switchTab({
					url: '../index/index'
				});
			});
		},
		grab2(e) {
			uni.navigateTo({
				url: './pick?id=' + e
			});
		},
		grab3(e) {
			order.goCar(e).then(res => {
				this.datalist = [];
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				uni.switchTab({
					url: '../index/index'
				});
			});
		},
		grab4(e) {
			var da = {
				id: this.carcard,
				code: 1234
			};
			order.returnCar(da).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				uni.switchTab({
					url: '../index/index'
				});
				// this.datalist=[]
				// this.getorder();
			});
		},
		gotel(){
			var customer_mobile = uni.getStorageSync('customer_mobile')
			uni.makePhoneCall({
			    phoneNumber: customer_mobile //仅为示例
			});
		},
		goImage(e) {
			uni.previewImage({
				urls: [e],
				longPressActions: {
					success: function(data) {}
				}
			});
		},
		gorouter(e) {
			const latitude = parseFloat(e.split(',')[1]);
			const longitude = parseFloat(e.split(',')[0]);
			console.log(latitude,longitude);
			uni.openLocation({
				latitude: latitude,
				longitude: longitude,
				success: function() {
					console.log('success');
				},
				fail:function(e){
					console.log(e);
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.order {
	color: #fff;
	padding-bottom: 50rpx;
	.msg {
		position: relative;
		z-index: 9;
		overflow: hidden;
		padding: 0 40rpx;
		height: 160rpx;
		line-height: 160rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		.type {
			font-size: 48rpx;
			image {
				float: right;
				width: 64rpx;
				height: 64rpx;
				margin-top: 59rpx;
			}
		}
		.bg1 {
			position: absolute;
			z-index: -1;
			top: -100rpx;
			right: 0;
			width: 250rpx;
			height: 561rpx;
			background: linear-gradient(180deg, #fce270 0%, #ffaa00 100%);
			border-top-left-radius: 500rpx;
			border-bottom-left-radius: 10rpx;
		}
		.bg2 {
			position: absolute;
			z-index: -2;
			top: -50rpx;
			right: 50rpx;
			width: 280rpx;
			height: 280rpx;
			background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
			opacity: 0.7;
			border-radius: 50%;
		}
	}
	.msglist {
		margin: 30rpx 20rpx 0;
		padding: 40rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 20rpx;
		.title {
			font-size: 32rpx;
			padding-bottom: 30rpx;
			font-weight: 600;
			color: #ffffff;
			line-height: 45rpx;
			border-bottom: 1px solid #94a1b8;
		}
		.list {
			font-size: 26rpx;
			line-height: 67rpx;
			color: #f6f7f9;
			text {
				float: right;
			}
			.golden {
				color: #ffe471;
			}
			input {
				margin-top: 20rpx;
				font-size: 26rpx;
			}
			.imglist{
				overflow: hidden;
				.listimg {
					position: relative;
					float: left;
					background: #fff;
					width: 305rpx;
					// height: 265rpx;
					color: #ffffff;
					margin-bottom: 20rpx;
					image {
						width: 305rpx;
						height: 196rpx;
						display: block;
					}
					.text {
						width: 305rpx;
						height: 69rpx;
						background: #425985;
						text-align: center;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 69rpx;
					}
				}
				.listimg:nth-child(2n) {
					margin-left: 20rpx;
				}
			}
		}
		.pack {
			font-size: 26rpx;
			text-align: center;
			color: #ffe471;
		}
	}
	.code {
		text-align: center;
		image {
			width: 220rpx;
			height: 220rpx;
			margin: 39rpx 0 20rpx;
		}
		.tip {
			font-size: 22rpx;
		}
	}
	.botton {
		margin: 30rpx 20rpx 0;
		.grab {
			text-align: center;
			line-height: 100rpx;
			border: 1px solid #ffff;
			border-radius: 20rpx;
		}
	}
}
</style>
