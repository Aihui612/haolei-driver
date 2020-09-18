<template>
	<view class="number">
		<view class="number_n"><input type="text" v-model="newMobile" placeholder="请输入手机号" placeholder-style="color:#fff;" /></view>
		<view class="code">
			<input type="number" v-model="imgCode" placeholder="请输入验证码" placeholder-style="color:#fff;" />
			<image :src="'data:image/jpeg;base64,' + dataimg.img" @click="getdata" v-if="dataimg.img"></image>
		</view>
		<view class="number_code">
			<input type="number" v-model="smsCode" placeholder="请输入手机验证码" placeholder-style="color:#fff;" />
			<view class="code_text" @click="go_code()" v-if="time == 0">发送短信验证码</view>
			<view class="code_text" v-else>{{ time }}秒后重新发送</view>
		</view>
		<view class="password"><input type="text" v-model="password" placeholder="请输入新密码" placeholder-style="color:#fff;" password /></view>
		<view class="password"><input type="text" v-model="repeatPassword" placeholder="请再次输入新密码" placeholder-style="color:#fff;" password /></view>
		<view class="sub" @click="sub">点击提交</view>
	</view>
</template>

<script>
import login from '../../servers/login.js';
export default {
	data() {
		return {
			time: 0,
			dataimg: [],
			imgCode: '',
			newMobile: '',
			password: '',
			repeatPassword: '',
			smsCode: ''
		};
	},
	mounted() {
		this.getdata();
	},
	methods: {
		getdata() {
			login.captchaImage().then(res => {
				this.dataimg = res;
			});
		},
		go_code() {
			if (!this.newMobile) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.checkPhone(this.newMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.imgCode) {
				uni.showToast({
					title: '请输入图形验证码',
					icon: 'none'
				});
				return;
			}
			var da = {
				imgCode: this.imgCode,
				newMobile: this.newMobile,
				uuid: this.dataimg.uuid
			};
			login.SendSms(da).then(res => {
				this.time = 60;
				this.gosettime();
			});
		},
		sub() {
			if (!this.newMobile) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.checkPhone(this.newMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.imgCode) {
				uni.showToast({
					title: '请输入图形验证码',
					icon: 'none'
				});
				return;
			}
			if (!this.password) {
				uni.showToast({
					title: '请输入新密码',
					icon: 'none'
				});
				return;
			}
			if (!this.repeatPassword) {
				uni.showToast({
					title: '请再次输入新密码',
					icon: 'none'
				});
				return;
			}
			if (!this.smsCode) {
				uni.showToast({
					title: '请输入短信验证码',
					icon: 'none'
				});
				return;
			}
			var da = {
				mobile: this.newMobile,
				password: this.password,
				repeatPassword: this.repeatPassword,
				smsCode: this.smsCode
			};
			login.bloginChangPassword(da).then(res => {});
		},
		gosettime() {
			if (this.time > 0) {
				var _this = this;
				this.time -= 1;
				setTimeout(function() {
					_this.gosettime();
				}, 1000);
			}
		},
		checkPhone(phone) {
			if (!/^1[3456789]\d{9}$/.test(phone)) {
				return false;
			} else {
				return true;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.number {
	padding: 55rpx 80rpx;
	color: #fff;
	font-size: 28rpx;
	.original {
		line-height: 100rpx;
		border-bottom: 1px solid #4c6288;
		text {
			margin-left: 60rpx;
		}
	}
	input {
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 3rpx;
		padding: 0 30rpx;
		height: 64rpx;
		font-size: 28rpx;
	}
	.code {
		overflow: hidden;
		padding: 40rpx 0;
		input {
			width: 335rpx;
			float: left;
		}
		image {
			float: right;
			width: 159rpx;
			height: 64rpx;
			background: #ffffff;
		}
	}
	.number {
		padding: 11rpx 0 40rpx;
	}
	.number_code {
		padding: 10rpx 0 40rpx;
		position: relative;
		.code_text {
			position: absolute;
			z-index: 9;
			right: 12rpx;
			top: 22rpx;
			padding: 0 20rpx;
			height: 40rpx;
			background: #ffffff;
			border-radius: 3rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #4e6792;
			line-height: 40rpx;
		}
	}
	.password {
		margin-bottom: 40rpx;
	}
	.sub {
		margin-top: 50rpx;
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
