<template>
	<view class="msgs">
		<view class="list" v-for="item in datalist" :key="item.id" @click="go(item.id)">
			<image src="../../static/images/index_bg1.png" mode=""></image>
			<text class="name">{{ item.title }}</text>
			<text class="dian" v-if="item.isRead != 'Y'"></text>
		</view>
	</view>
</template>

<script>
import my from '../../servers/my.js';
export default {
	data() {
		return {
			datalist: [],
			more: true,
			queryform: {
				pageNum: 1,
				pageSize: 10
			},
		};
	},
	onReachBottom() {
		if (this.more) {
			this.queryform.pageNum += 1;
			this.getdata();
		}
	},
	onShow() {
		this.queryform.pageNum= 1
		this.getdata();
	},
	methods: {
		getdata() {
			my.driverMessagelist(this.queryform).then(res => {
				var da =[]
				res.data.rows.map(v => {
					da.push(v);
				});
				this.datalist = da.reverse();
				if (this.datalist.length == res.data.total) {
					this.more = false;
				}
			});
		},
		go(e){
			uni.navigateTo({
				url: './msg?id=' + e
			});
		}
	}
};
</script>

<style lang="less" scoped>
.msgs {
	padding: 30rpx 40rpx;
	color: #fff;
	font-size: 28rpx;
	.list {
		position: relative;
		border-bottom: 1px solid #4c6288;
		line-height: 124rpx;
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			float: left;
			margin-top: 30rpx;
			margin-right: 30rpx;
		}
		.name {
			width: 476rpx;
			overflow: hidden;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.dian {
			position: absolute;
			top: 50%;
			right: 0;
			margin-top: -9rpx;
			width: 18rpx;
			height: 18rpx;
			background: #ff4848;
			border-radius: 50%;
		}
	}
}
</style>
