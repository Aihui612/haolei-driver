<template>
	<view class="user">
		<view class="msg" @click="goupimg()">
			<text>头像</text>
			<image :src="cutimg(driverAvator)" mode=""></image>
		</view>
		<view class="msg">
			<text>昵称</text>
			<input type="text" v-model="name" @blur='setname'/>
			<!-- <uni-icons type="arrowright"></uni-icons> -->
		</view>
		<view class="msg" @click="go('number')">
			<text>手机号</text>
			<text class="right">{{iphone}}</text>
			<uni-icons type="arrowright"></uni-icons>
		</view>
	</view>
</template>

<script>
import { UniIcons } from '@/components/uni-icons/uni-icons.vue';
import login from "../../servers/login.js"
	import my from '../../servers/my.js';
export default {
	components: { UniIcons },
	data() {
		return {
			name:'',
			driverAvator:'',
			iphone:''
		};
	},
	mounted() {
		this.getdata()
	},
	methods: {
		getdata(){
			my.driver().then(res=>{
				this.name = res.driver.driverName
				this.driverAvator= res.driver.driverAvator
				this.iphone = res.driver.driverMobile
			})
		},
		setname(){
			var da = {
				driverName:this.name
			}
			login.setdriver(da).then(res=>{
				uni.showToast({
					title: '修改成功',
				});
			})
		},
		setimg(){
			var da = {
				driverAvator:this.driverAvator
			}
			login.setdriver(da).then(res=>{
				uni.showToast({
					title: '修改成功',
				});
			})
		},
		goupimg(){
			var Authorization = uni.getStorageSync('Authorization');			
			var _this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log( JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						// #ifdef MP-WEIXIN
						url: 'https://admin.shunlukeji.com/prod-api/common/upload',
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
									_this.driverAvator = rtess.imgUrl;
									_this.setimg()
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
		cutimg(e) {
			if (e) {
				return this.imgUrl + e;
			}else{
				return ''
			}
		},
		go(e) {
			uni.navigateTo({
				url: e
			});
		},
	}
};
</script>

<style lang="less" scoped>
.user {
	padding: 55rpx 25rpx;
	.msg {
		position: relative;
		font-size: 28rpx;
		font-weight: 400;
		color: #ffffff;
		line-height: 100rpx;
		border-bottom: 1px solid #4c6288;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: #fff;
			float: right;
		}
		input {
			height: 100rpx;
			float: right;
			text-align: right;
			padding-right: 40rpx;
			font-size: 28rpx;
		}
		.right{
			float: right;
			padding-right: 40rpx;
		}
		.uni-icons,uni-icons {
			position: absolute;
			right: 0;
		}
	}
}
</style>
