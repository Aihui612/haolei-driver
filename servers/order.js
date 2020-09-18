import {
	request
} from './request.js'

const orderApi = {
	// 获取司机抢单订单列表
	grabOrderList(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/grabOrderList',
			params: params
		})
	},
	// 抢单接口
	grabOrder(params) { 
		return request({
			method: 'Get',
			url: '/api/driver/order/grabOrder/' + params,
		})
	},
	// 根据订单状态返回驾驶员订单列表
	order(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/'+params.type,
			params: params
		})
	},
	// 驾驶员前端订单详情
	orderDetails(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/orderDetails/'+params,
		})
	},
	// 取车接口
	pickCar(params) {
		return request({
			method: 'Postquery',
			url: '/api/driver/order/pickCar',
			params: params
		})
	},
	// 去取车接口
	goPickCar(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/goPickCar/'+params,
		})
	},
	// 送车接口
	goCar(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/goCar/'+params,
		})
	},
	// 完成接口
	returnCar(params) {
		return request({
			method: 'Get',
			url: '/api/driver/order/returnCar/'+params.id+'/'+params.code,
		})
	},
}


export default orderApi
