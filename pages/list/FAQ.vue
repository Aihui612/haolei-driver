<template>
	<view class="FAQ">
		<view class="nr">
			<view class="title">常见问题</view>
			<view class="msg">以下是年检办理过程中经常遇到的问题,如果没能解决您的疑问,请联系客服进行咨询。</view>
			<view class="QA" v-for="item in msg" :key="item.id">
				<view class="Q">
					<text>Q</text>
					{{item.title}}
				</view>
				<view class="A">
					<text>A</text>
					{{item.contet}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import my from '../../servers/my.js'
export default {
	data() {
		return {
			msg: []
		};
	},
	mounted() {
		this.getdata()
	},
	methods: {
		getdata(e) {
			var da = {
				type:1
			}
			my.question(da).then(res => {
				this.msg = res.data;
			});
		}
	}
};
</script>

<style lang="less" scoped>
.FAQ {
	padding-bottom: 100rpx;
	.top_item {
		display: flex;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		.tip {
			flex: 1;
			font-size: 26rpx;
			font-weight: 600;
		}
		.active {
			position: relative;
			color: #ffe471;
		}
		.active:before {
			content: ' ';
			position: absolute;
			bottom: 0;
			width: 80rpx;
			height: 5rpx;
			background: #ffe471;
			border-radius: 10rpx;
		}
	}
	.nr{
		color: #fff;
		padding: 30rpx 50rpx;
		font-size: 26rpx;
		.title{
			font-size: 50rpx;
			text-align: center;
		}
		.QA{
			margin-top: 30rpx;
			line-height: 60rpx;
			.Q,.A{
				position: relative;
				padding-left: 80rpx;
				text{
					position: absolute;
					top: 10rpx;
					left: 0rpx;
					border-radius: 50%;
					display: inline-block;
					background: #f7ac05;
					width: 50rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					font-weight: 500;
				}
			}
			.Q{
				font-weight: 500;
				font-size: 35rpx;
			}
			.A{
				text{
					background: #f1c6a2;
					color: #ea7a1c;
				}
			}
		}
	}
}
</style>
