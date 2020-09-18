<template>
	<view class="msg">
		<view class="title">{{datalist.title}}</view>
		<view class="nr">{{datalist.message}}</view>
	</view>
</template>

<script>
import my from '../../servers/my.js';
export default {
	data() {
		return {
			id: 0,
			datalist: []
		};
	},
	onLoad(e) {
		this.id = e.id;
		this.getdata();
	},
	methods: {
		getdata() {
			my.driverMessage(this.id).then(res => {
				this.datalist = res.data;
			});
		}
	}
};
</script>

<style lang="less" scoped>
.msg {
	padding: 56rpx 20rpx;
	color: #ffffff;
	.title {
		font-size: 36rpx;
		font-weight: 500;
		line-height: 50rpx;
		text-align: center;
	}
}
</style>
