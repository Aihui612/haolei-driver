<template>
	<view class="set">
		<view class="user" @click="go('user')">
			个人资料
			<uni-icons type="arrowright"></uni-icons>
		</view>
		<view class="switch">
			开始接单
			<switch @change="switch2Change" color="#3AB549" :checked='open'/>
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
				open:false
			}
		},
		mounted() {
			var DRIVER_AUTH = uni.getStorageSync('DRIVER_AUTH')
			if(DRIVER_AUTH==1){
				this.open = true
			}
		},
		methods: {
			getopen(){
				my.open().then(res=>{
					uni.setStorageSync('DRIVER_AUTH', 1);
					uni.showToast({
					    title: res.msg,
					    duration: 2000
					});
				})
			},
			getclose(){
				my.close().then(res=>{
					uni.setStorageSync('DRIVER_AUTH', 2);
					uni.showToast({
					    title: res.msg,
					    duration: 2000
					});
				})
			},
			go(e) {
				uni.navigateTo({
					url: e
				});
			},
			switch2Change: function (e) {
				if(e.target.value){
					this.getopen()
				}else{
					this.getclose()
				}
			            console.log('switch2 发生 change 事件，携带值为', e.target.value)
			        }
		}
	}
</script>

<style lang="less" scoped>
.set{
	padding: 30rpx 35rpx;
	line-height: 100rpx;
	color: #fff;
font-size: 28rpx;
	.user{
		border-bottom: 1px solid #FFF;
	}
	switch,
	.uni-icons,
	uni-icons{
		float: right;
	}
}
</style>
