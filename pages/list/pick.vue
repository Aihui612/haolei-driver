<template>
	<view class="pick">
		<view class="picklist">
			<view class="list" @click="gochooseImage(1)">
				<image :src="imgUrl + fromdata.carFrontLeft" mode="aspectFill" v-if="fromdata.carFrontLeft"></image>
				<image  src="../../static/images/car2.png" mode="aspectFill" v-else></image>
				<view class="text">左前方</view>
			</view>
			<view class="list" @click="gochooseImage(2)">
				<image :src="imgUrl + fromdata.carFrontRight" mode="aspectFill" v-if="fromdata.carFrontRight"></image>
				<image  src="../../static/images/car1.png" mode="aspectFill" v-else></image>
				<view class="text" >右前方</view>
			</view>
			<view class="list" @click="gochooseImage(3)">
				<image :src="imgUrl + fromdata.carBackLeft" mode="aspectFill" v-if="fromdata.carBackLeft"></image>
				<image  src="../../static/images/car3.png" mode="aspectFill" v-else></image>
				<view class="text">左后方</view>
			</view>
			<view class="list" @click="gochooseImage(4)">
				<image :src="imgUrl + fromdata.carBackRight" mode="aspectFill" v-if="fromdata.carBackLeft"></image>
				<image  src="../../static/images/car4.png" mode="aspectFill" v-else></image>
				<view class="text">右后方</view>
			</view>
			<view class="list" @click="gochooseImage(5)">
				<image :src="imgUrl + fromdata.xszFront" mode="aspectFill" v-if="fromdata.xszFront"></image>
				<image  src="../../static/images/car5.png" mode="aspectFill" v-else></image>
				<view class="text">行驶证</view>
			</view>
			<view class="list" @click="gochooseImage(6)">
				<image :src="imgUrl + fromdata.jqBack" mode="aspectFill"  v-if="fromdata.xszFront"></image>
				<image  src="../../static/images/car6.png" mode="aspectFill" v-else></image>
				<view class="text">交强险</view>
			</view>
			<view class="list" @click="gochooseImage(7)">
				<image :src="imgUrl + fromdata.carBak1" mode="aspectFill"></image>
				<view class="text">其他图片</view>
			</view>
			<view class="list" v-if="fromdata.carBak1" @click="gochooseImage(8)">
				<image :src="imgUrl + fromdata.carBak2" mode="aspectFill"></image>
				<view class="text">其他图片</view>
			</view>
			<view class="list" v-if="fromdata.carBak2" @click="gochooseImage(9)">
				<image :src="imgUrl + fromdata.carBak3" mode="aspectFill"></image>
				<view class="text">其他图片</view>
			</view>
			<view class="list" v-if="fromdata.carBak3" @click="gochooseImage(10)">
				<image :src="imgUrl + fromdata.carBak4" mode="aspectFill"></image>
				<view class="text">其他图片</view>
			</view>
			<view class="list" v-if="fromdata.carBak4" @click="gochooseImage(11)">
				<image :src="imgUrl + fromdata.carBak5" mode="aspectFill"></image>
				<view class="text">其他图片</view>
			</view>
		</view>
		<view class="sub" @click="sub()">点击提交</view>
	</view>
</template>

<script>
import order from '../../servers/order.js';
export default {
	data() {
		return {
			Authorization: '',
			fromdata: {
				carFrontLeft: '',
				carFrontRight: '',
				carBackLeft: '',
				carBackRight: '',
				carTrunk: '',
				carCenterConsole: '',
				carBak1: '',
				carBak2: '',
				carBak3: '',
				carBak4: '',
				carBak5: '',
				orderId: 0
			}
		};
	},
	onLoad(e) {
		this.fromdata.orderId = e.id;
		// this.getdata()
	},
	mounted() {
		this.Authorization = uni.getStorageSync('Authorization');
	},
	methods: {
		gochooseImage(e) {
			var Authorization = this.Authorization;
			var _this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log('获取了第' + e + '张的图片,内容为：' + JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						// #ifdef MP-WEIXIN
						url: 'https://admin.shunlukeji.com/prod-api/common/upload',
						//url: 'http://127.0.0.1:7500/common/upload',
						// #endif
						// #ifdef H5
						url: '/prod-api/common/upload',
						// #endif
						filePath: res.tempFilePaths[0],
						name: 'file',
						header: {
							Authorization: Authorization
						},
						success: uploadFileRes => {
							var rtess = JSON.parse(uploadFileRes.data);
							if (rtess.code == 200) {
								var da = rtess.imgUrl;
								if (e == 1) {
									_this.fromdata.carFrontLeft = da;
								} else if (e == 2) {
									_this.fromdata.carFrontRight = da;
								} else if (e == 3) {
									_this.fromdata.carBackLeft = da;
								} else if (e == 4) {
									_this.fromdata.carBackRight = da;
								} else if (e == 5) {
									_this.fromdata.carTrunk = da;
								} else if (e == 6) {
									_this.fromdata.carCenterConsole = da;
								} else if (e == 7) {
									_this.fromdata.carBak1 = da;
								} else if (e == 8) {
									_this.fromdata.carBak2 = da;
								} else if (e == 9) {
									_this.fromdata.carBak3 = da;
								} else if (e == 10) {
									_this.fromdata.carBak4 = da;
								} else if (e == 11) {
									_this.fromdata.carBak5 = da;
								}
								// console.log(uploadFileRes.imgUrl);
							} else {
								uni.showToast({
									title: rtess.msg,
									duration: 2000,
									icon: 'none'
								});
							}
						}
					});
				}
			});
		},
		sub() {
			if (!this.fromdata.carFrontLeft) {
				uni.showToast({
					title: '请上传左前方照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.fromdata.carFrontRight) {
				uni.showToast({
					title: '请上传右前方照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.fromdata.carBackLeft) {
				uni.showToast({
					title: '请上传左后方照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.fromdata.carBackRight) {
				uni.showToast({
					title: '请上传右后方照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.fromdata.carTrunk) {
				uni.showToast({
					title: '请上传后备箱照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.fromdata.carCenterConsole) {
				uni.showToast({
					title: '请上传车辆中控台照片',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			order.pickCar(this.fromdata).then(res => {
				uni.showToast({
					title: res.msg,
					duration: 2000
				});
				uni.redirectTo({
					url: '../index/index'
				});
			});
		}
	}
};
</script>

<style lang="less" scoped>
.pick {
	padding: 50rpx 30rpx;
	.picklist {
		overflow: hidden;
		.list {
			position: relative;
			float: left;
			background: #fff;
			width: 335rpx;
			height: 275rpx;
			color: #ffffff;
			margin-bottom: 20rpx;
			image {
				width: 335rpx;
				height: 206rpx;
			}
			.text {
				width: 100%;
				height: 69rpx;
				background: #425985;
				text-align: center;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 69rpx;
			}
		}
		.list:nth-child(2n) {
			margin-left: 20rpx;
		}
	}
	.sub {
		margin-top: 105rpx;
		height: 106rpx;
		background: #ffffff;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #4e6792;
		line-height: 106rpx;
		text-align: center;
	}
}
</style>
