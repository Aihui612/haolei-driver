<template>
	<view class="number">
		<view class="original">
			手机号码
			<text>{{msg.driverMobile}}</text>
		</view>
		<!-- <view class="number"><input type="text" value="" placeholder="请输入手机号" placeholder-style="color:#fff;"/></view> -->
		<view class="code">
			<input type="text" v-model="fromdata.code" placeholder="请输入验证码" placeholder-style="color:#fff;"/>
			<image :src="'data:image/jpeg;base64,'+dataimg.img" @click="getdata"></image>
		</view>
		<view class="number_code">
			<input type="text" v-model="fromdata.smsCode" placeholder="请输入手机验证码" placeholder-style="color:#fff;"/>
			<view class="code_text" @click="go_code()" v-if="time==0">发送短信验证码</view>
			<view class="code_text" v-else>{{time}}秒后重新发送</view>
		</view>
		<view class="code">
			<input type="text" v-model="fromdata.password" placeholder="请输入新密码" placeholder-style="color:#fff;"/>
		</view>
		<view class="code">
			<input type="text" v-model="fromdata.repeatPassword" placeholder="请再次输入新密码" placeholder-style="color:#fff;"/>
		</view>
		<view class="sub" @click="sub">
			点击提交
		</view>
	</view>
</template>

<script>
	import login from '../../servers/login.js'
	import my from '../../servers/my.js';
export default {
	data() {
		return {
			time:0,
			dataimg:[],
			msg:[],
			fromdata:{
				password: '',
				repeatPassword:'',
				smsCode:'',
				code:''
			}
		};
	},
	mounted() {
		this.getdata()
	},
	methods: {
		getdata(){
			my.driver().then(res=>{
				this.msg = res.data
			})
			login.captchaImage().then(res=>{
				this.dataimg = res
			})
		},
		go_code(){
			var da = {
			  imgCode: this.fromdata.code,
			  newMobile: this.msg.driverMobile,
			  uuid: this.dataimg.uuid
			}
			if (!da.imgCode) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			login.driverSendSms(da).then(res=>{
				this.time = 60
				this.gosettime()
			})
		},
		gosettime(){
			if(this.time>0){
				var _this= this
				this.time -=1
				setTimeout(function(){
					_this.gosettime()
				},1000)
			}
		},
		sub(){
			var da = this.fromdata
			if (!da.password) {
				uni.showToast({
					title: '请输入新密码',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!da.repeatPassword) {
				uni.showToast({
					title: '请再次输入新密码',
					icon: 'none'
				});
				return;
			}
			if (!da.smsCode) {
				uni.showToast({
					title: '请输入手机验证码',
					icon: 'none'
				});
				return;
			}
			if (da.repeatPassword != da.password) {
				uni.showToast({
					title: '两次输入密码不一致',
					icon: 'none'
				});
				return;
			}
			login.changPassword(da).then(res=>{
				uni.showToast({
					title: res.msg
				});
				uni.redirectTo({
				    url: '../index/my'
				});
			})
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
	.code{
		overflow: hidden;
		padding: 29rpx 0;
		input{
			width: 280rpx;
			float: left;
		}
		image{
			float: right;
			width: 159rpx;
			height: 64rpx;
			background: #FFFFFF;
		}
	}
	.number{
		padding: 11rpx 0 40rpx;
	}
	.number_code{
		position: relative;
		padding: 29rpx 0;
		.code_text{
			position: absolute;
			z-index: 9;
			right: 12rpx;
			top: 41rpx;
			padding: 0 20rpx;
			height: 40rpx;
			background: #FFFFFF;
			border-radius: 3rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #4E6792;
			line-height: 40rpx;

		}
	}
	.sub{
		margin-top: 123rpx;
		height: 106rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #4E6792;
		line-height: 106rpx;
text-align: center;
	}
}
</style>
