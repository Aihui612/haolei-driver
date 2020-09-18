import {
	request
} from './request.js'

const myApi = {
	// 代获取代驾司机详细信息
	driver(params) {
		return request({
			method: 'Get',
			url: '/api/driver',
			params: params
		})
	},
	// 代获取代司机账户信息
	driveraccount(params) {
		return request({
			method: 'Get',
			url: '/api/driver/account',
			params: params
		})
	},
	// 代获取代驾司机账单详情
	listWithdraw(params) {
		return request({
			method: 'Get',
			url: '/api/driver/account/listWithdraw',
			params: params
		})
	},
	// 代获取代驾司机账单详情
	listAccout(params) {
		return request({
			method: 'Get',
			url: '/api/driver/account/listAccout',
			params: params
		})
	},
	// 代获取代驾司机提现
	withdraw(params) {
		return request({
			method: 'Get',
			url: '/api/driver/account/withdraw',
			params: params
		})
	},
	// 代驾司机接单关闭
	close(params) {
		return request({
			method: 'Get',
			url: '/api/driver/close',
			params: params
		})
	},
	// 代驾司机接单开启
	open(params) {
		return request({
			method: 'Get',
			url: '/api/driver/open',
			params: params
		})
	},

	// 消息列表
	driverMessagelist(params) {
		return request({
			method: 'Get',
			url: '/api/driver/driverMessage/list',
			params: params
		})
	},
	driverMessage(params) {
		return request({
			method: 'Get',
			url: '/api/driver/driverMessage/' + params,
		})
	},
	
	// 根据问题类型返回问题列表 1驾驶员端、2、客户端、3、检查站端、4、中间商端
	question(params) {
		return request({
			method: 'Get',
			url: '/api/cms/question/type',
			params: params
		})
	},
	// code
	aboutUs(params) {
		return request({
			method: 'Get',
			url: `/api/cms/richtext/${params.code}`,
		})
	},
}


export default myApi
