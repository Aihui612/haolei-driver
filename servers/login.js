import {request} from './request.js'

const loginApi = {
	// 登陆接口
	login(params){
		return request({
		  method: 'Postquery',
		  url: '/api/driver/login',
		  params: params
		})
	},
	loginByMoblie(params){
		return request({
		  method: 'Postquery', 
		  url: '/api/driver/loginByMoblie',
		  params: params
		})
	},
	bindMobile(params){
		return request({
		  method: 'Post',
		  url: '/api/member/login/bindMobile',
		  params: params
		})
	},
	// getCode
	captchaImage(params) {
		return request({
			method: 'Get',
			url: '/captchaImage',
			params: params
		})
	},
	// 驾驶员端发放验证码
	driverSendSms(params){
		return request({
		  method: 'Post',
		  url: '/api/driver/driverSendSms',
		  params: params
		})
	},
	// 驾驶员端登录前发放验证码
	SendSms(params){
		return request({
		  method: 'Post',
		  url: '/api/driver/login/sendSms',
		  params: params
		})
	},
	// 驾驶员端登录前驾驶员端修改密码
	bloginChangPassword(params){
		return request({
		  method: 'Post',
		  url: '/api/driver/login/bloginChangPassword',
		  params: params
		})
	},
	// 驾驶员实时位置更新
	driverLocal(params){
		return request({
		  method: 'Get',
		  url: '/api/driver/driverLocal',
		  params: params,
		  loading:true
		})
	},
	// 代驾司机注册
	register(params){
		return request({
		  method: 'Post', 
		  url: '/api/driver/login/register',
		  params: params
		})
	},
	// 代驾司机绑定接口
	loginbindMobile(params){
		return request({
		  method: 'Postquery', 
		  url: '/api/driver/loginbindMobile',
		  params: params
		})
	},
	// 驾驶员端修改密码
	changPassword(params){
		return request({
		  method: 'Post', 
		  url: '/api/driver/changPassword',
		  params: params
		})
	},
	setdriver(params){
		return request({
		  method: 'Post', 
		  url: '/api/driver/edit',
		  params: params
		})
	},
	// 驾驶员端修改手机号
	changMobile(params){
		return request({
		  method: 'Post', 
		  url: '/api/driver/changMobile',
		  params: params
		})
	},
	// 驾驶员端代驾协议
	djxy(params){
		return request({
		  method: 'Get', 
		  url: '/api/cms/richtext/djxy',
		})
	},
}


export default loginApi