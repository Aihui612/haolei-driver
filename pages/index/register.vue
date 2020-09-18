<template>
	<view class="recruit">
		<view class="scan" @click="gocardimg()">
			<image src="../../static/images/camera.png" mode=""></image>
			<text>扫描身份证自动识别</text>
		</view>
		<view class="list">
			<view class="input">
				<text>姓名</text>
				<input class="uni-input" type="text" placeholder="请输入真实姓名" maxlength="10" placeholder-style="color:#ffe471" v-model="fromdata.driverName" />
			</view>
			<view class="input">
				<text>性别</text>
				<picker mode="selector" @change="bindPickerChange" :value="fromdata.gender - 1" :range="sexlist">
					<view class="uni-input" style='margin-left: 500rpx;'>{{ sexlist[fromdata.gender - 1] }}</view>
				</picker>
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="input">
				<text>地区</text>
				<view class="select">
					<view class="btns" @tap="openAddres2" v-if="!fromdata.city">点击选择</view>
					<view class="btns" @tap="openAddres2" v-else>{{ fromdata.province + '-' + fromdata.city + '-' + fromdata.town }}</view>
					<!--
				         mask-bg-color="rgba(0, 229, 238, 0.4)" // 自定义遮罩层背景颜色
				         -->
				</view>
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="input">
				<text>详细地址</text>

				<input class="uni-input" type="text" placeholder="请输入详细地址" maxlength="18" placeholder-style="color:#ffe471" v-model="fromdata.locPoi" />
			</view>
			<view class="input">
				<text>身份证号码</text>
				<input class="uni-input" type="text" placeholder="请输入身份证号码" maxlength="18" placeholder-style="color:#ffe471" v-model="fromdata.idCard" />
			</view>
			<view class="input">
				<text>是否有代驾经验</text>
				<picker mode="selector" @change="bindPickerChange2" :value="fromdata.experience" :range="accident">
					<view class="uni-input">{{ accident[fromdata.experience] }}</view>
				</picker>
				<uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="input">
				<text>手机号</text>
				<input class="uni-input" type="number" placeholder="请输入手机号" maxlength="11" placeholder-style="color:#ffe471" v-model="fromdata.driverMobile" />
			</view>
			<view class="input">
				<text>登录密码</text>
				<input class="uni-input" type="text" placeholder="请输入登录密码" maxlength="11" placeholder-style="color:#ffe471" v-model="fromdata.password" password />
			</view>
			<view class="input">
				<checkbox-group>
					<label><checkbox value="cb" checked="true" /></label>
				</checkbox-group>
				我已同意
				<navigator url="/pages/index/agreement" open-type="navigate">《代驾协议》</navigator>
			</view>
		</view>
		<view class="primary" @click="sub()">提交申请</view>
		<view class="content"><simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address></view>
	</view>
</template>

<script>
import simpleAddress from '@/components/simple-address/simple-address.vue';
import login from '../../servers/login.js';
export default {
	components: {
		simpleAddress
	},
	data() {
		return {
			sexlist: ['男', '女'],
			accident: ['是', '否'],
			date: '',
			fromdata: {
				gender: 1,
				driverName: '',
				driverMobile: '',
				idCard: '',
				experience: 0,
				password: '',
				province: '',
				city: '',
				town: ''
			},
			index: 0,
			cityPickerValueDefault: [0, 0, 1],
			pickerText: []
		};
	},
	methods: {
		gocardimg() {
			let that=this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.getFileSystemManager().readFile({
						filePath: res.tempFilePaths[0], //选择图片返回的相对路径
						encoding: 'base64', //编码格式
						success: v => {
							//成功的回调
							let base64 = v.data; // 返回的是没有 'data:image/jpeg;base64,'头的数据, 有需要可自行追加上
							uni.request({
							  url: `http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json`,
							  data: {
							    image: base64,
							    // #正反面类型face/back
							    configure: { side: 'face' },
							  },
							  header: {
							    Authorization: 'APPCODE ee76a3d252df413c96951d9fa6eb26f8',
							    'Content-Type': 'application/octet-stream; charset=utf-8',
							  },
							  method: 'POST', // PUT DELETE GET
							  // 微信环境405等http错误也会进此回调
							  success: res => {
							    uni.hideLoading();
							    // gender: this.gender,
							    //   // 司机姓名
							    //   driverName: this.driverName,
							    //   // 司机手机号
							    //   driverMobile: this.driverMobile,
							    //   // 身份证号
							    //   idCard: this.idCard,
							    //   // 代驾经验
							    //   experience: 1,
							    //   // 位置 经纬度
							    //   locPoi: '',
							    if (res.statusCode === 200) {
							      console.log(12111111, res);
							      // 姓名
							      that.fromdata.driverName = res.data.name;
							      // 民族 汉
							      // res.data.nationality
							      // 身份证号
							      that.fromdata.idCard = res.data.num;
								  
								  that.fromdata.locPoi = res.data.address;
							      // 性别  男1  女2
								  if(res.data.sex=='男'){
									  that.fromdata.gender=1;
								  }else {
									  that.fromdata.gender=2;
								  }
							      // that.fromdata.gender = that.genderTextList.indexOf(res.data.sex);
							      // 地址 河南省**县**镇**村**组15号"
							      // res.data.address
								  
								  
							      // // 出生年月日  19900602
							      // res.data.birth
							    }
							  },
							  fail: err => {
							    console.log(1111, err);
							  },
							});
						}
					});
				}
			});
		},
		bindPickerChange: function(e) {
			console.log(e) // 0  1 
			this.fromdata.gender =parseInt(e.target.value) + 1;
		},
		bindPickerChange2: function(e) {
			this.fromdata.experience = e.target.value;
		},
		openAddres2() {
			// 根据 label 获取
			var index = this.$refs.simpleAddress.queryIndex(['河南省', '郑州市', '中原区'], 'label');
			console.log(index);
			this.cityPickerValueDefault = index.index;
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			this.pickerText = e.labelArr;
			this.fromdata.province = e.labelArr[0];
			this.fromdata.city = e.labelArr[1];
			this.fromdata.town = e.labelArr[2];
		},
		sub() {
			var da = this.fromdata;
			if (!da.driverName) {
				uni.showToast({
					title: '请输入真实姓名',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!da.city) {
				uni.showToast({
					title: '请选择地区',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!da.locPoi) {
				uni.showToast({
					title: '请输入详细地址',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!da.idCard) {
				uni.showToast({
					title: '请输入身份证号码',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!da.driverMobile) {
				uni.showToast({
					title: '请输入手机号',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!this.checkPhone(da.driverMobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			if (!da.password) {
				uni.showToast({
					title: '请输入登录密码',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			login.register(da).then(res => {});
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
.recruit {
	padding: 20rpx 25rpx;
	.scan {
		margin: 0 auto;
		height: 106rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		border-radius: 10rpx;
		text-align: center;

		font-size: 36rpx;
		font-weight: 400;
		color: #ffe471;
		image {
			position: relative;
			width: 68rpx;
			height: 68rpx;
			top: 20rpx;
			right: 10rpx;
		}
	}
	.list {
		margin: 20rpx 0;
		padding: 20rpx 0;
		border-radius: 20rpx;
		background: linear-gradient(135deg, #7692bb 0%, #425985 100%);
		padding: 0 40rpx;
		color: #f6f7f9;
		.input {
			position: relative;
			z-index: 8;
			line-height: 102rpx;
			font-size: 30rpx;
			text {
				position: absolute;
				z-index: -1;
			}
			input,
			uni-picker,
			.select {
				line-height: 102rpx;
				height: 102rpx;
				text-align: right;
				font-size: 30rpx;
				padding-right: 30rpx;
			}
			.content {
				position: relative;
				z-index: 99;
				color: #000;
				.btns {
					color: #fff;
				}
			}
			.uni-icons,
			uni-icons {
				position: absolute;
				z-index: -1;
				right: 0;
				top: 0;
			}
		}
	}
	.primary {
		margin-top: 10rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: 500;
		color: #4e6792;
		line-height: 106rpx;
		background: #ffffff;
		border-radius: 10rpx;
	}
}
</style>
