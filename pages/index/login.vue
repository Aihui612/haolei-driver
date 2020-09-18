<template>
	<view class="login" v-if="islogin">
		<image src="../../static/images/index_bg1.png" mode="" class="bg"></image>
		<image src="../../static/images/logo.png" mode="" class="logo"></image>
		<view class="nr">
			<view class="list">
				<image src="../../static/images/phone.png" mode="" placeholder-style="color: #4C6288;"></image>
				<input type="number" v-model="login" placeholder="请输入手机号" />
			</view>
			<view class="list">
				<image src="../../static/images/password.png" mode="" placeholder-style="color: #4C6288;"></image>
				<input type="text" v-model="password" placeholder="请输入密码" password/>
			</view>
			<view class="sub" @click="gologin()">登录</view>
			<view class="bottom">
				<view class="left" @click="gopassword">忘记密码？</view>
				<view class="right" @click="goregister">注册账户</view>
			</view>
		</view>
	</view>
</template>

<script>
import login from '../../servers/login.js';
export default {
	data() {
		return {
			login:'',
			password:'',
			islogin:false,
			codeForm:{
				code:''
			}
		};
	},
	mounted() {
		var flag=1;
		var authorization = uni.getStorageSync('Authorization');
		this._login()
		//  if(authorization=="" || authorization.toLowerCase()=="null" || authorization.length<=0){
		// 	  this.islogin=true;
		// }else{
		// 	console.log('sss');
		// 	uni.switchTab({
		// 	    url: 'pages/index/my'
		// 	});
		// }
		
	},
	
	methods: {
		gologin() {
			 let _this=this
			login
				.loginByMoblie({
					mobile: this.login,
					password: this.password
				})
				.then(res => {
					uni.setStorageSync('Authorization', 'Bearer ' + res.token);
					uni.setStorageSync('STATION_AUTH',  res.STATION_AUTH);
					 // #ifdef MP-WEIXIN
					 uni.login({
					     provider: 'weixin',
					     success: function (loginRes) {
					         console.log(JSON.stringify(loginRes));
					 		
							_this.getcode(loginRes.code)//绑定
							},
							});
					// #endif
				});
		},
		_login(){
			let _this = this;
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
			        console.log("我是微信小程序我要登录了")
			        if (~res.provider.indexOf('weixin')) {
			            uni.login({
			                provider: 'weixin',
			                success: function (loginRes) {
								
							uni.setStorageSync('code', loginRes.code);
							var url1 = 'http://hnhlyt.ticp.net/api/driver/login'
							// var param={
							// 	code:loginRes.code
							// }
							uni.request({
								url: url1,//仅为示例，并非真实接口地址。
								method: "POST",  
								data:{code:loginRes.code},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									uni.hideLoading();
									
									if(res.data.code==200){
										console.log(res.data.token)   
										uni.setStorageSync('Authorization', 'Bearer ' + res.data.token);
										//resolve(res.data);
										uni.switchTab({
										    url: './my'
										});
									}else{
										this.islogin=true;		
									}
								},
								fail: (err) => {
									uni.hideLoading();
									if (err) {
										uni.showToast({
											title: err.data,
											icon: "none",
											duration: 2000
										});   
										//reject(err.data)
									} else {
										uni.showToast({
											title: '请检查网络后重试',
											icon: "none",
										});
										reject(new Error('请检查网络后重试'))
									}
								}
							});
			                }
			            });
			        }else{
						_this.islogin=true;
					}
			    }
			});
		},
	
		goregister(){
			uni.navigateTo({
			    url: './register'
			});
		},
		gopassword(){
			uni.navigateTo({
			    url: './password'
			});
		},
		getcode(e){
			login.loginbindMobile({
				phone: this.login,
				code:e
			}).then(res => {
				uni.switchTab({
				    url: './my'
				});
			})
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	position: relative;
	height: 100vh;
	.bg {
		width: 750rpx;
		height: 499rpx;
	}
	.logo {
		position: absolute;
		top: 268rpx;
		left: 50%;
		width: 428rpx;
		height: 124rpx;
		margin-left: -214rpx;
	}
	.nr {
		position: absolute;
		top: 432rpx;
		left: 25rpx;
		right: 25rpx;
		bottom: 25rpx;
		z-index: 9;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 20rpx;
		padding: 100rpx 30rpx 0;
		margin: -68rpx auto 0;
		.list {
			position: relative;
			margin-bottom: 50rpx;
			border-radius: 4rpx;
			overflow: hidden;
			image {
				position: absolute;
				top: 10rpx;
				left: 20rpx;
				width: 60rpx;
				height: 60rpx;
			}
			input {
				padding-left: 100rpx;
				height: 80rpx;
				background: #fff;
				font-size: 24rpx;
			}
		}
		.sub {
			height: 97rpx;
			line-height: 97rpx;
			border-radius: 97rpx;
			color: #fff;
			background: #2d3c63;
			text-align: center;
			margin-top: 120rpx;
		}
		.bottom {
			position: absolute;
			bottom: 40rpx;
			left: 30rpx;
			right: 30rpx;
			font-size: 24rpx;
			height: 30rpx;
			color: #ffffff;
			.left{
				float: left;
			}
			.right {
				float: right;
			}
		}
	}
}
</style>
