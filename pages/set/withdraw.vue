<template>
	<view class="withdraw">
		<view class="price">
			可提现金额
			<text>{{avaAmount}}</text>
		</view>
		<view class="botprice">
			<view class="lsit">
				提现金额
				<input type="number" v-model="fromdata.account" @input="cutaccount()"/>
			</view>
			<view class="lsit">
				提现密码
				<input type="text" v-model="fromdata.password" password/>
			</view>
		</view>
		<view class="msg">
			<!-- <text>密码输入错误，请重新输入</text> -->
			<text class="forget" @click="gopwd">忘记密码</text>
		</view>
		<view class="sub" @click="sub">提现</view>
	</view>
</template>

<script>
	import my from '../../servers/my.js';
export default {
	data() {
		return {
			avaAmount:0,
			fromdata:{
				account:'',
				password:''
			},
			oldaccount:''
		};
	},
	mounted() {
		this.getdata()
	},
	methods: {
		getdata(){
			my.driveraccount().then(res=>{
				this.avaAmount = res.data.avaAmount
				this.fromdata.account = res.data.avaAmount
				this.oldaccount = res.data.avaAmount
			})
		},
		sub(){
			if(this.fromdata.account>this.avaAmount){
				uni.showToast({
					icon:'none',
				    title: '提现金额大于可提现金额',
				    duration: 2000
				});
				return
			}
			if(!this.fromdata.password){
				uni.showToast({
					icon:'none',
				    title: '请输入提现密码',
				    duration: 2000
				});
				return
			}
			my.withdraw(this.fromdata).then(res=>{
				uni.showToast({
				    title: res.msg,
				    duration: 2000
				});
				uni.navigateBack()
			})
		},
		cutaccount(){
			var da = this.fromdata.account
			if(Number(da)||da==0||da==''){
				var na = da.split('.')
				if(na[0].length>2){
					this.oldaccount = na[0]+'.'+na[1].substr(0,2)
					this.fromdata.account = na[0]+'.'+na[1].substr(0,2)
				}else{
					this.oldaccount = da
				}
			}else{
				this.fromdata.account = this.oldaccount
			}
		},
		gopwd(){
			uni.navigateTo({
				url: './password'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.withdraw {
	color: #fff;
	padding: 68rpx 40rpx;
	font-size: 28rpx;
	.price {
		padding: 0 40rpx;
		height: 130rpx;
		line-height: 130rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 16rpx;
		text {
			width: 419rpx;
			float: right;
			display: block;
			font-size: 36rpx;
			font-weight: 500;
		}
	}
	.botprice {
		margin: 30rpx 0 60rpx;
		padding: 22rpx 40rpx;
		line-height: 90rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 16rpx;
		text {
			width: 419rpx;
			float: right;
			display: block;
			font-size: 36rpx;
			font-weight: 500;
		}
		input {
			width: 379rpx;
			height: 64rpx;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 3rpx;
			border: 1px solid #ffffff;
			float: right;
			margin-top: 15rpx;
			padding: 0 20rpx;
		}
	}
	.msg {
		font-size: 28rpx;
		.forget {
			float: right;
			color: #ffe471;
		}
	}
	.sub {
		margin-top: 150rpx;
		height: 106rpx;
		line-height: 106rpx;
		background: #ffffff;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #4e6792;
		text-align: center;
	}
}
</style>
