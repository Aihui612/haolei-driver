<script>
import login from './servers/login.js';
export default {
	onLaunch: function() {
		var _this = this;
		console.log('App Launch');
		// #ifdef MP-WEIXIN
		if (!uni.getStorageSync('Authorization')) {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					_this.getcode(loginRes.code);
				}
			});
		}
		wx.startLocationUpdateBackground({
		    success(res) {
		      console.log('开启后台定位', res)
		    },
		    fail(res) {
		      console.log('开启后台定位失败', res)
		    }
		  })
		// #endif
		this.settimeset()
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		getcode(e) {
			console.log("sfsfasfsafsf:"+e)
			var url1 = 'http://hnhlyt.ticp.net/api/driver/login'
			var param={
				code:e
			}
			uni.request({
				url: url1,//仅为示例，并非真实接口地址。
				method: "post",  
				data:{code:e},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					uni.hideLoading();
					console.log(res.data)  
					 console.log("asddddddddddddddddddd",res.data.code==200);
					if(res.data.code==200){
						uni.setStorageSync('Authorization', 'Bearer ' + res.token);
						//resolve(res.data);
						console.log('ready jump my');
						uni.navigateTo({
						    url: '/pages/index/my'
						});
					}else{
						uni.navigateTo({  
							  url: '/pages/index/login'
						});				
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
/* 			login
				.login({
					code: e
				})
				.then(res => {
					if(res.code=='200'){
						uni.setStorageSync('Authorization', 'Bearer ' + res.token);
					}
					if(res.code=='401'){
						uni.removeStorageSync('Authorization');
						uni.navigateTo({
						    url: '/pages/index/register'
						});
					}
					 */
					uni.hideLoading();
				/* }); */
		},
		settimeset(){
			var _this = this
			if (uni.getStorageSync('Authorization')) {
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						login.driverLocal({
							latitude:res.latitude,
							longitude:res.longitude
						}).then(res => {
							setTimeout(function(){
								_this.settimeset()
							},30000)
						})
				    }
				});
				
			}
		}
	}
};
</script>

<style lang="less">
/*每个页面公共css */
body {
	background: #2a3a52;
}
.tab {
	position: fixed;
	z-index: 10;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
	display: flex;
	text-align: center;
	.flex-item {
		position: relative;
		flex: 1;
		.title {
			position: absolute;
			bottom: 7rpx;
			width: 100%;
			font-size: 22rpx;
			font-weight: 400;
			color: #ffffff;
			line-height: 30rpx;
			opacity: 0.5;
		}
	}
	.tab_home image {
		width: 45rpx;
		height: 45rpx;
		margin-top: 11rpx;
	}
	.tab_car image {
		width: 48rpx;
		height: 42rpx;
		margin-top: 14rpx;
	}
	.tab_order image {
		width: 40rpx;
		height: 44.5rpx;
		margin-top: 12rpx;
	}
	.tab_my image {
		width: 43.2rpx;
		height: 43.2rpx;
		margin-top: 11rpx;
	}
}
</style>
